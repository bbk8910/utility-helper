import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, Typography} from "@mui/material";
import {
    getBSMonthAndDay,
    getCurrentNepaliDateInNumber,
    getCurrentNepaliDateInString,
    getFormaedBSDate
} from "../renttracker/RentTrackerService";
import Navbar from "../layout/Navbar";
import AnalogWatch from "./AnalogWatch";
import {Image} from "@material-ui/icons";


export const DateTimeCard = () => {
    const [dateTime, setDateTime] = useState(new Date());

    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    // Update the date and time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000);
        return () => clearInterval(timer); // Clean up the interval on component unmount
    }, []);

    return (

        <Card
            style={{
                marginBottom: '20px',
                padding: '5px',
                background: 'rgba(74, 144, 226, 0.8)', // Slightly darker transparent background
                backdropFilter: 'blur(15px)', // Stronger frosted glass effect
                borderRadius: '20px', // More rounded corners
                boxShadow: '0 12px 32px 0 rgba(31, 38, 135, 0.5)', // More pronounced shadow
                border: '1px solid rgba(255, 255, 255, 0.3)', // Softer border
                color: '#fff', // White text
                transition: 'transform 0.2s, box-shadow 0.2s', // Transition for hover effect
                '&:hover': {
                    transform: 'translateY(-5px)', // Slightly lift card on hover
                    boxShadow: '0 16px 40px rgba(31, 38, 135, 0.6)', // Deeper shadow on hover
                },
            }}
        >
            <CardContent>
                <Box
                    display="flex"
                    flexDirection={{ xs: 'column', md: 'row' }} // Stack on mobile, row on larger screens
                    alignItems="center"
                >
                    {/* Analog Watch on one side */}
                    <Box flexShrink={0} mb={{ xs: 2, md: 0 }} mr={{ md: 2 }}>
                        <AnalogWatch />
                    </Box>

                    {/* Text content stacked on the other side */}
                    <Box display="flex" flexDirection="column" width="100%">
                        <Box display="flex" alignItems="center" marginBottom={2}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
                            <rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#fff"></rect>
                            <path fill="#ea3323"
                                  d="M31 14L18 14 18 4 14 4 14 14 1 14 1 18 14 18 14 28 18 28 18 18 31 18 31 14z"></path>
                            <path
                                d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
                                opacity=".15"></path>
                            <path
                                d="M10,8.141c-.619,.124-1.246,.202-1.874,.233,.031-.628,.109-1.254,.233-1.874-.57,.075-1.148,.075-1.718,0,.124,.619,.202,1.246,.233,1.874-.628-.031-1.254-.109-1.874-.233,.075,.57,.075,1.148,0,1.718,.619-.124,1.246-.202,1.874-.233-.031,.628-.109,1.254-.233,1.874,.57-.075,1.148-.075,1.718,0-.124-.619-.202-1.246-.233-1.874,.628,.031,1.254,.109,1.874,.233-.075-.57-.075-1.148,0-1.718Z"
                                fill="#ea3323"></path>
                            <path
                                d="M22,8.141c.619,.124,1.246,.202,1.874,.233-.031-.628-.109-1.254-.233-1.874,.57,.075,1.148,.075,1.718,0-.124,.619-.202,1.246-.233,1.874,.628-.031,1.254-.109,1.874-.233-.075,.57-.075,1.148,0,1.718-.619-.124-1.246-.202-1.874-.233,.031,.628,.109,1.254,.233,1.874-.57-.075-1.148-.075-1.718,0,.124-.619,.202-1.246,.233-1.874-.628,.031-1.254,.109-1.874,.233,.075-.57,.075-1.148,0-1.718Z"
                                fill="#ea3323"></path>
                            <path
                                d="M10,23.859c-.619-.124-1.246-.202-1.874-.233,.031,.628,.109,1.254,.233,1.874-.57-.075-1.148-.075-1.718,0,.124-.619,.202-1.246,.233-1.874-.628,.031-1.254,.109-1.874,.233,.075-.57,.075-1.148,0-1.718,.619,.124,1.246,.202,1.874,.233-.031-.628-.109-1.254-.233-1.874,.57,.075,1.148,.075,1.718,0-.124,.619-.202,1.246-.233,1.874,.628-.031,1.254-.109,1.874-.233-.075,.57-.075,1.148,0,1.718Z"
                                fill="#ea3323"></path>
                            <path
                                d="M22,23.859c.619-.124,1.246-.202,1.874-.233-.031,.628-.109,1.254-.233,1.874,.57-.075,1.148-.075,1.718,0-.124-.619-.202-1.246-.233-1.874,.628,.031,1.254,.109,1.874,.233-.075-.57-.075-1.148,0-1.718-.619,.124-1.246,.202-1.874,.233,.031-.628,.109-1.254,.233-1.874-.57,.075-1.148,.075-1.718,0,.124,.619,.202,1.246,.233,1.874-.628-.031-1.254-.109-1.874-.233,.075,.57,.075,1.148,0,1.718Z"
                                fill="#ea3323"></path>
                            <path
                                d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
                                fill="#fff" opacity=".2"></path>
                        </svg>
                        <Typography variant="h5" component="div" fontWeight="bold">
                            {dateTime.toLocaleDateString()} ({monthNames[dateTime.getMonth()]+" "+ dateTime.getDate()})
                        </Typography>
                        </Box>
                        <Typography variant="body2" color="textSecondary" style={{marginBottom: '8px'}}>
                            The Gregorian calendar is the most widely used civil calendar today, and the AD system was
                            established to mark years since the birth of Jesus Christ.
                        </Typography>

                        <Box display="flex" alignItems="center" marginBottom={2}>
                            <img src={`${process.env.PUBLIC_URL}/nepalflag.png`} width={24} height={24}/>
                            {/*<NepaliFlagIcon width={24} height={24} style={{marginRight: '8px'}}/>*/}
                            <Typography variant="h5" component="div" fontWeight="bold">
                                {getCurrentNepaliDateInString()} ({getBSMonthAndDay()})
                            </Typography>
                        </Box>

                        <Typography variant="body2" color="textSecondary">
                            Nepali Date, also known as Nepali Calendar or Bikram Sambat (B.S.), is the official calendar
                            of Nepal.
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>

    );
};