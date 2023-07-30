import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { useModal } from "./context/Modal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/Spots/AllSpots";
import SpotDetails from "./components/Spots/SpotDetails";
import CreateSpot from "./components/Spots/CreateSpot";
import CurrentUserSpots from "./components/Spots/UserSpots";
import EditSpot from "./components/Spots/EditSpot";
import WelcomeModal from "./components/WelcomeModal";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { setModalContent } = useModal();

  useEffect(() => {
    const hasModalBeenShown = localStorage.getItem("modalShown");
    if (!hasModalBeenShown) {
      setModalContent(<WelcomeModal />);
      localStorage.setItem("modalShown", "true");
    }

    (async () =>
      await dispatch(sessionActions.restoreUser()).then(() =>
        setIsLoaded(true)
      ))();
  }, [dispatch, setModalContent]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <AllSpots />
          </Route>
          <Route path="/spots/new">
            <CreateSpot />
          </Route>
          <Route exact path="/spots/current">
            <CurrentUserSpots />
          </Route>
          <Route exact path={"/spots/:spotId"}>
            <SpotDetails />
          </Route>
          <Route exact path={"/spots/:spotId/edit"}>
            <EditSpot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
