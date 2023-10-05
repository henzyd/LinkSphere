/*
  Warnings:

  - You are about to drop the column `oauthProvider` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `oauthUserId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "oauthProvider",
DROP COLUMN "oauthUserId";

-- CreateTable
CREATE TABLE "OAuthProvider" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "OAuthProvider_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OAuthProvider_provider_key" ON "OAuthProvider"("provider");

-- AddForeignKey
ALTER TABLE "OAuthProvider" ADD CONSTRAINT "OAuthProvider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
