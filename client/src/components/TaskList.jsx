import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function TaskList () {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchTasks = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:4000/tasks')
      const data = await response.json()
      if (data) {
        // TODO: handle empty array
        setIsLoading(false)
        setTasks(data) // TODO: sort by date or priority, etc.
      }
    } catch (error) {
      console.log('🚀 ~ file: TaskList.jsx:26 ~ fetchTasks ~ error:', error)
    }
  }

  const deleteTask = async (id) => {
    // TODO: implement optimistic update using Redux Toolkit or another alternative
    setIsLoading(true)
    try {
      const response = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: 'DELETE'
      })
      // TODO: improve and encapsulate this error handler
      if (response.status === 204) {
        setIsLoading(false)
        // setTasks(tasks.filter((task) => task.id !== id)); // why this does work?
        fetchTasks()
      } else {
        setIsLoading(false)
        alert('Error deleting task')
      }
    } catch (error) {
      console.log('🚀 ~ file: TaskList.jsx:38 ~ deleteTask ~ error:', error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <>
      <h1>Tasks</h1>
      {isLoading
        ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px'
            }}
          >
            <CircularProgress />
          </Box>
          )
        : (
            !tasks.length
              ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '200px'
                }}
              >
                <Typography variant="h5">No tasks yet</Typography>
              </Box>
                )
              : tasks.map((task, index) => (
            <Card key={index} sx={{ mb: 2, bgcolor: '#c5c6c7' }}>
              <CardContent
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Box>
                  <Typography variant="h5">{task.title}</Typography>
                  <Typography variant="body1" sx={{ marginTop: '10px' }}>
                    {task.description}
                  </Typography>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/tasks/edit/${task.id}`)}
                    sx={{ mt: 2 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => deleteTask(task.id)}
                    sx={{ mt: 2, ml: 2 }}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
              ))
          )}
    </>
  )
}

export default TaskList
