<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240609171334 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE memory (id INT AUTO_INCREMENT NOT NULL, first_name VARCHAR(25) NOT NULL, last_name VARCHAR(255) NOT NULL, patronymic VARCHAR(255) NOT NULL, date_birth DATE NOT NULL, date_deads DATE NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE qr_code (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, client_id INT DEFAULT NULL, memory_id INT DEFAULT NULL, status_id INT NOT NULL, img VARCHAR(255) NOT NULL, uuid VARCHAR(255) NOT NULL, INDEX IDX_7D8B1FB5A76ED395 (user_id), INDEX IDX_7D8B1FB519EB6921 (client_id), UNIQUE INDEX UNIQ_7D8B1FB5CCC80CB3 (memory_id), INDEX IDX_7D8B1FB56BF700BD (status_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE status_qr_code (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE qr_code ADD CONSTRAINT FK_7D8B1FB5A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE qr_code ADD CONSTRAINT FK_7D8B1FB519EB6921 FOREIGN KEY (client_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE qr_code ADD CONSTRAINT FK_7D8B1FB5CCC80CB3 FOREIGN KEY (memory_id) REFERENCES memory (id)');
        $this->addSql('ALTER TABLE qr_code ADD CONSTRAINT FK_7D8B1FB56BF700BD FOREIGN KEY (status_id) REFERENCES status_qr_code (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE qr_code DROP FOREIGN KEY FK_7D8B1FB5A76ED395');
        $this->addSql('ALTER TABLE qr_code DROP FOREIGN KEY FK_7D8B1FB519EB6921');
        $this->addSql('ALTER TABLE qr_code DROP FOREIGN KEY FK_7D8B1FB5CCC80CB3');
        $this->addSql('ALTER TABLE qr_code DROP FOREIGN KEY FK_7D8B1FB56BF700BD');
        $this->addSql('DROP TABLE memory');
        $this->addSql('DROP TABLE qr_code');
        $this->addSql('DROP TABLE status_qr_code');
    }
}
