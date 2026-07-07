-- AlterTable
ALTER TABLE "Capabilities" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DeliveryProcess" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OutcomeFocus" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ServiceBenefits" ALTER COLUMN "description" DROP NOT NULL;
