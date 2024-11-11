import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Select } from '@mui/material';

const compoundFrequencies = [
    { label: 'Annually', value: 1 },
    { label: 'Semi-Annually', value: 2 },
    { label: 'Quarterly', value: 4 },
    { label: 'Monthly', value: 12 },
    { label: 'Daily', value: 365 },
];
function CompoundInterestCalculator(props) {
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [years, setYears] = useState('');
    const [frequency, setFrequency] = useState(1);
    const [result, setResult] = useState(null);
    const [formula, setFormula] = useState('');

    const handleCalculate = () => {
        const P = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        const t = parseFloat(years);
        const n = parseInt(frequency);

        if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n)) {
            alert("Please enter valid numbers for all fields.");
            return;
        }

        // Compound Interest Formula
        const amount = P * Math.pow(1 + r / n, n * t);
        setResult(amount.toFixed(2)); // Round to 2 decimal places

        // Displaying the formula with values
        setFormula(`A = ${P} × (1 + ${r} / ${n})^(${n} × ${t})`);
    };

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', textAlign: 'center', p: 3 }}>
            <Typography variant="h4" gutterBottom>Compounding Calculator</Typography>

            <Typography variant="body1" sx={{ mt: 2 }}>
                Formula: <strong>A = P × (1 + r / n)<sup>(n × t)</sup></strong>
            </Typography>

            {formula && (
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Calculation: <strong>{formula}</strong>
                </Typography>
            )}

            <TextField
                label="Initial Investment ($)"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                type="number"
                fullWidth
                margin="normal"
            />

            <TextField
                label="Annual Return Rate (%)"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                type="number"
                fullWidth
                margin="normal"
            />

            <TextField
                label="Number of Years"
                value={years}
                onChange={(e) => {
                    setYears(e.target.value);
                }
                }
                type="number"
                fullWidth
                margin="normal"
            />

            <Select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                displayEmpty
                fullWidth
                margin="normal"
            >
                <MenuItem value="" disabled>Select Compounding Frequency</MenuItem>
                {compoundFrequencies.map((freq) => (
                    <MenuItem key={freq.value} value={freq.value}>
                        {freq.label}
                    </MenuItem>
                ))}
            </Select>

            <Button variant="contained" color="primary" onClick={handleCalculate} fullWidth sx={{ mt: 2 }}>
                Calculate
            </Button>

            {result && (
                <Box mt={3}>
                    <Typography variant="h6">Final Amount:</Typography>
                    <Typography>${result}</Typography>
                </Box>
            )}
        </Box>
    );
}

export default CompoundInterestCalculator;