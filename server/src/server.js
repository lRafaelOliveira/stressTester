import express from 'express';
import cors from 'cors';
import { getSystemInfo } from './hooks/getinfo.js';
import { stressTest } from './hooks/stress.js';
import { listarArquivosPorDataDeCriacao } from './hooks/listRequests.js';

const app = express();
const corsOptions = {
    origin: "http://localhost:5173"
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.json({ code: 200, message: "Sucesso" });
});
app.get('/getInfos', (req, res) => {
    let data = getSystemInfo();
    res.json({ code: 200, message: "Sucesso", data });
});

app.get('/stress', async (req, res) => {
    let links = req?.query?.links
    let countRequests = req?.query?.countRequests ?? 1
    if (!links) {
        res.json({ code: 404, message: "Sucesso" });
        return
    }
    links = links.split(';')
    let data = await stressTest(countRequests, links)
    res.json({ code: 200, message: "Sucesso", data });
});

app.get('/getRequests', async (req, res) => {
    let data = await listarArquivosPorDataDeCriacao()
    res.json({ code: 200, message: "Sucesso", data });
});
app.listen(3000, () => {
    console.log('Server running on port 3000');
});