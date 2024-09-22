import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users=[
   {id:1,name:"guja" ,email:"guja@gmail.com", age:20}
  ]
  create(createUserDto: CreateUserDto) {
    const lastId = this.users[this.users.length -1]?.id ||0
    const newUser = {
      id: lastId + 1,
      ...createUserDto
    }
    this.users.push(newUser)
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {

    return this.users.find(el=>el.id===id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex(el=> el.id===id)
    if (index ===-1) throw  new BadRequestException()
    return this.users[index]= {...this.users[index], ...updateUserDto};
  }

  remove(id: number) {
    const index = this.users.findIndex(el=> el.id===id)
    if (index ===-1) throw  new BadRequestException()
    return this.users.splice(index,1);
  }
}
