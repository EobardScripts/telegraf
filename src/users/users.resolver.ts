import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserArgs } from './args/user.args'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Query(() => User, { name: 'user', nullable: true })
  async findOne(@Args('id', { type: () => ID }) id: number) {
    return await this.usersService.findOne(id);
  }

  @Query(() => [User], { name: 'userBy', nullable: true })
  async findBy(@Args() args: UserArgs) {
    return await this.usersService.findBy(args);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.usersService.update(updateUserInput);
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => ID }) id: number) {
    return await this.usersService.remove(id);
  }
}
