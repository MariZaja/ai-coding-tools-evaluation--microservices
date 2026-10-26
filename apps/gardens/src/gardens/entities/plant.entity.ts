import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
  } from 'typeorm';
import { Gardens } from './garden.entity';
  
  @Entity('plants')
  export class Plant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @CreateDateColumn({
      name: 'created_at',
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt?: Date;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @Column({ type: 'int', name: 'garden_id' })
    gardenId: number;

    @ManyToOne(() => Gardens, (garden) => garden.plants, {
      onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'garden_id' })
    garden: Gardens;

    @Column({ type: 'int', name: 'species_id' })
    speciesId: string;

    @Column({ type: 'text', nullable: true })
    image: string | null;
  }
  