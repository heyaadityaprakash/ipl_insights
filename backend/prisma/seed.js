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


async function seedMatches() {
  const matchesDir = path.join(__dirname, '../data/matches');
  const files = fs.readdirSync(matchesDir);

  for (const file of files) {
    const raw = fs.readFileSync(path.join(matchesDir, file), 'utf-8');
    const matchesArray = JSON.parse(raw); 

    for (const m of matchesArray) {
      const team1Name = m.teama?.name;
      const team2Name = m.teamb?.name;

      if (!team1Name || !team2Name) continue;

      const team1 = await prisma.team.findUnique({ where: { name: team1Name } });
      const team2 = await prisma.team.findUnique({ where: { name: team2Name } });

      if (!team1 || !team2) continue;

      let winnerTeamId = null;
      if (m.winning_team_id) {
        if (m.winning_team_id === m.teama?.team_id) {
          winnerTeamId = team1.id;
        } else if (m.winning_team_id === m.teamb?.team_id) {
          winnerTeamId = team2.id;
        }
      }
      await prisma.match.create({
        data: {
          externalId: m.match_id,
          season: Number(m.competition?.season),
          matchDate: new Date(m.date_start_ist),
          venue: m.venue?.name || 'Unknown',
          team1Id: team1.id,
          team2Id: team2.id,
          winnerTeamId,
        },
      });
    }
  }

  console.log('Matches seeded:', await prisma.match.count());
}


async function seedBattingStats() {
  const dir = path.join(__dirname, '../data/batting_stats/');
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const json = JSON.parse(raw);

    const stats = json.response?.stats || [];

    for (const s of stats) {
      const playerName = s.player?.title;
      const teamName = s.team?.title;
      const season = Number(json.response?.season || 2022); // fallback

      if (!playerName || !teamName) continue;

      const player = await prisma.player.findFirst({
        where: { name: playerName },
      });

      const team = await prisma.team.findUnique({
        where: { name: teamName },
      });

      if (!player || !team) continue;

      await prisma.battingStat.upsert({
        where: {
          playerId_season: {
            playerId: player.id,
            season,
          },
        },
        update: {},
        create: {
          season,
          matches: s.matches,
          innings: s.innings,
          runs: s.runs,
          balls: s.balls,
          highest: s.highest,
          average: parseFloat(s.average),
          strikeRate: parseFloat(s.strike),
          fours: s.run4,
          sixes: s.run6,
          fifties: s.run50,
          hundreds: s.run100,
          notOuts: s.notout,
          playerId: player.id,
          teamId: team.id,
        },
      });
    }
  }

  console.log('Batting stats seeded:', await prisma.battingStat.count());
}

async function seedBowlingStats() {
  const dir = path.join(__dirname, '../data/bowling_stats/');
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const json = JSON.parse(raw);

    const stats = json.response?.stats || [];
    const season = Number(json.response?.season || 2022);

    for (const s of stats) {
      const playerName = s.player?.title;
      const teamName = s.team?.title;

      if (!playerName || !teamName) continue;

      const player = await prisma.player.findFirst({
        where: { name: playerName },
      });

      const team = await prisma.team.findUnique({
        where: { name: teamName },
      });

      if (!player || !team) continue;

      await prisma.bowlingStat.upsert({
        where: {
          playerId_season: {
            playerId: player.id,
            season,
          },
        },
        update: {},
        create: {
          season,
          matches: s.matches,
          innings: s.innings,
          wickets: s.wickets,
          runs: s.runs,
          balls: s.balls,
          overs: parseFloat(s.overs),
          average: parseFloat(s.average),
          economy: parseFloat(s.econ),
          strikeRate: parseFloat(s.strike),
          bestInning: s.bestinning,
          bestMatch: s.bestmatch,
          fourWkts: s.wicket4i,
          fiveWkts: s.wicket5i,
          playerId: player.id,
          teamId: team.id,
        },
      });
    }
  }

  console.log('Bowling stats seeded:', await prisma.bowlingStat.count());
}

async function seedStandings() {
  const dir = path.join(__dirname, '../data/standings/');
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const json = JSON.parse(raw);

    const rounds = json.standings || [];
    const season = 2022; // IPL 2022 (hardcode is fine here)

    for (const round of rounds) {
      const table = round.standings || [];

      for (const row of table) {
        const teamName = row.team?.title;
        if (!teamName) continue;

        const team = await prisma.team.findUnique({
          where: { name: teamName },
        });

        if (!team) continue;

        await prisma.standing.upsert({
          where: {
            teamId_season: {
              teamId: team.id,
              season,
            },
          },
          update: {},
          create: {
            season,
            played: parseInt(row.played),
            wins: parseInt(row.win),
            losses: parseInt(row.loss),
            draws: parseInt(row.draw),
            noResult: parseInt(row.nr),
            points: parseInt(row.points),
            netRunRate: parseFloat(row.netrr),
            teamId: team.id,
          },
        });
      }
    }
  }

  console.log('Standings seeded:', await prisma.standing.count());
}

async function main() {
  // await seedTeams();
  // await seedPlayers()
  // await seedMatches();
  // await seedBattingStats();
  // await seedBowlingStats();
  await seedStandings();
}

main()
  .catch((e) => {
    console.error('Error seeding teams:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
