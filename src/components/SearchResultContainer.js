import React, { Component } from "react";
import SearchForm from "./SearchForm";
import ResultList from "./ResultList";
import API from "../utils/API";
import EmployeeCard from "./EmployeeCard";

class SearchResultContainer extends Component {
  state = {
    result: [],
    search: "",
    filter: "",
    filterBy: "lastName",
    currentSort: "default",
    sortField: ""
  };

  // When this component mounts, search the API (randomuser) for the following employee info. NOTE: can pass up to 3 parameters if needed, currently passing event and index.
  componentDidMount() {
    API.search()
      .then(res => this.setState({ 
        result: res.data.results.map((event,index) => ({
          firstName: event.name.first,
          lastName: event.name.last,
          picture: event.picture.large,
          email: event.email,
          phone: event.phone,
          dob: event.age,
          key: index
        }))
       }))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    event.preventDefault();
// Confirm that we're working with what we want to be working with
    console.log(event);
    const name = event.target.name;
    const value = event.target.value;
    console.log("----handleInputChange firing---");
    console.log(value);
    console.log(name);
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search randomuser API for `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    console.log(event);
    const name = event.target.name;
    const value = event.target.value;
    console.log("----handleFormSubmit firing---");
    console.log(value);
    console.log(name);
    this.filterEmployees(value);
    this.filterEmployees(this.state.search);
  };

  //Not sure I did the below correctly. Come back and review when other components are done. Basing first part off of API activity, and table part is taking friends activity and mapping values from randomuser API to a table instead of UL.
  render() {
    return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h1>RANDOM CO.Employee Directory</h1>
        </div>
      </div>
      <div className="row">
      <div className="col-lg-6">
        <SearchForm
          search={this.state.search}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
        <ResultList results={this.state.results} />
      </div>
      </div>
    
      <div className="row">
        <table className="table">
          <tr>
            <th scope="col">Employee Photo</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">D.O.B.</th>

          </tr>

          {[...this.state.result].map((item) =>
          <EmployeeCard
            picture={item.picture}
            firstName={item.firstName}
            lastName={item.lastName}
            email={item.email}
            phone={item.phone}
            dob={item.dob}
            key={item.key} />
          )}

        </table>
      </div>
    
    
    </div>
    );
  }
}

export default SearchResultContainer;
