/*
  Warnings:

  - The primary key for the `activityStatistic` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `experienceLevel` on the `activityStatistic` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `activityStatistic` table. All the data in the column will be lost.
  - You are about to drop the column `contactNumber` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `user` table. All the data in the column will be lost.
  - Added the required column `XP` to the `activityStatistic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `activityStatistic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cellNumber` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userSurname` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "activityStatistic" DROP CONSTRAINT "activityStatisticForeignKeyUser";

-- AlterTable
ALTER TABLE "activityStatistic" DROP CONSTRAINT "activityStatisticPrimaryKey",
DROP COLUMN "experienceLevel",
DROP COLUMN "user",
ADD COLUMN     "XP" VARCHAR(50) NOT NULL,
ADD COLUMN     "email" VARCHAR(50) NOT NULL,
ADD CONSTRAINT "activityStatisticPrimaryKey" PRIMARY KEY ("activity", "email");

-- AlterTable
ALTER TABLE "user" DROP COLUMN "contactNumber",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "cellNumber" DECIMAL(10,0) NOT NULL,
ADD COLUMN     "userName" VARCHAR(50) NOT NULL,
ADD COLUMN     "userSurname" VARCHAR(50) NOT NULL;

-- AddForeignKey
ALTER TABLE "activityStatistic" ADD CONSTRAINT "activityStatisticForeignKeyUser" FOREIGN KEY ("email") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE CASCADE;
