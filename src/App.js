import { Link, Route } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import WrappedLoginHeader from './component/WrappedLoginHeader';
import WrappedSamplelist from './component/SampleList';
import SampleView from './component/SampleView';

function App() {
  return (
    <>
      <WrappedLoginHeader />
      <ul>
        <li>
          <Link to="/samplelist">SAMPLE LIST</Link>
        </li>
        <li>
          <Link to="/sampleview">SAMPLE VIEW</Link>
        </li>
      </ul>
      <Route path="/" exact={true} component={WrappedSamplelist} />
      <Route path="/samplelist" component={WrappedSamplelist} />
      <Route path="/sampleview/:id?" component={SampleView} />
    </>
  );
}

export default App;
