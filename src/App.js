import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NFL from './pages/NFL'
import CFB from './pages/CFB'
import NBA from './pages/NBA'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import TeamPage from './pages/TeamPage'
import NotFound from './pages/NotFound'
import ScrollToTop from './components/ScrollToTop';
import Test from './functions/test';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }

  .react-calendar {
    width: 300px;

  }
  .react-calendar__tile {
    padding: .5em .4em;
  }
  body {
    width: 100%;
  }
`

function App() {

  return (
    <Router>
      <ScrollToTop />
      <GlobalStyle />
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/NCAAF"><CFB totalWeeks={15}/></Route>
        <Route exact path="/NFL"><NFL totalWeeks={18}/></Route>
        <Route exact path="/NBA"><NBA /></Route>
        <Route exact path="/:league/TeamPage/:teamAbbreviation"><TeamPage /></Route>
        <Route exact path="/test"><Test /></Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;