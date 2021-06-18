import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user'

@Entity('message')
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number

  @Column()
  @ApiProperty()
  conversationId: number

  @Column()
  @ApiProperty()
  senderId: number

  @Column()
  @ApiProperty()
  message: string

  @Column()
  @ApiProperty()
  messageType: string

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date

  @CreateDateColumn({ name: 'modified_at' })
  @ApiProperty()
  modifiedAt: Date

  @ManyToOne((_type) => User, { nullable: true })
  @JoinColumn({ name: 'sender_id' })
  @ApiProperty({ type: () => User })
  user: User
}
