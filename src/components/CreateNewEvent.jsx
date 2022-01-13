import React, {useEffect, useState} from "react";
import {Server_URL} from "./Urls";
import facade from "../apiFacade";
import {Table, Form, Button} from "react-bootstrap"

const CreateNewEvent = () => {

    const [responseFromBackEnd, setResponseFromBackEnd] = useState("");
    const [newEvent, setNewEvent] = useState();
    const [eventAdded, setEventAdded] = useState(false);

    const addEvent = (evt) =>{
        evt.preventDefault();
        const option = facade.makeOptions("POST", true, newEvent);
        fetch(Server_URL + "api/event/createevent", option)
            .then((res) => res.json())
            .then((json)=> {
                setResponseFromBackEnd(json);
                setEventAdded(true);
            })
    }
    const handleChange = (evt) => {
        setNewEvent({ ...newEvent, [evt.target.id]: evt.target.value });
      };
if(!eventAdded)
return <div margin-botton="20px" onChange={handleChange} onSubmit={addEvent}>

<Form>
  <Form.Group className="mb-3" controlId="location">
    <Form.Label>Lokation</Form.Label>
    <Form.Control type="text" placeholder="Lokationen" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="dish">
    <Form.Label>Hvilken ret</Form.Label>
    <Form.Control type="text" placeholder="Hvilken ret" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="pricePrPerson">
    <Form.Label>Hvad koster det pr. person</Form.Label>
    <Form.Control type="text" placeholder="pris pr. person" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Godkend
  </Button>
</Form>
</div>

if(eventAdded)
return <div onChange={handleChange} onSubmit={addEvent}>
<Form>
  <Form.Group className="mb-3" controlId="location">
    <Form.Label>Lokation</Form.Label>
    <Form.Control type="text" placeholder="Lokationen" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="dish">
    <Form.Label>Hvilken ret</Form.Label>
    <Form.Control type="text" placeholder="Hvilken ret" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="pricePrPerson">
    <Form.Label>Hvad koster det pr. person</Form.Label>
    <Form.Control type="text" placeholder="pris pr. person" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Godkend
  </Button>
</Form>
<p>Du har nu addet eventet!</p>
</div>



}

export default CreateNewEvent;