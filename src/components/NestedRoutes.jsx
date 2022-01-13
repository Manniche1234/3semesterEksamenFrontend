import "../css/style2.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import HomeNested from "./HomeNested";
import DinnerEvents from "./DinnerEvents";
import AdminManger from "./AdminManager";
import CreateNewEvent from "./CreateNewEvent";
import UpdateEvent from "./UpdateEvent";



export default function Nesting(props) {
  let userrole = props.userrole;
  return (
    <Router>
      <div>
        <Header userrole={userrole} />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/events">
            <DinnerEvents />
            </Route>
            {userrole === "admin" && (
              <Route path="/admin">
                <AdminManger />
              </Route>
            )}
            {userrole === "admin" && (
              <Route path="/newEvent">
              <CreateNewEvent/>
              </Route>
            )}
            {userrole === "admin" && (
              <Route path="/updateEvent">
                <UpdateEvent />
              </Route>
            )}
          
          </Switch>
        </div>
      </div>
    </Router>
  );
}

const Header = (props) => {
  let userrole = props.userrole;
  return (
    <ul className="header">
      <li>
        <NavLink exact activeclassename="selected" to="/">
          Home
        </NavLink>
      </li> 

      <li>
        <NavLink exact activeclassename="Selected" to="/events">
          Events
        </NavLink>
      </li>
     
      )
      {userrole === "admin" && (
        <li>
          <NavLink activeclassename="selected" to="/admin">
            Admin
          </NavLink>
        </li>
      )}
      {userrole === "admin" && (
        <li>
          <NavLink activeclassename="selected" to="/newEvent">
            Nyt event
          </NavLink>
        </li>
      )}
      {userrole === "admin" && (
        <li>
          <NavLink activeclassename="selected" to="/updateEvent">
            Update event
          </NavLink>
        </li>
      )}
    </ul>
  );
};

function Home() {
  return (
    <div>
      <HomeNested />
    </div>
  );
}

function Topics() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:topicId`}>
          <Topic />
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { topicId } = useParams();

  return (
    <div>
      <h3>{topicId}</h3>
    </div>
  );
}
