/*
  Warnings:

  - You are about to drop the `activityType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "activityStatistic" DROP CONSTRAINT "activityStatisticForeignKeyActivityType";

-- DropTable
DROP TABLE "activityType";
