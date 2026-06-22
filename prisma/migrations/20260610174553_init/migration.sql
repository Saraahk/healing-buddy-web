-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(36) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `avatar_url` VARCHAR(500) NULL,
    `avatar_initials` VARCHAR(10) NULL,
    `role` VARCHAR(50) NOT NULL,
    `account_status` VARCHAR(20) NOT NULL DEFAULT 'Active',
    `is_verified` BOOLEAN NOT NULL DEFAULT false,
    `verification_otp` VARCHAR(10) NULL,
    `verification_otp_expires_at` DATETIME(3) NULL,
    `credentials_sent_at` DATETIME(3) NULL,
    `last_active_at` DATETIME(3) NULL,
    `last_login_at` DATETIME(3) NULL,
    `notification_enabled` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patients` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `date_of_birth` DATE NULL,
    `gender` VARCHAR(20) NULL,
    `blood_type` VARCHAR(5) NULL,
    `emergency_contact_name` VARCHAR(100) NULL,
    `emergency_contact_phone` VARCHAR(20) NULL,
    `emergency_contact_relationship` VARCHAR(50) NULL,
    `primary_condition` VARCHAR(100) NULL,
    `severity` VARCHAR(50) NULL,
    `diagnosed_year` INTEGER NULL,
    `onboarding_completed` BOOLEAN NOT NULL DEFAULT false,
    `onboarding_completed_at` DATETIME(3) NULL,
    `health_assessment_last_updated` DATETIME(3) NULL,
    `joined_date` DATE NOT NULL,
    `last_active` DATE NULL,
    `months_on_platform` INTEGER NOT NULL DEFAULT 0,
    `healing_notes_count` INTEGER NOT NULL DEFAULT 0,
    `medical_documents_count` INTEGER NOT NULL DEFAULT 0,
    `appointments_count` INTEGER NOT NULL DEFAULT 0,
    `preferred_consultation_type` VARCHAR(20) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `patients_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctors` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `specialty` VARCHAR(100) NOT NULL,
    `sub_specialty` VARCHAR(100) NULL,
    `license_number` VARCHAR(100) NULL,
    `years_of_experience` INTEGER NULL,
    `biography` TEXT NULL,
    `consultation_fee` DECIMAL(10, 2) NULL,
    `telehealth_enabled` BOOLEAN NOT NULL DEFAULT true,
    `in_clinic_enabled` BOOLEAN NOT NULL DEFAULT true,
    `clinic_address` TEXT NULL,
    `clinic_city` VARCHAR(100) NULL,
    `clinic_zip_code` VARCHAR(20) NULL,
    `rating_average` DECIMAL(3, 2) NOT NULL DEFAULT 0,
    `rating_count` INTEGER NOT NULL DEFAULT 0,
    `is_verified` BOOLEAN NOT NULL DEFAULT false,
    `verified_at` DATETIME(3) NULL,
    `verified_by` VARCHAR(36) NULL,
    `joined_at` DATE NOT NULL,
    `total_patients` INTEGER NOT NULL DEFAULT 0,
    `sessions_count` INTEGER NOT NULL DEFAULT 0,
    `session_notes_count` INTEGER NOT NULL DEFAULT 0,
    `recommendations_count` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `doctors_user_id_key`(`user_id`),
    UNIQUE INDEX `doctors_license_number_key`(`license_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `healing_buddies` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `professional_title` VARCHAR(100) NULL,
    `certifications` TEXT NULL,
    `joined_at` DATE NOT NULL,
    `checkins_count` INTEGER NOT NULL DEFAULT 0,
    `messages_sent_count` INTEGER NOT NULL DEFAULT 0,
    `response_rate` DECIMAL(5, 2) NOT NULL DEFAULT 0,
    `average_response_time_min` INTEGER NULL,
    `supporting_patients_count` INTEGER NOT NULL DEFAULT 0,
    `reports_submitted_count` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `healing_buddies_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `family_members` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `relationship_default` VARCHAR(50) NULL,
    `joined_at` DATE NOT NULL,
    `linked_patients_count` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `family_members_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admins` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `admin_role` VARCHAR(50) NULL,
    `permissions` JSON NOT NULL,
    `joined_at` DATE NOT NULL,
    `last_action_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admins_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `family_patient_connections` (
    `id` VARCHAR(36) NOT NULL,
    `patient_id` VARCHAR(36) NOT NULL,
    `family_member_id` VARCHAR(36) NULL,
    `family_member_email` VARCHAR(100) NULL,
    `family_member_name` VARCHAR(100) NULL,
    `relationship` VARCHAR(50) NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'Pending',
    `requested_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `responded_at` DATETIME(3) NULL,
    `connected_since` DATE NULL,
    `disconnected_at` DATETIME(3) NULL,
    `expires_at` DATETIME(3) NULL,
    `invitation_code` VARCHAR(50) NULL,
    `disconnected_reason` VARCHAR(255) NULL,
    `can_view_mood` BOOLEAN NOT NULL DEFAULT true,
    `can_view_documents` BOOLEAN NOT NULL DEFAULT false,
    `can_chat_with_doctor` BOOLEAN NOT NULL DEFAULT false,
    `can_chat_with_healing_buddy` BOOLEAN NOT NULL DEFAULT false,
    `can_receive_emergency_alerts` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `family_patient_connections_patient_id_family_member_id_key`(`patient_id`, `family_member_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctor_patient_assignments` (
    `id` VARCHAR(36) NOT NULL,
    `doctor_id` VARCHAR(36) NOT NULL,
    `patient_id` VARCHAR(36) NOT NULL,
    `assigned_since` DATE NOT NULL,
    `is_primary` BOOLEAN NOT NULL DEFAULT true,
    `patient_status` VARCHAR(50) NOT NULL DEFAULT 'Active',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `doctor_patient_assignments_doctor_id_patient_id_key`(`doctor_id`, `patient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient_healing_buddies` (
    `id` VARCHAR(36) NOT NULL,
    `healing_buddy_id` VARCHAR(36) NOT NULL,
    `patient_id` VARCHAR(36) NOT NULL,
    `relationship_type` VARCHAR(50) NULL,
    `assigned_doctor_name` VARCHAR(100) NULL,
    `assigned_doctor_id` VARCHAR(36) NULL,
    `support_since` DATE NOT NULL,
    `support_until` DATE NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `patient_healing_buddies_healing_buddy_id_patient_id_key`(`healing_buddy_id`, `patient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointments` (
    `id` VARCHAR(36) NOT NULL,
    `patient_id` VARCHAR(36) NOT NULL,
    `doctor_id` VARCHAR(36) NOT NULL,
    `appointment_date` DATETIME(3) NOT NULL,
    `duration_minutes` INTEGER NOT NULL DEFAULT 30,
    `type` VARCHAR(20) NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'Scheduled',
    `chief_complaint` TEXT NULL,
    `notes` TEXT NULL,
    `cancelled_reason` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `appointments_patient_id_idx`(`patient_id`),
    INDEX `appointments_doctor_id_idx`(`doctor_id`),
    INDEX `appointments_appointment_date_idx`(`appointment_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session_notes` (
    `id` VARCHAR(36) NOT NULL,
    `doctor_id` VARCHAR(36) NOT NULL,
    `patient_id` VARCHAR(36) NOT NULL,
    `appointment_id` VARCHAR(36) NULL,
    `note_content` TEXT NOT NULL,
    `is_visible_to_patient` BOOLEAN NOT NULL DEFAULT false,
    `is_visible_to_buddy` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `session_notes_patient_id_idx`(`patient_id`),
    INDEX `session_notes_doctor_id_idx`(`doctor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mood_entries` (
    `id` VARCHAR(36) NOT NULL,
    `patient_id` VARCHAR(36) NOT NULL,
    `mood_type` VARCHAR(20) NULL,
    `mood_note` VARCHAR(255) NULL,
    `entry_date` DATE NOT NULL,
    `is_shared_with_family` BOOLEAN NOT NULL DEFAULT true,
    `is_shared_with_buddy` BOOLEAN NOT NULL DEFAULT true,
    `is_shared_with_doctor` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `mood_entries_patient_id_entry_date_idx`(`patient_id`, `entry_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `healing_notes` (
    `id` VARCHAR(36) NOT NULL,
    `healing_buddy_id` VARCHAR(36) NOT NULL,
    `patient_id` VARCHAR(36) NOT NULL,
    `note_content` TEXT NOT NULL,
    `checkin_date` DATE NOT NULL,
    `mood_reference` VARCHAR(36) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `healing_notes_patient_id_idx`(`patient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctor_ratings` (
    `id` VARCHAR(36) NOT NULL,
    `doctor_id` VARCHAR(36) NOT NULL,
    `patient_id` VARCHAR(36) NOT NULL,
    `rating` DECIMAL(2, 1) NOT NULL,
    `review_text` TEXT NULL,
    `rated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `doctor_ratings_doctor_id_patient_id_key`(`doctor_id`, `patient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `uploaded_documents` (
    `id` VARCHAR(36) NOT NULL,
    `patient_id` VARCHAR(36) NOT NULL,
    `document_name` VARCHAR(255) NOT NULL,
    `document_path` VARCHAR(500) NOT NULL,
    `file_size` BIGINT NULL,
    `document_type` VARCHAR(50) NULL,
    `document_date` DATE NOT NULL,
    `uploaded_by` VARCHAR(36) NULL,
    `is_shared_with_family` BOOLEAN NOT NULL DEFAULT false,
    `is_shared_with_doctor` BOOLEAN NOT NULL DEFAULT true,
    `is_shared_with_buddy` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `uploaded_documents_patient_id_idx`(`patient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctor_requests` (
    `id` VARCHAR(36) NOT NULL,
    `full_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone_number` VARCHAR(20) NOT NULL,
    `years_of_experience` INTEGER NOT NULL,
    `medical_specialty` VARCHAR(100) NOT NULL,
    `medical_license_no` VARCHAR(100) NOT NULL,
    `cv_document_path` VARCHAR(500) NULL,
    `medical_degree_document_path` VARCHAR(500) NULL,
    `brief_introduction` TEXT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'Pending',
    `reviewed_by` VARCHAR(36) NULL,
    `review_notes` TEXT NULL,
    `reviewed_at` DATETIME(3) NULL,
    `doctor_id` VARCHAR(36) NULL,
    `request_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `doctor_requests_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `community_posts` (
    `id` VARCHAR(36) NOT NULL,
    `author_id` VARCHAR(36) NOT NULL,
    `author_role_at_time` VARCHAR(50) NOT NULL,
    `content` TEXT NOT NULL,
    `likes_count` INTEGER NOT NULL DEFAULT 0,
    `comments_count` INTEGER NOT NULL DEFAULT 0,
    `is_reported` BOOLEAN NOT NULL DEFAULT false,
    `reports_count` INTEGER NOT NULL DEFAULT 0,
    `posted_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `community_posts_author_id_idx`(`author_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `community_post_likes` (
    `id` VARCHAR(36) NOT NULL,
    `post_id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `liked_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `community_post_likes_post_id_user_id_key`(`post_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `community_post_comments` (
    `id` VARCHAR(36) NOT NULL,
    `post_id` VARCHAR(36) NOT NULL,
    `author_id` VARCHAR(36) NOT NULL,
    `comment_text` TEXT NOT NULL,
    `likes_count` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `community_post_reports` (
    `id` VARCHAR(36) NOT NULL,
    `post_id` VARCHAR(36) NOT NULL,
    `reported_by` VARCHAR(36) NOT NULL,
    `report_reason` VARCHAR(255) NULL,
    `reported_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `resolved_at` DATETIME(3) NULL,
    `resolution` VARCHAR(50) NULL,
    `resolved_by` VARCHAR(36) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `announcements` (
    `id` VARCHAR(36) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `message` TEXT NOT NULL,
    `target_audience` JSON NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'Draft',
    `sent_by` VARCHAR(36) NULL,
    `sent_at` DATETIME(3) NULL,
    `created_by` VARCHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `announcement_recipients` (
    `id` VARCHAR(36) NOT NULL,
    `announcement_id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `read_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `announcement_recipients_announcement_id_user_id_key`(`announcement_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `analytics_summary` (
    `id` VARCHAR(36) NOT NULL,
    `date` DATE NOT NULL,
    `patient_posts_count` INTEGER NOT NULL DEFAULT 0,
    `healing_notes_written_count` INTEGER NOT NULL DEFAULT 0,
    `family_posts_count` INTEGER NOT NULL DEFAULT 0,
    `support_sessions_count` INTEGER NOT NULL DEFAULT 0,
    `medical_documents_uploaded_count` INTEGER NOT NULL DEFAULT 0,
    `family_connections_count` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `analytics_summary_date_key`(`date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `weekly_user_activity` (
    `id` VARCHAR(36) NOT NULL,
    `week_start_date` DATE NOT NULL,
    `day_of_week` VARCHAR(10) NOT NULL,
    `patients_active` INTEGER NOT NULL DEFAULT 0,
    `doctors_active` INTEGER NOT NULL DEFAULT 0,
    `healing_buddies_active` INTEGER NOT NULL DEFAULT 0,
    `family_members_active` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `weekly_user_activity_week_start_date_day_of_week_key`(`week_start_date`, `day_of_week`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctor_rankings` (
    `id` VARCHAR(36) NOT NULL,
    `doctor_id` VARCHAR(36) NOT NULL,
    `rank_position` INTEGER NOT NULL,
    `total_patients_count` INTEGER NOT NULL DEFAULT 0,
    `average_rating` DECIMAL(3, 2) NOT NULL DEFAULT 0,
    `ranking_date` DATE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `doctor_rankings_doctor_id_ranking_date_key`(`doctor_id`, `ranking_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_activity_log` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `action` VARCHAR(100) NOT NULL,
    `entity_type` VARCHAR(50) NULL,
    `entity_id` VARCHAR(36) NULL,
    `ip_address` VARCHAR(45) NULL,
    `user_agent` TEXT NULL,
    `details` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `user_activity_log_user_id_idx`(`user_id`),
    INDEX `user_activity_log_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctors` ADD CONSTRAINT `doctors_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctors` ADD CONSTRAINT `doctors_verified_by_fkey` FOREIGN KEY (`verified_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `healing_buddies` ADD CONSTRAINT `healing_buddies_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family_members` ADD CONSTRAINT `family_members_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admins` ADD CONSTRAINT `admins_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family_patient_connections` ADD CONSTRAINT `family_patient_connections_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family_patient_connections` ADD CONSTRAINT `family_patient_connections_family_member_id_fkey` FOREIGN KEY (`family_member_id`) REFERENCES `family_members`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctor_patient_assignments` ADD CONSTRAINT `doctor_patient_assignments_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctor_patient_assignments` ADD CONSTRAINT `doctor_patient_assignments_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient_healing_buddies` ADD CONSTRAINT `patient_healing_buddies_healing_buddy_id_fkey` FOREIGN KEY (`healing_buddy_id`) REFERENCES `healing_buddies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient_healing_buddies` ADD CONSTRAINT `patient_healing_buddies_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient_healing_buddies` ADD CONSTRAINT `patient_healing_buddies_assigned_doctor_id_fkey` FOREIGN KEY (`assigned_doctor_id`) REFERENCES `doctors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session_notes` ADD CONSTRAINT `session_notes_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session_notes` ADD CONSTRAINT `session_notes_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session_notes` ADD CONSTRAINT `session_notes_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mood_entries` ADD CONSTRAINT `mood_entries_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `healing_notes` ADD CONSTRAINT `healing_notes_healing_buddy_id_fkey` FOREIGN KEY (`healing_buddy_id`) REFERENCES `healing_buddies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `healing_notes` ADD CONSTRAINT `healing_notes_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `healing_notes` ADD CONSTRAINT `healing_notes_mood_reference_fkey` FOREIGN KEY (`mood_reference`) REFERENCES `mood_entries`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctor_ratings` ADD CONSTRAINT `doctor_ratings_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctor_ratings` ADD CONSTRAINT `doctor_ratings_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `uploaded_documents` ADD CONSTRAINT `uploaded_documents_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `uploaded_documents` ADD CONSTRAINT `uploaded_documents_uploaded_by_fkey` FOREIGN KEY (`uploaded_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctor_requests` ADD CONSTRAINT `doctor_requests_reviewed_by_fkey` FOREIGN KEY (`reviewed_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctor_requests` ADD CONSTRAINT `doctor_requests_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `community_posts` ADD CONSTRAINT `community_posts_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `community_post_likes` ADD CONSTRAINT `community_post_likes_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `community_posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `community_post_likes` ADD CONSTRAINT `community_post_likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `community_post_comments` ADD CONSTRAINT `community_post_comments_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `community_posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `community_post_comments` ADD CONSTRAINT `community_post_comments_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `community_post_reports` ADD CONSTRAINT `community_post_reports_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `community_posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `community_post_reports` ADD CONSTRAINT `community_post_reports_reported_by_fkey` FOREIGN KEY (`reported_by`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `community_post_reports` ADD CONSTRAINT `community_post_reports_resolved_by_fkey` FOREIGN KEY (`resolved_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `announcements` ADD CONSTRAINT `announcements_sent_by_fkey` FOREIGN KEY (`sent_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `announcements` ADD CONSTRAINT `announcements_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `announcement_recipients` ADD CONSTRAINT `announcement_recipients_announcement_id_fkey` FOREIGN KEY (`announcement_id`) REFERENCES `announcements`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `announcement_recipients` ADD CONSTRAINT `announcement_recipients_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctor_rankings` ADD CONSTRAINT `doctor_rankings_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_activity_log` ADD CONSTRAINT `user_activity_log_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
