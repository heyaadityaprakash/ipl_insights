require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

console.log("DB URL:", process.env.DATABASE_URL);

const prisma = new PrismaClient();

async function seedTeams() {
  const teamsDir = path.join(__dirname, '../data/teams/');
  const files = fs.readdirSync(teamsDir);

  for (const file of files) {
    const filePath = path.join(teamsDir, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const teamData = JSON.parse(raw);

    
    for(const team of teamData){
      const name=team.title
      const shortName=team.abbr
      const imgUrl=team.logo_url
    

    // console.log(teamData);
    // process.exit(0);

    

    if (!name) continue;

    await prisma.team.upsert({
      where: { name },
      update: {},
      create: { name, shortName, imgUrl },
    });
  }
}

  console.log('Teams seeded:', await prisma.team.count());
}

async function seedPlayers() {
  const squadsDir = path.join(__dirname, '../data/squads/');
  const files = fs.readdirSync(squadsDir);

  for (const file of files) {
    const raw = fs.readFileSync(path.join(squadsDir, file), 'utf-8');
    const dataArray = JSON.parse(raw); // ARRAY of object

    for (const entry of dataArray) {
      const teamName = entry.team?.title || entry.title;
      if (!teamName) continue;

      const team = await prisma.team.findUnique({
        where: { name: teamName },
      });

      if (!team) {
        console.warn(`Team not found: ${teamName}`);
        continue;
      }

      for (const p of entry.players || []) {
        const name = p.title;
        if (!name) continue;

        await prisma.player.upsert({
          where: {
            name_teamId: {
              name,
              teamId: team.id,
            },
          },
          update: {},
          create: {
            name,
            role: p.playing_role || null,
            battingStyle: p.batting_style || null,
            bowlingStyle: p.bowling_style || null,
            nationality: p.nationality || null,
            teamId: team.id,
          },
        });
      }
    }
  }

  console.log('Players seeded:', await prisma.player.count());
}



async function main() {
  // await seedTeams();
  await seedPlayers()
}

main()
  .catch((e) => {
    console.error('Error seeding teams:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
