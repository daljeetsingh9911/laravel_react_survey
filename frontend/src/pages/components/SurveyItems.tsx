import { Col } from "react-bootstrap";

import { SingleSurvey } from "../../Types";
import imgBg from '../../assets/bg2.jpg';

interface SurveyItemProps {
    survey: SingleSurvey,
    deleteSurveyById: any
}

const SurveyItem = (props: SurveyItemProps) => {
    const { title, description, id, slug } = props.survey;
    const markup = { __html: description };

    const deleteIteam = () => {
        props.deleteSurveyById(id);
    }

    return (
        <Col xs={12} sm={6} lg={3}>
            <div className="card">
                <img src={imgBg} className="card-img-top" alt={title} />
                <div className="card-body">
                    <h5 className="card-title"> {title}</h5>
                    <p className="card-text"
                        dangerouslySetInnerHTML={markup}
                    >
                    </p>
                    <div className="flex gap-4 justify-content-end">
                        <span role="button" >
                            <i className="bi bi-pencil-square"></i>
                        </span>
                        <span onClick={deleteIteam} role="button" >
                            <i className="bi bi-trash3"></i>
                        </span>

                        <a href={slug} target="_blank">
                            <i className="bi bi-box-arrow-up-right"></i>
                        </a>
                    </div>

                </div>
            </div>
        </Col>


    );
}
export default SurveyItem;