import React from 'react';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
// import * as $ from 'jquery';

class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isAdmin: localStorage.getItem('admin')?true:false
    };
  }

  componentDidMount(){
    console.log("in mount func");
    this.setState({
      isAdmin: localStorage.getItem('admin')?true:false
    })
  }

  logout(){
    swal("Are you sure?", "Do you want to logout?", "info", {
      buttons: {
        "Yes": true,
        "Cancle": true
      },
    })
    .then((value) => {
      switch(value){
        case "Yes":
          localStorage.clear();
          window.location.reload();
        break;
        case "Cancle":
          console.log("Cancle Clicked")
        break;

        default:
          console.log("Default");

      }
    });
  }

  render() {
    return (
      <header id="header-container">

    
    <div id="top-bar">
      <div className="container">

        
        <div className="left-side">

          
          <ul className="top-bar-menu">
            <li><i className="fa fa-phone"></i><a href="tel:55204000"> 55 20 4000 </a></li>
            <li><i className="fa fa-envelope"></i> <a href="mailto:contacto@rojkind.com.mx">contacto@rojkind.com.mx</a></li>
          </ul>

        </div>
        


        
        <div className="right-side">

          
          <ul className="social-icons">
            <li><a className="facebook" href="/"><i className="icon-facebook"></i></a></li>
            <li><a className="twitter" href="/"><i className="icon-twitter"></i></a></li>
            <li><a className="linkedin" href="/"><i className="icon-linkedin"></i></a></li>
          </ul>

        </div>
        

      </div>
    </div>
    <div className="clearfix"></div>
    


    
    <div id="header">
      <div className="container">

        
        <div className="left-side">

          
          <div id="logo">
            <a href="index.html"><img src="images/logo.png" alt="" /></a>
          </div>


          
          <div className="mmenu-trigger">
            <button className="hamburger hamburger--collapse" type="button">
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>


          <nav id="navigation" className="style-1">
            <ul id="responsive">

              <li><NavLink activeClassName="current" to="/home">Inicio</NavLink></li>
              <li><NavLink activeClassName="current" to="/agents">Nosotros</NavLink></li>
              <li><NavLink activeClassName="current" to="/property-search">Propiedades</NavLink></li>
              <li><NavLink activeClassName="current" to="/contact">Contacto</NavLink></li>
              {/* {this.state.isAdmin?<li><a href="javascript:void(0)" onClick={()=>{console.log("LOGOUT")}}>Cerrar sesión</a></li>:null} */}

            </ul>
          </nav>
          <div className="clearfix"></div>
          

        </div>
        

        <div className="right-side">
          
          <div className="header-widget" style={{marginRight: 5}}>
            <NavLink to="/add-property" className="button border">Publica tu propiedad</NavLink>
          </div>
          {/* <div className="header-widget">
          <a className="button border" onClick={this.logout}>Cerrar sesión</a>
          </div> */}
        </div>

      </div>
    </div>
    

  </header>

);	
}
}

export default Header;