const prisma = require('../prisma');
const getPagination = require('../utils/pagination');

exports.topBatting = async (req, res, next) => {
  try {
    const season = parseInt(req.query.season || 2022);
    const { page, limit, skip } = getPagination(req.query);

    const data = await prisma.battingStat.findMany({
      where: { season },
      orderBy: { runs: 'desc' },
      skip,
      take: limit,
      include: { player: true, team: true },
    });

    res.json({ season, page, limit, data });
  } catch (err) {
    next(err);
  }
};

exports.topBowling = async (req, res, next) => {
  try {
    const season = parseInt(req.query.season || 2022);
    const { page, limit, skip } = getPagination(req.query);

    const data = await prisma.bowlingStat.findMany({
      where: { season },
      orderBy: { wickets: 'desc' },
      skip,
      take: limit,
      include: { player: true, team: true },
    });

    res.json({ season, page, limit, data });
  } catch (err) {
    next(err);
  }
};
