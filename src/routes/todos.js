const express = require("express")
const router = express.Router()

const { todosControllers } = require("../controllers")

router.get("/", todosControllers.getAllTodos)
router.get("/:id", todosControllers.getTodoById)
router.post("/", todosControllers.createNewTodos)
router.patch("/:id", todosControllers.editTodoById)
router.delete("/:id", todosControllers.deleteTodoById)



module.exports = router