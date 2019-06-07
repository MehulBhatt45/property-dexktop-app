import React, { Component } from "react";
import ResultContainer from '../ResultContainer/ResultContainer'
import * as $ from 'jquery';
import * as _ from 'lodash';
import { config } from '../../config'
import { ReactIndexedDB } from 'react-indexed-db';
class SearchContainer extends Component {

	constructor(props){
		super(props);
		this.state = {
			propertyTypes: [{"title" : "Apartment"},{"title" : "House"},{"title" : "Commercial"},{"title" : "Garage"},{"title" : "Lot"}],
			query: {},
			searchResult: []
		};
		this.handleClick = this.handleClick.bind(this);
		this.db = new ReactIndexedDB('propertyDB', 1);
	}

	componentDidMount(){
		console.log(this.props);
		if(this.props.location.state && this.props.location.state !== undefined){
			this.setState({query: this.props.location.state.query})
			this.searchProperty(this.props.location.state.query)
		}
		console.log(this.state)
		
		// const script = document.createElement("script");
		// script.src = `scripts/custom.js`;
		// script.async = true;
		// document.body.appendChild(script);
		$('.select-input').each(function(){

			var thisContainer = $(this);
			var $this = $(this).children('select'), numberOfOptions = $this.children('option').length;
	
			$this.addClass('select-hidden');
			$this.wrap('<div class="select"></div>');
			$this.after('<div class="select-styled"></div>');
			var $styledSelect = $this.next('div.select-styled');
			$styledSelect.text($this.children('option').eq(0).text());
	
			var $list = $('<ul />', {
				'class': 'select-options'
			}).insertAfter($styledSelect);
	
			for (var i = 0; i < numberOfOptions; i++) {
				$('<li />', {
					text: $this.children('option').eq(i).text(),
					rel: $this.children('option').eq(i).val()
				}).appendTo($list);
			}
	
			var $listItems = $list.children('li');
	
			 $list.wrapInner('<div class="select-list-container"></div>');
	
	
			$(this).children('input').on('click', function(e){
				$('.select-options').hide();
				e.stopPropagation();
				$styledSelect.toggleClass('active').next('ul.select-options').toggle();
			 });
	
			$(this).children('input').keypress(function() {
				$styledSelect.removeClass('active');
				$list.hide();
			});
	
	
			$listItems.on('click', function(e){
				e.stopPropagation();
				// $styledSelect.text($(this).text()).removeClass('active');
				$(thisContainer).children('input').val( $(this).text() ).removeClass('active');
				$this.val($(this).attr('rel'));
				$list.hide();
				// console.log($this.val());
			});
	
			$(document).on('click', function(e){
				$styledSelect.removeClass('active');
				$list.hide();
			});
	
	
			// Unit character
			var fieldUnit = $(this).children('input').attr('data-unit');
			$(this).children('input').before('<i class="data-unit">'+ fieldUnit + '</i>');
	
	
		});

		$('.more-search-options-trigger').on('click', function(e){
			e.preventDefault();
			$('.more-search-options, .more-search-options-trigger').toggleClass('active');
			$('.more-search-options.relative').animate({height: 'toggle', opacity: 'toggle'}, 300);
		});
	}

	handleClick(){
		var query = {...this.state.query};
		console.log(query);
		if ($('#minArea')[0].value !== ""){
			// console.log("In if", $('#minArea')[0].value)
			query['minArea'] = $('#minArea')[0].value;
			// console.log(query);
			this.setState({query :query});
			if ($('#maxArea')[0].value !== ""){
				// console.log("In if", $('#maxArea')[0].value)
				// query = {...this.state.query};
				query['maxArea'] = $('#maxArea')[0].value;
				// console.log(query);
				this.setState({query :query});
				if ($('#minPrice')[0].value !== ""){
					// console.log("In if", $('#minPrice')[0].value)
					// query = {...this.state.query};
					query['minPrice'] = $('#minPrice')[0].value;
					// console.log(query);
					this.setState({query :query});
					if ($('#maxPrice')[0].value !== ""){
					// console.log("In if", $('#maxPrice')[0].value)
					// query = {...this.state.query};
						query['maxPrice'] = $('#maxPrice')[0].value;
						// console.log(query);
						this.searchProperty(query);
					}else{
						this.searchProperty(query);
					}
				}else{
					this.searchProperty(query);
				}
			}else{
				this.searchProperty(query);
			}
		}else{
			this.searchProperty(query);
		}
		// this.searchProperty(query);
	}

