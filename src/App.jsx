import 'bootstrap/dist/css/bootstrap.min.css'

import NavBar from './components/NavBar'
import Pathfinder from './Pathfinder/Pathfinder'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function App() {
  return (
    <>
      <NavBar />
      <Container fluid className="text-center my-2">
        <Row>
          <Col>
            <Pathfinder />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
