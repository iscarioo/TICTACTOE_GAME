import "./Box.css";

const Boxes = ({ handleBoxClick, id, text }) => {
  return (
    <div id={id} className="boxes" onClick={handleBoxClick}>
      {text}
    </div>
  );
};

export default Boxes;