import React, { useState, useEffect, useRef } from 'react';
import './TicTacToe.css'
import Boxes from '../Box/Box'
import cell1Audio from '../Assets/cell1.mp3'
import cell2Audio from '../Assets/cell2.mp3'

const TicTacToe = ({socket, playerName}) => 
{

    const [data, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
    const [canPlay, setCanPlay] = useState(true);

    useEffect(() => 
    {
        socket.on("updateGame", (id) => 
        {
          console.log("use Effect", id);
          setBoard((data) => ({ ...data, [id]: "O" }));
          setCanPlay(true);
        });
    
        return () => socket.off("updateGame");
    });

    const handleBoxesClick = (e) => 
    {
        const id = e.currentTarget.id;
        if (canPlay && data[id] === "") 
        {
            setBoard((data) => ({ ...data, [id]: "X" }));
            socket.emit("play", { id, playerName });
            setCanPlay(false);
            playAudio(id);
        }

        if (
            (data[0] === "X" && data[1] === "X" && data[2] === "X") ||
            (data[0] === "O" && data[1] === "O" && data[2] === "O")
          ) 
          {
            setBoard(["", "", "", "", "", "", "", "", ""]);
          }

        checkWin();
    };

    const playAudio = (cellId) => 
    {
        let audioFile;

        // Use an if-else statement to determine the audio file based on cellId
        if (cellId === "0") 
        {
            audioFile = cell1Audio;
        } 
        else if (cellId === "1") 
        {
            audioFile = cell2Audio;
        } 
        else if (cellId === "2") 
        {
            audioFile = cell2Audio;
        } 
        else 
        {
          // Handle the case where cellId is not recognized
          console.error(`Invalid cellId: ${cellId}`);
          return;
        }
    };

    let [count,setCount] = useState(0);
    let [lock,setLock] = useState(false);
    let titleRef = useRef(null);
    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);
    let box9 = useRef(null);

    let box_array =[box1,box2,box3,box4,box5,box6,box7,box8,box9];

    const checkWin = () => 
    {
        if(data[0]===data[1] && data[1]===data[2] && data[2]!=="")
        {
            won(data[2]);
        }
        else if(data[3]===data[4] && data[4]===data[5] && data[5]!=="")
        {
            won(data[5]);
        }
        else if(data[6]===data[7] && data[7]===data[8] && data[8]!=="")
        {
            won(data[8]);
        }
        else if(data[0]===data[3] && data[3]===data[6] && data[6]!=="")
        {
            won(data[6]);
        }
        else if(data[1]===data[4] && data[4]===data[7] && data[7]!=="")
        {
            won(data[7]);
        }
        else if(data[2]===data[5] && data[5]===data[8] && data[8]!=="")
        {
            won(data[8]);
        }
        else if(data[0]===data[4] && data[4]===data[8] && data[8]!=="")
        {
            won(data[8]);
        }
        else if(data[0]===data[1] && data[1]===data[2] && data[2]!=="")
        {
            won(data[2]);
        }
        else if(data[2]===data[4] && data[4]===data[6] && data[6]!=="")
        {
            won(data[6]);
        }
    }

    const won = (winner) =>
    {
        setLock(true);
        if(winner==="x")
        {
            titleRef.current.innerHTML = `Congratulations: <i class='bx bx-x crossIcon' ></i>`;
        }
        else
        {
            titleRef.current.innerHTML = `Congratulations: <i class='bx bx-x crossIcon'></i>`;
        }
    }

    // const again = () =>
    // {
    //     setLock(false);
    //     setBoard(["","","","","","","","",""]);
    //     titleRef.current.innerHTML ="Tic Tac Toe!";
    //     box_array.map((e)=>
    //     {
    //         e.current.innerHTML = "";
    //     })
    // }

    const again = () => {
        setLock(false);
        setBoard(["", "", "", "", "", "", "", "", ""]);
        
        // Check if titleRef.current is not null before accessing its properties
        if (titleRef.current) {
            titleRef.current.innerHTML = "Tic Tac Toe!";
        }
    
        box_array.map((e) => {
            // Check if e.current is not null before accessing its properties
            if (e.current) {
                e.current.innerHTML = "";
            }
        });
    };
    

    return (
        <div className="container">
            <h1 className="title" ref={titleRef}>Tic Tac Toe!</h1>
            <div className="board">
                <div className="row1">
                    <Boxes handleBoxClick={handleBoxesClick} id={"0"} text={data[0]} />
                    <Boxes handleBoxClick={handleBoxesClick} id={"1"} text={data[1]} />
                    <Boxes handleBoxClick={handleBoxesClick} id={"2"} text={data[2]} />
                </div>

                <div className="row2">
                    <Boxes handleBoxClick={handleBoxesClick} id={"3"} text={data[3]} />
                    <Boxes handleBoxClick={handleBoxesClick} id={"4"} text={data[4]} />
                    <Boxes handleBoxClick={handleBoxesClick} id={"5"} text={data[5]} />
                </div>

                <div className="row3">
                    <Boxes handleBoxClick={handleBoxesClick} id={"6"} text={data[6]} />
                    <Boxes handleBoxClick={handleBoxesClick} id={"7"} text={data[7]} />
                    <Boxes handleBoxClick={handleBoxesClick} id={"8"} text={data[8]} />
                </div>
            </div>
            <button className="again" onClick={()=>{again()}}>Again?</button>
        </div>
    );
}

export default TicTacToe