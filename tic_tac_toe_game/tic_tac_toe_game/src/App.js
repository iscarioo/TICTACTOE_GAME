import { useEffect } from 'react';
import './App.css';
import TicTacToe from './Components/TicTacToe/TicTacToe';

function App() {
  useEffect(() => {
    // fetch('ws://localhost:3000')
    //   .then(res => res.json())
    //   .then(data => console.log(data));
  }, []);


  return (
    <div>
      <TicTacToe/>
    </div>
  );
}

export default App;
