import './App.css';
import { useState, useEffect } from 'react';
function App() {
  const [countries, setCountries] = useState();
  const [exchange, setExchange] = useState(true);

  useEffect(() => {
    async function getUsers() {
      const response = await fetch('/ivhq-fed-test.json', {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });

      const data = await response.json();

      setCountries(data);
    }

    getUsers();
  }, []);
  
  return (
    <div className='App'>
      <div className='App-header'>    
        <header id='header' className='container-fluid header--padding header--border header--border'>
          <div className='container'>
              <div className='col-12'>
                  <span className='header--title'>IVHQ Frontend Technical Test</span>
              </div>
          </div>
        </header>
      </div>
      <div id='main' className='container-fluid main'>
          <div className='container d-flex justify-content-center pb-3 pt-5'>
            <div className='col-lg-9 col-12 d-flex justify-content-end'>
              <div class="exchange-button" id="exchange" onClick={() => setExchange(!exchange)}>Change Currency</div>
            </div>
          </div>
          <div className='container d-flex justify-content-center'>
            <div className='col-lg-9 col-12 grid'>
              <div className='grid-row'>
                {countries?.map((country) => 
                (<div className='grid-row' key={country.id}>                  
                    {country.projects.map((project) => (
                      <div key={project.project_name} className='row'>
                        <h5 className='country-header'>Destination: {country.name}</h5>
                        <div className='row grid-header d-flex'>
                          <div id='project' className='col-3 d-flex'>Project</div>
                          <div id='duration' className='col-3 d-flex'>Duration</div>
                          <div id='value' className='col-3 d-flex'>Value</div>
                          <div id='disclaimer' className='col-3 d-flex'>Disclaimer</div>
                        </div>
                        <div className='row pb-5 pt-2'>
                          <div className='col-3 d-flex row'>
                            <h6>{project.project_name}</h6>
                          </div>
                          <div className='col-6 container'>
                          {project.fees.map((fee) => (
                            <div className='row'>
                              <div className='col-6 d-flex padding-left'>{fee.duration}</div>
                              <div className='col-6 d-flex padding-left'>{exchange ? fee.costs.us + ' USD' : fee.costs.gb + ' GB'}</div>
                            </div>
                            ))}
                          </div>
                          <div className='col-3 d-flex disclaimer'>{project.fees_disclaimer}</div>
                        </div>
                      </div>
                    ))}
                </div>)
                )}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
