
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Button, Stack } from 'react-bootstrap';
import { ErrorMessage, Formik } from 'formik';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import bg from '../../assets/bg.jpg';
import { MyContext, MyContextProps } from '../../context/surveyContext';
import { LoginValidation } from '../../utils/ValidationObject';
import { LoginFormInitValues } from '../../utils/initValues';

const Login = () => {

    const contextData = useContext<MyContextProps>(MyContext);
    const navigate = useNavigate();

    useEffect(() => {
        let localToken = localStorage.getItem('userToken');
        if (localToken) {
            navigate('/dashboard/home');
        }
    }, []);

    return (
        <Formik
            initialValues={LoginFormInitValues}
            validationSchema={LoginValidation}
            onSubmit={(values) => {
                console.log(values);
                contextData.updateUserToken('fsdf');
                navigate('/dashboard/home');
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <form onSubmit={handleSubmit} style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'bottom' }} className='px-3'>
                    <div className='shadow-lg rounded-4 position-relative overflow-hidden' style={{ width: '500px', zIndex: '2' }} >
                        <div className='position-absolute top-0 start-0 end-0 bottom-0' style={{ backgroundColor: '#39bee79e', zIndex: '-1' }}></div>
                        <Stack gap={2} direction="vertical" className='p-3' style={{ width: '100%' }} >
                            <div className="p-2">
                                <h3 className='text-center fw-bold fs-1 text-danger'>Login</h3>
                            </div>
                            <div className="p-2 position-relative">
                                <Form.Control type='email' name='email' placeholder="email@example.com" className='py-3'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />

                                <ErrorMessage name="email" >{msg => <div className='text-danger pt-2 fw-bolder'>{msg}</div>}</ErrorMessage>
                            </div>
                            <div className="p-2 position-relative">
                                <Form.Control type="password" name='password' placeholder="Password" className='py-3'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                <ErrorMessage name="password" >{msg => <div className='text-danger pt-2 fw-bolder'>{msg}</div>}</ErrorMessage>

                            </div>
                            <Row className="p-2" >
                                <Col>
                                    <Form.Check // prettier-ignore
                                        type={'checkbox'}
                                        name='rememberMe'
                                        style={{ fontWeight: 'bolder', color: 'white' }}
                                        label={`Remeber me`}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.rememberMe.toString()}
                                    />
                                </Col>
                                <Col className='text-end'>
                                    <a href="#" className='text-decoration-none fw-bolder text-white'>Forgot your password?</a>
                                </Col>

                            </Row>
                            <div className="p-2 text-center">
                                <Button type='submit' variant='danger' className='w-full p-2 fs-5' >
                                    Login
                                </Button>
                            </div>
                            <div className="p-2 text-center">
                                <Button href='/dashboard' variant='danger' className='w-full p-2 fs-5 ' >
                                    Register new account
                                </Button>
                            </div>
                        </Stack>
                    </div>
                </form>
            )}
        </Formik>
    );
}

export default Login;