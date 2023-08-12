/* eslint-disable import/extensions */
import Logger from './utils/Logger.js';
import app from './app.js';
import 'dotenv/config';

const PORT = 3001;
app.listen(PORT, () => {
    Logger.info(`Server running on port ${PORT}`);
});
