import { useEffect } from "react";
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import { Button, Stack } from "react-bootstrap";


import { CreateSurveyForm, Question } from "../../utils/Types";
import { CrateSurveyinitialValues, InputFieldTypes, showOptionIf } from "../../utils/initValues";
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
            <hr />

            <Formik
                initialValues={CrateSurveyinitialValues}
                validationSchema={CreateSurveyValidation}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleSubmit, handleBlur }) => {
                    console.log(values);
                    return (

                        <form action="" onSubmit={handleSubmit}>
                            <Stack gap={4}>
                                <div>
                                    <div className="mb-3">
                                        <img src="#" alt="Upload Image" id="file-preview" height={150} width={150} className="img-thumbnail d-none" />
                                    </div>
                                    <input type="file" name="image_url" className="form-control" accept=".jpg, .jpeg, .png" id="image_url" value={values.image_url} onChange={handleChange} />
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
                            </Stack>

                            {/* Dynamic feilds */}

                            <Stack className="mt-4">
                                <FieldArray name="questions">

                                    {({ insert, remove, push }) => (
                                        <Stack gap={5}>
                                            <div className="py-10">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary float-end"
                                                    onClick={() => push({
                                                        type: '', question: '', description: '', data: []
                                                    })}
                                                >
                                                    Add Question
                                                </button>
                                                <hr />
                                            </div>
                                            <Stack gap={3} >
                                                {values.questions.length > 0 && values.questions.map((quesion: Question, index) => (
                                                    <div key={`optionsParent_${index}`} className="shadow-sm border rounded-2 p-2">
                                                        <div className="flex align-items-center justify-content-between ">

                                                            <span className="left-blocl">{index + 1}</span>

                                                            <div className="right-block flex-fill ">
                                                                <div className="flex justify-content-between ">
                                                                    <div className="question-inp pb-2">
                                                                        <Field
                                                                            name={`questions.${index}.question`}
                                                                            placeholder={`Enter Question ${index + 1}`}
                                                                            className="form-control"
                                                                            value={quesion.question}
                                                                        />
                                                                        <ErrorMessage
                                                                            name={`questions.${index}.question`}
                                                                            component="div"
                                                                            className="field-error"

                                                                        />
                                                                    </div>
                                                                    <div className="type-inp">
                                                                        <Field as='select' className="form-control" name={`questions.${index}.type`}
                                                                            value={quesion.type}
                                                                        >
                                                                            {InputFieldTypes.map((inp, index) => (
                                                                                <option value={inp}>{inp.toUpperCase()}</option>
                                                                            ))}
                                                                        </Field>
                                                                    </div>
                                                                </div>

                                                                <div className="description-inp">
                                                                    <Field
                                                                        name={`questions.${index}.description`}
                                                                        placeholder="Enter description"
                                                                        as="textarea"
                                                                        className="form-control"
                                                                        value={quesion.description}
                                                                    />
                                                                    <ErrorMessage
                                                                        name={`questions.${index}.description`}
                                                                        component="div"
                                                                        className="field-error"
                                                                    />
                                                                </div>

                                                            </div>
                                                            <div className="actions">
                                                                <button className="btn btn-danger size-xs" onClick={() => {
                                                                    remove(index);
                                                                }}>
                                                                    <i className="bi bi-trash"></i>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {showOptionIf.includes(quesion.type) && (
                                                            <div className="mt-5 border border-1 p-2 rounded-1">
                                                                <FieldArray name={`questions[${index}].data`}
                                                                >
                                                                    {({ insert, remove, push }) => (
                                                                        <div>
                                                                            <div className="my-2 text-end">
                                                                                <button type="button" onClick={() => {
                                                                                    push('');
                                                                                }}>
                                                                                    Add Options
                                                                                </button>
                                                                            </div>
                                                                            <Stack gap={3}>
                                                                                {quesion.data.length > 0 && quesion.data.map((data, dataindex) => {
                                                                                    return (
                                                                                        <div className="border border-b-1 flex justify-content-between p-2" key={`questions_inner_data_${dataindex}`}>
                                                                                            <div className="flex align-items-center" >
                                                                                                <span>Option {dataindex + 1}</span>
                                                                                                <div className="flex gap-4">
                                                                                                    <Field
                                                                                                        text='text'
                                                                                                        className="form-control"
                                                                                                        placeholder='Please insert option value'
                                                                                                        name={`questions[${index}].data[${dataindex}]`}
                                                                                                        value={quesion.data[dataindex]}
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="flex">
                                                                                                <button
                                                                                                    className="btn rounded-circle btn-danger"
                                                                                                    style={{ width: '35px', height: '35px', padding: '0' }}
                                                                                                    type="button" onClick={() => {
                                                                                                        remove(dataindex);
                                                                                                    }}>
                                                                                                    <i className="bi bi-plus"></i>
                                                                                                </button>
                                                                                                <button
                                                                                                    className="btn rounded-circle btn-danger"
                                                                                                    style={{ width: '35px', height: '35px', padding: '0' }}
                                                                                                    type="button" onClick={() => {
                                                                                                        remove(dataindex);
                                                                                                    }}>
                                                                                                    <i className="bi bi-x"></i>
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    );
                                                                                })}
                                                                            </Stack>
                                                                        </div>

                                                                    )}
                                                                </FieldArray>
                                                            </div>
                                                        )}
                                                        
                                                    </div>
                                                ))}
                                            </Stack>

                                        </Stack>
                                    )}
                                </FieldArray>

                            </Stack>
                            <hr />
                            <div className="text-center mt-5">
                                <Button type="submit" variant="primary">
                                    Submit
                                </Button>
                            </div>

                        </form>
                    )
                }}
            </Formik>
        </div>
    );
}

export default CreateSurvey;