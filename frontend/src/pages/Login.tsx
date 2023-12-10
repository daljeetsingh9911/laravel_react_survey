
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import bg from '../assets/bg.jpg';
import { Button, Stack } from 'react-bootstrap';

import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';

const Login = () => {
    
   useEffect(() => {

    }, []);

    return (

        <Formik
       initialValues={{ email: '', password: '',rememberMe: false}}
       validationSchema={Yup.object({
        password: Yup.string()
          .min(5, 'Must be more than 5 characters or more')
          .required('The password is required'),
        email: Yup.string().email('Invalid email address').required('Email address is required'),
      })}
       onSubmit={(values) => {
         console.log(values);
       }}
     >
       {({handleChange, handleBlur, handleSubmit,values }) => (
        <form onSubmit={handleSubmit} style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'bottom' }} className='px-3'>
            <div className='shadow-lg rounded-4 position-relative overflow-hidden' style={{ width: '500px',zIndex:'2'}} >
                <div className='position-absolute top-0 start-0 end-0 bottom-0' style={{ backgroundColor:'#39bee79e',zIndex:'-1'  }}></div>
                <Stack gap={2} direction="vertical" className='p-3' style={{ width: '100%' }} >
                    <div className="p-2">
                        {/* <img src={Logo} alt='logo' className='mx-auto' height={60} style={{ display:'block' }}  /> */}
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
                                style={{ fontWeight:'bolder',color:'white' }}
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
                        <Button type='submit'  variant='danger' className='w-full p-2 fs-5' >
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