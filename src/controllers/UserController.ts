import * as express from "express";
//import service(with getcustomRepository) instead later for broader business logic
import { UserRepository } from "src/Repository";
import { User } from "src/models";

export class UserController {
  // private sampleService : SampleService;
  public req: express.Request;
  public res: express.Response;
  private userRepository: UserRepository;
  constructor(req: express.Request, res: express.Response) {
    this.req = req;
    this.res = res;
    this.userRepository = new UserRepository();
  }
  public test(): express.Response {
    return this.res.status(200).send("test response");
  }
  public loginTest(): express.Response {
    // console.log('req.user : ', this.req.user);
    // console.log('req.isauth : ', this.req.isAuthenticated())
    return this.res.status(200).send({ text: "loginTest clear" });
  }
  //create
  public async createOne(): Promise<express.Response> {
    const { id, age } = (this.req.params as unknown) as {
      id: string;
      age: number;
    };
    const { description } = (this.req.body as unknown) as {
      description: string;
    };
    const user = new User({ id, password: "123", age, description });
    try {
      const result = await this.userRepository.createUser(user);
      return this.res.status(200).send(result);
    } catch (err) {
      return this.res
        .status(404)
        .send({ message: err.message, text: "create user failed" });
    }
  }
  //read
  public async findOne(): Promise<express.Response> {
    const { id } = (this.req.params as unknown) as { id: string };
    if (typeof id === undefined) {
      throw new Error("Not valid id");
    }
    try {
      const user = await this.userRepository.findOneById(id);
      return this.res.send(user);
    } catch (err) {
      return this.res
        .status(404)
        .send({ message: err.message, text: "find user failed" });
    }
  }
  public async findByAge(): Promise<express.Response> {
    const { age, gr } = (this.req.body as unknown) as {
      age: number;
      gr: boolean;
    };
    if (typeof age === undefined || typeof gr === undefined) {
      throw new Error("Not valid information");
    }
    try {
      const users = this.userRepository.findUsersByAge({ age, gr });
      return this.res.status(200).send(users);
    } catch (err) {
      return this.res.status(err.statusCode).send({ message: err.message });
    }
  }

  //update
  public async update(): Promise<express.Response> {
    const { id } = (this.req.params as unknown) as { id: string };
    if (typeof id === undefined) {
      throw new Error("Not valid id");
    }
    const { description } = (this.req.body as unknown) as {
      description: string;
    };
    try {
      const result = await this.userRepository.updateUserById(id, description);
      return this.res.status(200).send({ affected: result.affected });
    } catch (err) {
      return this.res.status(err.statusCode).send({ message: err.message });
    }
  }
  //delete
  public async deleteOne(): Promise<express.Response> {
    const { id } = (this.req.params as unknown) as { id: string };
    if (typeof id === undefined) {
      throw new Error("Not valid id");
    }
    try {
      const result = await this.userRepository.deleteOneById(id);
      return this.res.status(200).send({ affected: result.affected });
    } catch (err) {
      return this.res.status(err.statusCode).send({ message: err.message });
    }
  }

  // public async findAll() : Promise<Response>{
  //     return new Promise((resolve, reject) =>{
  //         return resolve(this.res.send([{id:1, name:'kim'}, {id:2, name:'h'}]))
  //     })
  // }
  // public async findById() : Promise<Response | any>{
  //     const {id} = this.req.params as unknown as {id : number}
  //     console.log('id is : ', id)
  //     //TODO: later, try{await sampleService.find() } catch(err) { }
  //     return new Promise((resolve, reject)=>{
  //         if(id==1 || id==2){
  //             return resolve(this.res.status(200).send({id:id, name:'kim'}))
  //         }
  //         //else if () return resolve({})
  //         return reject(new Error("No id found error"))
  //     }).catch((err)=>{
  //         console.log('error : ', err.message)
  //     })
  // }
}
