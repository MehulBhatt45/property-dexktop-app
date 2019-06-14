import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import * as _ from 'lodash';
import { confirmAlert } from 'react-confirm-alert'; // Import
import Container1 from '../Container1/Container1'
import TileBar from '../TileBar/TileBar'
import { ReactIndexedDB } from 'react-indexed-db';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
// var $;
import { config } from '../../config';
import * as html2canvas from 'html2canvas';
// import * as jsPDF from 'jspdf'
const ejs = require('ejs');
const wkhtmltopdf = require('wkhtmltopdf');
const Geo = require('geo-nearby');
var geohash = require('ngeohash');
var loadjs = require('loadjs');
var fs = require('fs');
const { app } = require('electron').remote
var pdf = require('html-pdf');
// const jsPDF = require('jspdf');

class Container2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAdmin: localStorage.getItem('admin') ? true : false,
			nearerProperties: [],
			toHome: false
		};
		this.db = new ReactIndexedDB('propertyDB', 1);
	}

	getGoogleMaps() {
		if (!this.googleMapsPromise) {
			console.log("this.googleMapsPromise in property single page line 8=========================>", this.googleMapsPromise)
			this.googleMapsPromise = new Promise((resolve) => {
				window.resolveGoogleMapsPromise = () => {
					// eslint-disable-next-line no-undef
					resolve(google);
					delete window.resolveGoogleMapsPromise;
				};
				const API = 'AIzaSyAKT-kn9iwKJgBidjQy_H89TxZud5ZQK00';
				// var len = $('script').filter(function () {
				//     return ($(this).attr('src') === `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`);
				// }).length;
				// console.log(len);
				const script = document.createElement("script");
				script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
				script.async = true;
				document.body.appendChild(script);
			});
		}
		return this.googleMapsPromise;
	}

	componentWillMount() {
		this.getGoogleMaps();
		this.setState({
			isAdmin: localStorage.getItem('admin') ? true : false
		});
		// var data = {coordinates :this.props.property.geoLocation.coordinates, propertyId: this.props.property._id}
		// const Geo = require('geo-nearby');

		// const dataSet = [
		// 	{ id: 1, name: 'Perth',     geoHash: 3149853951719405 },
		// 	{ id: 2, name: 'Adelaide',  geoHash: 3243323516150966 },
		// 	{ id: 3, name: 'Melbourne', geoHash: 3244523307653507 },
		// 	{ id: 4, name: 'Canberra',  geoHash: 3251896081369449 },
		// 	{ id: 5, name: 'Sydney',    geoHash: 3252342838034651 },
		// 	{ id: 6, name: 'Brisbane',  geoHash: 3270013708086451 },
		// 	{ id: 7, name: 'Sydney',    geoHash: 3252342838034651 }
		// ];

		// const geo = new Geo(dataSet, { hash: 'geoHash' });

		// const data = geo.nearBy(-33.87, 151.2, 5000);
		// console.log(data);
		this.db.openDatabase(1).then(() => {
			this.db.getAll('property').then(
				property => {
					property.map((prop) => {
						return prop['geoHash'] = geohash.encode_int(prop.geoLocation.coordinates[1], prop.geoLocation.coordinates[0])
					})
					console.log(property);
					setTimeout(() => {
						const geo = new Geo(property, { hash: 'geoHash' });
						const prop = geo.nearBy(this.props.property.geoLocation.coordinates[1], this.props.property.geoLocation.coordinates[0], 10000);
						console.log(prop);
						this.setState({ nearerProperties: prop });
					}, 500)
				},
				error => {
					console.log(error);
				}
			);
		}).catch(err => {
			console.log(err);
		});

	}

	deleteProperty(id) {
		confirmAlert({
			title: 'Confirm to delete',
			message: 'Are you sure to do this.',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						this.db.openDatabase(1)
							.then(() => {
								this.db.delete('property', id).then(
									() => {
										this.setState({
											toHome: true
										})
									},
									error => {
										console.log(error);
									}
								);
							}, err => {
								console.log(err);
							})
					}
				},
				{
					label: 'No',
				}
			]
		});
	}

	printDocument(property) {
		// const input = document.getElementById('singleProperty');
		// html2canvas(input)
		//   .then((canvas) => {
		// 		const imgData = canvas.toDataURL('image/png');
		// 		var imgWidth = 210; 
		// 		var pageHeight = 295;  
		// 		var imgHeight = canvas.height * imgWidth / canvas.width;
		// 		var heightLeft = imgHeight;

		// 		var doc = new jsPDF('p', 'mm');
		// 		var position = 0;
		// 		doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
		// 		heightLeft -= pageHeight;

		// 		while (heightLeft >= 0) {
		// 			position = heightLeft - imgHeight;
		// 			doc.addPage();
		// 			doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
		// 			heightLeft -= pageHeight;
		// 		}
		// 		doc.save( 'file.pdf');
		// 		wkhtmltopdf(String(canvas))
		// 		.pipe(fs.createWriteStream(app.getPath('downloads')+'/out.pdf'));
		//   });
		// const pdf = new jsPDF();
		// pdf.addHTML(document.getElementById('singleProperty'), ()=>{
		// 	pdf.save("abc.pdf");
		// })
		console.log("in func line 166", property)
		const template = app.getAppPath()+'/src/PropertySingle/Container2/pdfTemplete.ejs';
		fs.readFile(template, 'utf8', function (err, file) {
			if (err) {
				console.log("error on line 167", err)
			} else {
				const result = ejs.render(file, {detail : property, config: config});

				const options = {
					"width": "395px", "header": {
						"height": "45mm",
						"contents": '<div style="text-align: center;">Property Details</div>'
					}
				};
				var pdf = new pdf();
				pdf.create(result, options).toFile(app.getPath('downloads') + '/out.pdf', function (err, pdfres) {
					if (err) {
						console.log("error on line 181", err)
					} else {
						console.log(pdfres);
					}
				});

			}
		});
	}


	componentDidMount() {
		loadjs('/scripts/custom.js');
		this.getGoogleMaps().then((google) => {
			const uluru = { lat: Number(this.props.property.geoLocation.coordinates[1]), lng: Number(this.props.property.geoLocation.coordinates[0]) };
			const map = new google.maps.Map(document.getElementById('propertyMap'), {
				zoom: 15,
				center: uluru
			});
			new google.maps.Marker({
				position: uluru,
				map: map
			});
		});
	}
	render() {
		if (this.state.toHome === true) {
			return <Redirect to='/home' />
		}
		return (
			<div className="container">
				<div className="row">


					<div className="col-lg-8 col-md-7" style={{ marginTop: 25 }}>

						<div id="singleProperty" className="property-description">
							<TileBar property={this.props.property} />
							<Container1 property={this.props.property} />


							<ul className="property-main-features">
								<li>Construcción <span>{this.props.property.attributes.area.number} {this.props.property.attributes.area.unit}</span></li>
								<li>Recámaras <span>{this.props.property.attributes.bedrooms ? this.props.property.attributes.bedrooms : '-'}</span></li>
								<li>Baños <span>{this.props.property.attributes.bathrooms ? this.props.property.attributes.bathrooms : '-'}</span></li>
								{/* <li>Estacionamientos <span>3</span></li> */}
							</ul>



							<h3 className="desc-headline">Descripción</h3>
							<div style={{ whiteSpace: 'pre-wrap' }}>
								{this.props.property.description ? this.props.property.description : "No Descripción"}
							</div>
							{/* <div className="show-more">

								<a href="/" className="show-more-button">Ver mas <i className="fa fa-angle-down"></i></a>
							</div> */}


							<h3 className="desc-headline">Amenities</h3>
							<ul className="property-features checkboxes margin-top-0">
								{
									_.map(this.props.property.attributes, (val, key) =>
										val === true ? <li key={key}>{key}</li> : null
									)
								}
								{/* <li>Aire acondicionado</li>
								<li>Alberca</li>
								<li>Gimnasio</li>
								<li>Alarma</li>
								<li>Fibra Optica</li> */}
							</ul>



							<h3 className="desc-headline no-border">Planos</h3>

							<div className="style-1 fp-accordion">
								<div className="accordion">
									{
										this.props.property.floorImages && this.props.property.floorImages.length
											?
											this.props.property.floorImages.map((propertyFloor, index) => <div key={index}>
												<a className="floor-pic mfp-image" href={config.baseMediaUrl + propertyFloor}>
													<img src={config.baseMediaUrl + propertyFloor} alt="" />
												</a>
												<p>{this.props.property.floorDescription}</p>
											</div>)
											: <h4>No Planos</h4>
									}

								</div>
							</div>


						</div>
						<div className="property-description">

							<h3 className="desc-headline no-border" id="location">Ubicación</h3>
							<div id="propertyMap-container">
								<div id="propertyMap"></div>
								<a href="/" id="streetView">Street View</a>
							</div>


							<h3 className="desc-headline no-border margin-bottom-35 margin-top-60">Propiedades Similares</h3>



							<div className="layout-switcher hidden"><a href="/" className="list"><i className="fa fa-th-list"></i></a></div>
							<div className="listings-container list-layout">

								{
									this.state.nearerProperties.length > 0
										? this.state.nearerProperties.map(property =>
											property._id !== this.props.property._id &&
											<div className="listing-item" key={property._id}>

												<Link to={"/property-single/" + property._id} className="listing-img-container">

													<div className="listing-badges">
														<span>{property.status}</span>
													</div>

													<div className="listing-img-content">
														<span className="listing-price">${property.price} {property.currency}</span>
														<span className="like-icon"></span>
													</div>

													<img src={property.images.length ? config.baseMediaUrl + property.images[0] : "images/no-priview.jpg"} alt="" onError={() => this.src = 'images/no-priview.jpg'} />

												</Link>

												<div className="listing-content">

													<div className="listing-title">
														<h4><a href="/">{property.title}</a></h4>
														<a href="https://maps.google.com/maps?q=221B+Baker+Street,+London,+United+Kingdom&hl=en&t=v&hnear=221B+Baker+St,+London+NW1+6XE,+United+Kingdom" className="listing-address popup-gmaps">
															<i className="fa fa-map-marker"></i>
															{property.location.address}, {property.location.city}, {property.location.state}.
											</a>

														<Link to={"/property-single/" + property._id} className="details button border">Detalles</Link>
													</div>

													<ul className="listing-details">
														<li>{property.attributes.area.number ? property.attributes.area.number + ", " + property.attributes.area.unit : "No se ha dado información"}</li>
														<li>{property.attributes.rooms ? property.attributes.rooms : '-'} Recámaras</li>
														<li>{property.attributes.bedrooms ? property.attributes.bedrooms : '-'} Habitaciónes</li>
														<li>{property.attributes.bathrooms ? property.attributes.bathrooms : '-'} Baños</li>
													</ul>

													<div className="listing-footer">
														<a href="/"><i className="fa fa-user"></i> {property.agent}</a>
													</div>

												</div>


											</div>
										)
										: <div><h5>No similar properties found</h5></div>
								}


							</div>


						</div>
					</div>




					<div className="col-lg-4 col-md-5" style={{ marginTop: 25 }}>
						<div className="sidebar sticky right">


							<div className="widget margin-bottom-30">
								<button id="printPdf" onClick={()=>this.printDocument(this.props.property)} className="widget-button with-tip" data-tip-content="Imprimir" ><i className="sl sl-icon-printer"></i></button>
								<button className="widget-button with-tip" data-tip-content="Agregar a favoritos"><i className="fa fa-star-o"></i></button>
								<div><Link to={"/edit-property/" + this.props.property._id}><button className="widget-button with-tip" data-tip-content="Edit property"><i className="fa fa-pencil"></i></button></Link>
									<button className="widget-button with-tip" data-tip-content="Remove property" onClick={() => { this.deleteProperty(this.props.property._id); }}><i className="fa fa-trash"></i></button></div>
								<div className="clearfix"></div>
							</div>




							{/* 
							<div className="widget">


								<div className="agent-widget">
									<div className="agent-title">
										<div className="agent-photo">
											<img src="/images/agent-avatar.jpg" alt="" />
										</div>
										<div className="agent-details">
											<h4><a href="/">{this.props.property.agent.name}</a></h4>
											<span><i className="sl sl-icon-call-in"></i><a href="tel:551001000">{this.props.property.agent.descrpition}</a></span>
										</div>
										<div className="clearfix"></div>
									</div>

									<input type="text" placeholder="Tu Correo" pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$"/>
									<input type="text" placeholder="Tu Celular"/>
									<textarea defaultValue="Estoy interesado en la propiedad [ID 123456] y quisiera saber mas."></textarea>
									<button className="button fullwidth margin-top-5">Enviar Mensaje</button>
								</div>


							</div> */}




							<div className="widget">
								<h3 className="margin-bottom-30 margin-top-30">Simulador Crédito Hipotecario</h3>


								<form autoComplete="off" className="mortgageCalc" data-calc-currency="MXN">
									<div className="calc-input">
										<div className="pick-price tip" data-tip-content="Set This Property Price"></div>
										<input type="text" id="amount" name="amount" placeholder="Precio" required />
										<label htmlFor="amount" className="fa fa-usd"></label>
									</div>

									<div className="calc-input">
										<input type="text" id="downpayment" placeholder="Enganche" />
										<label htmlFor="downpayment" className="fa fa-usd"></label>
									</div>

									<div className="calc-input">
										<input type="text" id="years" placeholder="Tiempo" required />
										<label htmlFor="years" className="fa fa-calendar-o"></label>
									</div>

									<div className="calc-input">
										<input type="text" id="interest" placeholder="Tasa de Interes" required />
										<label htmlFor="interest" className="fa fa-percent"></label>
									</div>

									<button className="button calc-button" formvalidate="true">Calcular</button>
									<div className="calc-output-container"><div className="notification success">Pago Mensual: <strong className="calc-output"></strong></div></div>
								</form>


							</div>



						</div>
					</div>


				</div>
			</div>
		);
	}
}
export default Container2;

