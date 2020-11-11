import { Link, Route } from "react-router-dom";
import "./App.css";
import LoginHeader from "./component/LoginHeader";
import SampleList from "./component/SampleList";
import SampleView from "./component/SampleView";

function App() {
  return (
    <>
      <LoginHeader />
      <ul>
        <li>
          <Link to="/samplelist">SAMPLE LIST</Link>
        </li>
        <li>
          <Link to="/sampleview">SAMPLE VIEW</Link>
        </li>
      </ul>
      <Route path="/" exact={true} component={SampleList} />
      <Route path="/samplelist" component={SampleList} />
      <Route path="/sampleview/:id?" component={SampleView} />
    </>
  );
}

export default App;
