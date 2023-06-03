/*
  Warnings:

  - You are about to drop the column `loggedInAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "loggedInAt",
ADD COLUMN     "lastLogin" TIMESTAMP(3);
