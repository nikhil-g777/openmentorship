import React, { Component } from 'react';
import  './css/styles.css';



class FAQ extends Component {
    
    render() { 
        return ( <React.Fragment>
            <section>
                <div className = "FAQ-box">
                        <h1>FAQ</h1>
                </div>
            </section>
            <section>

                <div className="Content-box">

                    <div className="content-box-title">
                        <p>
                            Questions
                        </p>
                    </div>
                   
                    <div className="container">
                        <div className="title">
                            <h2>Who is this platform for ?</h2>
                        </div>
                        <div className="paragraph">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                            
                        </div>
                        
                    </div>
                    <div className="container">
                        <div className="title">
                            <h2>What type of help can I expect from a Mentor ?</h2>
                                                        
                        </div>
                        <div className="paragraph">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        
                        </div>
                           
                    </div>
                    <div className="container">
                        <div className="title">
                            <h2>How do I get in touch to collaborate and be part of the project ?</h2>
                                                
                        </div>
                        <div className="paragraph">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                            
                        </div>
                         
                    </div>
                    <div className="container">
                        <div className="title">
                            <h2>Q4</h2>
                        </div>
                        <div className="paragraph">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                            
                        </div>
                            
                        
                    </div>
                    <div className="container">
                        <div className="title">
                            <h2>Q5</h2>
                        </div>
                        <div className="paragraph">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                            
                        
                    </div>
                </div>
                
                
            </section>
        </React.Fragment> );
    }
}
 
export default FAQ;