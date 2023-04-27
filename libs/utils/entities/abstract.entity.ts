import * as moment from 'moment';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'bigint' })
  createdAt: number;

  @UpdateDateColumn({ type: 'bigint' })
  lastModified: number;

  @BeforeInsert()
  insertCreated() {
    const currentTimestamp = moment().valueOf();
    this.createdAt = currentTimestamp;
    this.lastModified = currentTimestamp;
  }

  @BeforeUpdate()
  insertUpdated() {
    this.lastModified = moment().valueOf();
  }
}
