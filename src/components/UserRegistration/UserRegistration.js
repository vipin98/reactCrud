import React, { Component } from 'react'
import { Form, Col, Button, Figure, Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import classes from './UserRegistration.module.css'
import CheckBox from '../CheckBox'

class UserRegistraion extends Component {
  state = {
    name: "",
    Birth: "",
    address: "",
    Gender: "",
    hobbiesList: [
      { id: 1, value: "Reading", isChecked: false },
      { id: 2, value: "Gaming", isChecked: false },
      { id: 3, value: "traveling", isChecked: false },
      { id: 4, value: "Drawing", isChecked: false },
      { id: 5, value: "other", isChecked: false }
    ],
    hobbies: [],
    OtherHobbies: "",
    collegesData: [],
    colleges: "",
    Edit: false,
    Coding: false,
    Cricket: false

  }
  componentDidMount = () => {
    if (this.props.Edit) {
      this.setState({ Edit: this.props.Edit, id: this.props.id })
      console.log("data")
      axios({
        url: `http://localhost:3003/users/${this.props.id}`,
        method: "Get",
        headers: {
          "Content-Type": "multipart/form-data"
        },
      })
        .then(response => {
          this.setState({
            name: response.data.name,
            Birth: response.data.Birth,
            address: response.data.address,
            Gender: response.data.Gender,
            hobbies: response.data.hobbies,
            colleges: response.data.colleges
          })

        })
        .catch(error => {

          console.log(error)
        })
    }
    axios({
      url: `http://universities.hipolabs.com/search?name=middle`,
      method: "Get",
      headers: {
        "Content-Type": "multipart/form-data"
      },
    })
      .then(response => {
        this.setState({ collegesData: response.data })

      })
      .catch(error => {

        console.log(error)
      })

  }

  //  On change inputs
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  // on Change Checkbox value
  handleCheckChieldElement = (event) => {
    let hobbiesList = this.state.hobbiesList
    hobbiesList.forEach(hobbies => {
      if (hobbies.value === event.target.value)
        hobbies.isChecked = event.target.checked
    })
    this.setState({ hobbiesList: hobbiesList })
  }

  //  post user data
  submitHandler = async (e) => {
    e.preventDefault()
    console.log("kkk", this.state)
    let formData = new FormData();
    for (let [key, value] of Object.entries(this.state)) {
      switch (key) {
        case 'collegesData':
          break;
        case "OtherHobbies":
          break;
        case "hobbies":
          break;
        default:
          formData.append(`${key}`, value)
      }
    }
    for (var [key, value] of formData.entries()) {
      if (value === '' || value === undefined || value === {}) {
        console.log(key + ': ' + value);
        return toast.error(`${key} is required!`)
      }
    }
    let hobi = []
    this.state.hobbiesList.forEach(hobbies => {
      if (hobbies.isChecked === true && hobbies.value != "other")
        hobi.push(hobbies.value)
    })

    if (this.state.OtherHobbies != "") {
      hobi.push(this.state.OtherHobbies)
      console.log("ll", hobi)

    }
    //  user data
    let form = {
      name: this.state.name,
      Birth: this.state.Birth,
      address: this.state.address,
      Gender: this.state.Gender,
      hobbies: hobi,
      colleges: this.state.colleges
    }
    await axios.post("http://localhost:3003/users", form)
      .then(response => {
        this.props.history.push("/AllUsers")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //  Update user logic
  updateHandler = async (e) => {
    e.preventDefault()
    // this.handleClose()

    console.log("data: ", this.state)
    let formData = new FormData();
    for (let [key, value] of Object.entries(this.state)) {
      switch (key) {
        case 'collegesData':
          break;
        case "OtherHobbies":
          break;
        case "hobbies":
          break;
        default:
          formData.append(`${key}`, value)
      }
    }
    for (var [key, value] of formData.entries()) {
      if (value === '' || value === undefined || value === {}) {
        console.log(key + ': ' + value);
        return toast.error(`${key} is required!`)
      }
    }

    //  Check box logic
    let hobi = []
    this.state.hobbiesList.forEach(hobbies => {
      if (hobbies.isChecked === true && hobbies.value != "other")
        hobi.push(hobbies.value)
    })

    if (this.state.OtherHobbies != "") {
      hobi.push(this.state.OtherHobbies)
      console.log("ll", hobi)

    }

    // Updated data
    let form = {
      id: this.props.id,
      name: this.state.name,
      Birth: this.state.Birth,
      address: this.state.address,
      Gender: this.state.Gender,
      hobbies: hobi,
      colleges: this.state.colleges
    }
    await axios.put(`http://localhost:3003/users/${this.props.id}`, form)
      .then(response => {
        this.props.toggleBannerEditModal();
        this.props.fetchData()
        toast.success(`${response.data.name} Details updated successfully!`)
      })
      .catch(error => {
        console.log(error)
      })
  }




  render() {
    const { name, Birth, address, gender, hobbies, collegesData, hobbiesList } = this.state;
    return (
      <div style={{ width: "50%", height: "50%", textAlign: "left", margin: "auto" }}>
        <ToastContainer position="top-right" />
        <Form onSubmit={this.submitHandler}>
          <Form.Group>

            <Col>
              <Form.Label>Name: <span className="asterisk"> *</span></Form.Label>
              <Form.Control type="text" placeholder="Enter Your Name here" name="name" value={name} onChange={this.changeHandler} />
            </Col>
            <Col>
              <Form.Label>Date Of Birth: </Form.Label>
              <Form.Control type="date" placeholder="Enter Your Date Of Birth" name="Birth" value={Birth} onChange={this.changeHandler} />
            </Col>
            <Col>
              <Form.Label>Address: <span className="asterisk"> *</span></Form.Label>
              <textarea className="form-control" rows="3" name="address" value={address} onChange={this.changeHandler} />

            </Col>
            <Form.Label>Gender: </Form.Label>
            <Col>

              <input className="form-check-input" type="radio" name="Gender" id="exampleRadios1" value="male" onChange={this.changeHandler} />&nbsp;
                                <label className="form-check-label" for="exampleRadios1">
                                   Men
                                 </label>&nbsp;


                                 <input className="form-check-input" type="radio" name="Gender" id="exampleRadios2" value="female" onChange={this.changeHandler} />&nbsp;
                                 <label className="form-check-label" for="exampleRadios2">
                                  Female
                                  </label>&nbsp;


                                 <input className="form-check-input" type="radio" name="Gender" id="exampleRadios3" value="other" onChange={this.changeHandler} />&nbsp;
                                  <label className="form-check-label" for="exampleRadios3">
                                   Other
                                  </label>
            </Col>
            <Col>
              <Form.Label>College: </Form.Label>
              <Form.Control as="select" name="colleges" value={this.state.colleges} onChange={this.changeHandler}>
                <option defaultValue value="">Select colleges</option>
                {
                  collegesData.map((data, index) =>
                    <option key={index} value={data.name}>{data.name}</option>
                  )
                }
              </Form.Control>
            </Col>
            <Col>
              <Form.Label>Hobbies: <span className="asterisk"> *</span></Form.Label>
              {/* Checkbox  */}
              {
                this.state.hobbiesList.map((hobbiesList) => {
                  return (<CheckBox handleCheckChieldElement={this.handleCheckChieldElement}  {...hobbiesList} />)
                })


              }
              {/* Other Input For check box */}
              {this.state.hobbiesList.map((hobbiesList) =>
                hobbiesList.value === "other" && hobbiesList.isChecked === true ? <input type="text" name="OtherHobbies" onChange={this.changeHandler} /> : null
              )
              }


            </Col>


          </Form.Group>
          {this.props.Edit ? <Button onClick={this.updateHandler}>Update</Button> : <Button type="submit" variant="info">Submit</Button>}
        </Form>
      </div>
    )
  }
}

export default UserRegistraion