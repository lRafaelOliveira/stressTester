import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'

function Home() {
    const [showSpinner, setShowSpinner] = useState(true);
    const [cpuUsage, setCpuUsage] = useState(0);
    const [memoryUsage, setMemoryUsage] = useState(0);
    const [discoUsage, setDiscoUsage] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [countRequests, setcountRequests] = useState(1);
    const [lastRequests, setlastRequests] = useState([]);

    useEffect(() => {
        // zerando o loading
        setTimeout(() => {
            setShowSpinner(false);
        }, 1000);

        // pegando o valor do de uso da cps
        setInterval(() => {
            atualizaInfos();
        }, 5000)
        getLastRequests();
    }, []);

    const atualizaInfos = async () => {
        axios.get('http://localhost:3000/getInfos')
            .then(response => {
                if (response.data.code == 200) {
                    let data = response.data.data
                    setCpuUsage(((data.cpuUsagePercent)).toFixed(2))
                    setMemoryUsage((data.memoryUsagePercent).toFixed(2))
                    setDiscoUsage((data.usedPercent).toFixed(2))
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }
    function handleCountRequests(event) {
        setcountRequests(event.target.value);
    }
    const iniciarRequests = async () => {
        setShowSpinner(true);
        let links = inputValue.split(';')
        axios.get(`http://localhost:3000/stress?countRequests=${countRequests}&links=${links}`)
            .then(response => {
                if (response?.data?.code == 200) {
                    console.log(response.data)
                }
                setShowSpinner(false);
            })
            .catch(error => {
                console.log(error);
                setShowSpinner(false);
            });
    }

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
                                    <h6 className="mb-0">{cpuUsage}%</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-chart-bar fa-3x text-primary"></i>
                                <div className="ms-3">
                                    <p className="mb-2">RAM</p>
                                    <h6 className="mb-0">{memoryUsage}%</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-chart-area fa-3x text-primary"></i>
                                <div className="ms-3">
                                    <p className="mb-2">Disco</p>
                                    <h6 className="mb-0">{discoUsage}%</h6>
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
                        <div className="col-sm-12 col-xl-3" style={{ width: 100 + '%', textAlign: 'center' }}>
                            <label>Insira o link:</label><br />
                            <textarea style={{ width: 80 + '%', background: '#ccc' }} rows={5} value={inputValue} onChange={handleInputChange}></textarea><br />
                            <label>Quantidade de Requests:</label><br />
                            <input value={countRequests} onChange={handleCountRequests} style={{ width: 10 + '%', background: '#ccc' }} /><br /><br />
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
                                        <th scope="col">Duração</th>
                                        <th scope="col">#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lastRequests && lastRequests.map(x => (
                                        <tr key={x.nome}>
                                            <td></td>
                                            <td>{x.nome}</td>
                                            <td>{x.conteudo[0].url}</td>
                                            <td>{x.conteudo[0].requests}</td>
                                            <td>{x.conteudo[0].successCount}</td>
                                            <td>{x.conteudo[0].errorCount}</td>
                                            <td>{x.conteudo[0].avgDuration.toFixed(0)} s</td>
                                            <td><a className="btn btn-sm btn-primary" href="/">Ver</a></td>
                                        </tr>
                                    ))}

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
