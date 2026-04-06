import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Flower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  image: string;

  @Column({ default: true })
  isStillAlive: boolean;
}
