((taskControllerModule) => {
  const { Task } = require("../models");
  return (() => {
    taskControllerModule.getAllTask = async (req, res, next) => {
      try {
        const task = await Task.findAll();
        res.status(201).json({
          status: "success",
          task,
        });
      } catch (error) {
        console.log(error);
        res.status(404).json({
          status: error.message,
        });
      }
    };

    taskControllerModule.postTask = async (req, res, next) => {
      const { name, completed } = req.body;
      try {
        const task = await Task.create({ name, completed });
        res.status(201).json({
          status: "success",
          task,
        });
      } catch (error) {
        console.log(error);
        res.status(404).json({
          status: error.message,
        });
      }
    };
    taskControllerModule.deleteTask = async (req, res, next) => {
      const { id } = req.params;
      try {
        const task = await Task.destroy({ where: { id } });
        res.status(201).json({
          status: "successfully deleted",
        });
      } catch (error) {
        console.log(error);
        res.status(404).json({
          status: error.message,
        });
      }
    };
    taskControllerModule.updateTask = async (req, res, next) => {
      const { id } = req.params;
      const { name, completed } = req.body;
      try {
        const task = await Task.update({ name, completed }, { where: { id } });
        res.status(201).json({
          status: "success updated",
          task,
        });
      } catch (error) {
        console.log(error);
        res.status(404).json({
          status: error.message,
        });
      }
    };
  })();
})(module.exports);
