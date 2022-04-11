import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity('users')
@Unique(["telegram_id", "token_name", "token"])
@Unique(["telegram_id", "token"])
export class User {
  @Field(() => ID!)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  telegram_id: string;

  @Field()
  @Column()
  token_name: string;

  @Field()
  @Column()
  token: string;

  @Field(() => Date)
  @CreateDateColumn()
  created_at?: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at?: Date;
}
