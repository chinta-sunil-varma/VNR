import React, {useState, useContext, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import '../stylesheets/profile.css'
import { Row, Col, Container, Card, CardGroup, ProgressBar, Navbar, Nav, NavDropdown, Form, Image, Button, ListGroup, Offcanvas, InputGroup, Modal } from 'react-bootstrap';
import image_S1 from '../images/abstract10.png'
import { UserContext } from '../App'

const Profile = () => {

    const {state, dispatch} = useContext(UserContext); 
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertForm, setShowAlertForm] = useState(false);

    const [name , setName] = useState("");
    const [roll , setRoll] = useState("");
    const [year , setYear] = useState("");
    const [section , setSection] = useState("");
    const [email , setEmail] = useState("");
    const [skills , setSkills] = useState("");
    const [github , setGithub] = useState("");
    const [phone, setPhone] = useState("");
    const [alertTitle , setAlertTitle] = useState("");
    const [alertMessage , setAlertMessage] = useState("");

    const [editProfile, setEditProfile] = useState(false);
    const handleClose = () => setEditProfile(false);

    const navigate = useNavigate();
    const handleSignOut = async () =>{

        try{
            const response = await fetch("/userSignOut", {
                method: "GET",
            });
            let data = await response.json();

            if(response.status === 201 && data){
                localStorage.removeItem("User")      
                navigate("/login");
            }
        } catch(error){
            console.log(error)
        }

    }
    const handleUpdateBtn = async (e) =>{
        e.preventDefault();
        const form = e.currentTarget;

        

        if(name && email && roll && year && section && skills && github &&  phone){
            
            // let formData = new FormData();
         const formData={}
            
            // {'name': name};
            // {'email': email};
            // {'roll': roll};
            // {'year': year};
            // {'section': section};
            // {'skills': skills};
            // {'github': github};
            // {'phone': phone};
           
            formData['name']=name;
            formData['email']=email;
            formData['roll']=roll;
            formData['year']=year;
            formData['section']=section;
            formData['skills']=skills;
            formData['github']=github;
            formData['phone']=phone;
            console.log(formData);
            
            try {
                const response = await fetch("/createNewUserProfile", {
                    method: "POST",
                   
                    headers: {
                        'Content-Type': 'application/json'
                         },
                         body: JSON.stringify(formData)
                });
                const data = await response.json();

                if(response.status === 201 && data){
                    setAlertTitle("Alert")
                    setAlertMessage(data.message);
                    setShowAlert(true);

                    setName("");
                    setEmail("");
                    setRoll("");
                    setYear("");
                    setSection("");
                    setSkills("");
                    setGithub("");
                    setPhone("");
                    form.reset();
                    
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
        <ListGroup.Item className='navList' onClick={()=>setShowAlert(true)}>
            <i className='fa fa-user-circle'>&nbsp;</i>         
            {' '}
            Profile
        </ListGroup.Item>

        <Modal size="sm" show={showAlert} onHide={()=>setShowAlert(false)} aria-labelledby="example-modal-sizes-title-sm">
            <Modal.Header closeButton className='modalHeader'>
                <Modal.Title id="example-modal-sizes-title-sm">Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modalBodyStatic'>
                {state ?
                    <Container className='profileCont'>
                        <Row className="justify-content-md-center">
                            <Col>
                                <img 
                                    src={state.image}
                                    onError={(e)=>{e.target.onError = null; e.target.src = image_S1}}
                                    className="profileImages"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <p style={{color:"black"}}>{state.name}</p>
                        </Row>
                        <Row>
                            <p style={{color:"black"}}>{state.email}</p>
                        </Row>
                    </Container>
                :
                    <Container></Container>
                }                
            </Modal.Body>
            <Modal.Footer className='modalFooter'>
                <Button className='updateBtn' style={{width:'50%' ,borderRadius:'7px'}} onClick={()=>setEditProfile(true)}>Update Profile</Button>
                <Button className='saveBtn' style={{marginTop:'5%',marginBottom:'5%'}} onClick={handleSignOut}>SignOut</Button> 
            </Modal.Footer>
        </Modal>

        <Modal show={editProfile} onHide={handleClose} className="modal">
                    <Modal.Header closeButton className='modalHeader'>
                        <Modal.Title>Update Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='modalBody'>
                        <Form method='POST' onSubmit={handleUpdateBtn}>
                            <Form.Group className="mb-3" >
                                <Form.Label className='labelStyle'>Name</Form.Label>
                                <Form.Control type="text" className='formInput' value={name} onChange={(e)=>setName(e.target.value)}  placeholder="Enter your full name" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label className='labelStyle'>Email</Form.Label>
                                <Form.Control type="email" className='formInput' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='labelStyle'>Year</Form.Label>
                                <Form.Control type="text" name='year' className='formInput' value={year}  onChange={(e)=>setYear(e.target.value)} placeholder="Enter year of graduation"/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label className='labelStyle'>Section</Form.Label>
                                <Form.Control type="text" className='formInput' value={section} onChange={(e)=>setSection(e.target.value)} placeholder="Enter your section" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label className='labelStyle'>Roll No</Form.Label>
                                <Form.Control type="text" className='formInput' value={roll} onChange={(e)=>setRoll(e.target.value)} placeholder="Enter the rollno"/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label className='labelStyle'>Skills</Form.Label>
                                <Form.Control type="text" className='formInput' value={skills} onChange={(e)=>setSkills(e.target.value)} placeholder="Drop your skills"/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label className='labelStyle'>Github</Form.Label>
                                <Form.Control type="text" className='formInput' value={github} onChange={(e)=>setGithub(e.target.value)} placeholder="Enter github link"/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label className='labelStyle'>Phone</Form.Label>
                                <Form.Control type="text" className='formInput' value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Enter phone number"/>
                            </Form.Group>
                                <br></br>
                            <Form.Group className="mb-3" >
                                <Button className='formSignInBtn' variant="primary" type="submit" >
                                    Update
                                </Button>
                            </Form.Group> 
                        </Form>
                    </Modal.Body>
                </Modal>

            <Modal size="sm" show={showAlertForm} onHide={()=>setShowAlertForm(false)} aria-labelledby="example-modal-sizes-title-sm">
                <Modal.Header closeButton className='modalHeader'>
                    <Modal.Title id="example-modal-sizes-title-sm">Instructions</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modalBodyStatic'>
                    <p className='labelStyle'style={{alignItems:"center"}}>Please fill all fields correctly.</p>
                </Modal.Body>
                <Modal.Footer className='modalFooter'>
                    <Button className='saveBtn' onClick={()=>setShowAlertForm(false)}>Ok</Button> 
                </Modal.Footer>
            </Modal>

                            {/* <Modal size="sm" show={showAlert} onHide={()=>setShowAlert(false)} backdrop="static" keyboard={false} aria-labelledby="example-modal-sizes-title-sm">
                                <Modal.Header closeButton className='modalHeader'>
                                    <Modal.Title id="example-modal-sizes-title-sm">{alertTitle}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className='modalBodyStatic'>
                                    <p>{alertMessage}</p>
                                </Modal.Body>
                                <Modal.Footer className='modalFooter'>
                                    <Button className='saveBtn' onClick={()=>setShowAlert(false)}>Ok</Button> 
                                </Modal.Footer>
                            </Modal> */}
    
    </>
  )
}

export default Profile