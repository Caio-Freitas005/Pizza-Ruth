import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import NaveLogada from "../components/NaveLogada";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";

function Cardapio() {
  const [pizzas, setPizza] = useState([]);
  const [breads, setBread] = useState([]);
  const [doces, setDoce] = useState([]);
  const [bebidas, setBebida] = useState([]);
  const [conta, setConta] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeButton, setActiveButton] = useState("btn-pizza");
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

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  return (
    <div className="pink">
      <NaveLogada />
      <Container className="mt-5 d-flex justify-content-center flex-column">
        <Row className="me-auto">
          <Col md="4" xs="4" lg="4" xl="4" xxl="4">
            <Button
              className="btn-cardapio btn-danger"
              id="btn-pizza"
              onClick={() => handleButtonClick("btn-pizza")}
            >
              Pizzas
            </Button>
          </Col>
          <Col md="4" lg="4" xs="4" xl="4" xxl="4">
            <Button
              className="btn-cardapio btn-danger"
              id="btn-breadstick"
              onClick={() => handleButtonClick("btn-breadstick")}
            >
              Breadsticks
            </Button>
          </Col>
          <Col md="4" lg="4" xs="4" xl="4" xxl="4">
            <Button
              className="btn-cardapio btn-danger"
              id="btn-doce"
              onClick={() => handleButtonClick("btn-doce")}
            >
              Pizzas Doce
            </Button>
          </Col>
          <Col md="4" lg="4" xs="4" xl="4" xxl="4">
            <Button
              className="btn-cardapio mt-5 btn-danger"
              id="btn-bebidas"
              onClick={() => handleButtonClick("btn-bebidas")}
            >
              Bebidas
            </Button>
          </Col>
        </Row>
        {activeButton === "btn-pizza" && (
          <Row className="mt-4">
            <h1>Pizzas</h1>
            {pizzas.map((pizza) => (
              <Col md="3" key={pizza.id}>
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
            ))}
          </Row>
        )}

        {activeButton === "btn-breadstick" && (
          <Row className="mt-4">
            <h1>Breadsticks</h1>
            {breads.map((bread) => (
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
            ))}
          </Row>
        )}

        {activeButton === "btn-doce" && (
          <Row className="mt-4">
            <h1>Pizzas Doce</h1>
            {doces.map((doce) => (
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
            ))}
          </Row>
        )}
        {activeButton === "btn-bebidas" && (
          <Row className="mt-4">
            <h1>Bebidas</h1>
            {bebidas.map((bebida) => (
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
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Cardapio;
