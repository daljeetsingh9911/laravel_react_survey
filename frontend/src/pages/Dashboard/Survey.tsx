import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/surveyContext";
import { SurveyItem } from "../components";
import { SingleSurvey } from "../../utils/Types";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layouts/dashboard";


const Surveys = () => {
    const { surveys } = useContext(MyContext);

    const [survetState, SetSurvetState] = useState<SingleSurvey[]>([]);

    useEffect(() => {
        SetSurvetState(surveys);
    }, []);

    function deleteSurveyById(id: Number): void {
        alert(id);
    }

    return (
        <DashboardLayout>
            <div className="mb-4 flex justify-content-between align-items-center">
                <div>
                    <div className="flex align-items-center">
                        <div className="fs-4 fw-bolder" >Total  Surveys</div>
                        <small className="text-dark">({surveys.length})</small>
                    </div>
                </div>
                <div>
                    <Link to={'/surveys/create'} className="float-end btn btn-outline-secondary btn-xs" >
                        Add New <i className="bi bi-plus-circle-fill"></i>
                    </Link>
                </div>
            </div>
            <div className="mb-5">
                <hr />
            </div>
            <Row>
                {survetState?.map((survey) => {
                    return <SurveyItem survey={survey} key={survey.id} deleteSurveyById={deleteSurveyById} />;
                })}
            </Row>
        </DashboardLayout>

    )

}

export default Surveys;