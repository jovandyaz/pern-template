const pool = require('../db')

// TODO: Implement valitation using Yup or Joi or express-validator or...
// TODO: Improve handler for errors using app.use middleware

const getAllTasks = async (req, res, netx) => {
  try {
    const result = await pool.query('SELECT * FROM tasks')
    res.send(result.rows)
  } catch (error) {
    console.error('🚀 ~ error:', error.message)
    netx(error)
  }
}

const getTask = async (req, res, netx) => {
  try {
    const { id } = req.params // validate id as a number
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.send(result.rows[0])
  } catch (error) {
    console.error('🚀 ~ error:', error.message)
    netx(error)
  }
}

const createTask = async (req, res, netx) => {
  try {
    const { title, description } = req.body
    const result = await pool.query(
      'INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *',
      [title, description, 'Pending']
    )
    res.send(result.rows[0])
  } catch (error) {
    console.error('🚀 ~ error:', error.message)
    // duplicate key value violates unique constraint "tasks_title_key"
    netx(error)
  }
}

const deleteTask = async (req, res, netx) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id])
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.sendStatus(204)
  } catch (error) {
    console.error('🚀 ~ error:', error.message)
    netx(error)
  }
}

const updateTask = async (req, res, netx) => {
  try {
    const { id } = req.params
    const { title, description } = req.body
    console.log(id, title, description)
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, id]
    )
    if (result.rows.length === 0) { // move this to utils fns
      return res.status(404).json({ message: 'Task not found' })
    }
    res.send(result.rows[0])
  } catch (error) {
    // handle null value in column "title" of relation "tasks" violates not-null constraint
    console.error('🚀 ~ error:', error.message)
    netx(error)
  }
}

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask
}
