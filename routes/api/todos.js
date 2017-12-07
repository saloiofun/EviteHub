const router = require('express').Router()
const controller = require('../../controllers/todoController')

// Matches with "/api/todos"
router.route('/')
  .get(controller.findAllTodo)
  .post(controller.createTodo)

// Matches with "/api/todos/done"
router.route('/done')
  .get(controller.findDoneTodo)

// Matches with "/api/todos/undone"
router.route('/undone')
.get(controller.findUndoneTodo)

// Matches with "/api/todos/listed/:id"
router.route('/listed/:id')
.put(controller.updateTodo)
.delete(controller.removeTodo)

// Matches with "/api/todos/event/:id"
router.route('/event/:id')
.get(controller.findTodoByEvent)

module.exports = router
