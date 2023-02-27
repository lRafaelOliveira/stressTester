import express from 'express';
import cors from 'cors';
import { getSystemInfo } from './hooks/getinfo.js';
import { stressTest } from './hooks/stress.js';

const app = express();
const corsOptions = {
    origin: "localhost"
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.json({ code: 200, message: "Sucesso" });
});
app.get('/getInfos', (req, res) => {
    let data = getSystemInfo();
    res.json({ code: 200, message: "Sucesso" ,data});
});

app.get('/stress', async (req, res) => {
    let data = await stressTest(10,['http://www.google.com'])
    res.json({ code: 200, message: "Sucesso" ,data});
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});