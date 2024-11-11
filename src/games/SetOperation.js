
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Select } from '@mui/material';

const operations = [
    { name: 'Union', formula: 'A ∪ B' },
    { name: 'Intersection', formula: 'A ∩ B' },
    { name: 'Difference', formula: 'A - B' },
    { name: 'Complement', formula: 'Aᶜ (relative to B)' }
];

function SetOperation(props) {
        const [setA, setSetA] = useState('');
        const [setB, setSetB] = useState('');
        const [selectedOperation, setSelectedOperation] = useState('');
        const [result, setResult] = useState(null);

        const handleOperationChange = (event) => {
            setSelectedOperation(event.target.value);
            setResult(null); // Reset result when operation changes
        };

        function handleCalculate ()  {
            console.log("calling hanldle calcualte")
            const setAValues = new Set(setA.split(',').map(item => item.trim()));
            const setBValues = new Set(setB.split(',').map(item => item.trim()));
            let operationResult;
            console.log("set operatio doene..")


            switch (selectedOperation) {
                case 'Union':
                    operationResult = Array.from(new Set([...setAValues, ...setBValues]));
                    break;
                case 'Intersection':
                    operationResult = Array.from(new Set([...setAValues].filter(x => setBValues.has(x))));
                    break;
                case 'Difference':
                    operationResult = Array.from(new Set([...setAValues].filter(x => !setBValues.has(x))));
                    break;
                case 'Complement':
                    operationResult = Array.from(new Set([...setBValues].filter(x => !setAValues.has(x))));
                    break;
                default:
                    operationResult = [];
            }
            setResult(operationResult);
        };

        return (
            <Box sx={{ maxWidth: 400, margin: 'auto', textAlign: 'center', p: 3 }}>
                <Typography variant="h4" gutterBottom>SetOperation Operations Calculator</Typography>

                <TextField
                    label="SetOperation A (comma-separated)"
                    value={setA}
                    onChange={(e) => setSetA(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="SetOperation B (comma-separated)"
                    value={setB}
                    onChange={(e) => setSetB(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <Select
                    value={selectedOperation}
                    onChange={handleOperationChange}
                    displayEmpty
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="" disabled>Select Operation</MenuItem>
                    {operations.map((op) => (
                        <MenuItem key={op.name} value={op.name}>
                            {op.name} ({op.formula})
                        </MenuItem>
                    ))}
                </Select>

                <Button variant="contained" color="primary" onClick={handleCalculate} fullWidth sx={{ mt: 2 }}>
                    Calculate
                </Button>

                {result && (
                    <Box mt={3}>
                        <Typography variant="h6">Result:</Typography>
                        <Typography>{`{ ${result.join(', ')} }`}</Typography>
                    </Box>
                )}
            </Box>
        );
}

export default SetOperation;