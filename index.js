import { setupServer } from "./src/server.js";
import { initMongoConnection } from "./src/db/initMongoConnection.js";
import { createDirIfNotExists } from "./src/utils/createDirIfNotExists.js";
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from "./src/constants/index.js";

const bootstrap = async () => {
    await initMongoConnection();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR)
    setupServer()
}

bootstrap()