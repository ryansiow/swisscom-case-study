import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Base64 } from 'js-base64';

const Record = (props) => (
  <tr>
    <td>{props.record.firstName}</td>
    <td>{props.record.lastName}</td>
    <td>{props.record.department}</td>
    <td>{props.record.birthdate}</td>
    <td>{props.record.costCenter}</td>
    <td>
      <Link to={"/edit/" + props.record._id}>Edit</Link> |
      <a
        href="/"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default class RecordList extends Component {
  // This is the constructor that shall store data retrieved from the database
  constructor(props) {
    super(props);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.state = { records: [], firstNameBool: true, lastNameBool: true, departmentBool: true, birthdateBool: true, costCenterBool: true };
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleClick3 = this.handleClick3.bind(this);
    this.handleClick4 = this.handleClick4.bind(this);
    this.handleClick5 = this.handleClick5.bind(this);
  }

  // GET the data from the database.
  componentDidMount() {
    const tok = 'admin:password';
    const hash = Base64.encode(tok);
    const basicAuth = 'Basic ' + hash;
    console.log(basicAuth);
    axios
      .get('http://localhost:5000/record/', { headers: { 'Authorization': basicAuth }})
      .then((response) => {
        console.log(response.headers['Authorization']);
        this.setState({ records: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // DELETE a record based on the method
  deleteRecord(id) {
    const tok = 'admin:password';
    const hash = Base64.encode(tok);
    const basicAuth = 'Basic ' + hash;
    axios.delete("http://localhost:5000/" + id, { headers: { 'Authorization': basicAuth }}).then((response) => {
      console.log(response.data);
    });

    this.setState({
      record: this.state.records.filter((el) => el._id !== id),
    });
  }

  // Map out the users on the table
  recordList() {
    return this.state.records.map((currentrecord) => {
      return (
        <Record
          record={currentrecord}
          deleteRecord={this.deleteRecord}
          key={currentrecord._id}
        />
      );
    });
  }


  compareBy(key, ascending) {
    console.log("ascending  is: ", ascending);
    return function (a, b) {
      let reverse = ascending ? 1 : -1;
      if (a[key] < b[key]) return -1 * reverse;
      if (a[key] > b[key]) return 1 * reverse;
      return 0;
    };
  }

  sortBy(key, ascending) {
    let arrayCopy = [...this.state.records ];
    arrayCopy.sort(this.compareBy(key, ascending));
    this.setState({records: arrayCopy});
  }

  handleClick1() {
  	this.setState({ firstNameBool: !this.state.firstNameBool });
  }
  handleClick2() {
  	this.setState({ lastNameBool: !this.state.lastNameBool });
  }
  handleClick3() {
  	this.setState({ departmentBool: !this.state.departmentBool });
  }
  handleClick4() {
  	this.setState({ birthdateBool: !this.state.birthdateBool });
  }
  handleClick5() {
  	this.setState({ costCenterBool: !this.state.costCenterBool });
  }

  // Display the table with the records of individuals.
  render() {
    return (
      <div>
        <h3>Record List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th><button type="button" onClick={() => {this.sortBy('firstName', this.state.firstNameBool); this.handleClick1(); }}>First Name</button></th>
              <th><button type="button" onClick={() => {this.sortBy('lastName', this.state.lastNameBool); this.handleClick2();}}>Last Name</button></th>
              <th><button type="button" onClick={() => {this.sortBy('department', this.state.departmentBool); this.handleClick3();}}>Department</button></th>
              <th><button type="button" onClick={() => {this.sortBy('birthdate', this.state.birthdateBool); this.handleClick4();}}>Birthdate</button></th>
              <th><button type="button" onClick={() => {this.sortBy('costCenter', this.state.costCenterBool); this.handleClick5();}}>CostCenter</button></th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.recordList()}</tbody>
        </table>
      </div>
    );
  }
}
