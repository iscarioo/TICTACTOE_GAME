import React, { useRef } from 'react'
import { useState } from 'react';
import './TicTacToe.css'

let data = ["","","","","","","","",""];

const TicTacToe = () => 
{

    // let [playerX, setPlayerX] = useState('');
    // let [playerO, setPlayerO] = useState('');
    // let [currentPlayer, setCurrentPlayer] = useState('');
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

    const socketRef = useRef(null);

    let box_array =[box1,box2,box3,box4,box5,box6,box7,box8,box9];

    // useEffect(() => {
    //     // Establish WebSocket connection
    //     socketRef.current = new WebSocket('ws://localhost:3000');
    
    //     // Listen for messages
    //     socketRef.current.addEventListener('message', (event) => {
    //       const receivedData = JSON.parse(event.data);
    //       handleReceivedData(receivedData);
    //     });
    
    //     // Clean up the WebSocket connection when the component unmounts
    //     return () => {
    //       if (socketRef.current) {
    //         socketRef.current.close();
    //       }
    //     };
    //   }, []);

    // const assignInitialPlayer = () => 
    // {
    //     if (Math.random() < 0.5) 
    //     {
    //         setCurrentPlayer('x');
    //         titleRef.current.innerHTML = `Tic Tac Toe! Current Player: ${playerX}`;
    //     }   
    //     else 
    //     {
    //         setCurrentPlayer('o');
    //         titleRef.current.innerHTML = `Tic Tac Toe! Current Player: ${playerO}`;
    //     }
    // };

    // useEffect(() => 
    // {
    //     // When the component mounts, assign the initial player
    //     assignInitialPlayer();
    // }, [playerX, playerO]);

    const toggle = (e,num) => 
    {
        if (lock) 
        {
            return 0;
        }
        if(count%2===0)
        {
            e.target.innerHTML = `<i class='bx bx-x crossIcon' ></i>`;
            data[num]="x";
            setCount(++count);
        }
        else
        {
            e.target.innerHTML = `<i class='bx bx-circle circleIcon'></i>`;
            data[num]="o";
            setCount(++count);
        }
        checkWin();
    }

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
            titleRef.current.innerHTML = `Congratulations: <i class='bx bx-circle circleIcon'></i>`;
        }
    }

    const again = () =>
    {
        setLock(false);
        data = ["","","","","","","","",""];
        titleRef.current.innerHTML ="Tic Tac Toe!";
        box_array.map((e)=>
        {
            e.current.innerHTML = "";
        })
    }

    return (
        <div className="container">
            <h1 className="title" ref={titleRef}>Tic Tac Toe!</h1>
            <div className="board">
                <div className="row1">
                    <div className="boxes" ref={box1} onClick={(e)=>{toggle(e,0)}}></div>
                    <div className="boxes" ref={box2} onClick={(e)=>{toggle(e,1)}}></div>
                    <div className="boxes" ref={box3} onClick={(e)=>{toggle(e,2)}}></div>
                </div>

                <div className="row2">
                    <div className="boxes" ref={box4} onClick={(e)=>{toggle(e,3)}}></div> 
                    <div className="boxes" ref={box5} onClick={(e)=>{toggle(e,4)}}></div>
                    <div className="boxes" ref={box6} onClick={(e)=>{toggle(e,5)}}></div>
                </div>

                <div className="row3">
                    <div className="boxes" ref={box7} onClick={(e)=>{toggle(e,6)}}></div>
                    <div className="boxes" ref={box8} onClick={(e)=>{toggle(e,7)}}></div>
                    <div className="boxes" ref={box9} onClick={(e)=>{toggle(e,8)}}></div>
                </div>
            </div>
            <button className="again" onClick={()=>{again()}}>Again?</button>
        </div>
    )
}

export default TicTacToe