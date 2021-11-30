import React, { Component } from "react";
import axios from 'axios';
import { Base64 } from 'js-base64';

export default class Create extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangePersonFirstName = this.onChangePersonFirstName.bind(this);
    this.onChangePersonLastName = this.onChangePersonLastName.bind(this);
    this.onChangePersonBirthDate = this.onChangePersonBirthDate.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeCostCenter = this.onChangeCostCenter.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      department: "",
      costCenter: "",
      birthdate: ""
    };
  }

  // These methods will update the state properties.
  onChangePersonFirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  onChangePersonLastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  onChangePersonBirthDate(e) {
    this.setState({
      birthdate: e.target.value,
    });
  }

  onChangeDepartment(e) {
    this.setState({
      department: e.target.value,
    });
  }

  onChangeCostCenter(e) {
    this.setState({
      costCenter: e.target.value,
    });
  }

// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();

    // When post request is sent to the create url, axios will add a new record(newperson) to the database.
    const newperson = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      birthdate: this.state.birthdate,
      department: this.state.department,
      costCenter: this.state.costCenter
    };

    const tok = 'admin:password';
    const hash = Base64.encode(tok);
    const basicAuth = 'Basic ' + hash;
    axios
      .post("http://localhost:5000/record/add", newperson, { headers: { 'Authorization': basicAuth }})
      .then((res) => console.log(res.data));

    // We will empty the state after posting the data to the database
    this.setState({
      firstName: "",
      lastName: "",
      birthdate: "",
      department: "",
      costCenter: ""
    });
  }

  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create New Record</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>First Name of the person: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.firstName}
              onChange={this.onChangePersonFirstName}
            />
          </div>
          <div className="form-group">
            <label>Last Name of the person: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.lastName}
              onChange={this.onChangePersonLastName}
            />
          </div>
          <div className="form-group">
            <label>Person's Birthdate: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.birthdate}
              onChange={this.onChangePersonBirthDate}
            />
          </div>
          <div className="form-group">
            <label>Person's Department: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.department}
              onChange={this.onChangeDepartment}
            />
          </div>
          <div className="form-group">
            <label>Person's costCenter: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.costCenter}
              onChange={this.onChangeCostCenter}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create person"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