	searchProperty(query){
		console.log(query);

		this.db.openDatabase(1).then(()=>{
			this.db.getAll('property').then(
			  async(property) => {
				console.log(property);
				var filter = await property.filter(function(prop){
					return (query.status?prop.status===query.status:true) &&
						   (query.stype?prop.attributes.stype===query.stype:true) &&
						   (query.addrKey?(prop.location.address.includes(query.addrKey) || prop.location.city.includes(query.addrKey) || prop.location.state.includes(query.addrKey)):true) &&
						   (query.minPrice?Number(prop.price)>=Number(query.minPrice):true) &&
						   (query.maxPrice?Number(prop.price)<=Number(query.maxPrice):true) &&
						   (query.minArea?Number(prop.attributes.area.number)>=Number(query.minArea):true) &&
						   (query.maxArea?Number(prop.attributes.area.number)<=Number(query.maxArea):true) &&
						   (query.buildingAge?prop.attributes.buildingAge===query.buildingAge:true) &&
						   (query.rooms?prop.attributes.rooms===query.rooms:true) &&
						   (query.bedrooms?prop.attributes.bedrooms===query.bedrooms:true) &&
						   (query.bathrooms?prop.attributes.bathrooms===query.bathrooms:true)
				})
				console.log(filter);
			  },
			  error => {
				console.log(error);
			  }
			);
		  }).catch(err=>{
			console.log(err);
		  });
		// fetch(config.baseApiUrl + "/property/search-property",{
		// 	method: 'POST',
		// 	body: JSON.stringify(query)
		// }).then(res=>{
		// 	return res.json();
		// }).then(jsonRes=>{
		// 	this.setState({ searchResult: jsonRes })
		// 	console.log("res", this.state);
		// 	// this.props.gotResult(jsonRes);
		// }).catch(err=>{
		// 	console.error(err);
		// })
	}

