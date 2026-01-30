const prisma = require('../prisma');
const getPagination = require('../utils/pagination');

exports.getStandings = async (req, res, next) => {
  try {
    const season = parseInt(req.query.season || 2022);
    const { page, limit, skip } = getPagination(req.query);

    const standings = await prisma.standing.findMany({
      where: { season },
      orderBy: { points: 'desc' },
      include: { team: true },
      skip,
      take: limit,
    });

    res.json({ season, data: standings });
  } catch (err) {
    next(err);
  }
};
