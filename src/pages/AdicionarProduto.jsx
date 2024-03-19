import NaveFormulario from "../components/NaveFormulario";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";



function AdicionarProduto() {
  const [sabor, setSabor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");
  const [foto, setFoto] = useState([]);

  const addProduto = async (e) => {
    e.preventDefault();

    const dados = new FormData();
    dados.append("sabor", sabor);
    dados.append("categoria", categoria);
    dados.append("valor", valor);
    dados.append("foto", foto);

    try {
      const response = await axios.post("http://localhost/api/addProduto", dados);
      const dado = response.data;
      alert(dado);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pink">
      <NaveFormulario />
      <section>
        <Container>
          <Row
            className="d-flex justify-content-center"
          >
            <Col xs="12" md="6" sm="12">
              <h1 className="text-center">Cadastro de produtos</h1>
              <Form enctype="multipart/formdata" onSubmit={(e) => addProduto(e)} className="mt-3">
                <Form.Group
                  as={Row}
                  className="mb-3 d-flex justify-content-center"
                  controlId="formGroupName"
                >
                  <Col xs="10" md="8" sm="8">
                    <Form.Label>Nome do produto</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Pizza de frango (exemplo)"
                      name="sabor"
                      onChange={(e) => setSabor(e.target.value.toUpperCase())}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3 d-flex justify-content-center"
                  controlId="formGroupPrc"
                >
                  <Col xs="10" md="8" sm="8">
                    <Form.Label>Preço</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="25.00 (siga o exemplo)"
                      name="valor"
                      onChange={(e) => setValor(e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3 d-flex justify-content-center"
                  controlId="formGroupCtg"
                >
                  <Col xs="10" md="8" sm="8">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Digite a categoria"
                      name="categoria"
                      onChange={(e) => setCategoria(e.target.value.toUpperCase())}
                    /> <p style={{ color: 'gray' }}>A = Pizzas B = Breadsticks C = Doces D = Bebidas</p>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3 d-flex justify-content-center"
                  controlId="formGroupImg"
                >
                  <Col xs="10" md="8" sm="8">
                    <Form.Label>Imagem</Form.Label>
                    <Form.Control
                      type="file"
                      placeholder="Provisório"
                      name="foto"
                      onChange={(e) => setFoto(e.target.files[0])}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3 d-flex justify-content-center"
                >
                  <Col xs="10" md="8" sm="8">
                    <Button type="submit" variant="danger">
                      Adicionar
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default AdicionarProduto;
