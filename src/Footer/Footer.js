import React from 'react';
import { Link } from 'react-router-dom';
class Footer extends React.Component{
  constructor(){
    super()
    this.state = {};
  }
  componentDidMount(){
  }
  render() {
    return (
      <div className="footer_fixed_bottom">
		  <div id="footer" className="sticky-footer">
  
  <div className="container">
    <div className="row">
      <div className="col-md-5 col-sm-6">
        <img className="footer-logo" src="images/logo.png" alt="" />
        <br/><br/>
        <p>Morbi convallis bibendum urna ut viverra. Maecenas quis consequat libero, a feugiat eros. Nunc ut lacinia tortor morbi ultricies laoreet ullamcorper phasellus semper.</p>
      </div>

      <div className="col-md-4 col-sm-6 ">
        <h4>Links</h4>
        <ul className="footer-links">
          <li><Link to={"/home"}>Inicio</Link></li>
          <li><Link to={"/agents"}>Propiedades</Link></li>
          <li><Link to={"/property-search"}>Nosotros</Link></li>
          <li><Link to={"/contact"}>Contacto</Link></li>
        </ul>

        <ul className="footer-links">
          <li><Link to="/">Blog</Link></li>
          <li><Link to="/agents">Nuestros Agentes</Link></li>
          <li><Link to="/">Contacto</Link></li>
        </ul>
        <div className="clearfix"></div>
      </div>

      <div className="col-md-3  col-sm-12">
        <h4>Contacto</h4>
        <div className="text-widget">
          <span>Montes Urales 320, Lomas de Chapultepec, CDMX.</span> <br/>
          Phone: <span><a href="tel:55204000">55 20 4000 </a></span><br/>
          E-Mail:<span> <a href="mailto:contacto@rojkind.com.mx">contacto@rojkind.com.mx</a> </span><br/>
        </div>

        <ul className="social-icons margin-top-20">
          <li><a className="facebook" href="/"><i className="icon-facebook"></i></a></li>
          <li><a className="twitter" href="/"><i className="icon-twitter"></i></a></li>
          <li><a className="linkedin" href="/"><i className="icon-linkedin"></i></a></li>
        </ul>

      </div>

    </div>

    
    <div className="row">
      <div className="col-md-12">
        <div className="copyrights">© 1976 - 2019 Rojkind Impulsora Inmobiliaria.</div>
      </div>
    </div>

  </div>

</div>

</div>
	);	
}
}

export default Footer;