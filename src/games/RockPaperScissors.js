import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, AppBar, Toolbar } from "@mui/material";
import {ServiceButton} from "../component/ServiceButton";


const options = [
    { name: "Rock", icon:"👊"},
    { name: "Paper", icon: "✋" },
    { name: "Scissors", icon:"✌"},
];


function RockPaperScissors(props) {
    const [userChoice, setUserChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState("");

    const playGame = (userOption) => {
        const computerOption = options[Math.floor(Math.random() * options.length)].name;
        setUserChoice(userOption);
        setComputerChoice(computerOption);
        determineWinner(userOption, computerOption);
    };

    const determineWinner = (user, computer) => {
        if (user === computer) {
            setResult("It's a tie!");
        } else if (
            (user === "Rock" && computer === "Scissors") ||
            (user === "Paper" && computer === "Rock") ||
            (user === "Scissors" && computer === "Paper")
        ) {
            setResult("You win!");
        } else {
            setResult("You lose!");
        }
    };

    const handleReset = () => {
        setUserChoice(null);
        setComputerChoice(null);
        setResult("");
    };

    return (
        <Box textAlign="center" >
            <Box sx={{ mt: 5 }}>
                <Typography variant="h5">Choose your option:</Typography>
                <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                    {options.map((option) => (


                            <Button  sx={{fontSize: '3.5rem', mx: 1, transition: "transform 0.2s", '&:hover': { transform: 'scale(1.1)' }}}  onClick={() => playGame(option.name)}>{option.icon}</Button>

                    ))}
                </Box>
            </Box>
            {userChoice && computerChoice && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6">Your choice: {userChoice}</Typography>
                    <Typography variant="h6">Computer's choice: {computerChoice}</Typography>
                    <Typography variant="h6">{result}</Typography>
                </Box>
            )}
            <Box sx={{ mt: 4 }}>
            <ServiceButton  color="secondary" onClick={handleReset} name={ "Play Again"}/>
            </Box>

        </Box>
    );
}

export default RockPaperScissors;