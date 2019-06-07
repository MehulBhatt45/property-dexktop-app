import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { config } from '../../config';
// import * as $ from 'jquery'
import { ReactIndexedDB } from 'react-indexed-db';
var loadjs = require('loadjs');
class PropertyContainer extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      properties: []
    }
    this.db = new ReactIndexedDB('propertyDB', 1);
  }

  componentDidMount(){
    console.log("log between 17 and 18", this.db);
    this.db.openDatabase(1, (evt) => {
      console.log("evt on line 19", evt)
      evt.currentTarget.result.createObjectStore('property', { keyPath: '_id', autoIncrement: true });
    }).then(()=>{
      this.db.getAll('property').then(
        property => {
          console.log(property)
          this.setState({properties: property});
            loadjs('/scripts/owl.carousel.min.js',()=>{
              loadjs('/scripts/custom.js', ()=>{
                // $('.footer-shadow').css({'visibility': 'hidden'});
              });
            });
        },
        error => {
          console.log(error);
        }
      );
    }).catch(err=>{
      console.log(err);
    });
    // fetch(config.baseApiUrl+'/property/',{
    //   method: 'GET'
    // }).then(res=>{
    //   return res.json();
    // }).then(jsonRes=>{
    //   this.setState({properties: jsonRes.data});
    //   loadjs('/scripts/owl.carousel.min.js',()=>{
    //     loadjs('/scripts/custom.js', ()=>{
    //       // $('.footer-shadow').css({'visibility': 'hidden'});
    //     });
    //   });
    // }).catch(err=>{
    //   console.error(err);
    // })
  }

  renderProperties(){
    return(
      this.state.properties.map(property=>
        <div className="carousel-item" key={property._id}>
        <div className="listing-item">
        
        <Link to={"/property-single/"+property._id} className="listing-img-container">
        
        <div className="listing-badges">
        <span>{property.status}</span>
        </div>
        
        <div className="listing-img-content">
        <span className="listing-price">${property.price} {property.currency}</span>
        <span className="like-icon with-tip" data-tip-content="Agregar a favoritos"></span>
        </div>
        
        <div className="listing-carousel">
        {property.images.length>0?
          property.images.map((image, i)=>
          <div key={i}><img src={config.baseMediaUrl+image} alt="" onError={()=>this.src='images/no-priview.jpg'}/></div>
          ):<div><img src='images/no-preview.png' alt="" /></div>
        }
        </div>
        
        </Link>
        
        <div className="listing-content">
        
        <div className="listing-title">
        <h4><a href="/">{property.title}</a></h4>
        <a href="https://maps.google.com/maps?q=221B+Baker+Street,+London,+United+Kingdom&hl=en&t=v&hnear=221B+Baker+St,+London+NW1+6XE,+United+Kingdom" className="listing-address popup-gmaps">
        <i className="fa fa-map-marker"></i>
        {property.location.address}
        </a>
        </div>
        
        <ul className="listing-features">
        <li>Construcción <span>{property.attributes.area.number} {property.attributes.area.unit}</span></li>
        <li>Recámaras <span>{property.attributes.bedrooms}</span></li>
        <li>Baños <span>{property.attributes.bathrooms}</span></li>
        </ul>
        
        {/* <div className="listing-footer">
        <a href="/"><i className="fa fa-user"></i> {property.agent.name}</a>
        </div> */}
        
        </div>
        
        </div>
        </div>
        )
    )
  }

  render() {
    return (
      this.state.properties.length ?
      <div className="container">
      <div className="row">
      
      <div className="col-md-12">
      <h3 className="headline margin-bottom-25 margin-top-65">Nuevas Propiedades</h3>
      </div>
      
      <div className="col-md-12">
      <div className="carousel">
      {this.renderProperties()}      
      </div>
      </div>
      
      </div>
      </div> : <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><h2>No properties found</h2></div>
      );
    }
  }
  export default PropertyContainer;