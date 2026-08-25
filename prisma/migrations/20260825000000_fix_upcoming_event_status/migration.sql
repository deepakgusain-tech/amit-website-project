-- CreateEnum
CREATE TYPE "UpcomingEventStatus" AS ENUM ('COMPLETED', 'NEW', 'ACTIVE', 'INACTIVE');

-- Convert existing event statuses to the enum used by the Prisma schema
ALTER TABLE "UpcommingEvents"
    ALTER COLUMN "status" DROP DEFAULT,
    ALTER COLUMN "status" TYPE "UpcomingEventStatus"
        USING "status"::text::"UpcomingEventStatus",
    ALTER COLUMN "status" SET DEFAULT 'NEW';