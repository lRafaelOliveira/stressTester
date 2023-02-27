import os from 'os';
import process from 'process';

export function getSystemInfo() {
    const hostname = os.hostname();
    const platform = os.platform();
    const arch = os.arch();
    const cpus = os.cpus();
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const cpuUsage = process.cpuUsage();
    const uptime = process.uptime();
    const cpuUsagePercent = ((cpuUsage.user + cpuUsage.system) / (1000 * 1000 * uptime)) * 100;
    const memoryUsagePercent = ((totalMemory - freeMemory) / totalMemory) * 100;


    console.log(`Hostname: ${hostname}`);
    console.log(`Platform: ${platform}`);
    console.log(`Architecture: ${arch}`);
    console.log(`Number of CPUs: ${cpus.length}`);
    console.log(`Total memory: ${totalMemory} bytes`);
    console.log(`Free memory: ${freeMemory} bytes`);
    return { hostname, platform, arch, cpus: cpus.length, totalMemory, freeMemory, cpuUsagePercent, memoryUsagePercent }
}


