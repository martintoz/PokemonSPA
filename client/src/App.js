import './App.css';
import Landing from './components/Landing'
import Footer from './components/Footer'
import Pokedex from './components/Pokedex'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Detalle from './components/Detalle';
import Header from './components/Header';
import Crear from './components/Crear';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route
          exact
          path='/'
          component={Landing}
        />
        <Route
          path="/pokemons"
          component={Header}
        />
        <Route
          exact
          path="/pokemons"
          component={Pokedex}
        />
        <Switch>
          <Route
            exact
            path='/pokemons/crear'
            component={Crear}
          />
          <Route
            exact
            path='/pokemons/:name'
            component={Detalle}
          />
        </Switch>
        <Route
          path="/"
          component={Footer}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
