import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

//sweetalert2
import SweetAlert from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

class listComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listEmployee: []
    }
  }

  componentDidMount() {
    this.loadEmployee();
  }

  loadEmployee(){
    const url = 'http://192.168.1.45:3000/employee/list';
    Axios.get(url).then(res => {
      if (res.data.success) {
        const data = res.data.data;
        this.setState({ listEmployee: data });
      } else {
        alert('ERROR WEB SERVICE');
      }
    }).catch(error => {
      console.log(`ERROR SERVER -> ${error}`);
    });
  }

  render() {
    return (
      <table class="table table-hover table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Role</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th colspan="2">Action</th>
          </tr>
        </thead>
        <tbody>

          {this.loadFillData()}

        </tbody>
      </table>
    );
  }

  loadFillData() {
    return this.state.listEmployee.map((data) => {
      return (
        <tr>
          <th>{data.id}</th>
          <td>{data.role.role}</td>
          <td>{data.name}</td>
          <td>{data.email}</td>
          <td>{data.address}</td>
          <td>{data.phone}</td>
          <td>
            <Link class="btn btn-outline-info" to={"/edit/" + data.id}>Edit</Link>
          </td>
          <td>
            <button class="btn btn-outline-danger" onClick={() => this.onDelete(data.id)}> Delete </button>
          </td>
        </tr>
      )
    });
  }

  onDelete(id) {
    SweetAlert.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.sendDelete(id);
      } else if (result.dismiss === SweetAlert.DismissReason.cancel) {
        SweetAlert.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      }
    });
  }

  sendDelete(userId){
    // url de backend
    const baseUrl = "http://192.168.1.45:3000/employee/delete"
    
    Axios.post(baseUrl,{
      id:userId
    }).then(response =>{
      if (response.data.success) {
        SweetAlert.fire(
          'Deleted!',
          'Your employee has been deleted.',
          'success'
        );
        this.loadEmployee();
      }
    }).catch ( error => {
      alert(`ERROR DELETE -> ${error}`);
    });
  }
}

export default listComponent;