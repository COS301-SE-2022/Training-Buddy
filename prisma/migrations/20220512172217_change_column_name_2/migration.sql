/*
  Warnings:

  - You are about to drop the column `dateOfBirth` on the `user` table. All the data in the column will be lost.
  - Added the required column `dob` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "dateOfBirth",
ADD COLUMN     "dob" VARCHAR NOT NULL;
