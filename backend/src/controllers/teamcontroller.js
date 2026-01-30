const prisma = require('../prisma');
const getPagination = require('../utils/pagination');

exports.getTeams = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);

    const teams = await prisma.team.findMany({
      skip,
      take: limit,
    });

    const total = await prisma.team.count();

    res.json({
      page,
      limit,
      total,
      data: teams,
    });
  } catch (err) {
    next(err);
  }
};

exports.getTeamOverview = async (req, res, next) => {
  try {
    const teamId = parseInt(req.params.id);
    const season = parseInt(req.query.season || 2022);

    if (isNaN(teamId)) {
      return res.status(400).json({ error: 'Invalid team id' });
    }

    const team = await prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    const batting = await prisma.battingStat.findMany({
      where: { teamId, season },
      orderBy: { runs: 'desc' },
      take: 5,
      include: { player: true },
    });

    const bowling = await prisma.bowlingStat.findMany({
      where: { teamId, season },
      orderBy: { wickets: 'desc' },
      take: 5,
      include: { player: true },
    });

    const standing = await prisma.standing.findFirst({
      where: { teamId, season },
    });

    res.json({
      team,
      battingLeaders: batting,
      bowlingLeaders: bowling,
      standing,
    });
  } catch (err) {
    next(err);
  }
};
