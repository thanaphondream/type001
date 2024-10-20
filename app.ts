import 'dotenv/config'
import express from "express";
import cors from "cors";
import router from './src/Router/router';
import markets from './src/Router/markets-roter'
import zone from './src/Router/zone-roter'
import lock from './src/Router/Lock-roter'
import boooking from './src/Router/Bookings-roter'

const app = express(); 

app.use(cors());

app.use(express.json());

app.use('/api', router)
app.use('/api', markets)
app.use('/api', zone)
app.use('/api', lock)
app.use('/api', boooking)



const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on post ${port}`));