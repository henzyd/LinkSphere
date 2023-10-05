/*
  Warnings:

  - A unique constraint covering the columns `[providerId]` on the table `OAuthProvider` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "OAuthProvider_provider_key";

-- CreateIndex
CREATE UNIQUE INDEX "OAuthProvider_providerId_key" ON "OAuthProvider"("providerId");
