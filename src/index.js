import app from "./app.js";
import mongoose from "mongoose";
import { PORT, dbUri, mongoUser, mongoPass } from "./utils/config.js";

//connect to mongodb atlas
mongoose
  .connect(dbUri, {
    user: mongoUser,
    pass: mongoPass,
    dbname: "techmart_db",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("successfully connected to database");
  })
  .catch((error) => {
    // if there was an error while trying to connect console log the error message
    console.log({ mongodb_error: error.message });
  });

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
