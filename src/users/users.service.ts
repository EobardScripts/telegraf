import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserArgs } from './args/user.args';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

  async create(createUserInput: CreateUserInput): Promise<User> {
    return await this.userRepository.save(createUserInput);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findBy(args: UserArgs): Promise<User[]> {
    let whereParams = {}
    if(args.telegram_id != null)
      whereParams['telegram_id'] = args.telegram_id;
    if(args.token != null)
      whereParams['token'] = args.token;
    return await this.userRepository.find({where: whereParams});
  }


  async update(user: UpdateUserInput): Promise<User> {
    const updated = await this.userRepository.update(user.id, user);
    return await this.findOne(user.id);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    const deleted = await this.userRepository.delete(user.id);
    return user;
  }
}
