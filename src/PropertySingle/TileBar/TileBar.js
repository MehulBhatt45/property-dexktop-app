import React, { Component } from "react";
import { Link } from 'react-router-dom';


class TileBar extends Component {

	constructor(props){
		super(props);
		this.state = { 

		}
	}
    render() {
        return (
            <div id="titlebar" className="property-titlebar margin-bottom-0">
				<div className="container">
					<div className="row">
						<div className="col-md-7">

							<Link to="/" className="back-to-listings"> </Link>
							<div className="property-title">
								<h2>{this.props.property.title} <span className="property-badge">{this.props.property.status}</span></h2>
								<span>
									<a href="#location" className="listing-address">
										<i className="fa fa-map-marker"></i>
										{this.props.property.location.address}, {this.props.property.location.city}, {this.props.property.location.state}, {this.props.property.location.zipcode}.
									</a>
								</span>
							</div>

							<div className="property-pricing">
								<div className="property-price">${this.props.property.price} {this.props.property.currency}</div>
							</div>


						</div>
					</div>
				</div>
			</div>
        );
    }
}
export default TileBar;