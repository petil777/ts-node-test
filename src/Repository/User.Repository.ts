import {
    EntityRepository,
    Repository,
    InsertResult,
    Condition,
    MoreThanOrEqual,
    LessThanOrEqual,
    UpdateResult,
    DeleteResult
  } from "typeorm";
  import { User } from "src/models";
  
  @EntityRepository(User)
  export class UserRepository extends Repository<User> {
    public async createUser(user: User): Promise<InsertResult> {
      // # Don't use this since if user already exists, it is updated
      // this.save(user)
      return this.insert(user);
    }
    public findUsersByAge(params: { age: number; gr: boolean }): Promise<User[]> {
      // # Don't have to use querybuilder except (join, select) since find can do all where condition
      return this.find({
        where: {
          age: params.gr
            ? MoreThanOrEqual(params.age)
            : LessThanOrEqual(params.age)
        }
      });
    }
    public findOneById(id: string): Promise<User | undefined> {
      return this.findOne({ id });
    }
    public async updateUserById(
      id: string,
      description: string
    ): Promise<UpdateResult> {
      return this.update(id, { description });
    }
    public async deleteOneById(id: string): Promise<DeleteResult> {
      const user = await this.findOne({ id });
      if (typeof user === undefined) {
        throw new Error(`Could not find user with id: ${id}`);
      }
      //# use instead of removeOneById to acquire affected rows as return
      return this.delete(id);
    }
  }
  