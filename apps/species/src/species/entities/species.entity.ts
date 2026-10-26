import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'species' })
export class Species {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  maintenance: string;

  @Column()
  watering: string;

  @Column()
  size: string;

  @Column()
  poisonous: boolean;

  @Column({ type: 'text', nullable: true })
  default_image: string | null;

  @Column()
  sunlight: string;

  @Column()
  edible_parts: string;
}