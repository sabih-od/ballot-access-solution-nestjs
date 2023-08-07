import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, OnlyFieldsOfType, ManyToOne } from 'typeorm';
import { ModelHasRoles } from 'src/model-has-roles/entities/model-has-roles.entity';
import { Hires } from 'src/hires/entities/hires.entity';
import { Petitions } from 'src/petitions/entities/petitions.entity';
import { Helper } from 'src/helper';
import { SignedPetitions } from 'src/signed-petitions/entities/signed-petitions.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  firstname: string;

  @Column({ type: 'varchar', length: 255 })
  lastname: string;

  @Column({ type: 'integer' })
  age: number;

  @Column({ type: 'varchar', length: 255 })
  gender: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  company: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToOne(() => ModelHasRoles, modelHasRoles => modelHasRoles.user)
  public modelHasRoles: ModelHasRoles[];

  @OneToMany(type => Hires, hire => hire.sender) hire: Hires;

  @OneToMany(type => Hires, hire => hire.receiver) _hire: Hires;

  @OneToOne(() => Petitions, petition => petition.user)
  petition: Petitions;

  @OneToMany(type => SignedPetitions, signedPetition => signedPetition.creator) creator: SignedPetitions;

  @OneToMany(type => SignedPetitions, signedPetition => signedPetition.updator) updator: SignedPetitions;

  get _role(): Promise<string> {
    return Helper.role(this.id);
  }
}