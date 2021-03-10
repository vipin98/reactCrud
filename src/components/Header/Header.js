import React, { Component } from 'react';
import {Navbar,Nav}from 'react-bootstrap'
import './Header.module.css';
import {Link} from 'react-router-dom'

class Header extends Component {
    render() { 
      const myStyle = {
        // backgroundColor: "#ddc3cd",
        alignItems: "center",
        display:"flex",
        justifyContent:"center",
        color:"white"

      }
        return (
            <Navbar style={myStyle} className="mr-auto" expand="lg" >
              <Nav.Item>  <Link to="/" >Add User</Link> </Nav.Item>
            
              <Nav.Item><Link  to="/AllUsers">AllUser</Link></Nav.Item>
             
            </Navbar>
          );
    }
}
 
export default Header;
