-- CreateEnum
CREATE TYPE "Climate" AS ENUM ('ARID', 'ALPINE', 'CONTINENTAL', 'TROPICAL', 'TEMPERATE');

-- CreateEnum
CREATE TYPE "Terrain" AS ENUM ('DESERT', 'GRASSLANDS', 'MOUNTAINS', 'JUNGLE', 'URBAN', 'TUNDRA', 'OCEAN', 'BARREN', 'SWAMP');

-- CreateEnum
CREATE TYPE "Specie" AS ENUM ('HUMAN', 'CHISS', 'TWILEK', 'ZABRAK', 'MIRIALAN', 'MIRALUKA', 'KEL_DOR', 'PANTORAN', 'ANAKIN', 'WOOKIEE', 'TOGRUTA', 'TRANDOSHAN', 'NAUTOLAN', 'MON_CALAMARI', 'RODIAN', 'BITH', 'GRAN', 'GAMORREAN', 'YODA_SPECIES', 'SITH_PUREBLOOD', 'ZELTRON', 'GEONOSIAN', 'NEIMOIDIAN', 'KAMINOAN', 'UMBARAN', 'HUTT', 'DUG', 'TUSKEN', 'EWOK', 'JAWA', 'GUNGAN', 'MANDALORIAN', 'SITH', 'DROID_ASTROMECH', 'DROID_PROTOCOL', 'DROID_BATTLE', 'DROID_ASSASSIN');

-- CreateEnum
CREATE TYPE "Affiliation" AS ENUM ('GALACTIC_REPUBLIC', 'GALACTIC_EMPIRE', 'FIRST_ORDER', 'NEW_REPUBLIC', 'CONFEDERACY_OF_INDEPENDENT_SYSTEMS', 'REBEL_ALLIANCE', 'RESISTANCE', 'HUTT_CARTEL', 'CRIMSON_DAWN', 'JEDI_ORDER', 'SITH_ORDER', 'JEDI_TEMPLE_GUARD', 'INQUISITORIUS', 'KNIGHTS_OF_REN', 'NIGHTSISTERS', 'WHILLS', 'CLONE_TROOPERS', 'STORMTROOPERS', 'DEATH_WATCH', 'BOUNTY_HUNTERS_GUILD', 'REBEL_CELL', 'PHOENIX_SQUADRON', 'ROGUE_SQUADRON', 'BLACK_SUN', 'PYKE_SYNDICATE', 'BOUNTY_HUNTERS', 'SMUGGLERS', 'PIRATES', 'MANDALORIANS', 'EWOKS', 'GUNGANS', 'TUSKEN_RAIDERS', 'JEDI_ARCHIVES', 'NEUTRAL', 'INDEPENDENT', 'MERCENARY', 'SCUM_AND_VILLAINY', 'DROID_ARMY', 'TRADE_FEDERATION', 'TECHNICAL_UNION');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "lastPassword" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Planet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "climate" "Climate" NOT NULL,
    "terrain" "Terrain" NOT NULL,
    "population" BIGINT NOT NULL,
    "starSystemId" TEXT NOT NULL,

    CONSTRAINT "Planet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StarSystems" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "StarSystems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specie" "Specie" NOT NULL,
    "affiliation" "Affiliation" NOT NULL,
    "homePlanetId" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spaceship" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "passengerCapacity" INTEGER NOT NULL,

    CONSTRAINT "Spaceship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StarSystems_name_key" ON "StarSystems"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Spaceship_name_key" ON "Spaceship"("name");

-- AddForeignKey
ALTER TABLE "Planet" ADD CONSTRAINT "Planet_starSystemId_fkey" FOREIGN KEY ("starSystemId") REFERENCES "StarSystems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_homePlanetId_fkey" FOREIGN KEY ("homePlanetId") REFERENCES "Planet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
