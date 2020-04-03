import React, {useState, setShow} from "react"
import styled from "styled-components"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import {FaLinkedinIn} from "react-icons/fa"
import {IconContext} from "react-icons"


const CreateMentee = () =>{

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
  const Styles = styled.div`
    .btn-mentee{
        background-color: transparent;
        border-color: transparent;
        color: rgba(255,255,255,.5);
        outline:none;
        &:hover {
            color:rgba(255,255,255,1);
        }
        &:focus {
            box-shadow:none;
        }
        &:active {
            background-color: transparent!important;
            border-color: transparent!important;
        }
    }

    .login-title{
        margin:auto;
    }

    .footer{
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
  `

    return (
        <Styles>
                <Button className = "btn-mentee" variant="primary" onClick={handleShow}>
                Register as Mentee
                </Button>

                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title className="login-title">Log in</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                            <Form>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" />
                                <Form.Text className="text-muted">
                                Enter your username
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>


                            <Container>
                                <div className="footer">
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                    <a href="http://localhost:3000/mentees/auth/linkedin">
                                    <IconContext.Provider value={{ size:"2em" }}>
                                        <div>
                                            <FaLinkedinIn></FaLinkedinIn>
                                        </div>
                                    </IconContext.Provider>
                                    </a>
                                </div>
                            </Container>
                          
                            </Form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
                </Modal>
        </Styles>
    )

}

export default CreateMentee