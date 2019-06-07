import React, { Component } from "react";

class TileBar extends Component {
    constructor(props){
        super(props);
        this.state={}
    }
    render() {
        return (
            <div id="titlebar" className="submit-page">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        {
                            this.props.isEdit?<h2><i className="fa fa-pencil"></i> Edit Property</h2>:<h2><i className="fa fa-plus-circle"></i> Add Property</h2>
                        }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default TileBar;