import { Container, Row, Col } from "react-bootstrap";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import { InputGroup } from "react-bootstrap";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Logo from "../assets/logo.png";

function NaveLogada(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [produto, setProduto] = useState("");
  const [produto2, setProduto2] = useState("");
  const [produto3, setProduto3] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [vl1, setVl1] = useState(0);
  const [vl2, setVl2] = useState(0);
  const [vl3, setVl3] = useState(0);
  const [qtd, setQtd] = useState(0);
  const [qtd2, setQtd2] = useState(0);
  const [qtd3, setQtd3] = useState(0);
  const [cliente, setCliente] = useState("");

  const addPedido = async (e) => {
    e.preventDefault();

    const dados = new FormData();
    dados.append("produto", produto);
    dados.append("produto2", produto2);
    dados.append("produto3", produto3);
    dados.append("qtd", qtd);
    dados.append("qtd2", qtd2);
    dados.append("qtd3", qtd3);
    dados.append("cliente", cliente);
    dados.append("vl1", vl1);
    dados.append("vl2", vl2);
    dados.append("vl3", vl3);

    try {
      const response = await axios.post(
        "http://localhost/api/cadastrarPedidos",
        dados
      );
      const dado = response.data;
      alert(dado);
    } catch (error) {
      console.log(error);
    }
  };

  function prd() {
    fetch("http://localhost/api/produtos")
      .then((response) => response.json())
      .then((json) => {
        setProdutos(json);
      });
  }

  function capPrimeiraLetra(frase) {
    return frase.charAt(0).toUpperCase() + frase.slice(1).toLowerCase();
  }

  useEffect(() => {
    prd();
  }, []);

  return (
    <Navbar expand="lg" bg="light" data-bs-theme="light">
      <Container className="d-flex flex-row">
        <Navbar.Brand href="/"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          className="justify-content-center"
          id="basic-navbar-nav"
        >
          <Row className="align-items-center">
            <Col xs="auto">
              <Nav className="me-auto">
                <Nav.Link href="/">
                  <Image src={Logo} width={160} />
                </Nav.Link>
              </Nav>
            </Col>
            <Col xs="auto">
              <Nav className="me-auto">
                <Nav.Link href="/inicio">Início</Nav.Link>
              </Nav>
            </Col>
            <Col xs="auto">
              <Nav className="me-auto">
                <Nav.Link href="/cardapio">Cardápio</Nav.Link>
              </Nav>
            </Col>
          </Row>
          <Row style={{ marginLeft: "1vw" }}>
            <Col xs="auto">
              <Nav>
                <Nav.Link onClick={handleShow}>Pedir</Nav.Link>
                <Modal
                  {...props}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  show={show}
                  onHide={handleClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Pedir produto(s)</Modal.Title>
                  </Modal.Header>
                  <Form onSubmit={(e) => addPedido(e)}>
                    <Form.Group
                      as={Row}
                      className="mb-3 d-flex justify-content-center"
                    >
                      <Col xs="10" md="9" sm="8">
                        <Form.Label>Email (para verificação)</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Digite seu email"
                          name="sabor"
                          onChange={(e) =>
                            setCliente(e.target.value.toUpperCase())
                          }
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3 d-flex justify-content-center"
                    >
                      <Col xs="10" md="3" sm="8">
                        <Form.Label>1° produto</Form.Label>
                        <Form.Select
                          aria-label="Selecione o produto"
                          onChange={(e) => {
                            const selectedProduto =
                              e.target.value.toUpperCase();
                            setProduto(selectedProduto);

                            const selectedProductData = produtos.find(
                              (prod) => prod.sabor === selectedProduto
                            );

                            if (selectedProductData) {
                              setVl1(selectedProductData.valor);
                            }
                          }}
                        >
                          <option>SELECIONE</option>
                          {produtos.map((prod) => (
                            <option key={prod.id}>
                              {capPrimeiraLetra(prod.sabor)}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col xs="10" md="3" sm="8">
                        <Form.Label>Valor</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Valor"
                          name="valor"
                          value={vl1}
                        />
                      </Col>
                      <Col xs="10" md="3" sm="8">
                        <Form.Label>Quantidade</Form.Label>
                        <InputGroup type="number">
                          <Button
                            variant="outline-secondary"
                            onClick={() =>
                              setQtd(Math.max(0, parseInt(qtd) - 1))
                            }
                          >
                            -
                          </Button>
                          <Form.Control
                            type="number"
                            placeholder="Quantidade desejada"
                            name="produto"
                            value={qtd}
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={() => setQtd(parseInt(qtd) + 1)}
                          >
                            +
                          </Button>
                        </InputGroup>
                      </Col>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      className="mb-3 d-flex justify-content-center"
                    >
                      <Col xs="10" md="3" sm="8">
                        <Form.Label>2° produto</Form.Label>
                        <Form.Select
                          aria-label="Selecione o produto"
                          onChange={(e) => {
                            const selectedProduto2 =
                              e.target.value.toUpperCase();
                            setProduto2(selectedProduto2);

                            const selectedProductData2 = produtos.find(
                              (prod) => prod.sabor === selectedProduto2
                            );

                            if (selectedProductData2) {
                              setVl2(selectedProductData2.valor);
                            }
                          }}
                        >
                          <option>SELECIONE</option>
                          {produtos.map((prod) => (
                            <option key={prod.id}>
                              {capPrimeiraLetra(prod.sabor)}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col xs="10" md="3" sm="8">
                        <Form.Label>Valor</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Valor"
                          name="valor"
                          value={vl2}
                        />
                      </Col>
                      <Col xs="10" md="3" sm="8">
                        <Form.Label>Quantidade</Form.Label>
                        <InputGroup type="number">
                          <Button
                            variant="outline-secondary"
                            onClick={() =>
                              setQtd2(Math.max(0, parseInt(qtd2) - 1))
                            }
                          >
                            -
                          </Button>
                          <Form.Control
                            type="number"
                            placeholder="Quantidade desejada"
                            name="produto"
                            value={qtd2}
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={() => setQtd2(parseInt(qtd2) + 1)}
                          >
                            +
                          </Button>
                        </InputGroup>
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3 d-flex justify-content-center"
                    >
                      <Col xs="10" md="3" sm="8">
                        <Form.Label>3° produto</Form.Label>
                        <Form.Select
                          aria-label="Selecione o produto"
                          onChange={(e) => {
                            const selectedProduto3 =
                              e.target.value.toUpperCase();
                            setProduto3(selectedProduto3);

                            const selectedProductData3 = produtos.find(
                              (prod) => prod.sabor === selectedProduto3
                            );

                            if (selectedProductData3) {
                              setVl3(selectedProductData3.valor);
                            }
                          }}
                        >
                          <option>SELECIONE</option>
                          {produtos.map((prod) => (
                            <option key={prod.id}>
                              {capPrimeiraLetra(prod.sabor)}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col xs="10" md="3" sm="8">
                        <Form.Label>Valor</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Valor"
                          name="valor"
                          value={vl3}
                        />
                      </Col>
                      <Col xs="10" md="3" sm="8">
                        <Form.Label>Quantidade</Form.Label>
                        <InputGroup type="number">
                          <Button
                            variant="outline-secondary"
                            onClick={() =>
                              setQtd3(Math.max(0, parseInt(qtd3) - 1))
                            }
                          >
                            -
                          </Button>
                          <Form.Control
                            type="number"
                            placeholder="Quantidade desejada"
                            name="produto"
                            value={qtd3}
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={() => setQtd3(parseInt(qtd3) + 1)}
                          >
                            +
                          </Button>
                        </InputGroup>
                      </Col>
                    </Form.Group>
                    <Modal.Footer>
                      <p className="me-5 justify-self-start">
                        Valor total: R$ {vl1 * qtd + vl2 * qtd2 + vl3 * qtd3},00
                      </p>
                      <Button variant="secondary" onClick={handleClose}>
                        Fechar
                      </Button>
                      <Button
                        type="submit"
                        variant="danger"
                        onClick={handleClose}
                      >
                        Finalizar pedido
                      </Button>
                    </Modal.Footer>
                  </Form>
                </Modal>
              </Nav>
            </Col>
            <Col xs="auto" className="justify-content-end">
              <Nav>
                <NavDropdown id="nav-dropdown" title="Conta">
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

export default NaveLogada;
