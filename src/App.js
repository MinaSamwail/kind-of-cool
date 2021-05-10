import { Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Product from "./components/Product";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/product" component={Product} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
