import React from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useState } from 'react';

function Probablity(props) {
    const [favorableOutcomes, setFavorableOutcomes] = useState('');
    const [totalOutcomes, setTotalOutcomes] = useState('');
    const [probability, setProbability] = useState(null);
    const [percentage, setPercentage] = useState(null); // Add percentage state

    const handleCalculate = () => {
        const favorable = parseFloat(favorableOutcomes);
        const total = parseFloat(totalOutcomes);

        if (favorable > total || favorable < 0 || total <= 0) {
            setProbability('Invalid input');
            setPercentage(null); // Reset percentage if inputs are invalid
        } else {
            const result = favorable / total;
            setProbability(result.toFixed(4)); // Decimal format
            setPercentage((result * 100).toFixed(2)); // Percentage format
        }
    };

    return (

        <Container maxWidth="sm" className={"page-wrapper"}>
            <Box sx={{ marginBottom: '20px' }}>
                <TextField
                    label="Favorable Outcomes"
                    type="number"
                    value={favorableOutcomes}
                    onChange={(e) => setFavorableOutcomes(e.target.value)}
                    fullWidth
                    margin="normal"
                    helperText={"How many times an event can happen in a way you want"}
                />
                <TextField
                    label="Total Outcomes"
                    type="number"
                    value={totalOutcomes}
                    onChange={(e) => setTotalOutcomes(e.target.value)}
                    fullWidth
                    margin="normal"
                    helperText={"All possible outcomes"}
                />
            </Box>
            <Button variant="contained" onClick={handleCalculate}>
                Calculate
            </Button>
            {probability !== null && percentage !== null && (
                <Box sx={{ marginTop: '20px' }}>
                    <Typography variant="h6">Probability: {probability}</Typography>
                    <Typography variant="h6">Percentage: {percentage}%</Typography>
                </Box>
            )}
        </Container>
    );
}

export default Probablity;