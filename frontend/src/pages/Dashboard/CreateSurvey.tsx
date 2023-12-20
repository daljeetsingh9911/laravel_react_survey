import { useEffect } from "react";
import { ErrorMessage, Field, FieldArray, Formik, FormikHelpers, FormikValues } from "formik";
import { Badge, Button, Spinner, Stack } from "react-bootstrap";


import { Question } from "../../utils/Types";
import { CrateSurveyinitialValues, InputFieldTypes, showOptionIf } from "../../utils/initValues";
import { CreateSurveyValidation } from "../../utils/ValidationObject";
import { previewPhoto } from "../../utils/untils";
import axiosClient from "../../utils/axiosClient";



const CreateSurvey = () => {

    useEffect(() => {
        const Fileinput = document.getElementById('image_url') as HTMLInputElement;

        Fileinput.addEventListener('change', previewPhoto)

        return () => {
            Fileinput.removeEventListener('change', previewPhoto);
        };
    }, []);

    const CutsomErrorMessage = ({name,errors,touched}:{name:string,errors:any,touched:any})=> {
        let feildInfo:string[] = name?.split('.');
        return(
                <div  className='text-danger pt-2 fw-bolder'>
                    {(errors[feildInfo[1]]?.[feildInfo[2]] && (touched[feildInfo[0]] && touched[feildInfo[0]][feildInfo[1]] &&  touched[feildInfo[0]][feildInfo[1]][feildInfo[2]]))&&(
                        <div>{errors[feildInfo[1]]?.[feildInfo[2]]}</div>
                    )}
                </div>
            )
      };

    const handleSubmit = (values:FormikValues,{setSubmitting}:FormikHelpers<any>)  => {
        console.log(values);
        
        setSubmitting(false);

        axiosClient.post('/survey/create', values).then((resp)=>{
            console.log(resp);
            
        }).catch((err) => {
            console.log(err);
            
        }).finally(()=>setSubmitting(false));
    }

    return (
        <div className="container">
            <div className="h-full-vh">
                <div className="text-center fs-2 mb-5 fw-bold text-uppercase">Create <span className="text-success">Survey</span></div>
            
                <Formik
                    initialValues={CrateSurveyinitialValues}
                    validationSchema={CreateSurveyValidation}
                    onSubmit={handleSubmit}
                >
                    {({ values,errors,touched, handleChange, handleSubmit, handleBlur,isSubmitting }) => {
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
                                        <Field
                                            name="description"
                                            placeholder="Description"
                                            className="form-control"
                                            as="textarea"
                                            value={values.description}
                                        />
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
                                                            type: 'text', question: '', description: '', data: []
                                                        })}
                                                    >
                                                        Add Question
                                                    </button>
                                                    <hr />
                                                    <ErrorMessage name="questions" >{msg => <div className='text-danger pt-2 fw-bolder'>{msg}</div>}</ErrorMessage>
                                                </div>
                                                <Stack gap={3} >
                                                    {values.questions.length > 0 && values.questions.map((ques: Question, index) => (
                                                        <div key={`optionsParent_${index}`} className="shadow-sm border rounded-2 px-2 py-3">
                                                            <div className="flex align-items-center justify-content-between ">

                                                                <Badge className="left-block" bg="secondary">{index + 1}</Badge>

                                                                <div className="right-block flex-fill ">
                                                                    <div className="flex justify-content-between ">
                                                                        <div className="question-inp pb-2">
                                                                            <Field
                                                                                name={`questions.${index}.question`}
                                                                                placeholder={`Enter Question ${index + 1}`}
                                                                                className="form-control"
                                                                                value={ques.question}
                                                                            />
                                                                            <CutsomErrorMessage
                                                                                name={`questions.${index}.question`}
                                                                                errors={errors}
                                                                                touched={touched}
                                                                            />
                                                                        </div>
                                                                        <div className="type-inp">
                                                                            <Field as='select' className="form-control" name={`questions.${index}.type`}
                                                                                value={ques.type}
                                                                            >
                                                                                {InputFieldTypes.map((inp, Fieldindex) => (
                                                                                    <option value={inp} key={`feildtype_${index}_${Fieldindex}`}>{inp.toUpperCase()}</option>
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
                                                                            value={ques.description}
                                                                        />
                                                                        <CutsomErrorMessage
                                                                            name={`questions.${index}.description`}
                                                                            errors={errors}
                                                                            touched={touched}
                                                                        />
                                                                    </div>

                                                                </div>
                                                                <div  className="actions flex flex-column gap-2">
                                                                    <button
                                                                    type="button"
                                                                    className="btn btn-danger size-xs" onClick={() => {
                                                                        insert(index+1,{
                                                                            type: 'text', question: '', description: '', data: []
                                                                        });
                                                                    }}>
                                                                    <i className="bi bi-plus-square"></i>
                                                                    </button>

                                                                    <button 
                                                                    type="button"
                                                                    className="btn btn-danger size-xs" onClick={() => {
                                                                        remove(index);
                                                                    }}>
                                                                        <i className="bi bi-trash"></i>
                                                                    </button>

                                                                </div>
                                                            </div>
                                                            {/* Starting with add options for data */}
                                                            {showOptionIf.includes(ques.type) && (
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
                                                                                    {ques.data.length > 0 && ques.data.map((data, dataindex) => {
                                                                                        return (
                                                                                            <div className="border border-b-1 flex justify-content-between p-2" key={`questions_inner_data_${dataindex}`}>
                                                                                                <div className="flex-fill align-items-center" >
                                                                                                    <div className="flex align-items-center" >
                                                                                                    <Badge bg="warning">{ques.type.toUpperCase()} {dataindex + 1}</Badge>
                                                                                                    <div>
                                                                                                        <Field
                                                                                                            text='text'
                                                                                                            className="form-control"
                                                                                                            placeholder='Please insert option value'
                                                                                                            name={`questions.${index}.data.${dataindex}`}
                                                                                                            value={data}
                                                                                                        />
                                                                                                        <ErrorMessage  name={`questions.${index}.data.${dataindex}`}>{msg => <div className='text-danger pt-2 fw-bolder'>{msg}</div>}</ErrorMessage>
                                                                                                        <CutsomErrorMessage
                                                                                                            name={`questions.${index}.data`}
                                                                                                            errors={errors}
                                                                                                            touched={touched}
                                                                                                        />
                                                                                                    </div>
                                                                                                        
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="flex">
                                                                                                    <button
                                                                                                        className="btn rounded-circle btn-danger"
                                                                                                        style={{ width: '35px', height: '35px', padding: '0' }}
                                                                                                        type="button" onClick={() => {
                                                                                                            insert(dataindex+1,'');
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
                                                            {/* end with add options for data */}

                                                        </div>
                                                    ))}
                                                </Stack>

                                            </Stack>
                                        )}
                                    </FieldArray>
                                </Stack>

                                <div className="text-center mt-5">
                                    <Button type="submit" variant="primary"
                                     disabled={isSubmitting?true:false}
                                    >
                                        Submit {isSubmitting&&<Spinner size="sm" />}   
                                    </Button>
                                </div>
                            </form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default CreateSurvey;