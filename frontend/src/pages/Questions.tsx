import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import { Spinner } from "react-bootstrap";


export interface Surveyresponse {
    data: Data
  }
  
  export interface Data {
    id: number
    title: string
    slug: string
    status: number
    expire_date: string
    created_at: string
    user_id: number
    image: string
    description: string
    questions: Question[]
    total_answers: any[]
  }
  
  export interface Question {
    id: number
    type: string
    question: string
    description: string
    data:any
    survey_id: number
    created_at: string
    updated_at: string
  }
  

const Questions =  () =>{
    const [survey,SetSurvey] = useState<Data>();
    const [loading,setLoading] = useState<boolean>()
    const {slug} = useParams();
    
   
    const fetchServey = ()=>{
        setLoading(true);
        axiosClient.get<Surveyresponse>(`/public/survey/${slug}`).then(({data})=>{
            SetSurvey(data.data);
        }).catch((err)=>{
            console.log(err);
        })
        .finally(()=>{setLoading(false)});
    }
    
    useEffect(() => {
        fetchServey();
    }, []);

    function checkSurveyExpireDate(date:string | undefined):boolean{
        if(date ==  undefined){
            return true
        }   
        // Parse the input date string
        const inputDate = new Date(date);

        // Get the current date
        const currentDate = new Date();

        // Compare the dates
        return currentDate > inputDate;
        
    }

 
    const RenderInput = (question:Question) => {
        switch (question.type) {
            case 'radio':
                const radioOptions = JSON.parse(question.data);
                return (
                <div className="d-flex  flex-column gap-2">
                    {radioOptions.map((option:any, optionIndex:any) => (
                    <label key={optionIndex} className="form-control">
                        <input type="radio" className='me-2' name={`question_${question.id}`} value={option} />
                        {option}
                    </label>
                    ))}
                </div>
                );

            case 'checkbox':
                const checkboxOptions = JSON.parse(question.data);
                return (
                  <div className="d-flex  flex-column  gap-2">
                    {checkboxOptions.map((option:any, optionIndex:any) => (
                      <label key={`${question.id}_${question.type}_${optionIndex}`} className="form-control">
                        <input type="checkbox" className='me-2' name={`question__${optionIndex}`} value={option} />
                        {option}
                      </label>
                    ))}
                  </div>
                );
            
            case 'select':
                const SelectOptions = JSON.parse(question.data);
                return (
                    <div>
                        <select name="question[]" className="form-control">
                            <option  key={`${question.type}_${question.id}_blank`}>Choose Option</option>
                            {SelectOptions.map((option:any, optionIndex:any) => (
                                <option value={option} key={`${question.id}_${question.type}_${optionIndex}`}>{option}</option>
                            ))}
                        </select>
                    
                    </div>
                );
            case 'text':
                return <input className='form-control' name="question[]" type="text" />;

            case 'textarea':
                    return <textarea className='form-control' name="question[]" />;
      
          // Add more cases for other question types as needed
      
          default:
            return null;
        }
      };

      

    const handleSubmit = (e:any) =>{
        e.preventDefault();
        console.log('submit');
        const data = new FormData(e.target);
       console.log(data);
       
    }

    return(
        <div className="bg-white h-full-vh py-5">
            <div className="container pt-5">
                {loading?(
                <div className="text-center">
                    <Spinner size="sm" />
                </div> 
                ):(survey?.title == '')?(
                    <div className="text-center">
                        <h5>No Survey Found</h5>
                    </div>
                ):(checkSurveyExpireDate(survey?.expire_date))?(
                    <div className="text-center">
                        <h4>Survey is no logger available</h4>
                        <h6> Survey is exprired on {survey?.expire_date}</h6>
                    </div>
                ):(
                    <form onSubmit={handleSubmit} id="formSurvey">
                        <h1>{survey?.title}</h1>
                        <p className="mt-4">
                            {survey?.description}
                        </p>

                        {survey?.questions && survey?.questions.map((ques,index)=>(
                            <div className="position-relative mb-5" key={index}>
                                <span className="qus-index">{index+1}</span>
                                <p className="fw-bold">
                                    {ques.question}
                                </p>
                                <small className="text-default">
                                     {ques.description}
                                </small>
                                <div className="mt-4">
                                  <RenderInput {...ques}/>
                                </div>
                            </div>
                        ))}
                        <div className="text-center">
                            <button className="btn btn-primary">Submit Survey</button>
                        </div>
                    </form>
                )}

                
            </div>
        </div>
    )

}

export default Questions;