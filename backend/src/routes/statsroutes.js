const express=require('express')
const router=express.Router()
const controller=require('../controllers/statscontroller')

const prisma=require('../prisma')

/**
 * @openapi
 * /api/stats/batting/top:
 *   get:
 *     summary: Get top batting stats
 *     parameters:
 *       - in: query
 *         name: season
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Top batters
 */
router.get('/batting/top', controller.topBatting);

/**
 * @openapi
 * /api/stats/bowling/top:
 *   get:
 *     summary: Get top bowling stats
 *     parameters:
 *       - in: query
 *         name: season
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Top bowlers
 */
router.get('/bowling/top', controller.topBowling);

module.exports=router