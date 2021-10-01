import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NFL from './pages/NFL'
import CFB from './pages/CFB'
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/CFB"><CFB totalWeeks={15}/></Route>
        <Route exact path="/NFL"><NFL totalWeeks={18}/></Route>
      </Switch>
    </Router>
  );
}

export default App;