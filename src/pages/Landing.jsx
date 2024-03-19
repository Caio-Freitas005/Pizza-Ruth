import { Container, Row, Col, Form } from 'react-bootstrap';
import Nave from '../components/Nave';
import Card from 'react-bootstrap/Card';
import Footer from '../components/Footer';

function Landing() {
    return (
        <div>
        <div className='pink'> 
            <Nave />
            <section className='mt-5'>
                <Container>
                    <Row className='d-flex justify-content-center'>
                        <Col xs="10" md="8" sm="8">
                            <Card className='back-image' style={{width: '110%', height: '18rem'}}>
                                <Card.Body className='mt-5 pt-4'>
                                    <Card.Title className='text-wrap' style={{width: '17rem'}}>Peça sua pizza em casa ou retire na loja mais próxima</Card.Title>
                                    <Card.Text>Informe seu endereço para encontrarmos a Pizza Ruth mais próxima de você</Card.Text>
                                    <Form>
                                        <Form.Control type="text" placeholder="Informar endereço e número" className=" rounded-pill" />
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>   
            </section>  
        </div>
        <Footer />
        </div>
    )
}

export default Landing