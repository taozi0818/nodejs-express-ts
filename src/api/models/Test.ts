import {Table, Column, Model, AutoIncrement, PrimaryKey} from 'sequelize-typescript';

@Table({
  tableName: 'test'
})
export default class Test extends Model<Test> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  desc: string;

  init(name: string, desc: string): void {
    this.name = name;
    this.desc = desc;
  }
}
