import React from "react";

function ResultList(props) {
 
  return (
    <table className="table">
      
      {props.results.map(result => (
        <table styleName="width:100%" key={result.id}>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
          </tr>
          <tr>
            <td>Andrew</td>
            <td>Wade</td>
            <td>44</td>
          </tr>
        </table>
      ))}
    </table>
  )
};

export default ResultList;
