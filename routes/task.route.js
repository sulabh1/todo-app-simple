((taskRouteModule) => {
  const express = require("express");
  const {
    postTask,
    getAllTask,
    updateTask,
    deleteTask,
  } = require("../controllers/task.controller");
  return (() => {
    const router = express.Router();
    //console.log(getAllTask());
    router.route("/").post(postTask).get(getAllTask);
    router.route("/:id").put(updateTask).delete(deleteTask);

    taskRouteModule.taskRouter = router;
  })();
})(module.exports);
