import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import NaveFuncionario from "../components/NaveFuncionario";
import { Container, Row, Col } from "react-bootstrap";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);

  function ped() {
    fetch("http://localhost/api/pedidos")
      .then((response) => response.json())
      .then((json) => setPedidos(json));
  }

  function handlePedido() {
    alert("Pedido efetuado com sucesso!");
  }

  function capPrimeiraLetra(frase) {
    return frase.charAt(0).toUpperCase() + frase.slice(1).toLowerCase();
  }

  useEffect(() => {
    ped();
  }, []);

  return (
    <div className="pink">
      <NaveFuncionario />
      <Container className="mt-5 d-flex justify-content-center flex-column">
        <Row>
          <h1>Pedidos</h1>
          {pedidos.map((pedido) => (
            <Col md="3" lg="3" key={pedido.id}>
              <Card style={{ width: "17.5rem" }}>
                <Card.Body>
                  <Card.Title>Código: {pedido.id}</Card.Title>
                  <Card.Text><b>Produto 1:</b> {capPrimeiraLetra(pedido.produto)} <br></br><b>Valor:</b> {pedido.vl1}</Card.Text>
                  <Card.Text><b>Produto 2:</b> {capPrimeiraLetra(pedido.produto2)} <br></br><b>Valor:</b> {pedido.vl2}</Card.Text>
                  <Card.Text><b>Produto 3:</b> {capPrimeiraLetra(pedido.produto3)} <br></br><b>Valor:</b> {pedido.vl3}</Card.Text>
                  <Card.Title>Valor total: R$ {pedido.total}</Card.Title>
                  <Button variant='danger' onClick={handlePedido}>Efetuar pedido</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Pedidos;
