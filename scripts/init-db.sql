-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.11.8-MariaDB-0ubuntu0.24.04.1 - Ubuntu 24.04
-- OS do Servidor:               debian-linux-gnu
-- HeidiSQL Versão:              12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Copiando estrutura para tabela jira_metrics.issues
CREATE TABLE IF NOT EXISTS `issues` (
                                        `id` int(10) unsigned NOT NULL,
    `project_id` int(10) unsigned NOT NULL,
    `reporter_id` varchar(50) NOT NULL DEFAULT '',
    `assignee_id` varchar(50) DEFAULT '',
    `status` varchar(155) NOT NULL DEFAULT '',
    `summary` varchar(155) NOT NULL DEFAULT '',
    `description` text DEFAULT NULL,
    `priority` text NOT NULL,
    `type` text NOT NULL,
    `created_at` datetime NOT NULL,
    PRIMARY KEY (`id`),
    KEY `IssueAssignee` (`assignee_id`),
    KEY `IssueProject` (`project_id`),
    KEY `IssueReporter` (`reporter_id`),
    CONSTRAINT `IssueAssignee` FOREIGN KEY (`assignee_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `IssueProject` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `IssueReporter` FOREIGN KEY (`reporter_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela jira_metrics.issues_changelog
CREATE TABLE IF NOT EXISTS `issues_changelog` (
                                                  `issue_id` int(10) unsigned NOT NULL,
    `field` varchar(50) NOT NULL,
    `from` varchar(50) NOT NULL,
    `to` varchar(50) NOT NULL,
    `created_at` datetime NOT NULL,
    KEY `ChangelogIssue` (`issue_id`),
    CONSTRAINT `ChangelogIssue` FOREIGN KEY (`issue_id`) REFERENCES `issues` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela jira_metrics.projects
CREATE TABLE IF NOT EXISTS `projects` (
                                          `id` int(10) unsigned NOT NULL,
    `name` varchar(50) NOT NULL DEFAULT '',
    `type` varchar(50) NOT NULL DEFAULT '',
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela jira_metrics.sprints
CREATE TABLE IF NOT EXISTS `sprints` (
                                         `id` int(10) unsigned NOT NULL,
    `name` varchar(50) NOT NULL DEFAULT '',
    `state` varchar(50) NOT NULL DEFAULT '',
    `startDate` datetime DEFAULT NULL,
    `endDate` datetime DEFAULT NULL,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela jira_metrics.sprints_issues
CREATE TABLE IF NOT EXISTS `sprints_issues` (
                                                `sprint_id` int(10) unsigned NOT NULL,
    `issue_id` int(10) unsigned NOT NULL,
    KEY `SprintIssue_Issue` (`issue_id`),
    KEY `SprintIssue_Sprint` (`sprint_id`),
    CONSTRAINT `SprintIssue_Issue` FOREIGN KEY (`issue_id`) REFERENCES `issues` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `SprintIssue_Sprint` FOREIGN KEY (`sprint_id`) REFERENCES `sprints` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela jira_metrics.users
CREATE TABLE IF NOT EXISTS `users` (
                                       `id` varchar(50) NOT NULL,
    `name` varchar(50) NOT NULL,
    `mail` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportação de dados foi desmarcado.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
