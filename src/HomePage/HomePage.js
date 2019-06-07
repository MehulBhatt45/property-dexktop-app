import React, { Component } from "react";
import ParallaxContainer from './ParallacContainer/ParallaxContainer'
import PropertyContainer from './PropertyContainer/PropertyContainer';
import LookingForContainer from './LookingForContainer/LookingForContainer';
import MostSearch from './MostSearch/MostSearch';
import BlogNewsContainer from './BlogNewaContainer/BlogNewsContainer';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
class HomePage extends Component {
  constructor(props){
    super(props);
    this.state={}
  }

  componentDidMount(){
    const script = document.createElement("script");
		script.src = `scripts/custom.js`;
		// script.async = true;
		document.body.appendChild(script);
 }
  
  render() {
    return (
      <div>
		<Header />
        <ParallaxContainer {...this.props}/>
        <PropertyContainer />
        <LookingForContainer />
        <MostSearch />
        <BlogNewsContainer />
        <Footer />
            </div>
      );
    }
  }
  export default HomePage;
