import { Entity, Column, PrimaryColumn, Index } from "typeorm";

//To use active Record, extends BaseEntity
@Entity()
export class User {
  constructor(params: {
    id: string;
    password: string;
    age: number;
    description: string;
  }) {
    this.id = params.id;
    this.password = params.password;
    this.age = params.age;
    this.description = params.description;
  }
  // # To pervent strictPropertyInitialization, use ! for definite asignment assertion
  @PrimaryColumn()
  public id!: string;

  @Column()
  public password!: string;

  @Column()
  public age!: number;

  @Column("text")
  public description!: string;
}
