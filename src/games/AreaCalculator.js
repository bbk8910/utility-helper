import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, MenuItem, Select, Grid } from '@mui/material';


const shapes = [
    { name: 'Triangle', fields: ['Base', 'Height'], formula: '0.5 × Base × Height', image: 'Triangle' },
    { name: 'Rectangle', fields: ['Width', 'Height'], formula: 'Width × Height', image: 'Rectangle' },
    { name: 'Circle', fields: ['Radius'], formula: 'π × Radius²', image: 'Circle' },
    { name: 'Square', fields: ['Side'], formula: 'Side²', image: 'square' },
    { name: 'Parallelogram', fields: ['Base', 'Height'], formula: 'Base × Height', image: 'Parallelogram' },
    { name: 'Trapezoid', fields: ['Base1', 'Base2', 'Height'], formula: '0.5 × (Base1 + Base2) × Height', image: 'Trapezoid' },
    { name: 'Cylinder', fields: ['Radius', 'Height'], formula: '2π × Radius × (Radius + Height)', image: 'Cylinder' },
    { name: 'Prism', fields: ['Base Area', 'Height'], formula: 'Base Area × Height', image: 'Prism' },
    { name: 'Sphere', fields: ['Radius'], formula: '4π × Radius²', image: 'Sphere' }
];

const ShapeSVG = ({ shape }) => {
    switch (shape) {
        case 'Triangle':
            return (
                <svg width="100" height="100" viewBox="0 0 100 100">
                    <polygon points="50,15 90,85 10,85" fill="#90caf9" />
                </svg>
            );
        case 'Rectangle':
            return (
                <svg width="100" height="100" viewBox="0 0 100 100">
                    <rect x="10" y="30" width="80" height="40" fill="#90caf9" />
                </svg>
            );
        case 'Circle':
            return (
                <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="#90caf9" />
                </svg>
            );
        case 'Square':
            return (
                <svg width="100" height="100" viewBox="0 0 100 100">
                    <rect x="20" y="20" width="60" height="60" fill="#90caf9" />
                </svg>
            );
        case 'Parallelogram':
            return (
                <svg width="100" height="100" viewBox="0 0 100 100">
                    <polygon points="30,20 90,20 70,80 10,80" fill="#90caf9" />
                </svg>
            );
        case 'Trapezoid':
            return (
                <svg width="100" height="100" viewBox="0 0 100 100">
                    <polygon points="20,20 80,20 70,80 30,80" fill="#90caf9" />
                </svg>
            );
        case 'Cylinder':
            return (
                <svg width="100" height="100" viewBox="0 0 100 100">
                    <ellipse cx="50" cy="20" rx="30" ry="15" fill="#90caf9" />
                    <rect x="20" y="20" width="60" height="60" fill="#90caf9" />
                    <ellipse cx="50" cy="80" rx="30" ry="15" fill="#64b5f6" />
                </svg>
            );
        case 'Prism':
            return (
                <svg width="100" height="100" viewBox="0 0 100 100">
                    <polygon points="20,20 80,20 70,70 30,70" fill="#90caf9" />
                    <polygon points="30,30 70,30 60,80 40,80" fill="#64b5f6" />
                </svg>
            );
        case 'Sphere':
            return (
                <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="#90caf9" />
                    <ellipse cx="50" cy="50" rx="40" ry="20" fill="#64b5f6" />
                </svg>
            );
        default:
            return null;
    }
};
function AreaCalculator(props) {

    const [selectedShape, setSelectedShape] = useState('');
    const [result, setResult] = useState(null);
    const [inputs, setInputs] = useState({});

    const handleShapeChange = (event) => {
        setSelectedShape(event.target.value);
        setInputs({});
        setResult(null);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    const calculateArea = () => {
        let area = 0;
        const { Base, Height, Width, Radius, Side, Base1, Base2, 'Base Area': BaseArea } = inputs;

        switch (selectedShape) {
            case 'Triangle':
                area = 0.5 * Base * Height;
                break;
            case 'Rectangle':
                area = Width * Height;
                break;
            case 'Circle':
                area = Math.PI * Math.pow(Radius, 2);
                break;
            case 'Square':
                area = Math.pow(Side, 2);
                break;
            case 'Parallelogram':
                area = Base * Height;
                break;
            case 'Trapezoid':
                area = 0.5 * (parseFloat(Base1) + parseFloat(Base2)) * Height;
                break;
            case 'Cylinder':
                area = 2 * Math.PI * Radius * (parseFloat(Radius) + parseFloat(Height));
                break;
            case 'Prism':
                area = BaseArea * Height;
                break;
            case 'Sphere':
                area = 4 * Math.PI * Math.pow(Radius, 2);
                break;
            default:
                return;
        }
        setResult(area);
    };

    const selectedShapeData = shapes.find(shape => shape.name === selectedShape);

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Shape Area Calculator</Typography>

            <Select
                fullWidth
                value={selectedShape}
                onChange={handleShapeChange}
                displayEmpty
                sx={{ mb: 3 }}
            >
                <MenuItem value="" disabled>Select a Shape</MenuItem>
                {shapes.map((shape) => (
                    <MenuItem key={shape.name} value={shape.name}>{shape.name}</MenuItem>
                ))}
            </Select>

            {selectedShapeData && (
                <Box>
                    <Typography variant="h6">{selectedShapeData.name}</Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Formula: {selectedShapeData.formula}
                    </Typography>
                    {/* Placeholder for image - replace with actual images or SVGs */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <ShapeSVG shape={selectedShapeData.name} />
                    </Box>

                    <Grid container spacing={2}>
                        {selectedShapeData.fields.map((field) => (
                            <Grid item xs={12} key={field}>
                                <TextField
                                    label={field}
                                    type="number"
                                    name={field}
                                    value={inputs[field] || ''}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={calculateArea}
                        sx={{ mt: 2 }}
                        fullWidth
                    >
                        Calculate Area
                    </Button>
                </Box>
            )}

            {result !== null && (
                <Typography variant="h6" color="secondary" sx={{ mt: 4 }}>
                    Calculated Area: {result.toFixed(2)}
                </Typography>
            )}
        </Container>
    );
}

export default AreaCalculator;