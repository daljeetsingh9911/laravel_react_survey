import { Col } from "react-bootstrap";

import { SingleSurvey } from "../../utils/Types";
import imgBg from '../../assets/bg2.jpg';
import { Link } from "react-router-dom";

interface SurveyItemProps {
    survey: SingleSurvey,
    deleteSurveyById: any
}

const SurveyItem = (props: SurveyItemProps) => {
    const { title, description, id,slug} = props.survey;
    const markup = { __html: description };

    const deleteIteam = () => {
        props.deleteSurveyById(id);
    }

    return (
        <Col xs={12} sm={6} lg={3} >
            <div className="card">
                <img src={imgBg} className="card-img-top" alt={title} />
                <div className="card-body">
                    <h5 className="card-title"> {title}</h5>
                    <p className="card-text"
                        dangerouslySetInnerHTML={markup}
                    >
                    </p>
                    <div className="flex gap-4 justify-content-end">
                         <Link to={`/surveys/edit/${id}`} >
                                <i className="bi bi-pencil-square"></i>
                        </Link>

                        <Link to={`/public/${slug}`} >
                            <i className="bi bi-box-arrow-up-right"></i>
                        </Link>

                        <span onClick={deleteIteam} role="button" >
                            <i className="bi bi-trash3 text-danger"></i>
                        </span>
                    </div>

                </div>
            </div>
        </Col>


    );
}
export default SurveyItem;