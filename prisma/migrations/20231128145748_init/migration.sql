/*
  Warnings:

  - You are about to alter the column `name` on the `Tag` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- DropIndex
DROP INDEX `Tag_name_key` ON `Tag`;

-- AlterTable
ALTER TABLE `Tag` MODIFY `name` VARCHAR(100) NOT NULL;
