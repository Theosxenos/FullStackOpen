class Logger {
    static info(...params) {
        console.log(...params);
    }

    static error(...params) {
        console.error(...params);
    }
}

export default Logger;
