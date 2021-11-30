import React, { Component } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Base64 } from 'js-base64';

// const withNavigate = props => {
//   const navigate = useNavigate();
// }
class Edit extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangePersonFirstName = this.onChangePersonFirstName.bind(this);
    this.onChangePersonLastName = this.onChangePersonLastName.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeCostCenter = this.onChangeCostCenter.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      person_firstName: "",
      person_lastName: "",
      person_department: "",
      person_costCenter: "",
      records: [],
    };
  }
  // This will get the record based on the id from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/record/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          person_firstName: response.data.firstName,
          person_lastName: response.data.lastName,
          person_department: response.data.department,
          person_costCenter: response.data.costCenter,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // These methods will update the state properties.
  onChangePersonFirstName(e) {
    this.setState({
      person_firstName: e.target.value,
    });
  }

  onChangePersonLastName(e) {
    this.setState({
      person_lastName: e.target.value,
    });
  }

  onChangeDepartment(e) {
    this.setState({
      person_department: e.target.value,
    });
  }

  onChangeCostCenter(e) {
    this.setState({
      person_costCenter: e.target.value,
    });
  }

  // This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
    const newEditedperson = {
      person_firstName: this.state.person_firstName,
      person_lastName: this.state.person_lastName,
      person_department: this.state.person_department,
      person_costCenter: this.state.person_costCenter
    };
    console.log(newEditedperson);

    // This will send a post request to update the data in the database.
    const tok = 'admin:password';
    const hash = Base64.encode(tok);
    const basicAuth = 'Basic ' + hash;
    axios
      .post(
        "http://localhost:5000/update/" + this.props.match.params.id,
        newEditedperson,
        { headers: { 'Authorization': basicAuth }}
      )
      .then((res) => console.log(res.data));

    this.props.history.push("/");
  }

  // This following section will display the update-form that takes the input from the user to update the data.
  render() {
    return (
      <div>
        <h3 align="center">Update Record</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Person's First Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.person_firstName}
              onChange={this.onChangePersonFirstName}
            />
          </div>
          <div className="form-group">
            <label>Person's First Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.person_lastName}
              onChange={this.onChangePersonLastName}
            />
          </div>
          <div className="form-group">
            <label>Person's Department: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.person_department}
              onChange={this.onChangeDepartment}
            />
          </div>
          <div className="form-group">
            <label>Person's costCenter: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.person_costCenter}
              onChange={this.onChangeCostCenter}
            />
          </div>
          <br />

          <div className="form-group">
            <input
              type="submit"
              value="Update Record"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

function withNavigate(Component) {
  // let navigate = useNavigate();
  // return <Edit {...props} navigate={navigate} />
  return props => < Component {...props} navigate={useNavigate()} />
}
// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.

//export default withRouter(Edit);
export default withNavigate(Edit);
