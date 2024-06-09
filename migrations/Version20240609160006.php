<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240609160006 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE roles (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(64) NOT NULL, task_calculation_active TINYINT(1) DEFAULT 0 NOT NULL, is_selectable TINYINT(1) DEFAULT 1 NOT NULL, sort INT DEFAULT NULL, task_calculation_active_crm TINYINT(1) DEFAULT 1 NOT NULL, car_image_required TINYINT(1) DEFAULT NULL, driving_license_image_active TINYINT(1) DEFAULT NULL, work_start_deactivated TINYINT(1) DEFAULT NULL, work_start_earlier_minutes INT DEFAULT 0, dashboard_route VARCHAR(255) DEFAULT NULL, INDEX i_is_selectable (is_selectable), INDEX i_name (name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE roles');
    }
}
