import NaveFormulario from '../components/NaveFormulario';
import { Container, Row, Col } from 'react-bootstrap';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    
    const logar = async (e) => {
        e.preventDefault();

        const dados = { email, senha };
        
        try {
            const resposta = await axios.post("http://localhost/api/login", dados);
            const result = resposta.data;
            if (result.message === 'Login bem-sucedido' && result.tipo_conta == 0) {
                navigate('/inicio');
            }
            else if (result.message === 'Login bem-sucedido' && result.tipo_conta != 0) {
                navigate('/funcionario');
            }
            else {
                alert("Conta inexistente ou dados incorretos.")
            }
        } catch (error) {
            console.log(error);
        }
      
    };

    return (
        <div className='pink'>
            <NaveFormulario />
            <section>
                <Container>
                    <Row className="d-flex justify-content-center" style={{ marginTop: '10%' }}>
                        <Col xs="12" md="4" sm="2">
                            <Card>
                                <h1 className='text-center'>Login</h1>
                                <Form className='mt-5' onSubmit={(e) => logar(e)}>
                                    <Form.Group as={Row} className="mb-3 d-flex justify-content-center" controlId="formGroupEmail">
                                        <Col xs="8" md="8" sm="4">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Digite seu email" name="email" onChange={(e) => setEmail(e.target.value.toUpperCase())} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3 d-flex justify-content-center" controlId="formGroupPassword">
                                        <Col xs="8" md="8" sm="4">
                                            <Form.Label>Senha</Form.Label>
                                            <Form.Control type="password" placeholder="Senha" name="senha" onChange={(e) => setSenha(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3 d-flex justify-content-center">
                                        <Col xs="8" md="8" sm="4">
                                            <Button type="submit" variant='danger'>Entrar</Button>
                                        </Col>
                                    </Form.Group>
                                    <p className='d-flex justify-content-center'>Ainda não tem uma conta? <a href='/cadastro'><b>Cadastre-se</b></a></p>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
}

export default Login