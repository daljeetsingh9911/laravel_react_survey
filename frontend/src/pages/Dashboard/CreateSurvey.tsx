import { ErrorMessage, Formik } from "formik";
import { Button, Stack } from "react-bootstrap";


import { CreateSurveyForm } from "../../utils/Types";
import { CrateSurveyinitialValues } from "../../utils/initValues";
import { useEffect } from "react";
import { CreateSurveyValidation } from "../../utils/ValidationObject";
import { previewPhoto } from "../../utils/untils";



const CreateSurvey = () => {

    useEffect(() => {
        const Fileinput = document.getElementById('image_url') as HTMLInputElement;

        Fileinput.addEventListener('change', previewPhoto)

        return () => {
            Fileinput.removeEventListener('change', previewPhoto);
        };
      }, []);
    
    const handleSubmit = (values: CreateSurveyForm) => {
        console.log(values);
    }

    return (
        <div className="h-full-vh">
            <div className="text-center fs-2 mb-5 fw-bold">Create New Survey</div>
            <hr/>

            <Formik
                initialValues={CrateSurveyinitialValues}
                validationSchema={CreateSurveyValidation}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleSubmit, handleBlur }) => (

                    <form action="" onSubmit={handleSubmit}>
                        <Stack gap={4}>
                            <div>
                                <div className="mb-3">
                                 <img src="#" alt="Upload Image" id="file-preview"  height={150} width={150} className="img-thumbnail d-none"  />
                                </div>
                                <input type="file"  name="image_url" className="form-control" accept=".jpg, .jpeg, .png" id="image_url" value={values.image_url} onChange={handleChange} />
                            </div>
                            <div >
                                <input type="text" name="title" placeholder="survey title" className="form-control" value={values.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                               <ErrorMessage name="title" >{msg => <div className='text-danger pt-2 fw-bolder'>{msg}</div>}</ErrorMessage>

                            </div>
                            <div >
                                <textarea name="description" placeholder="Description" className="form-control" 
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {values.description}
                                </textarea>
                               <ErrorMessage name="description" >{msg => <div className='text-danger pt-2 fw-bolder'>{msg}</div>}</ErrorMessage>

                            </div>
                            <div >
                                <input type="Date" name="expire_date" placeholder="survey title" className="form-control" value={values.expire_date}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                               <ErrorMessage name="expire_date" >{msg => <div className='text-danger pt-2 fw-bolder'>{msg}</div>}</ErrorMessage>

                            </div>
                            <div>
                                <Button type="submit" variant="primary">
                                    Submit
                                </Button>
                            </div>
                        </Stack>

                    </form>
                )}
            </Formik>
        </div>
    );
}

export default CreateSurvey;