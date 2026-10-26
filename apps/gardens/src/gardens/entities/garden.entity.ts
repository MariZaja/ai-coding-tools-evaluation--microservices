import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Plant } from './plant.entity';

@Entity({ name: 'gardens' })
export class Gardens {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  name: string;

  @Column()
  creation_date: Date;

  @Column()
  surrounding: string;

  @OneToMany(() => Plant, (plant) => plant.garden, { cascade: true })
  plants: Plant[];

  @Column({ type: 'text', nullable: true })
  image: string | null;
}
