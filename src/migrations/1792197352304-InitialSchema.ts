import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1792197352304 implements MigrationInterface {
    name = 'InitialSchema1792197352304';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE users (
            id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            isActive BOOLEAN NOT NULL DEFAULT true,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        await queryRunner.query(`
            CREATE TABLE tasks (
            id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(200) NOT NULL,
            description TEXT NULL,
            status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
            priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
            dueDate DATE NULL,
            userId INT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE tasks`);
        await queryRunner.query(`DROP TABLE users`);
    }

}
