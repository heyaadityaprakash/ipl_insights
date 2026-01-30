const express = require('express');
const cors=require('cors')

const errorMiddleware = require('./middlewares/error');

//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

//routes
const teamRoutes=require('./routes/teamroutes')
const statsRoutes=require('./routes/statsroutes')
const standingRoutes=require('./routes/standingroutes')
const healthRoutes = require('./routes/healthroutes');




const app = express();
// middleware
app.use(cors())
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/health', healthRoutes);
app.use(errorMiddleware)


app.use('/api/teams', teamRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/standings', standingRoutes);

// routes
app.get('/', (req, res) => {
  res.send('Server is running');
});



module.exports = app;
