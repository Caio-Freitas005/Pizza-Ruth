import { Container, Row, Col } from 'react-bootstrap';
import { Nav, Navbar } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image';
import Logo from '../assets/logo.png';


function Nave() {
    return (
      <Navbar expand="lg" bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/"></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">
                <Image src={Logo} width={160}/>
              </Nav.Link>
            </Nav>
              <Row>
                <Col xs="auto">
                  <Button href="/login" type="submit" variant='danger'>Entrar</Button>
                </Col>
                <Col xs="auto">
                  <Button href="/cadastro" type="submit" variant='danger'>Criar conta</Button>
                </Col>
              </Row>
          </Navbar.Collapse>  
        </Container>
      </Navbar>
    );
  }

export default Nave