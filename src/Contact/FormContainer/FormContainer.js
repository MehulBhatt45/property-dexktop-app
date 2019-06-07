import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class formContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        {/*Contact Details */}
                        <div className="col-md-4">
                            <h4 className="headline margin-bottom-30">Encuentranos aqui</h4>
                            {/*Contact Details*/}
                            <div className="sidebar-textbox">
                                <p>aliqua tempor dolore malis sint fore duis summis dolore velit esse nisi sint
                                    malis fugiat noster anim fore duis quid</p>
                                <ul className="contact-details">
                                    <li><i className="im im-icon-Phone-2" /> <strong>Telefono:</strong> <span><NavLink
                                        to="tel:55204000">55 20 4000 </NavLink></span></li>
                                    <li><i className="im im-icon-Envelope" /> <strong>Correo:</strong> <span><NavLink
                                        to="mailto:contacto@rojkind.com.mx">contacto@rojkind.com.mx</NavLink></span></li>
                                </ul>
                            </div>
                        </div>
                        {/*Contact Form*/}
                        <div className="col-md-8">
                            <section id="contact">
                                <h4 className="headline margin-bottom-35">Contacto</h4>
                                <div id="contact-message" />
                                <form method="post" action="contact.php" name="contactform" id="contactform"
                                      autoComplete="on">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div>
                                                <input name="name" type="text" id="name" placeholder="Nombre"
                                                       required="required"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div>
                                                <input name="email" type="email" id="email" placeholder="Correo"
                                                       pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$"
                                                       required="required"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <input name="subject" type="text" id="subject" placeholder="Tema"
                                               required="required"/>
                                    </div>
                                    <div>
                                        <textarea name="comments" cols="40" rows="3" id="comments" placeholder="Mensaje"
                                                  spellCheck="true" required="required" />
                                    </div>
                                    <input type="submit" className="submit button" id="submit" value="Enviar mensaje"/>
                                </form>
                            </section>
                        </div>
                        {/*Contact Form / End*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default formContainer;
