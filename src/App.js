import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch, HashRouter } from 'react-router-dom';
// import Header from './Header/Header';
// import Footer from './Footer/Footer';
import Agents from './Agents/Agents';
import Contact from './Contact/Contact';
import PropertySearch from './PropertySearch/PropertySearch';
import HomePage from './HomePage/HomePage'
import PropertySingle from './PropertySingle/PropertySingle';
import AddProperty from './AddProperty/AddProperty';
import Login from './Admin/Login';
import { platform } from 'os';
import shell from 'shelljs';
const { app } = require('electron').remote
const path = require('path');


class App extends Component {
	constructor(props){
		super(props);
		this.state = {};
		shell.mkdir('-p',path.join(__dirname, app.getPath('pictures')+'/propertyDesktopApp/property/'))
	}

	componentDidMount(){
		console.log(`This platform is ${path.join(__dirname, '/home/rao')}`);
		console.log(platform(), app.getPath('pictures'));
	}
	render(){
		return (
			<Router>
				<HashRouter>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/admin" component={Login} />
					<Route path="/home" component={HomePage} />
					<Route path="/add-property" component={AddProperty} />
					<Route path="/agents" component={Agents} />
					<Route path="/contact" component={Contact} />
					<Route path="/property-search" component={PropertySearch} />
					<Route path="/property-single/:id" component={PropertySingle} />
					<Route path="/edit-property/:id" component={AddProperty} />
				</Switch>
				</HashRouter>
			</Router>
			);
		}
	}
	
	export default App;
