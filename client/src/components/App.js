import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import Header from "./Header/Header";
import Home from "./Home";
import ProductsPage from './Pages/ProductsPage';
import SingleProductPage from './Pages/SingleProductPage';


function App() {
  return (
    <>
      <Router>
        <Switch>

          <Route exact path='/'>
            <Header/>
            <Home/>
          </Route>

          <Route exact path='/products'>
            <Header/>
            <ProductsPage/>
          </Route>

          <Route path='/product/:id/category'>
            <Header/>
            <SingleProductPage/>
          </Route>

          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
