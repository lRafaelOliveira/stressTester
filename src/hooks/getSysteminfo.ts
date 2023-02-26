import si from 'systeminformation';
const dotenv = require('dotenv')
export function getSystemInfo(): any {
    let objeto = {
        cpu: 0,
        memoria: 0,
        disco: 0
    }
    si.currentLoad().then((data) => {
        console.log(data)
    });
    return objeto
}