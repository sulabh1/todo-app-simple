(() => {
  const http = require("http");
  const { sequelize } = require("./models");
  const { app } = require("./app");
  return (() => {
    //     console.log(app);
    const port = 5000;
    new Promise((resolve) => {
      const server = http.createServer(app);
      resolve(server.listen(port));
    })
      .then(() => {
        console.log(`listening to the port ${port}`);
      })
      .catch((err) => {
        console.log(err);
        process.exit(0);
      });

    new Promise((resolve) => {
      resolve(sequelize.authenticate());
    })
      .then(() => {
        console.log("db connected successful");
      })
      .catch((err) => {
        console.log(err);
      });
  })();
})();
