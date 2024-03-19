import NaveFormulario from '../components/NaveFormulario';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function CadastrarCliente() {
    const [cep, setCep] = useState({ cep: '', localidade: '', uf: '', logradouro: '', bairro: '' });
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [casa, setCasa] = useState('');

    function checkCEP(meucep) {
        fetch(`https://viacep.com.br/ws/${meucep}/json/`)
            .then((response) => response.json())
            .then((json) => {
                const { localidade, uf, logradouro, bairro } = json;
                setCep({
                    cep: meucep,
                    localidade,
                    uf,
                    logradouro,
                    bairro
                });
                setCidade(localidade); 
                setEstado(uf); 
                setRua(logradouro); 
                setBairro(bairro);
            })
            .catch((error) => {
                console.error("Erro ao obter informações do CEP:", error);
            });
    }

    const handleChange = (event) => {
        event.preventDefault();
        checkCEP(event.target.value);
    };

    const addUsuario = async (e) => {
        e.preventDefault();

        if (!validator.isEmail(email)) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }

        if (!validator.isLength(nome, { min: 1 })) {
            alert("Por favor, insira um nome válido.");
            return;
        }

        if (!validator.isLength(senha, { min: 8 })) {
            alert("A senha deve ter pelo menos 8 caracteres.");
            return;
        }

        if (!/[a-z]/.test(senha)) {
            alert("A senha deve conter pelo menos uma letra minúscula.");
            return;
        }

        if (!/[A-Z]/.test(senha)) {
            alert("A senha deve conter pelo menos uma letra maiúscula.");
            return;
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
            alert("A senha deve conter pelo menos um caractere especial");
            return;
        }
        if (!/[0-9]/.test(senha)) {
            alert("A senha deve conter pelo menos um número")
        }
        if (!validator.isPostalCode(cep.cep, 'BR')) {
            alert("Por favor, insira um CEP válido.");
            return;
        }
        const siglasEstados = estado;
        const estadoUpperCase = estado.toUpperCase();
        if (!validator.isLength(estado, { min: 2, max: 2 }) || !siglasEstados.includes(estadoUpperCase)) {
            alert("Por favor, insira uma sigla de estado válida.");
            return;
        }

        if (!validator.isLength(bairro, { min: 1 })) {
            alert("Por favor, insira um nome de bairro válido.");
            return;
        }

        if (!validator.isLength(rua, { min: 1 })) {
            alert("Por favor, insira um nome de rua válido.");
            return;
        }

        if (!validator.isLength(casa, { min: 1 })) {
            alert("Por favor, insira um número de casa válido.");
            return;
        }
        if (!validator.isLength(cidade, { min: 1 })) {
            alert("Por favor, insira um nome de cidade válido.");
            return;
        }
        const dados = { cep: cep.cep, bairro, nome, email, senha, cidade, estado, rua, casa };
        try {
            const response = await axios.post("http://localhost/api/cadastroUsuarios", dados);
            const dado = response.data;
            alert(dado);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='pink'>
            <NaveFormulario />
            <section>
                <Container>
                    <Row className="d-flex justify-content-center" style={{ marginTop: '1%' }}>
                        <Col xs="12" md="6" sm="12">
                            <Card>
                                <h1 className='text-center'>Cadastre-se</h1>
                                <Form className='mt-5' onSubmit={(e) => addUsuario(e)}>
                                    <Form.Group as={Row} className="mb-3 d-flex justify-content-center" controlId="formGroupName">
                                        <Col xs="10" md="8" sm="8">
                                            <Form.Label>Nome</Form.Label>
                                            <Form.Control required type="text" placeholder="Digite seu nome e sobrenome" name="nome" onChange={(e) => setNome(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3 d-flex justify-content-center" controlId="formGroupEmail">
                                        <Col xs="10" md="8" sm="8">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control required type="email" placeholder="Digite seu email" name="email" onChange={(e) => setEmail(e.target.value.toUpperCase())} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3 d-flex justify-content-center" controlId="formGroupSenha">
                                        <Col xs="10" md="8" sm="8">
                                            <Form.Label>Senha</Form.Label>
                                            <Form.Control required type="password" placeholder="Digite sua senha" name="senha" onChange={(e) => setSenha(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3 d-flex justify-content-center" controlId="formGroupCep">
                                        <Col xs="10" md="8" sm="8">
                                            <Form.Label>CEP</Form.Label>
                                            <Form.Control required type="text" placeholder="Digite seu CEP" onChange={handleChange} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3 d-flex justify-content-center" controlId="formGroupCidade">
                                        <Col xs="10" md="8" sm="8">
                                            <Form.Label>Cidade</Form.Label>
                                            <Form.Control type="text" placeholder="Digite o nome de sua cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3 d-flex justify-content-center" controlId="formGroupEstado">
                                        <Col xs="10" md="8" sm="8">
                                            <Form.Label>UF (estado)</Form.Label>
                                            <Form.Control required type="text" placeholder="Digite o nome de seu estado" value={estado} onChange={(e) => setEstado(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3 d-flex justify-content-center" controlId="formGroupRua" >
                                        <Col xs="10" md="8" sm="8">
                                            <Form.Label>Rua</Form.Label>
                                            <Form.Control required type="text" placeholder="Digite o nome de sua rua" value={rua} onChange={(e) => setRua(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3 d-flex justify-content-center" controlId="formGroupRua" >
                                        <Col xs="10" md="8" sm="8">
                                            <Form.Label>Bairro</Form.Label>
                                            <Form.Control required type="text" placeholder="Digite o nome do seu bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3 d-flex justify-content-center" controlId="formGroupCasa">
                                        <Col xs="10" md="8" sm="8">
                                            <Form.Label>Número</Form.Label>
                                            <Form.Control required type="text" placeholder="Digite o número de sua casa" name="casa" onChange={(e) => setCasa(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3 d-flex justify-content-center">
                                        <Col xs="10" md="8" sm="8">
                                            <Button type="submit" variant='danger'>Cadastrar</Button>
                                        </Col>
                                    </Form.Group>
                                    <p className='d-flex justify-content-center'>Já está cadastrado? &nbsp;<a href='/login'><b> Entre</b></a></p>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
}

export default CadastrarCliente;