const express=require('express');
const router=express.Router()
const controller=require('../controllers/standingcontroller')
const prisma=require('../prisma')

/**
 * @openapi
 * /api/standings:
 *   get:
 *     summary: Get IPL standings
 *     parameters:
 *       - in: query
 *         name: season
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Points table
 */
router.get('/',controller.getStandings)

module.exports=router