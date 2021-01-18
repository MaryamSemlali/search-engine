import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [searchResults, setSearchResults] = useState([]);

  const searchHandler = (event) => {
    event.preventDefault();
    getDataFromApi(event.target.value);
  };

  const getDataFromApi = (searchValue) => {
    let apiUrl = 'https://swapi.dev/api/people';

    fetch(searchValue ? apiUrl += `?search=${searchValue}` : apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const styles = {
    table: {
      "width": "100%",
      "fontFamily": "arial",
      "borderCollapse": "collapse",
      "marginTop": "20px"
    },
    trHeader: {
      border: "1px solid #dddddd",
      padding: "8px",
      backgroundColor: "#dddddd"
    },
    trBody: {
      border: "1px solid #dddddd",
      textAlign: "left",
      padding: "8px",
    },
    input: {
      "width": '50%',
      "padding": "12px 20px",
      "border": "1px solid #ccc",
      "borderRadius": "4px"
    }
  };

  return (
    <div className="App">
      <h1>People Search</h1>
      <input style={styles.input} type="text" id="search" name="search" onChange={searchHandler} placeholder="Search Value.." />

      <table style={styles.table}>
        <thead>
          <tr style={styles.trHeader}>
            <th>name</th>
            <th>height</th>
            <th>gender</th>
          </tr>
        </thead>
        <tbody>
          {
            searchResults.length > 0 && searchResults.map((item, key) => {
              return (
                  <tr key={key} style={styles.trBody}>
                    <td>{item.name}</td>
                    <td>{item.height}</td>
                    <td>{item.gender}</td>
                  </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}
