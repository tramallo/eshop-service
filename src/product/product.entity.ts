import { Entity, Column, BaseEntity, ObjectIdColumn } from "typeorm";

@Entity("products")
export class ProductEntity extends BaseEntity {
  @ObjectIdColumn()
  id?: number;

  @Column({ length: 500 })
  name?: string;

  @Column("int")
  price?: number;
}
