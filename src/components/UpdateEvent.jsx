import React, {useEffect, useState} from "react";
import {Server_URL} from "./Urls";
import facade from "../apiFacade";
import {Table, Button, Form} from "react-bootstrap"


const UpdateEvent = () => {

    const [dinnerEvent, setDinnerEvent] = useState();
    const [dataIsLoaded, setDataIsLoaded] = useState(false);
    const [responsFromBackEnd, setResponsFrombackEnd] = useState();
    const [isUpdateEvent, setIsUpdateEvent] = useState(false);

    
    useEffect(() => {
        setDataIsLoaded(false);
        fetch(Server_URL + "api/event/all")
            .then((res) => res.json())
            .then ((json) => {
                setDinnerEvent(json);
                setDataIsLoaded(true)
            })
    }, [])


    if (!dataIsLoaded)
    return (
        <div>
            <h1>Henter Data! Vent venligst.</h1>
        </div>
    );

    const updateEvent = (evt) => {
        const option = facade.makeOptions("PUT",true, responsFromBackEnd);
        fetch(Server_URL + "api/event/updateevent", option)
            .then((res)=> res.json())
            .then((json)=> {
                setIsUpdateEvent(false);
            })
    }

    const getSingleUpdateEvent = (evt) => {
        setIsUpdateEvent(true);
        setDataIsLoaded(false);
        const option = facade.makeOptions("GET",true);
        fetch(Server_URL + "api/event/getevent/" + evt.target.value, option)
        .then((res) => res.json())
        .then((json) => {
                setResponsFrombackEnd({
                id: json.id,
                date: json.date,
                location: json.location,
                dish: json.dish,
                pricePrPerson: json.pricePrPerson
                })
                setDataIsLoaded(true);
              });
            }
    

    const deleteEvent = (evt) =>{
        const option = facade.makeOptions("DELETE",true);
        fetch(Server_URL + "api/event/deleteevent/" + evt.target.value, option)
            .then((res)=> res.json())
            .then((json) => {
                
            })
    }
    

    const handleChange = (evt) => {
        setDinnerEvent({ ...dinnerEvent, [evt.target.id]: evt.target.value });
      };

      const handleChangeU = (evt) => {
        setResponsFrombackEnd({ ...responsFromBackEnd, [evt.target.id]: evt.target.value });
      };

    if(!isUpdateEvent)
    return (
    <div onChange={handleChange}>
     {dinnerEvent.map ((el, idx) => {
     return <Table striped bordered hover key={idx}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Dato</th>
                <th>Lokation</th>
                <th>Pris pr. person</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{el.id}</td>
                <td>{el.date}</td>
                <td>{el.location}</td>
                <td>{el.dish}</td>
                <td>{el.pricePrPerson}</td>
                <td><Button variant="primary" type="submit" value={el.id} onClick={getSingleUpdateEvent}>Update</Button></td>
                <td><Button variant="danger" type="submit" value={el.id} onClick={deleteEvent}>Delete</Button></td>
              </tr>
            </tbody>
            
          </Table>
    })}
        
    </div>
    );

    if(isUpdateEvent)
    if (!dataIsLoaded)
    return (
        <div>
            <h1>Henter Data! Vent venligst.</h1>
        </div>
    );

    return <div onChange={handleChangeU} onSubmit={updateEvent}>
   <Form>
  <Form.Group className="mb-3" controlId="location">
    <Form.Label>Lokation</Form.Label>
    <Form.Control type="text" placeholder={responsFromBackEnd.location}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="dish">
    <Form.Label>Hvilken ret</Form.Label>
    <Form.Control type="text" placeholder={responsFromBackEnd.dish} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="pricePrPerson">
    <Form.Label>Hvad koster det pr. person</Form.Label>
    <Form.Control type="text" placeholder={responsFromBackEnd.pricePrPerson} />
  </Form.Group>
  <Button variant="primary" type="submit">
    Godkend
  </Button>
</Form>
</div>
  
    
    
}

export default UpdateEvent;