import { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { DashBoardResponseTypes } from "../../AppTypes";
import DashboardLayout from "../../layouts/dashboard";
import { Card, Spinner } from "react-bootstrap";

const Home = () => {
    const [dashboardData, SetDashboardData] = useState<DashBoardResponseTypes>()
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        getDashBoardInformation();
    }, []);

    const getDashBoardInformation = () => {
        setLoading(true)
        axiosClient.get<DashBoardResponseTypes>('/dashboard').then(({ data }) => {
            SetDashboardData(data)
        }).finally(() => {
            setLoading(false);
        });

    }

    return (
        <DashboardLayout>

            <div className="row mt-5 d-flex align-items-stretch">

                <div className="col">
                    <Card style={{ minHeight:400 }}>
                        {loading ? <Spinner animation="grow" /> : (
                            <>
                                <Card.Img variant="top" src={dashboardData?.surveys.image != '' ? dashboardData?.surveys.image : 'http://localhost:3000/src/assets/bg2.jpg'} />
                                <Card.Body>
                                    <Card.Title className="fw-bold">{dashboardData?.surveys.title}</Card.Title>
                                    <Card.Text>
                                        {dashboardData?.surveys.description}
                                        <div className="mt-2">
                                            <div className="flex justify-content-between mb-2">
                                                <span className="fs-6 fw-bold">Created at</span> <span className="text-muted">{dashboardData?.surveys.created_at}</span>
                                            </div>
                                            <div className="flex justify-content-between mb-2">
                                                <span className="fs-6 fw-bold">Exprie on</span> <span className="text-muted">{dashboardData?.surveys.expire_date}</span>
                                      
                                            </div>
                                            <div className="flex justify-content-between">
                                                <span className="fs-6 fw-bold">Total Question </span> <span className="text-muted">{dashboardData?.surveys.questions.length}</span>
                                            </div>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </>
                        )}
                    </Card>
                </div>
                <div className="col">
                    <div className="d-flex flex-column h-full justify-content-evenly">
                        <Card className="bg-success text-center min-height" >
                            <Card.Body className="flex align-items-center justify-content-between">
                                <div className="fs-2 text-white">
                                    {loading ? <Spinner animation="grow" /> : dashboardData?.total}
                                </div>
                                <h3 className="fw-bold text-white">
                                    Total Surverys
                                </h3>
                            </Card.Body>
                        </Card>

                        <Card className="bg-warning text-center  min-height">
                            <Card.Body className="flex align-items-center justify-content-between">
                                <div className="fs-2">
                                    {loading ? <Spinner animation="grow" /> : dashboardData?.total_answers}
                                </div>
                                <h3 className="fw-bold">
                                    Total Answers
                                </h3>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="col">
                    <Card className="h-full">
                        <Card.Body className="border border-1 ">
                            <Card.Title>
                                Lastest Answers
                            </Card.Title>
                            <ul className="list-group mt-4 overflow-scroll" style={{ maxHeight:300 }}>
                                <li className="list-group-item">An item</li>
                                <li className="list-group-item">A second item</li>
                                <li className="list-group-item">A third item</li>
                                <li className="list-group-item">A fourth item</li>
                                <li className="list-group-item">And a fifth one</li>
                                <li className="list-group-item">An item</li>
                                <li className="list-group-item">A second item</li>
                                <li className="list-group-item">A third item</li>
                                <li className="list-group-item">A fourth item</li>
                                <li className="list-group-item">And a fifth one</li>
                                <li className="list-group-item">An item</li>
                                <li className="list-group-item">A second item</li>
                                <li className="list-group-item">A third item</li>
                                <li className="list-group-item">A fourth item</li>
                                <li className="list-group-item">And a fifth one</li>
                            </ul>
                        </Card.Body>
                    </Card>

                </div>
            </div>
        </DashboardLayout>

    )
}

export default Home;