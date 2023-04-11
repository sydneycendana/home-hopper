import {useState, useEffect} from 'react';
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from './components/Spots/AllSpots';
import SpotDetails from './components/Spots/SpotDetails';
import CreateSpot from './components/Spots/CreateSpot';
import CurrentUserSpots from './components/Spots/UserSpots';

function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    setIsLoaded(true)
  },[dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        <Route exact path='/'>
        <AllSpots />
        </Route>
        <Route path="/spots/new">
            <CreateSpot />
          </Route>
        <Route exact path={'/spots/:spotId'}>
          <SpotDetails/>
        </Route>
        <Route exact path={'/spots/current'}>
          <CurrentUserSpots />
        </Route>
      </Switch>
      }
    </>
  );
}

export default App;
