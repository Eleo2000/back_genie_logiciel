const express = require('express')
const cors = require('cors');
const app = express()
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const connect_db_app = require('./Utils/db')
const ORIGIN = process.env.ORIGIN || 'http://12.0.0.1:3000'
const PORT = process.env.PORT || 8000


const clientRoutes = require('./routes/clientRoutes');
const livreRoutes= require('./routes/livreRoutes');
const recommandationRoutes= require('./routes/recommandationRoutes');
const loginRoutes=require('./routes/loginRoutes');

app.use('/api', clientRoutes);
app.use('/api', livreRoutes);
app.use('/api', recommandationRoutes);
app.use('/api',loginRoutes)




connect_db_app()

/* middlewares */
app.use(express.json())

app.get('/', function (req, res) {
   return res.send(`Salut grand maitre piera be sy maitre avoko !!! Mandray anao ny port ${PORT}`)
});

/* start server */
const server = app.listen(PORT);


console.log(`Server listing on port: ${PORT}`)