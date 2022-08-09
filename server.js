import { connectToServer } from "./src/services/db.service.js";
import app from "./src/app.js";

const PORT = process.env.PORT || 3000;

connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
