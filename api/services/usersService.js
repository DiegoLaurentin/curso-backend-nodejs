const { faker } = require('@faker-js/faker')

class UsersService {

  constructor(){
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        phone: faker.phone.number(),
        image: faker.image.imageUrl(),
      });
    }

  }

  async create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  async find() {
    return this.users;
  }

  async findOne(id) {
    return this.users.find(item => item.id === id);
  }

  async update(id, changes) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('User Not Found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('User Not Found');
    }
    this.users.splice(index, 1);
    return { id };
  }

}

module.exports = UsersService;
