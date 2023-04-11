import './App.css';
// import data from 'https://api.jsonserve.com/nx4it9';
import data from './ivhq-fed-test.json';
import { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState();

  useEffect(() => {
    async function getUsers() {
      const response = await fetch('https://gist.githubusercontent.com/xavierperera/4865fcf80fe93fcefac0b846bad0e98b/raw/aa40a9305697c8b2f1a9cbb8a16a3ca44362734f/ivhq-fed-test.json', {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });

      const data = await response.json();

      setUsers(data);
    }

    getUsers(users);
  }, []);
  
  return (
    <div className='App'>
      <div className='App-header'>    
        <div id='header' className='container-fluid header--padding header--border header--border'>
          <div className='container'>
              <div className='col-12'>
                  <span className='header--title'>IVHQ Frontend Technical Test</span>
              </div>
          </div>
        </div>
      </div>
      <div id='main' className='container-fluid main'>
          <div className='container'>
            <div className='col-12 text-center pb-3'>Grid</div>
          </div>
          <div className='container d-flex justify-content-center'>
            <div className='col-6 grid text-center'>
                <div className='row'>
                  <div className='col-4 text-center'>Country</div>
                  <div className='col-4 text-center'>Country code</div>
                  <div className='col-4 text-center'>Value</div>
                </div>
                {data.map((data, key) => {
                  return (
                  <div>
                    {data.projects.map((fee, index) => {
                      return (
                        <div key={index}>
                          {fee.fees.map((cost, index) => {
                            return (
                              <div className='row'>
                                <div className='col-4 text-center' key={key} id={data.id}>{data.name}</div>
                                <div className='col-4 text-center' key={key}>{data.country_code}</div>
                                <div className='col-4 text-center' key={index}>{cost.costs.us}</div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                  );
                })}
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
