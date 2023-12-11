import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../surveyContext";
import { SurveyItem } from "../components";
import { SingleSurvey } from "../../Types";
import { Row } from "react-bootstrap";

const Home =()=>{

    const  {surveys} = useContext(MyContext);

    const [survetState,SetSurvetState] =  useState<SingleSurvey[]>([]);
    
    useEffect(() => {
        SetSurvetState(surveys);
    }, []);

    function deleteSurveyById(id:Number):void{
        alert(id);
    }
    
    return(
        <div className="h-full">
        <Row>
            {survetState?.map((survey) => {
            return <SurveyItem survey={survey} key={survey.id} deleteSurveyById={deleteSurveyById} />;
            })}
        </Row>
        
      </div>
      
    )
}

export default Home;