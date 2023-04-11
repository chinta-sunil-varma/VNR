import React, {useState, useContext, useEffect, useRef  } from 'react'
import {useNavigate} from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import '../stylesheets/login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, CardGroup,Container, ProgressBar, Navbar, Nav, NavDropdown, Form, Image, Button, ListGroup, Offcanvas, InputGroup, Modal } from 'react-bootstrap';
import {Paper} from "@mui/material"

import { UserContext } from '../App';


const Signup = () => {

    const {state, dispatch} = useContext(UserContext);
    const fileInputRef = useRef();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const [showAlertForm, setShowAlertForm] = useState(false);
    const handleAlertFormClose = () =>{setShowAlertForm(false);}
    const [showAlert, setShowAlert] = useState(false);
    const handleAlertClose = () =>{setShowAlert(false);}
    const [alertMessage, setAlertMessage] = useState("");
    const [alertTitle, setAlertTitle] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userCnfrmPass, setUserCnfrmPass] = useState("");
    const [userImage, setUserImage] = useState();


    const handleFiles = (e) =>{
        let myfile = e.target.files[0]; 
        let fileSize = parseFloat(myfile.size / (1024 * 1024)).toFixed(2); 
        if(myfile.type.match('image.*') && fileSize < 2){
            setUserImage(myfile);
        }
        else{
            fileInputRef.current.value = null;
            setAlertTitle("Alert")
            setAlertMessage("Please upload an image of 2 MB or less.");
            setShowAlert(true);
        }
        
        
    }


    const handleResponce = async (response) =>{
        const jwtIDToken = response.credential;

        try{
            const res = await fetch("/googleSignIn", { 
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"                
                },
                body: JSON.stringify({
                    jwtIDToken
                })
            });
            
            const data = await res.json() 
            console.log(data)
            if(res.status === 201 && data){
                dispatch({type: "USER", payload: data});
                navigate("/usergallery");
                window.location.reload();
            }        
            
        } catch(error){
            console.log(error)
        }
    }

    useEffect( () => {
        /*global google*/
        google.accounts.id.initialize({
            client_id: "71679309628-pt4a93103j2iiiorhcqhkq9thcua5vvl.apps.googleusercontent.com",
            callback: handleResponce
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large"}
        );

    }, []);




    const handleSinginSubmit = async (e) =>{
        e.preventDefault();

        if(userEmail && userPassword){
            try {
                const response = await fetch('/signInUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json' 
                    },
                    body: JSON.stringify({userEmail, userPassword}),
                });
    
                const data = await response.json();

                if(response.status === 201 && data){
                    console.log(data)
                    dispatch({type: "USER", payload: data});
                    navigate("/usergallery")
                    window.location.reload();
                }
                else{
                    setAlertTitle("Alert")
                    setAlertMessage(data.message);
                    setShowAlert(true);
                }
                
            } catch (error) {
                console.log(error); 
            }
        }
        else{
            setAlertTitle("Alert")
            setAlertMessage("Please fill the form correctly");
            setShowAlert(true);
        }
       

    }




    const handleSingupSubmit = async (e) =>{
        e.preventDefault();
        const form = e.currentTarget;

        let nameRegEx = /^[A-Za-z\s]*$/.test(userName);
        let checkName = userName.length > 0 && userName.length < 15;
        let emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
        let checkPass = userPassword.length > 7;
        let checkCnfrmPass = userCnfrmPass.length > 7;
        let checkBothPass = userPassword === userCnfrmPass;

        if(checkName && nameRegEx && emailRegEx && checkPass && checkCnfrmPass && checkBothPass && userImage){
            
            let formData = new FormData();
            
            formData.append('userName', userName);
            formData.append('userEmail', userEmail);
            formData.append('userPassword', userPassword);
            formData.append('userCnfrmPass', userCnfrmPass);
            formData.append('userImage', userImage);
            
            try {
                const response = await fetch("/createNewUser", {
                    method: "POST",
                    body: formData
                      
                });
                const data = await response.json();

                if(response.status === 201 && data){
                    setAlertTitle("Alert")
                    setAlertMessage(data.message);
                    setShowAlert(true);

                    setUserName("");
                    setUserEmail("");
                    setUserPassword("");
                    setUserCnfrmPass("");
                    fileInputRef.current.value = null;
                    form.reset();
                    setShowModal(false);
                }

            } catch (error) {
                console.log(error);
            }

        }
        else{
            setShowAlertForm(true);
        }

    }




    return (
        <> 
            <Container  className='background2' fluid>
                <Container elevation={10} className='signInCont'>  
                  <Paper elevation={10} style={{padding:"2% 5%",borderRadius:"10px"}}>                  
                    <Row>
                        <Container className='headingCont'>
                            <h2>Sign In</h2> 
                        </Container>
                    </Row>
                    <Row>
                        <Container className='signinFormCont'>
                            <Form method='POST' onSubmit={handleSinginSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label className='labelStyle'>Email address</Form.Label>
                                    <Form.Control type="email" className='formInput' value={userEmail} onChange={(e)=>setUserEmail(e.target.value)} placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className='labelStyle'>Password</Form.Label>
                                    <Form.Control type="password" className='formInput' value={userPassword} onChange={(e)=>setUserPassword(e.target.value)} placeholder="Password" />
                                </Form.Group>
                                <br></br>
                                <Form.Group className="mb-3" >
                                    <Button className='formSignInBtn' variant="primary" type="submit" >
                                        Signin
                                    </Button>
                                </Form.Group> 
                            </Form>
                            <br></br>
                            <Row>
                                <Container className='orCont'>
                                    <p className='orTxt'>OR</p>
                                </Container>
                            </Row>
                        </Container>
                    </Row>
                    
                    <Row>
                        <Container className='googleBtnCont'>
                            <h5 className='labelStyle'>SignIn with Google</h5>
                            <br></br>
                            <div id='signInDiv' style={{marginLeft:"13%"}}></div>
                            <br></br> 
                        </Container>
                    </Row>
                    <Row>
                        <Container className='headingCont1'>
                            <p className='accountTxt'>Need an account? <i className='signUpTxt' onClick={()=>setShowModal(true)}>Sign Up</i></p>
                            <p className='accountTxt'>Back to <i className='signUpTxt' onClick={()=>navigate('/')}>Home</i></p>
                        </Container>
                    </Row>
                    
                   </Paper>
                </Container>
                
              
                





                {/* Signup Modal */}

                <Modal show={showModal} onHide={handleClose} className="modal">
                    <Modal.Header closeButton className='modalHeader'>
                        <Modal.Title>Sign Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='modalBody'>
                        <Form method='POST' onSubmit={handleSingupSubmit}>
                            <Form.Group className="mb-3" >
                                <Form.Label className='labelStyle'>Name</Form.Label>
                                <Form.Control type="text" className='formInput' value={userName} onChange={(e)=>setUserName(e.target.value)}  placeholder="Enter your full name" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label className='labelStyle'>Email</Form.Label>
                                <Form.Control type="email" className='formInput' value={userEmail} onChange={(e)=>setUserEmail(e.target.value)} placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='labelStyle'>Profile image</Form.Label>
                                <Form.Control type="file" name='profileImage' className='formInput' id='profileImage' ref={fileInputRef} onChange={handleFiles}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label className='labelStyle'>Password</Form.Label>
                                <Form.Control type="password" className='formInput' value={userPassword} onChange={(e)=>setUserPassword(e.target.value)} placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label className='labelStyle'>Confirm Password</Form.Label>
                                <Form.Control type="password" className='formInput' value={userCnfrmPass} onChange={(e)=>setUserCnfrmPass(e.target.value)} placeholder="Confirm Password" />
                            </Form.Group>
                                <br></br>
                            <Form.Group className="mb-3" >
                                <Button className='formSignInBtn' variant="primary" type="submit" >
                                    Signup
                                </Button>
                            </Form.Group> 
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>



             {/* Alert Form Modal */}

            <Modal size="sm" show={showAlertForm} onHide={handleAlertFormClose} aria-labelledby="example-modal-sizes-title-sm">
                <Modal.Header closeButton className='modalHeader'>
                    <Modal.Title id="example-modal-sizes-title-sm">Instructions</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modalBodyStatic'>
                    <p className='labelStyle'>Please fill the form correctly.</p>
                    <p className='labelStyle'>Name must be less then 15 characters.</p>
                    <p className='labelStyle'>Image size should be less then 2 MB.</p>
                    <p className='labelStyle'>Password should be atleast 8 characters.</p>
                </Modal.Body>
                <Modal.Footer className='modalFooter'>
                    <Button className='saveBtn' onClick={handleAlertFormClose}>Ok</Button> 
                </Modal.Footer>
            </Modal>

            {/* Alert Modal */}

            <Modal size="sm" show={showAlert} onHide={handleAlertClose} backdrop="static" keyboard={false} aria-labelledby="example-modal-sizes-title-sm">
                <Modal.Header closeButton className='modalHeader'>
                    <Modal.Title id="example-modal-sizes-title-sm">{alertTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modalBodyStatic'>
                    <p>{alertMessage}</p>
                </Modal.Body>
                <Modal.Footer className='modalFooter'>
                    <Button className='saveBtn' onClick={handleAlertClose}>Ok</Button> 
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Signup
