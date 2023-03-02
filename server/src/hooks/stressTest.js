import axios from 'axios';
import fs from "fs";
import path from "path"
import process from 'process';
import { info } from "../config/infoDates.js";
import os from 'os-utils';
import { url } from 'inspector';

let directory = "./src/storage/";
let filename = `${info.dia}-${info.mes}-${info.ano}-${info.hora}h-${info.minutos}m-${info.segundos}s.json`;


export async function stressTest(request, urls) {
    urls.forEach(async (url) => {
        await forRequest(url, request);
    });
    let data = {
        directory: directory,
        filename: filename,
        filepath: path.join(directory, filename),
    };
    return data;
}
async function forRequest(url, request) {
    console.log(url)
    const promises = [];
    for (let i = 1; i <= request; i++) {
        promises.push(makeRequests(url, i));
    }
    const responses = await Promise.all(promises);
    // Adicionar dados de uso da CPU e memória RAM a cada objeto de resposta
    responses.forEach((response) => {
        response.cpuUsage = os.cpuUsage();
        response.memUsage = (os.freemem() / os.totalmem()) * 100;
    });

    const filepath = path.join(directory, filename);
    fs.writeFileSync(filepath, JSON.stringify(responses));
    console.log("------------------------------------------");
    console.log(`REQUESTS FINALIZADO`);
    console.log("------------------------------------------");
}

async function makeRequests(url, n = 0) {
    let status = "" || 0;
    let responseTime = 0;
    const start = Date.now();
    try {
        const response = await axios.get(url);
        const end = Date.now();
        responseTime = (end - start) / 1000;
        status = response.status;
    } catch (err) {
        if (err.response && err.response.status) {
            status = err.response.status;
        } else if (err.code) {
            status = err.code;
        } else {
            console.log("------------------------------------------------------------------------------");
            console.log(err);
            console.log("------------------------------------------------------------------------------");
        }
        const end = Date.now();
        responseTime = (end - start) / 1000;
    }
    // Collect CPU and memory usage data
    const cpuUsage = await new Promise((resolve) => os.cpuUsage(resolve));
    const memUsage = (os.freemem() / os.totalmem()) * 100;

    return {
        request: n,
        status,
        responseTime,
        url,
        cpuUsage,
        memUsage,
    };
}
