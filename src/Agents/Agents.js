import React from 'react';
import TopContainer from './TopContainer/TopContainer';
import OurTeamContainer from './OurTeam/OurTeamContainer';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class Agents extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}
componentDidMount(){
	const script = document.createElement("script");
      script.src = `scripts/custom.js`;
      // script.async = true;
      document.body.appendChild(script);
}

	render(){
		return (
			<React.Fragment>
		<Header />
		    <TopContainer />
				<OurTeamContainer />
				<Footer />
            </React.Fragment>
	);
}
}

export default Agents;
