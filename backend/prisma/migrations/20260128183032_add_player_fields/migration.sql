/*
  Warnings:

  - A unique constraint covering the columns `[name,teamId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Made the column `teamId` on table `Player` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_teamId_fkey";

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "battingStyle" TEXT,
ADD COLUMN     "bowlingStyle" TEXT,
ADD COLUMN     "nationality" TEXT,
ALTER COLUMN "teamId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "imgUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Player_name_teamId_key" ON "Player"("name", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