    render() {
        return (
			<div>
            <section className="search margin-bottom-50">
				<div className="container">
					<div className="row">
						<div className="col-md-12">

							<h3 className="search-title">Search</h3>
							<form></form>
							<div className="main-search-box no-shadow">


								<div className="row with-forms">

									<div className="col-md-3">
										<select data-placeholder="Any Status" className="chosen-select-no-single" value={this.state.query.status} onChange={(val)=>{
											console.log(val);
											var query = {...this.state.query};
											console.log(query);
                                            query['status'] = val.target.value;
                                            this.setState({query :query})
                                        }}>
											<option value="">Any Status</option>
											<option value="sale">For Sale</option>
											<option value="rent">For Rent</option>
										</select>
									</div>

									<div className="col-md-3">
										<select data-placeholder="Any Type" className="chosen-select-no-single" value={this.state.query.stype} onChange={(val)=>{
											var query = {...this.state.query};
											console.log(query)
                                            query['stype'] = val.target.value;
                                            this.setState({query :query})
                                        }}>
											<option value="">Any Type</option>
											{
												this.state.propertyTypes.map((type, index)=>
													<option key={index} value={type.title}>{type.title}</option>    
												)
											}
										</select>
									</div>

									<div className="col-md-6">
										<div className="main-search-input">
											<input type="text" placeholder="Enter address e.g. street, city or state" value={this.state.query.addrKey}
											onChange={(val)=>{
												var query = {...this.state.query};
												query['addrKey'] = val.target.value;
												this.setState({query :query})
											}}/>
											<button className="button" disabled={!this.state.query} onClick={this.handleClick}>Search</button>
										</div>
									</div>

								</div>


								<div className="row with-forms">

									<div className="col-md-3">

										<div className="select-input disabled-first-option">
											<input id="minArea" type="text" placeholder="Min Area" data-unit="Sq Ft" value={this.state.query.minArea} onChange={(val)=>{
												console.log(val)
                                            var query = {...this.state.query};
                                            query['minArea'] = val.target.value;
                                            this.setState({query :query})
                                        }}/>
											<select onChange={(val)=>{
												console.log(val)
                                            var query = {...this.state.query};
                                            query['minArea'] = val.target.value;
                                            this.setState({query :query})
                                        }}>
												<option value="">Min Area</option>
												<option value={300}>300</option>
												<option value={400}>400</option>
												<option value={500}>500</option>
												<option value={700}>700</option>
												<option value={800}>800</option>
												<option value={1000}>1000</option>
												<option value={1500}>1500</option>
											</select>
										</div>

									</div>

									<div className="col-md-3">

										<div className="select-input disabled-first-option">
											<input id="maxArea" type="text" placeholder="Max Area" data-unit="Sq Ft" value={this.state.query.maxArea} onChange={(val)=>{
                                            var query = {...this.state.query};
                                            query['maxArea'] = val.target.value;
                                            this.setState({query :query})
                                        }}/>
											<select onChange={(val)=>{
                                            var query = {...this.state.query};
                                            query['maxArea'] = val.target.value;
                                            this.setState({query :query})
                                        }}>
												<option value="">Max Area</option>
												<option value={300}>300</option>
												<option value={400}>400</option>
												<option value={500}>500</option>
												<option value={700}>700</option>
												<option value={800}>800</option>
												<option value={1000}>1000</option>
												<option value={1500}>1500</option>
											</select>
										</div>

									</div>


									<div className="col-md-3">

										<div className="select-input disabled-first-option">
											<input id="minPrice" type="text" placeholder="Min Price" data-unit="USD" value={this.state.query.minPrice} onChange={(val)=>{
                                            var query = {...this.state.query};
                                            query['minPrice'] = val.target.value;
                                            this.setState({query :query})
                                        }}/>
											<select onChange={(val)=>{
                                            var query = {...this.state.query};
                                            query['minPrice'] = val.target.value;
                                            this.setState({query :query})
                                        }}>
												<option value="">Min Price</option>
												<option value={1000}>1,000</option>
												<option value={2000}>2,000</option>
												<option value={3000}>3,000</option>
												<option value={4000}>4,000</option>
												<option value={5000}>5,000</option>
												<option value={10000}>10,000</option>
												<option value={15000}>15,000</option>
												<option value={20000}>20,000</option>
												<option value={30000}>30,000</option>
												<option value={40000}>40,000</option>
												<option value={50000}>50,000</option>
												<option value={60000}>60,000</option>
												<option value={70000}>70,000</option>
												<option value={80000}>80,000</option>
												<option value={90000}>90,000</option>
												<option value={100000}>100,000</option>
												<option value={110000}>110,000</option>
												<option value={120000}>120,000</option>
												<option value={130000}>130,000</option>
												<option value={140000}>140,000</option>
												<option value={150000}>150,000</option>
											</select>
										</div>

									</div>


									<div className="col-md-3">

										<div className="select-input disabled-first-option">
											<input id="maxPrice" type="text" placeholder="Max Price" data-unit="USD" value={this.state.query.maxPrice} onChange={(val)=>{
                                            var query = {...this.state.query};
                                            query['maxPrice'] = val.target.value;
                                            this.setState({query :query})
                                        }}/>
											<select onChange={(val)=>{
                                            var query = {...this.state.query};
                                            query['maxPrice'] = val.target.value;
                                            this.setState({query :query})
                                        }}>
												<option value="">Max Price</option>
												<option value={1000}>1,000</option>
												<option value={2000}>2,000</option>
												<option value={3000}>3,000</option>
												<option value={4000}>4,000</option>
												<option value={5000}>5,000</option>
												<option value={10000}>10,000</option>
												<option value={15000}>15,000</option>
												<option value={20000}>20,000</option>
												<option value={30000}>30,000</option>
												<option value={40000}>40,000</option>
												<option value={50000}>50,000</option>
												<option value={60000}>60,000</option>
												<option value={70000}>70,000</option>
												<option value={80000}>80,000</option>
												<option value={90000}>90,000</option>
												<option value={100000}>100,000</option>
												<option value={110000}>110,000</option>
												<option value={120000}>120,000</option>
												<option value={130000}>130,000</option>
												<option value={140000}>140,000</option>
												<option value={150000}>150,000</option>
											</select>
										</div>

									</div>

								</div>


								<button className="more-search-options-trigger margin-top-10" data-open-title="More Options" data-close-title="Less Options"></button>

								<div className="more-search-options relative">
									<div className="more-search-options-container">

										<div className="row with-forms">

											<div className="col-md-3">
												<select data-placeholder="Age of Home" className="chosen-select-no-single" value={this.state.query.buildingAge} onChange={(val)=>{
                                            var query = {...this.state.query};
                                            query['buildingAge'] = val.target.value;
                                            this.setState({query :query})
                                        }}>
													<option label="blank"></option>
													<option value="">Age of Home (Any)</option>
													<option value="1 Years">0 - 1 Years</option>
													<option value="5 Years">0 - 5 Years</option>
													<option value="10 Years">0 - 10 Years</option>
													<option value="20 Years">0 - 20 Years</option>
													<option value="50 Years">0 - 50 Years</option>
													<option value="50 + Years">50 + Years</option>
												</select>
											</div>

											<div className="col-md-3">
												<select data-placeholder="Rooms" className="chosen-select-no-single" value={this.state.query.rooms} onChange={(val)=>{
                                            var query = {...this.state.query};
                                            query['rooms'] = val.target.value;
                                            this.setState({query :query})
                                        }}>
													<option label="blank"></option>
													<option value="">Rooms (Any)</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
												</select>
											</div>

											<div className="col-md-3">
												<select data-placeholder="Beds" className="chosen-select-no-single" value={this.state.query.bedrooms} onChange={(val)=>{
                                            var query = {...this.state.query};
                                            query['bedrooms'] = val.target.value;
                                            this.setState({query :query})
                                        }}>
													<option label="blank"></option>
													<option value="">Recamarás (Any)</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
												</select>
											</div>

											<div className="col-md-3">
												<select data-placeholder="Baths" className="chosen-select-no-single" value={this.state.query.bathrooms} onChange={(val)=>{
                                            var query = {...this.state.query};
                                            query['bathrooms'] = val.target.value;
                                            this.setState({query :query})
                                        }}>
													<option label="blank"></option>
													<option value="">Baños (Any)</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
												</select>
											</div>

										</div>

									</div>

								</div>


							</div>
						</div>
					</div>
				</div>
			</section>
			{
				this.state.searchResult.length>0?<ResultContainer searchedProperty={this.state.searchResult}/>
				:<h2 style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 400}}>No Property Found</h2>
			}
			</div>
        );
    }
}
export default SearchContainer;