import { ApiProperty } from '@nestjs/swagger'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { User } from './user'
import { Participant } from './participant'

@Entity('conversation')
export class Conversation extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number

  @Column()
  @ApiProperty()
  title: string

  @Column()
  @ApiProperty()
  conversationType: string

  @Column()
  @ApiProperty()
  lastMesInfo: string

  @Column()
  @ApiProperty()
  createdBy: number

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createAt: Date

  @CreateDateColumn({ name: 'modified_at' })
  @ApiProperty()
  modifiedAt: Date

  @OneToMany((_type) => Participant, (participant) => participant.conversation, { nullable: true, cascade: true })
  @ApiProperty({ type: [Participant] })
  participant: Participant[]

  @ManyToOne((_type) => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  @ApiProperty({ type: () => User })
  user: User
}
