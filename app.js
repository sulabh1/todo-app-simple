((appModule) => {
  const express = require("express");
  const cors = require("cors");
  const { taskRouter } = require("./routes/task.route");
  return (() => {
    const app = express();
    app.use(cors());
    app.options("*", cors());

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use((req, res, next) => {
      //req.debugId = v4();
      req.ipAddress =
        req.header("x-forwarded-for") || req.connection.remoteAddress;
      req.device = req.header("user-agent") || "";
      next();
    });
    app.use("/api/v1/task", taskRouter);

    app.all("*", (req, res, next) => {
      res.status(500).json({
        status: `can't get this ${req.originalUrl} on this server`,
      });
    });

    appModule.app = app;
  })();
})(module.exports);
