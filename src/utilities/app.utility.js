const fs = require('fs');
const os = require('os');
const readline = require('readline');

const appConstant = require('../constants/app.constant');

const getCurrentDateTime = () => {
    const now = new Date();

    const dd = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    const mm = now.getMonth() < 9 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1); //January is 0!
    const yyyy = now.getFullYear();

    const hh = now.getHours();
    const mi = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    const ss = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
    const ms = now.getMilliseconds();

    return dd + '-' + mm + '-' + yyyy + ' ' + hh + ':' + mi + ':' + ss + '.' + ms;
}

const getMemoryUsage = () => {
    const used = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const freemem = (os.freemem()).toFixed(2);  // bytes
    const totalmem = (os.totalmem()).toFixed(2);  // bytes
    console.log(used, freemem, totalmem);

    return used;
}

const writeToLog = () => {
    fs.appendFile(appConstant.access_log, getCurrentDateTime() + '\n', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

const readLog = () => {
    const obj = {};

    const rl = readline.createInterface({
        input: fs.createReadStream(appConstant.access_log),
        // output: process.stdout
    });

    rl.on('line', (line) => {
        // console.log(`Received: ${line}`);
        if (obj.hasOwnProperty(line)) {
            obj[line] = obj[line] + 1;
        } else {
            obj[line] = 1;
        }
    });

    rl.on('close', () => {
        console.log(obj);
    });
}

module.exports = {
    date: getCurrentDateTime,
    log: writeToLog,
    read_log: readLog
}