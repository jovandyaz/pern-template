import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'
// TODO: create Home, Login, etc. pages
import Menu from './components/Navbar'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'

// TODO: add theme provider
/* import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme'; // import your own custom theme here
import Navbar from './components/Navbar';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Navbar />
  </ThemeProvider>,
  document.getElementById('root')
); */

function App () {
  return (
    <BrowserRouter>
      <Menu />
      <Container>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/edit/:id" element={<TaskForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
