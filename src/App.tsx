import "./App.scss";
// import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import { Services, ServicesContext } from "./services/ServicesContext";
import { MainPage } from "./components/MainPage";
import { HistoryHandler } from "./components/HistoryHandler";
import { TimerWindowTitle } from "./components/TimerWindowTitle";

function App() {
  const [services] = useState(() => new Services());

  useEffect(() => {
    return () => {
      services.close();
    };
  }, [services]);

  return (
    <ServicesContext.Provider value={services}>
      <TimerWindowTitle windowTitle="Mob Session by Comsysto Reply" />
      <Router>
        <HistoryHandler>
          <Switch>
            <Route path="/:sessionId">
              <MainPage />
            </Route>
            <Route path="/">
              <MainPage />
            </Route>
          </Switch>
        </HistoryHandler>
      </Router>
    </ServicesContext.Provider>
  );
}

export default App;
