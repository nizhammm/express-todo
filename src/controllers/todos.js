const { todosDB } = require("../database")
const { nanoid } = require("nanoid")

const todosControllers = {
    getAllTodos: (req, res) => {
        if (!todosDB.length) {
            res.status(404).json({
                message: "No todos found!"
            })
            return
        }

        res.status(200).json({
            message: "Todos found",
            result: todosDB
        })
    },
    getTodoById: (req, res) => {
        const todosId = req.params.id

        const findIndex = todosDB.findIndex(val => {
            return val.id == todosId
        })

        if (findIndex == -1) {
            res.status(404).json({
                message: "Todos not found!"
            })
            return
        }

        const foundTodos = todosDB[findIndex]

        res.status(200).json({
            message: "Todos found",
            result: foundTodos
        })
    },
    createNewTodos: (req, res) => {
        const newTodoData = req.body

        if (!newTodoData) {
            res.status(400).json({
                message: "Todo data is required!"
            })
            return
        }

        newTodoData.id = nanoid()

        todosDB.push(newTodoData)

        res.status(201).json({
            message: "Todo Created",
            result: newTodoData
        })
    },
    editTodoById: (req, res) => {
        const todoId = req.params.id
        const editTodoData = req.body

        const findIndex = todosDB.findIndex(val => {
            return val.id == todoId
        })

        if (findIndex == -1) {
            res.status(404).json({
                message: "Todo not found!"
            })
            return
        }

        todosDB[findIndex] = {
            ...todosDB[findIndex],
            ...editTodoData
        }

        res.status(200).json({
            message: "Todo edited",
            result: todosDB[findIndex]
        })
    },
    deleteTodoById: (req, res) => {
        const todoId = req.params.id

        const findIndex = todosDB.findIndex(val => {
            return val.id == todoId
        })

        if (findIndex == -1) {
            res.status(404).json({
                message: "Todo not found!"
            })
            return
        }

        todosDB.splice(findIndex, 1)

        res.status(200).json({
            message: "Todo deleted"
        })
    }
}

module.exports = todosControllers