
import Form from 'react-bootstrap/Form';
import { Button, Spinner, Stack } from 'react-bootstrap';
import { ErrorMessage, Formik } from 'formik';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import bg from '../../assets/bg.jpg';
import { RegistrarionValidation } from '../../utils/ValidationObject';
import { RegistrationFormInitValues } from '../../utils/initValues';

const Registration = () => {

    const navigate = useNavigate();

    useEffect(() => {
        let localToken = localStorage.getItem('userToken');
        if (localToken) {
            navigate('/dashboard/home');
        }
    }, []);

    return (
        <Formik
            initialValues={RegistrationFormInitValues}
            validationSchema={RegistrarionValidation}
            onSubmit={(values,{setSubmitting}) => {
               console.log(values);
               setTimeout(()=>{
                setSubmitting(false);
               },3000)
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values,isSubmitting }) => (
                <form onSubmit={handleSubmit} style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'bottom' }} className='px-3'>
                    <div className='shadow-lg rounded-4 position-relative overflow-hidden' style={{ width: '500px', zIndex: '2' }} >
                        <div className='position-absolute top-0 start-0 end-0 bottom-0' style={{ backgroundColor: '#39bee79e', zIndex: '-1' }}></div>
                        <Stack gap={2} direction="vertical" className='p-3' style={{ width: '100%' }} >
                            <div className="p-2">
                                <h3 className='text-center fw-bold fs-1 text-danger'>Registration</h3>
                            </div>
                            <div className="p-2 position-relative">
                                <Form.Control type='text' name='fullName' placeholder="Full Name" className='py-3'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fullName}
                                />
                                <ErrorMessage name="fullName" >{msg => <div className='text-danger pt-2 fw-bolder'>{msg}</div>}</ErrorMessage>
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

                            <div className="p-2 position-relative">
                                <Form.Control type="password" name='confirmPassword' placeholder="Confirm Password" className='py-3'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirmPassword}
                                />
                                <ErrorMessage name="confirmPassword" >{msg => <div className='text-danger pt-2 fw-bolder'>{msg}</div>}</ErrorMessage>
                            </div>
                           
                           
                            <div className="p-2 text-center">
                                <Button  type='submit' variant='danger' className='w-full p-2 fs-5' disabled={isSubmitting?true:false} >
                                    Submit  {isSubmitting&&(<Spinner animation="border" size='sm' />)}
                                </Button>
                            </div>

                            <div className="p-2 text-center">
                                <Link to={'/Login'}  className='w-full p-2 fs-5 btn btn-secondary' >
                                   Back to Login
                                </Link>
                            </div>
                        </Stack>
                    </div>
                </form>
            )}
        </Formik>
    );
}

export default Registration;