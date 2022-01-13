import React, {useEffect, useState} from "react";
import {Server_URL} from "./Urls";
import facade from "../apiFacade";
import {Table, Button} from "react-bootstrap"


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
        setIsUpdateEvent(true);
        const option = facade.makeOptions("GET",true);
        fetch(Server_URL + "api/event/getevent/" + evt.target.value, option)
            .then((res)=> res.json())
            .then((json)=> {
                setResponsFrombackEnd(json);
            })
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
    if(!isUpdateEvent)
    return (
    <div onChange={handleChange} >
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
                <td><Button variant="primary" type="submit" value={el.id} onClick={updateEvent}>Update</Button></td>
                <td><Button variant="danger" type="submit" value={el.id} onClick={deleteEvent}>Delete</Button></td>
              </tr>
            </tbody>
            
          </Table>
    })}
            

    </div>
    );
}

export default UpdateEvent;