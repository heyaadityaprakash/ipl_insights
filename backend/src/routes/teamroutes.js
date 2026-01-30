const express=require('express')
const router=express.Router()
const controller=require('../controllers/teamcontroller')
const prisma=require('../prisma')


/**
 * @openapi
 * /teams:
 *   get:
 *     summary: Get all IPL teams
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of teams
 */

router.get('/',controller.getTeams)

/**
 * @openapi
 * /teams/{id}/overview:
 *   get:
 *     summary: Get team overview (batting, bowling, standings)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: season
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Team overview
 */
router.get('/:id/overview',controller.getTeamOverview)

module.exports=router