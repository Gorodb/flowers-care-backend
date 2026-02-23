import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Flower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  isStillAlive: boolean;
}
