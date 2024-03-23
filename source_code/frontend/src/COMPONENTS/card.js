import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Table.css'; 

function Table() {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const response = await axios.get('https://disease.sh/v3/covid-19/countries');
        setCountriesData(response.data.slice(0, 10)); 
      } catch (error) {
        console.error('Error fetching countries data:', error);
      }
    };

    fetchCountriesData();
  }, []);

  return (
    <div className="table-container">
      <h1>COVID-19 Statistics by Country</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Country</th>
            <th>Total Cases</th>
            <th>Total Deaths</th>
            <th>Total Recovered</th>
          </tr>
        </thead>
        <tbody>
          {countriesData.map(country => (
            <tr key={country.country}>
              <td>{country.country}</td>
              <td>{country.cases.toLocaleString()}</td>
              <td>{country.deaths.toLocaleString()}</td>
              <td>{country.recovered.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
