import React ,{ Component } from 'react'
import {  Button,Container,Table,Modal} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import UserRegistration from '../UserRegistration/UserRegistration'


export class AllUsers extends Component {
  state={
    Users:[],
    editUsers:false
  }
   EditUser=(id)=>{
    this.toggleBannerEditModal()
    console.log("auau",id)
 this.setState({id :id })
  }
  toggleBannerEditModal = () => {
    console.log("kkk",this.state.editUsers)
    this.setState({ editUsers: !this.state.editUsers })
}

// Delete User
hendelDelete=(id)=>{
  axios({
    url: `http://localhost:3003/users/${id}`,
    method: "Delete",
    headers:{
      "Content-Type": "multipart/form-data"
    },
   
  })
    .then(response => {
    toast.success(`${id} is deleted`)
     this.fetchData()
    })
    .catch(error => {
    
    console.log(error)
    })
}

//  Get All Users data
fetchData=()=>{
  axios({
    url: `http://localhost:3003/users`,
    method: "get",
    headers:{
      "Content-Type": "multipart/form-data"
    },
   
  })
    .then(response => {
     this.setState({ Users: response.data.reverse() })
    
     
    })
    .catch(error => {
    
    console.log(error)
    })
}
componentDidMount=()=>{
  this.fetchData()
}
    render() {
      console.log("us",this.state.Users)
        return (
          <div >
            <ToastContainer position="top-right" />
             <Container >
              <Modal  style={{opacity:1,paddingTop:"150px"}} show={this.state.editUsers} onHide={this.toggleBannerEditModal} >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                  <UserRegistration Edit={this.state.editUsers} id={this.state.id} toggleBannerEditModal={this.toggleBannerEditModal} fetchData={this.fetchData}/>  
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.toggleBannerEditModal}>Close</Button>
                        <Button variant="primary" onClick={this.updateHandler}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
                
               <Table responsive hover>
                <thead>
                  <tr key="header">
                    <th scope="col">Sr.no</th>
                    <th scope="col">Name<span className="asterisk">*</span></th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">Address</th>
                    <th scope="col">Gender</th>
                    <th scope="col">College<span className="asterisk">*</span></th>
                    <th scope="col">Hobbies<span className="asterisk">*</span></th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody >
               {
                this.state.Users.map((item ,index)=>
                  <tr key={index} style={{ backgroundColor: "#ededed",textAlign:"left" }}>
                    <td>{index+1}</td>
                  <td>{item.name}</td>
                  <td>{item.Birth}</td>
                  <td>{item.address}</td>
                  <td>{item.Gender}</td>
                  <td>{item.colleges}</td>
                  <td>{item.hobbies}</td>
                  <td><Button type="submit" variant="info"onClick={() => this.EditUser(item.id)}>Edit</Button>  &nbsp;
                <Button type="submit" variant="info" onClick={() => this.hendelDelete(item.id)}>Delete</Button></td>
              </tr>
                )
                }
                </tbody>
                  
                  
               </Table>
               
            </Container>
          </div>
            
        )
    }
}

export default AllUsers
