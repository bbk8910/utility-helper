import React, { useState, useEffect } from 'react';
import {Box, Typography} from '@mui/material';


const AnalogWatch = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer); // Clean up the interval on unmount
    }, []);

    // Calculate rotation angles for hour, minute, and second hands
    const secondAngle = (time.getSeconds() / 60) * 360;
    const minuteAngle = (time.getMinutes() / 60) * 360 + (secondAngle / 60);
    const hourAngle = (time.getHours() % 12 / 12) * 360 + (minuteAngle / 12);

    // Calculate the positions for the numbers using trigonometry
    const clockNumbers = Array.from({ length: 12 }, (_, index) => {
        const angle = ((index + 1) / 12) * 360; // Angle for each number (30 degrees per number)
        const radians = (angle - 90) * (Math.PI / 180); // Convert to radians, subtract 90 to start from 12
        const radius = 60; // Radius for number placement from center (reduced to 60px)
        const x = 75 + radius * Math.cos(radians); // 75 is the center x position (half of clock size)
        const y = 75 + radius * Math.sin(radians); // 75 is the center y position (half of clock size)
        return { number: index + 1, x, y };
    });

    return (
        <Box
            sx={{
                width: 150, // Decreased size
                height: 150, // Decreased size
                borderRadius: '50%',
                border: '4px solid #333', // Scaled down border thickness
                position: 'relative',
                backgroundColor: 'rgba(255,255,255,0.13)',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                mx: 'auto',
                my: 4,
            }}
        >
            {/* Hour Hand */}
            <Box
                sx={{
                    position: 'absolute',
                    width: '4px', // Scaled down thickness
                    height: '35px', // Scaled down length
                    backgroundColor: '#333',
                    top: '40px', // Adjusted position
                    left: '73px', // Adjusted position (half of clock width - half of hand width)
                    transformOrigin: 'bottom center',
                    transform: `rotate(${hourAngle}deg)`,
                    transition: 'transform 0.5s ease-in-out',
                }}
            />
            {/* Minute Hand */}
            <Box
                sx={{
                    position: 'absolute',
                    width: '3px', // Scaled down thickness
                    height: '50px', // Scaled down length
                    backgroundColor: '#333',
                    top: '25px', // Adjusted position
                    left: '74px', // Adjusted position (half of clock width - half of hand width)
                    transformOrigin: 'bottom center',
                    transform: `rotate(${minuteAngle}deg)`,
                    transition: 'transform 0.5s ease-in-out',
                }}
            />
            {/* Second Hand */}
            <Box
                sx={{
                    position: 'absolute',
                    width: '2px',
                    height: '60px', // Scaled down length
                    backgroundColor: '#e53935',
                    top: '15px', // Adjusted position
                    left: '75px', // Adjusted position (half of clock width - half of hand width)
                    transformOrigin: 'bottom center',
                    transform: `rotate(${secondAngle}deg)`,
                    transition: 'transform 0.5s ease-in-out',
                }}
            />
            {/* Center Dot */}
            <Box
                sx={{
                    position: 'absolute',
                    width: '8px', // Scaled down size
                    height: '8px',
                    backgroundColor: '#333',
                    borderRadius: '50%',
                    top: '71px',
                    left: '71px',
                }}
            />

            {/* Clock Numbers */}
            {clockNumbers.map((num) => (
                <Typography
                    key={num.number}
                    variant="body1" // Smaller font size
                    sx={{
                        position: 'absolute',
                        top: `${num.y}px`,
                        left: `${num.x}px`,
                        transform: 'translate(-50%, -50%)',
                        fontWeight: 'bold',
                    }}
                >
                    {num.number}
                </Typography>
            ))}
        </Box>
    );
};

export default AnalogWatch;
