import axios from 'axios';
import fs from "fs";
import path from "path"
import { info } from "../config/infoDates.js";

class TesteCarga {
    constructor(urls, request) {
        this.urls = urls;
        this.requests = parseInt(request);
        this.directory = "./src/storage/";
        this.filename = `${info.dia}-${info.mes}-${info.ano}-${info.hora}h-${info.minutos}m.json`;
    }

    async run() {
        this.urls.forEach(async (url) => {
            await this.forRequest(url, this.requestss);
        });
        let data = {
            directory: this.directory,
            filename: this.filename,
            filepath: path.join(this.directory, this.filename),
        };
        return data;
    }

    async forRequest(url, number) {
        const promises = [];
        for (let i = 0; i < this.requests; i++) {
            //console.log(`request: ${i}`);
            promises.push(this.makeRequests(url, i));
        }
        const responses = await Promise.all(promises);
        const filepath = path.join(this.directory, this.filename);
        fs.writeFileSync(filepath, JSON.stringify(responses));
        // console.log("------------------------------------------");
        // console.log(`REQUESTS FINALIZADO`);
        // console.log("------------------------------------------");
    }

    async makeRequests(url, n = 0) {
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
                console.log(
                    "------------------------------------------------------------------------------"
                );
                console.log(err);
                console.log(
                    "------------------------------------------------------------------------------"
                );
            }
            const end = Date.now();
            responseTime = (end - start) / 1000;
        }
        return {
            request: n,
            status,
            responseTime,
            url,
        };
    }
}

module.exports = { TesteCarga };
