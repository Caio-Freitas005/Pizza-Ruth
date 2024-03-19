import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import NaveFuncionario from "../components/NaveFuncionario";
import { Container, Row, Col } from "react-bootstrap";

function Funcionario() {
  const [pizzas, setPizza] = useState([]);
  const [breads, setBread] = useState([]);
  const [doces, setDoce] = useState([]);
  const [bebidas, setBebida] = useState([]);
  const [conta, setConta] = useState("");
  const navigate = useNavigate();

  function pizza() {
    fetch("http://localhost/api/pizzas")
      .then((response) => response.json())
      .then((json) => setPizza(json));
  }

  function breadstick() {
    fetch("http://localhost/api/breadsticks")
      .then((response) => response.json())
      .then((json) => setBread(json));
  }

  function doce() {
    fetch("http://localhost/api/doces")
      .then((response) => response.json())
      .then((json) => setDoce(json));
  }

  function bebida() {
    fetch("http://localhost/api/bebidas")
      .then((response) => response.json())
      .then((json) => setBebida(json));
  }

  function contas() {
    fetch("http://localhost/api/usuarios/")
      .then((response) => response.json())
      .then((json) => setConta(json));
  }

  function capPrimeiraLetra(frase) {
    return frase.charAt(0).toUpperCase() + frase.slice(1).toLowerCase();
  }

  useEffect(() => {
      pizza();
      breadstick();
      doce();
      bebida();
      contas();
  }, [navigate]);

  return (
    <div className="pink">
      <NaveFuncionario />
      <Container className="mt-5 d-flex justify-content-center flex-column">
        <Row>
          <h1>Pizzas</h1>
          {pizzas.map(
            (pizza, index) =>
              index < 4 && (
                <Col md="3" lg="3" key={pizza.id}>
                  <Card style={{ width: "17rem" }}>
                    <Card.Img
                      variant="top"
                      src={pizza.foto}
                      style={{ height: "13rem" }}
                    />
                    <Card.Body>
                      <Card.Title>{capPrimeiraLetra(pizza.sabor)}</Card.Title>
                      <Card.Text>R$ {pizza.valor}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              )
          )}
        </Row>
        <Row className="mt-4">
          <h1>Breadsticks</h1>
          {breads.map(
            (bread, index) =>
              index < 4 && (
                <Col md="3" key={bread.id}>
                  <Card style={{ width: "17rem" }}>
                    <Card.Img
                      variant="top"
                      src={bread.foto}
                      style={{ height: "13rem" }}
                    />
                    <Card.Body>
                      <Card.Title>{capPrimeiraLetra(bread.sabor)}</Card.Title>
                      <Card.Text>R$ {bread.valor}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              )
          )}
        </Row>
        <Row className="mt-4">
          <h1>Pizzas doce</h1>
          {doces.map(
            (doce, index) =>
              index < 4 && (
                <Col md="3" key={doce.id}>
                  <Card style={{ width: "17rem" }}>
                    <Card.Img
                      variant="top"
                      src={doce.foto}
                      style={{ height: "13rem" }}
                    />
                    <Card.Body>
                      <Card.Title>{capPrimeiraLetra(doce.sabor)}</Card.Title>
                      <Card.Text>R$ {doce.valor}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              )
          )}
        </Row>
        <Row className="mt-4">
          <h1>Bebidas</h1>
          {bebidas.map(
            (bebida, index) =>
              index < 4 && (
                <Col md="3" key={bebida.id}>
                  <Card style={{ width: "17rem" }}>
                    <Card.Img
                      variant="top"
                      src={bebida.foto}
                      style={{ height: "13rem" }}
                    />
                    <Card.Body>
                      <Card.Title>{capPrimeiraLetra(bebida.sabor)}</Card.Title>
                      <Card.Text>R$ {bebida.valor}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              )
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Funcionario;
