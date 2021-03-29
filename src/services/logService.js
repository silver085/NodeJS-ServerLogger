import {optional} from "../lib/util";
import moment from "moment"

const fs = require('fs')
import config from "../config.json"

export function writeLog(logParams) {
    // eslint-disable-next-line no-undef
    return new Promise((resolve, reject) => {
        console.log("Write log request: " + JSON.stringify(logParams))
        try {
            let now = new Date()
            let filename = "LOG_" + moment(now).format('DD.MM.YYYY.HH') + ".log"
            if(!fs.existsSync(config.logPath)){
                reject ("Cannot access path " + config.logPath)
            } else{
                console.log("Path accessible")
            }

            console.log("Writing to: " + filename)
            let logStream = fs.createWriteStream(config.logPath + filename, {flags: 'a'})
            let buffer = optional(logParams.buffer, [])

            buffer.forEach((buf) => {
                let timeSt = moment(new Date()).format('HH:mm:ss:SSS')
                let logString = "[" + timeSt + "] " + "[" + buf.level + "] " + buf.string
                console.log(logString)
                logStream.write(logString + "\n")

            })
            logStream.end()
            resolve("OK")
        } catch (e) {
            reject(e)
        }
    })
}
