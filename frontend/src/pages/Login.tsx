
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import bg from '../assets/bg.jpg';
import { Button, Stack } from 'react-bootstrap';

const Login = () => {

    return (
        <Form style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'bottom' }} className='px-3'>
            <div className='shadow-lg rounded-4 bg-transparent' style={{ width: '500px' }} >
                <Stack gap={2} direction="vertical" className='p-3' style={{ width: '100%' }} >
                    <div className="p-2">
                        {/* <img src={Logo} alt='logo' className='mx-auto' height={60} style={{ display:'block' }}  /> */}
                        <h3 className='text-center fw-bold fs-1'>Login</h3>
                    </div>
                    <div className="p-2">
                        <Form.Control type='email' placeholder="email@example.com" className='py-3' />
                    </div>
                    <div className="p-2">
                        <Form.Control type="password" placeholder="Password" className='py-3' />
                    </div>
                    <Row className="p-2" >
                        <Col>
                            <Form.Check // prettier-ignore
                                type={'checkbox'}
                                label={`Remeber me`}
                            />
                        </Col>
                        <Col className='text-end'>
                            <a href="#" className='text-decoration-none fw-bolder'>Forgot your password?</a>
                        </Col>

                    </Row>
                    <div className="p-2 text-center">
                        <Button variant='danger' className='w-full p-2 fs-5' >
                            Login
                        </Button>
                    </div>
                    <div className="p-2 text-center">
                        <Button href='/dashboard' variant='danger' className='w-full p-2 fs-5' >
                            Register new account
                        </Button>
                    </div>
                </Stack>
            </div>
        </Form>
    );
}

export default Login;