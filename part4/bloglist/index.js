/* eslint-disable import/extensions */
import logger from './utils/Logger.js';
import app from './app.js';

const PORT = 3001;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
