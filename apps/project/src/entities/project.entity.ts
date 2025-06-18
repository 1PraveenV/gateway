// import { ObjectType, Field, Int } from '@nestjs/graphql';

// @ObjectType()
// export class Project {
//   @Field(() => Int, { description: 'Example field (placeholder)' })
//   exampleField: number;
// }


import { ObjectType, Field, ID, } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Entity, PrimaryGeneratedColumn,ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Project {
  @Field(() => ID)
  // @PrimaryGeneratedColumn('uuid')
  // id: string;
  @ObjectIdColumn() 
  id: ObjectId;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}