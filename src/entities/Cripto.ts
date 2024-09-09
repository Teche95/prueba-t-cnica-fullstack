
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm"

@Entity()
export class Cripto extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    ticker: string

    @Column({ type: "decimal", precision: 10, scale: 2 })
    precio_de_compra: number

    @Column({ type: "decimal", precision: 10, scale: 2 })
    cantidad_comprada: number

    @Column({ type: "decimal", precision: 10, scale: 2 })
    cantidad_invertida: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

}