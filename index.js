import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import { connectdb } from './config/db.js';
import authRouter from './Routes/authRoute.js'

//configure env
dotenv.config();
//connect to the database
connectdb();

const port = process.env.PORT || 5000;

const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth', authRouter)

app.listen(port, () => console.log(`Server listening on PORT ${port}`));
