const express = require("express");
const router = express.Router();
const addLogger = require("../utils/logger.js");

router.get("/loggerTest", (req, res) => {
  req.logger.error("Ocurrió un error");
  req.logger.warning("Alerta");
  req.logger.info("El código se está ejecutanto");

  res.send("Logs generados");
});

module.exports = router;
