-- CreateTable
CREATE TABLE "activityStatistic" (
    "activity" VARCHAR(50) NOT NULL,
    "user" VARCHAR(50) NOT NULL,
    "timeSpent" DECIMAL(10,0) NOT NULL DEFAULT 0,
    "experienceLevel" VARCHAR(50) NOT NULL,
    "insight" VARCHAR(125),

    CONSTRAINT "activityStatisticPrimaryKey" PRIMARY KEY ("activity","user")
);

-- CreateTable
CREATE TABLE "activityType" (
    "activityName" VARCHAR(50) NOT NULL,
    "distanceOrientated" BOOLEAN NOT NULL,

    CONSTRAINT "activityTypePrimaryKey" PRIMARY KEY ("activityName")
);

-- CreateTable
CREATE TABLE "user" (
    "email" VARCHAR(25) NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "contactNumber" DECIMAL(10,0) NOT NULL,
    "gender" VARCHAR(20) NOT NULL,
    "location" VARCHAR(100) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "dateOfBirth" VARCHAR NOT NULL,

    CONSTRAINT "userPrimaryKey" PRIMARY KEY ("email")
);

-- AddForeignKey
ALTER TABLE "activityStatistic" ADD CONSTRAINT "activityStatisticForeignKeyActivityType" FOREIGN KEY ("activity") REFERENCES "activityType"("activityName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activityStatistic" ADD CONSTRAINT "activityStatisticForeignKeyUser" FOREIGN KEY ("user") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE CASCADE;
