import React, { Component } from "react";
import TileBar from './TileBar/TileBar';
import Container1 from './Container1/Container1';
import Container2 from './Container2/Container2';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
// import { config } from '../config';
import Loader from 'react-loader-spinner';
import { ReactIndexedDB } from 'react-indexed-db';
var loadjs = require('loadjs');
class PropertySingle extends Component {

	constructor(props){
		super(props);
		this.state= {
			propertyId: this.props.match.params.id,
			property: null
		}
		this.db = new ReactIndexedDB('propertyDB', 1);
	}
	componentDidMount(){
		this.setState({propertyId: this.props.match.params.id})
		loadjs('/scripts/mmenu.min.js',()=>{
			loadjs('/scripts/custom.js', ()=>{
			  // $('.footer-shadow').css({'visibility': 'hidden'});
			});
		  });
	}
	
	// componentWillUnmount(){
	// 	window.location.reload()
	//   }
	
	componentWillMount(){
		this.db.openDatabase(1)
    .then(()=>{
      this.db.getByKey('property', this.state.propertyId).then(
        property => {
          console.log(property)
          this.setState({property: property});
        },
        error => {
            console.log(error);
        }
      );
    }).catch(err=>{
      console.log(err);
    });
			// fetch(config.baseApiUrl + "/property/"+this.state.propertyId, {
			// 	method: 'GET'
			// }).then(res=>{
			// 	return res.json();
			// }).then(jsonRes=>{
			// 	this.setState({property: jsonRes.data});
			// }).catch(err=>{
			// 	console.error(err);
			// })
	}
	render() {
		console.log(this.state.propertyId);
		return(
			<React.Fragment>
		<Header />		
			{
				this.state.property
				?<div>
					{/* <TileBar property={this.state.property}/> */}
				{/* <Container1 property={this.state.property}/> */}
				<Container2 property={this.state.property}/></div>
				:<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Loader 
                   type="Puff"
                   color="#00BFFF"
                   height="100"	
                   width="100"
                />
                </div>
			}
		<Footer />
            </React.Fragment>
		);
	}
}
export default PropertySingle;