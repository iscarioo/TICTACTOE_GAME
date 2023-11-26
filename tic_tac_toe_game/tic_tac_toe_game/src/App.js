import { useEffect, useState } from 'react';
import './App.css';
import Footer from "./Components/Footer/Footer";
import JoinPlayer from "./Components/JoinPlayer/joinplayer";
import TicTacToe from './Components/TicTacToe/TicTacToe';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

function App() {
  const [showModal, setShowModal] = useState(false);
  const [playerName, setPlayerName] = useState(null);

  useEffect(() => {
    console.log(playerName);
    if (playerName) {
      socket.emit("joinPlayer", playerName);
    }
  }, [playerName]);

  return (
    <>
      <JoinPlayer
        showModal={showModal}
        setShowModal={setShowModal}
        setPlayerName={setPlayerName}
      />
      <div>
        <TicTacToe socket={socket} playerName={playerName} />
      </div>
      <Footer setShowModal={setShowModal} />
    </>
  );


}

export default App;
