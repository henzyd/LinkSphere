/*
  Warnings:

  - Added the required column `lastUsedAt` to the `OAuthProvider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OAuthProvider" ADD COLUMN     "lastUsedAt" TIMESTAMP(3) NOT NULL;
