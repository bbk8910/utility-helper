import React, {useState} from 'react';
import { Box, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import {ServiceButton} from "../component/ServiceButton";

// Styled components using Material UI
const StyledButton = styled(Button)({
    height: "100px",
    width: "100px",
    fontSize: "36px",
});
function TickTacToe(props) {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);  // Initialize winner

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const handleClick = (index) => {
        if (winner || board[index]) return; // Prevent clicking if there's a winner or square is filled

        const newBoard = [...board];
        newBoard[index] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);

        // Check for a winner after the move
        const calculatedWinner = calculateWinner(newBoard); // Use a different variable name
        if (calculatedWinner) setWinner(calculatedWinner);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
    };

    return (
        <Box textAlign="center" sx={{ mt: 5 }}>
            <Typography variant="h6" gutterBottom>
                {winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? "X" : "O"}`}
            </Typography>

            <Grid container spacing={1} justifyContent="center" sx={{ maxWidth: "320px", margin: "auto" }}>
                {board.map((value, index) => (
                    <Grid item xs={4} key={index}>
                        <StyledButton variant="outlined" onClick={() => handleClick(index)}>
                            {value}
                        </StyledButton>
                    </Grid>
                ))}
            </Grid>

            <Box mt={3}>
                <ServiceButton variant="contained" color="primary" onClick={resetGame} name={"Reset"}/>

            </Box>
        </Box>
    );

}

export default TickTacToe;