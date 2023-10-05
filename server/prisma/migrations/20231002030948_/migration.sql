/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `ResetPasswordToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ResetPasswordToken" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "oauthProvider" TEXT,
ADD COLUMN     "oauthUserId" TEXT,
ALTER COLUMN "password" DROP NOT NULL;
