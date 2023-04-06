import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

function Navbar () {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/tasks/new')
  }

  return (
    <AppBar position="static" color="transparent" sx={{ width: '100%' }}>
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          <Link to="/">PERN TODO APP</Link>
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClick}>
          New Task
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
