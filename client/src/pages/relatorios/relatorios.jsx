import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'

function Relatorios() {
    const [showSpinner, setShowSpinner] = useState(true);
    const [lastRequests, setlastRequests] = useState([]);

    useEffect(() => {
        // zerando o loading
        setTimeout(() => {
            setShowSpinner(false);
        }, 1000);
        getLastRequests();
    }, []);

    const getLastRequests = async () => {
        axios.get(`http://localhost:3000/getRequests`)
            .then(response => {
                if (response?.data?.code == 200) {
                    setlastRequests(response.data.data)
                    console.log(response.data.data)
                }
                setShowSpinner(false);
            })
            .catch(error => {
                console.log(error);
                setShowSpinner(false);
            });
    }
    return (
        <div className="container-fluid position-relative d-flex p-0">
            {/* <!-- Spinner Start --> */}
            {showSpinner && (
                <div id="spinner" className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
                    <div className="spinner-border text-primary" style={{ width: 3 + 'rem', height: 3 + 'rem' }} role={{ status }}>
                        <span className="sr-only"></span>
                    </div>
                </div>
            )}

            <div className="sidebar pe-4 pb-3">
                <nav className="navbar bg-secondary navbar-dark">
                    <a href="/" className="navbar-brand mx-4 mb-3">
                        {/* <h3 className="text-primary"><i className="fa fa-user-edit me-2"></i>UFG</h3> */}
                        <img src="./ufg_logo.png" alt='logo' style={{ width: 150 + "px" }} />
                    </a>
                    <div className="navbar-nav w-100">
                        <a href="/" className="nav-item nav-link active"><i className="fa fa-tachometer-alt me-2"></i>Dashboard</a>
                        <a href="/relatorios" className="nav-item nav-link"><i className="fa fa-th me-2"></i>Elementos</a>
                    </div>
                </nav>
            </div>
            <div className="content">
                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-chart-line fa-3x text-primary"></i>
                                <div className="ms-3">
                                    <p className="mb-2">CPU</p>
                                    <h6 className="mb-0">0%</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-chart-bar fa-3x text-primary"></i>
                                <div className="ms-3">
                                    <p className="mb-2">RAM</p>
                                    <h6 className="mb-0">0%</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid pt-4 px-4">
                    <div className="bg-secondary text-center rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h6 className="mb-0">Ultimos Relatorios</h6>
                        </div>
                        <div className="table-responsive">
                            AQUI ENTRA OS RELATORIOS
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Relatorios
