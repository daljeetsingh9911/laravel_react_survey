import { useEffect, useState } from "react";
import { SurveyItem } from "../components";
import { SingleSurvey, SurveryApiTypes } from "../../utils/Types";
import { Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layouts/dashboard";
import axiosClient from "../../utils/axiosClient";


const Surveys = () => {

    const [survetState, SetSurvetState] = useState<SingleSurvey[]>([]);
    const [loading,setLoading] = useState<boolean>(false);
    useEffect(() => {
        fetchSurveys();
    }, []);

    const fetchSurveys = () => {
        setLoading(true)
        axiosClient.get<SurveryApiTypes>('/survey/all').then(({data})=>{
            SetSurvetState(data.data);
        })
        .catch(err=>console.log(err))
        .finally(()=>setLoading(false));
    }

    function deleteSurveyById(id: Number): void {
        axiosClient.delete(`/survey/${id}`).then((resp)=>{
            fetchSurveys();
        })
        .catch(err=>console.log(err))
        .finally(()=>setLoading(false));
    }
    
    if(loading){
        return(
            <DashboardLayout>
                <div className="h-full w-full flex justify-content-center align-items-center">
                    <Spinner color="#2ac936"  animation="grow" size="sm" />
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <div className="mb-4 flex justify-content-between align-items-center">
                <div>
                    <div className="flex align-items-center">
                        <div className="fs-4 fw-bolder" >Total  Surveys</div>
                        <small className="text-dark">({survetState.length})</small>
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