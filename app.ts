import 'dotenv/config'
import express from "express";
import cors from "cors";
import router from './src/Router/router';
import markets from './src/Router/markets-roter'

const app = express(); 

app.use(cors());

app.use(express.json());

app.use('/api', router)
app.use('/api', markets)



const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on post ${port}`));