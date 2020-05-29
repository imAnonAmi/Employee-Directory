import React, { Component } from "react";
import SearchForm from "./SearchForm";
import ResultList from "./ResultList";
import API from "../utils/API";


class SearchResultContainer extends Component {
  state = {
    result: [],
    filteredUser: [],
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
        result: res.data.results,
        filteredUser: res.data.results
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
   this.filterEmployees();
   // this.filterEmployees(this.state.search);
  };


  filterEmployees = (value) => { console.log("Search result: ", this.state.search)
    const newArray = this.state.filteredUser.filter(item => {
      // merge data together, then see if user input is anywhere inside
      let values = Object.values(item)
        .join("")
        .toLowerCase();
      return values.indexOf(this.state.search.toLowerCase()) !== -1;
    });
    console.log(newArray);
    this.setState({ filteredUser: newArray})
  }

  //Not sure I did the below correctly. Come back and review when other components are done. Basing first part off of API activity, and table part is taking friends activity and mapping values from randomuser API to a table instead of UL.
  render() {
    return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h1>RANDOM CO. Employee Directory</h1>
        </div>
      </div>
      <div className="row">
      <div className="col-lg-6">
        <SearchForm
          search={this.state.search}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
        <ResultList result={this.state.filteredUser} />
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



        </table>
      </div>
    
    
    </div>
    );
  }
}

export default SearchResultContainer;
