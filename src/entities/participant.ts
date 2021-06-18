import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Conversation } from './conversation'

@Entity('participant')
export class Participant extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number

  @Column()
  @ApiProperty()
  userId: number

  @Column()
  @ApiProperty()
  conversationId: number

  @Column()
  @ApiProperty()
  seen: boolean

  @Column()
  @ApiProperty()
  isActive: boolean

  @ManyToOne((_type) => Conversation, { nullable: true })
  @JoinColumn({ name: 'conversation_id' })
  @ApiProperty({ type: () => Conversation })
  conversation: Conversation
}
