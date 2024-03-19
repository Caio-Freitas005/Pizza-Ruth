import { Container } from 'react-bootstrap';
import { Linkedin, Github } from 'react-bootstrap-icons';

function Footer() {
    return (
      <footer className='bg-dark text-center text-white fixed-bottom'>
        <Container className='p-4 pb-0'>
          <section className='mb-4'>
            <a className='btn btn-outline-light btn-floating m-1' href="https://www.linkedin.com/in/caio-freitas-84b64a285" role="button" style={{borderRadius: '100%'}}>
              <Linkedin className='mb-1' />
            </a>
            <a className='btn btn-outline-light btn-floating m-1' href="https://github.com/Caio-Freitas005" role="button" style={{borderRadius: '100%'}}>
              <Github className='mb-1' />
            </a>
          </section>
        </Container>
        <div className='text-center p-3' style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
          © 2023 Copyright: 
          <b className='text-white ms-1'>Caio Freitas</b>
        </div>
    </footer>
    );
  }

export default Footer