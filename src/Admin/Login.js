import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { config } from '../config'
// import HomePage from '../HomePage/HomePage'
class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            toHome: false
        }
    }
    
    componentDidMount(){
        const script = document.createElement("script");
      script.src = `scripts/custom.js`;
      // script.async = true;
      document.body.appendChild(script);
    }
    handleClick(event){
        var apiBaseUrl = config.baseApiUrl;
        var payload={
        "email":this.state.username,
        "password":this.state.password
        }
        fetch(apiBaseUrl+'/admin/login', {
            method: 'POST',
            body: JSON.stringify(payload)
        })
        .then((res)=>{
            return res.json()
        })
        .then((response)=>{
            console.log(response);
            localStorage.setItem('admin', JSON.stringify(response.user));
            localStorage.setItem('token', JSON.stringify(response.token));
            this.setState({
                toHome: true
            });
        })
        .catch(function (error) {
            console.log(error);
        });
        }

    render() {
        if (this.state.toHome === true) {
            return <Redirect to='/home' />
          }
        return (
            <React.Fragment>
            <Header />
            <div>
            <div id="titlebar" className="submit-page">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        <h2><i className="fa fa-plus-circle"></i> Login as admin</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{marginTop: 100, marginBottom: 100, alignContent: 'center', justifyContent: 'center', display: 'flex'}}>
            <MuiThemeProvider>
            <div>
            <TextField
            hintText="Ingrese su nombre de usuario"
            floatingLabelText="Username"
            onChange = {(event,newValue) => this.setState({username:newValue})}
            />
            <br/>
            <TextField
            type="password"
            hintText="Ingresa tu contraseña"
            floatingLabelText="Password"
            onChange = {(event,newValue) => this.setState({password:newValue})}
            />
            <br/>
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
            </div>
            </MuiThemeProvider>
            </div>
            </div>
            <Footer />
            </React.Fragment>
            );
        }
    }
const style = {
    margin: 15,
};
export default Login;