import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { config } from '../../config';
import TimeAgo from 'timeago-react';

class ResultContainer extends Component {

	constructor(props){
		super(props);
		this.state = {}
		console.log(this.props.searchedProperty)
	}

	componentDidMount(){
		console.log(this.props.searchedProperty);
	}

	componentWillReceiveProps(){
		console.log(this.props)
	}

    render() {
        return (
            <div className="container">
				<div className="row fullwidth-layout">

					<div className="col-md-12">

						<div className="row margin-bottom-15">

							<div className="col-md-6">
								<div className="sort-by">
									<label>Ordenar por:</label>

									<div className="sort-by-select">
										<select data-placeholder="Default order" className="chosen-select-no-single" >
											<option>Menor precio</option>
											<option>Mayor precio</option>
										</select>
									</div>
								</div>
							</div>

							<div className="col-md-6">
								<div className="layout-switcher">
									<a href="/" className="list"><i className="fa fa-th-list"></i></a>
									<a href="/" className="grid"><i className="fa fa-th-large"></i></a>
									<a href="/" className="grid-three"><i className="fa fa-th"></i></a>
								</div>
							</div>
						</div>


						<div className="listings-container list-layout">
							{
								this.props.searchedProperty.map(property=>
									<div className="listing-item" key={property._id}>

										<Link to={"/property-single/"+property._id} className="listing-img-container">

											<div className="listing-badges">
												<span className="featured">Featured</span>
												<span>For {property.status}</span>
											</div>

											<div className="listing-img-content">
												<span className="listing-price">${property.price} <i>$520 / sq ft</i></span>
												<span className="like-icon with-tip" data-tip-content="Add to Bookmarks"></span>
												<span className="compare-button with-tip" data-tip-content="Add to Compare"></span>
											</div>
											{
												property.images.length>0
												?<div className="listing-carousel">
												{
													property.images.map((image,index)=>
													<div key={index}><img src={config.baseMediaUrl+image} alt="" onError={()=>this.src='images/no-preview.png'}/></div>
													)
												}</div>
												:<div className="listing-carousel"><div><img src='images/no-preview.png' alt=""/></div></div>
											}
										</Link>

										<div className="listing-content">

											<div className="listing-title">
												<h4><Link to={"/single-property/"+property._id}>{property.title}</Link></h4>
												<a href="https://maps.google.com/maps?q=221B+Baker+Street,+London,+United+Kingdom&hl=en&t=v&hnear=221B+Baker+St,+London+NW1+6XE,+United+Kingdom" className="listing-address popup-gmaps">
													<i className="fa fa-map-marker"></i>
													{property.location.address}, {property.location.city}
												</a>
												
												<Link className="details button border" to={"/property-single/"+property._id}>Details</Link>
												
											</div>

											<ul className="listing-details">
												<li>{property.attributes.area.number} {property.attributes.area.unit}</li>
												<li>{property.attributes.bedrooms} Bedroom</li>
												<li>{property.attributes.rooms} Rooms</li>
												<li>{property.attributes.bathrooms} Bathroom</li>
											</ul>

											<div className="listing-footer">
												<a href="/"><i className="fa fa-user"></i> {property.agent.name}</a>
												{property.createdAt?<span><i className="fa fa-calendar-o"></i> <TimeAgo datetime={property.createdAt}/></span>:null}
											</div>

										</div>

									</div>
								)
							}

						</div>

						<div className="clearfix"></div>
						{/* <div className="pagination-container margin-top-20">
							<nav className="pagination">
								<ul>
									<li><a href="/" className="current-page">1</a></li>
									<li><a href="/">2</a></li>
									<li><a href="/">3</a></li>
									<li className="blank">...</li>
									<li><a href="/">22</a></li>
								</ul>
							</nav>

							<nav className="pagination-next-prev">
								<ul>
									<li><a href="/" className="prev">Previous</a></li>
									<li><a href="/" className="next">Next</a></li>
								</ul>
							</nav>
						</div> */}

					</div>

				</div>
			</div>
        );
    }
}
export default ResultContainer;