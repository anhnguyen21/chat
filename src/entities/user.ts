import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Work } from './work'

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number

  @Column()
  @ApiProperty()
  name: string

  @Column()
  @ApiProperty()
  password: string

  @Column()
  @ApiProperty()
  avatar: string

  @Column()
  @ApiProperty()
  address: string

  @Column()
  @ApiProperty()
  workId: number

  @ManyToOne((_type) => Work, { nullable: true })
  @JoinColumn({ name: 'work_id' })
  @ApiProperty({ type: () => Work })
  work: Work
}
