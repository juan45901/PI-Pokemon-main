import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './Components/LandingPage/Landing'
import Home from './Components/Home/Home'
import Detail from './Components/PokemonDetails/Detail.jsx'
import CreatePokemon from './Components/CreatePokemon/CreatePoke';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/home' component={Home}/>
        <Route path='/pokemons/:id' component={Detail}/>
        <Route path='/createpokemon' component={CreatePokemon}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
