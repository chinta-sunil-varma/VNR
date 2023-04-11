import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, InputGroup, FormControl } from "react-bootstrap";

function Homepage() {
  const [data, setData] = useState([]);
  const [searchresults, setsearchresults] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const term = event.target.value;
    if (term.length > 1) {
      const newinfo = data.filter((ref) => {
        return (
          Object.values(ref)
            .join(" ")
            .toLowerCase()
            .includes(term.toLowerCase())
        );
      });
      setsearchresults(newinfo);
    } else {
      setsearchresults(data);
    }
  };

  const toview = (item) => (event) => {
    navigate("/viewdetails", {
      state: {
        name: item.name,
        title: item.blogtitle,
        content: item.blogcontent,
        likes: item.likes,
        dislikes: item.dislikes,
      },
    });
  };

  //Get Method
  const apiGet = () => {
    fetch("http://localhost:3001/data")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  };

  const increaselikes = (item) => (event) => {
    fetch("http://localhost:3001/increase", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({ id: item }),
    })
      .then((res) => {})
      .catch((e) => {});
  };

  const decreaselikes = (item) => (event) => {
    fetch("http://localhost:3001/decrease", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({ id: item }),
    })
      .then((res) => {})
      .catch((e) => {});
  };

  useEffect(() => {
    apiGet();
  }, []);

  const dataitems = (searchresults.length > 0 ? searchresults : data).map(
    (element) => {
  
      return (
        <div style={{marginLeft:'0px'}}>
          <Card style={{margin:'2px'}}>
            <Card.Body>
              <Card.Title style={{fontFamily:'roboto',fontWeight:'bolder'}}>
                {element.name + " posted a blog on " + element.blogtitle}
              </Card.Title>
              
               
                <button onClick={toview(element)}>Read Blog</button>
             
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" onClick={increaselikes(element._id)}>
                Likes: {element.likes}
              </Button>{" "}
              <Button
                variant="secondary"
                onClick={decreaselikes(element._id)}
              >
                Dislikes: {element.dislikes}
              </Button>
            </Card.Footer>
          </Card>
        </div>
      );
    
    }
  );

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="search blogs"
          aria-label="search blogs"
          onChange={handleChange}
        />
        <Button variant="outline-secondary" id="button-addon2">
          Search
        </Button>
      </InputGroup>
      <div>{dataitems}</div>
    </div>
  );
}

export default Homepage;
