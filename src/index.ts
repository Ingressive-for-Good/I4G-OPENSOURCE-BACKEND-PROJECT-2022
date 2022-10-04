import app from "./app";
import { logger } from "./helpers/logger";

import { PORT } from "./utils/config";

app.listen(PORT, () => logger.info(`server running on PORT ${PORT}`));
