import mongoose, {ConnectOptions} from "mongoose";

import app from "./app";
import { logger } from "./helpers/logger";
import { PORT } from "./utils/config";
import { dbUri } from "./utils/config";

mongoose.connect(dbUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
} as ConnectOptions).then( () => {
    logger.info("connected to the database successfully")
} ).catch( (err) => {
    logger.info(err)
} )

app.listen(PORT, () => logger.info(`server running on PORT ${PORT}`));
