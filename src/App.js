import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./views/Home";
import Product from "./components/Product";

function App() {
  return (
    <div className="app">
      <NavMain />
      <Switch>
        <Route exact path="/product" component={Product} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
