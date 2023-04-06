import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

function TaskForm () {
  const navigate = useNavigate()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [task, setTask] = useState({
    title: '',
    description: ''
  })

  const createTask = async () => {
    try {
      const response = await fetch('http://localhost:4000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
      const data = await response.json()
      if (data) {
        // TODO: implement a error handler
        setIsLoading(false)
        navigate('/')
      }
    } catch (error) {
      console.log('🚀 ~ file: TaskForm.jsx:33 ~ createTask ~ error:', error)
    }
  }

  const updateTask = async () => {
    try {
      const response = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
      const data = await response.json()
      if (data) {
        setIsLoading(false)
        setIsEditing(false)
        navigate('/')
      }
    } catch (error) {
      setIsLoading(false)
      setIsEditing(false)
      console.log('🚀 ~ file: TaskForm.jsx:50 ~ updateTask ~ error:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (isEditing) {
      await updateTask()
    } else {
      await createTask()
    }
  }

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    })
  }

  const getTask = async () => {
    setIsLoading(true)
    const response = await fetch(`http://localhost:4000/tasks/${id}`)
    const data = await response.json()
    if (data) {
      setIsLoading(false)
      setIsEditing(true)
      setTask(data)
    }
  }

  const resetTask = () => {
    setTask({
      title: '',
      description: ''
    })
  }

  useEffect(() => {
    if (id) {
      getTask()
      setIsEditing(true)
    } else {
      setIsEditing(false)
      resetTask()
    }
  }, [id])

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{
            mt: 5,
            p: 3,
            background: '#8a8c8e',
            padding: '1rem',
            '& > button': { m: 1 }
          }}
        >
          <Typography variant="h5" color="white">
            {`${isEditing ? 'Edit' : 'Create'} Task`}
          </Typography>
          <CardContent>
            {/* // TODO: Use a form library like Formik or React Hook Form} */}
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Title"
                fullWidth
                value={task.title}
                name="title"
                onChange={handleChange}
                inputProps={{ sx: { color: 'whitesmoke' } }}
                InputLabelProps={{ sx: { color: 'whitesmoke' } }}
                sx={{ margin: '.5rem 0' }}
              />
              <TextField
                variant="filled"
                label="Description"
                multiline
                rows={4}
                fullWidth
                value={task.description}
                name="description"
                onChange={handleChange}
                inputProps={{ sx: { color: 'whitesmoke' } }}
                InputLabelProps={{ sx: { color: 'whitesmoke' } }}
                sx={{ margin: '.5rem 0' }}
              />
              <LoadingButton
                size="medium"
                color="primary"
                type="submit"
                loading={isLoading}
                variant="contained"
                disabled={!task.title || !task.description}
              >
                <span>Save</span>
              </LoadingButton>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TaskForm
