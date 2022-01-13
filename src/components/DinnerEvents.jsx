import React, {useEffect, useState} from "react";
import {Server_URL} from "./Urls";
import facade from "../apiFacade";
import {Table} from "react-bootstrap"


const DinnerEvents = () => {

    const [dinnerEvent, setDinnerEvent] = useState();
    const [dataIsLoaded, setDataIsLoaded] = useState(false);


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

    return (
    <div>
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
              </tr>
            </tbody>
          </Table>
    })}
  
    </div>
    );
}

export default DinnerEvents;