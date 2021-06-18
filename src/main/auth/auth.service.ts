import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common'
import { LoginDto, RegisterDto } from './dto'
import { PasswordUtil } from '../../shared/password'
import { JwtService } from '@nestjs/jwt'
import * as _ from 'lodash'
import { nanoid } from 'nanoid'
import { ROLE_NAME } from '../../common/constant'
import { getManager } from 'typeorm'
import { User } from '../../entities/user'

const userPickFields = ['id', 'email', 'userName', 'firstName', 'lastName', 'avatar', 'isEnabled', 'roles']

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async register(payload: RegisterDto): Promise<any> {
    payload.name = payload.name.toLowerCase()
    const { name, password } = payload
    delete payload.password
    const passwordHash = PasswordUtil.generateHash(password)

    const user = await User.findOne({ where: { name } })
    if (user) {
      throw new NotFoundException('The email is existing.')
    }

    //default to create user with role user
    const userRole = await User.findOne({ where: { name: ROLE_NAME.NormalUser } })
    if (!userRole) {
      throw new InternalServerErrorException('The user role was not found.')
    }
    return await getManager().transaction(async (transaction) => {
      const insertedUser = User.create({ ...payload, password: passwordHash })

      await transaction
        .getRepository(User)
        .save(insertedUser)
        .catch((err) => {
          if (err.message.indexOf('uq_app_user_user_name') > -1) {
            throw new InternalServerErrorException(`User name ${payload.name} is already existed.`)
          }
          throw new InternalServerErrorException(`Error when creating new user: ${err}`)
        })

      const jwtData = {
        ..._.pick(insertedUser, userPickFields)
      }
      const { accessToken, refreshToken } = this.createTokenAndRefreshToken(jwtData)

      return {
        user: jwtData,
        accessToken,
        refreshToken
      }
    })
  }

  async login(payload: LoginDto): Promise<any> {
    payload.name = payload.name.toLowerCase()
    const { name, password } = payload
    const user = await User.findOne({ where: { name: { name } } })
    if (!user) {
      throw new NotFoundException('The email or password incorrect')
    }
    const isPasswordCorrect = PasswordUtil.validateHash(password, user.password)
    if (!isPasswordCorrect) {
      throw new NotFoundException('The email or password incorrect')
    }
    const jwtData = {
      ..._.pick(user, userPickFields)
    }
    const { accessToken, refreshToken } = this.createTokenAndRefreshToken(jwtData)
    return {
      user: jwtData,
      accessToken,
      refreshToken
    }
  }

  createTokenAndRefreshToken(payload: any) {
    const accessToken = this.jwtService.sign(payload)
    const refreshToken = nanoid(128)
    return {
      accessToken,
      refreshToken
    }
  }
}
