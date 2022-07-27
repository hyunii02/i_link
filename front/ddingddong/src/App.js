import logo from './logo.svg';
import LayOut from './layout/'
import LogIn from './components/Login/LogIn';

import './App.css';

const wer = () => {
  return (
    <h1>HIHIHI</h1>
  );
};

const App = () => {

  return (
    <div className="App">
      <LayOut><LogIn></LogIn></LayOut>
    </div>
  );
}

export default App;



