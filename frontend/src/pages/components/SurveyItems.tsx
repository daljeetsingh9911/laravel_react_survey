import { SingleSurvey } from "../../Types";

const SurveyItem = (props:SingleSurvey) => {
    
    const { title}  = props
    return(
        <div>
            {title}
        </div>
    );
}
export default SurveyItem;