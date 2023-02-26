import React, { useState, useEffect } from 'react';
import { getSystemInfo } from '../../hooks/getSysteminfo';
import './index.css'

function Home() {
    const [showSpinner, setShowSpinner] = useState(true);
    const [cpuUsage, setCpuUsage] = useState(0);
    const [memoryUsage, setMemoryUsage] = useState(0);

    useEffect(() => {
        // zerando o loading
        setTimeout(() => {
            setShowSpinner(false);
        }, 1000);
        // pegando o valor do de uso da cps
        let data = getSystemInfo()
        console.log(data)
    }, []);
    const iniciarRequests = () => {
        setShowSpinner(true);
        console.log('OKOK')
        setTimeout(() => {
            setShowSpinner(false);
        }, 10000);
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
                    <a href="index.html" className="navbar-brand mx-4 mb-3">
                        <h3 className="text-primary"><i className="fa fa-user-edit me-2"></i>UFG</h3>
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
                                    <h6 className="mb-0">{cpuUsage}%</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-chart-bar fa-3x text-primary"></i>
                                <div className="ms-3">
                                    <p className="mb-2">RAM</p>
                                    <h6 className="mb-0">12%</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-chart-area fa-3x text-primary"></i>
                                <div className="ms-3">
                                    <p className="mb-2">Disco</p>
                                    <h6 className="mb-0">34</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-chart-pie fa-3x text-primary"></i>
                                <div className="ms-3">
                                    <p className="mb-2">Ultima Checagem</p>
                                    <h6 className="mb-0">12:35</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid pt-4 px-4">
                    <div className="bg-secondary rounded p-4">
                        <div className="col-sm-12 col-xl-3" style={{ width: 60 + 'vw' }}>
                            <label>Insira o link:</label>
                            <textarea style={{ width: 60 + 'vw', background: '#ccc' }} rows={5}></textarea>
                            <button className='btn-init-requests' onClick={iniciarRequests}>Iniciar</button>
                        </div>
                    </div>
                </div>
                <div className="container-fluid pt-4 px-4">
                    <div className="bg-secondary text-center rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h6 className="mb-0">Ultimos Relatorios</h6>
                        </div>
                        <div className="table-responsive">
                            <table className="table text-start align-middle table-bordered table-hover mb-0">
                                <thead>
                                    <tr className="text-white">
                                        <th scope="col"><input className="form-check-input" type="checkbox" /></th>
                                        <th scope="col">Data</th>
                                        <th scope="col">Link</th>
                                        <th scope="col">Requests</th>
                                        <th scope="col">Sucessos</th>
                                        <th scope="col">Falhas</th>
                                        <th scope="col">#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input className="form-check-input" type="checkbox" /></td>
                                        <td>26 Fev 2023</td>
                                        <td>google.com</td>
                                        <td>50</td>
                                        <td>50</td>
                                        <td>0</td>
                                        <td><a className="btn btn-sm btn-primary" href="/">Ver</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
