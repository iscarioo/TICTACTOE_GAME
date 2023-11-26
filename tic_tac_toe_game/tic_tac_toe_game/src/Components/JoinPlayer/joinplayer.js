import "./joinplayer.css";
import { motion } from "framer-motion";
import { useState } from "react";

const backgrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },

  visible: {
    y: "00px",
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};

const JoinPlayer = ({ showModal, setShowModal, setPlayerName }) => {
  const [playerNameInput, setPlayerNameInput] = useState(null);
  const handleSave = () => {
    setShowModal(false);
    setPlayerName(playerNameInput);
  };

  return (
    <>
      {showModal && (
        <motion.div
          className="joinplayer-container"
          variants={backgrop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div className="joinplayer-card" variants={modal}>
            <h1 className="joinplayer-card-title">Enter a player name!</h1>
            <input
              className="joinplayer-card-input"
              type="number"
              placeholder="eg: John Doe"
              onChange={(e) => setPlayerNameInput(e.target.value)}
            />
            <button onClick={handleSave} className="joinplayer-card-button">
              Save
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default JoinPlayer;