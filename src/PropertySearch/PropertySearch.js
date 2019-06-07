import SearchContainer from './SearchContainer/SearchContainer';
// import ResultContainer from './ResultContainer/ResultContainer';
import React, { Component } from "react";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class PropertySearch extends Component {

	constructor(props){
		super(props);
		this.state = {  }
		console.log(this.props);
	}
	componentDidMount(){
		const script = document.createElement("script");
      script.src = `scripts/custom.js`;
      // script.async = true;
      document.body.appendChild(script);
	}

	render() {
		return (
			<React.Fragment>
				<Header />
			  	<SearchContainer {...this.props}/>
			  	<Footer />
            </React.Fragment>
		);
	}
}


export default PropertySearch;