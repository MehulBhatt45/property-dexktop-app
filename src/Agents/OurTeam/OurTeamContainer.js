import React, { Component } from "react";
import { config } from '../../config'
class OurTeamContainer extends Component {

	constructor(props){
		super(props);
		this.state = {
			team: []
		}
	}

	componentDidMount(){
		fetch(config.baseApiUrl+ '/admin/agent',{
			method: 'GET'
		}).then(res=>{
			return res.json();
		}).then(jsonRes=>{
			this.setState({team: jsonRes.data})
		}).catch(err=>{
			console.error(err);
		})
	}

	renderAgent(){
		return(
			this.state.team.map(agent=>
				<div className="grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12">
				<div className="agent">

					<div className="agent-avatar">
						<a href="agent-page.html">
							<img src="images/agent-01.jpg" alt="" />
							<span className="view-profile-btn">Ver Perfil</span>
						</a>
					</div>

					<div className="agent-content">
						<div className="agent-name">
							<h4><a href="agent-page.html">{agent.name}</a></h4>
						</div>

						<ul className="agent-contact-details">
							<li><i className="sl sl-icon-call-in"></i>{agent.descrption}</li>
							<li><i className="fa fa-envelope-o "></i><a href="/">{agent.descrption}</a></li>
						</ul>

						<ul className="social-icons">
							<li><a className="facebook" href="/"><i className="icon-facebook"></i></a></li>
							<li><a className="twitter" href="/"><i className="icon-twitter"></i></a></li>
							<li><a className="gplus" href="/"><i className="icon-gplus"></i></a></li>
							<li><a className="linkedin" href="/"><i className="icon-linkedin"></i></a></li>
						</ul>
						<div className="clearfix"></div>
					</div>

				</div>
			</div>
			)
		);
	}
    render() {
        return (
					this.state.team.length>0?
            <div className="container">
			  <div className="row">

			    <div className="col-md-12">
			      <div className="row">

			        
			        <div className="agents-grid-container">

			          
			          {
									this.renderAgent()
								}
			          


			        </div>
			        

			      </div>
			    </div>


			    <div className="col-md-12">
			      <div className="clearfix"></div>
			      
			      <div className="pagination-container margin-top-20 margin-bottom-20">
			        <nav className="pagination">
			          <ul>
			            <li><a href="/" className="current-page">1</a></li>
			            <li><a href="/">2</a></li>
			            <li><a href="/">3</a></li>
			          </ul>
			        </nav>
			      </div>
			      
			    </div>

			  </div>
			</div>:<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><h2>No agents found</h2></div>
        );
    }
}
export default OurTeamContainer;