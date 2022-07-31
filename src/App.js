import './App.css';
import ServerList from './Components/Servers/ServerList';
import MetricGraphs from './Components/Metrics/MetricGraphs';


function App() {
  return (
    <div className="App">
      <MetricGraphs/>
      <ServerList/>

    </div>
  );
}
export default App;
