const express = require("express");
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes/routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static("public"));

app.get("/", (req, res) => {
  res.json({
    message: "Spectra 2026 Backend 🚀",
  });
});

app.use("/api", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
