import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID!)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  telegram_id: string;

  @Field()
  @Column({ unique: true })
  token_and_name: string;

  @Field(() => Date)
  @CreateDateColumn()
  created_at?: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at?: Date;
}
