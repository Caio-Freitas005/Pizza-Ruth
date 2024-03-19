import { Container, Row, Col } from 'react-bootstrap';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Logo from '../assets/logo.png';


function NaveFuncionario() {
    return (
        <Navbar expand="lg" bg="light" data-bs-theme="light">
            <Container className='d-flex flex-row'>
                <Navbar.Brand href="/"></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className='justify-content-center' id="basic-navbar-nav">
                    <Row className='align-items-center'>
                        <Col xs="auto">
                            <Nav className="me-auto">
                                <Nav.Link href="/">
                                    <Image src={Logo} width={160} />
                                </Nav.Link>
                            </Nav>
                        </Col>
                        <Col xs="auto" >
                            <Nav className="me-auto">
                                <Nav.Link href="/funcionario">Início</Nav.Link>
                            </Nav>
                        </Col>
                        <Col xs="auto">
                            <Nav className="me-auto">
                                <Nav.Link href="/cardapiof">Cardápio</Nav.Link>
                            </Nav>
                        </Col>

                    </Row>
                    <Row style={{ marginLeft: '1vw' }}>
                        <Col xs="auto">
                            <Nav>
                                <Nav.Link href="/adicionarProduto">Adicionar produtos</Nav.Link>
                            </Nav>
                        </Col>
                        <Col xs="auto" className='justify-content-end'>
                            <Nav>
                                <NavDropdown
                                    id="nav-dropdown"
                                    title="Conta"
                                >
                                    <NavDropdown.Item href="/pedidos">Pedidos</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/cadastrarCliente">Cadastrar clientes</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/">Sair</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Col>
                    </Row>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NaveFuncionario;