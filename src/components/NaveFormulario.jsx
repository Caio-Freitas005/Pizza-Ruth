import { Container} from 'react-bootstrap';
import { Nav, Navbar } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Logo from '../assets/logo.png';

function NaveFormulario() {
    return (
      <Navbar expand="lg" bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/"></Navbar.Brand>
            <Nav className="mx-auto">
              <Nav.Link href="/">
                <Image src={Logo} width={160}/>
              </Nav.Link>
            </Nav>
        </Container>
      </Navbar>
    );
  }

export default NaveFormulario