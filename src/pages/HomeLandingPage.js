import React, {useEffect, useState} from 'react';

import FeatureIcon1 from '@mui/icons-material/Security';  // Example icons
import FeatureIcon2 from '@mui/icons-material/Speed';
import FeatureIcon3 from '@mui/icons-material/Devices';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import CameraIcon from '@mui/icons-material/Camera';
import {Box, Card, CardContent, Grid, IconButton, Typography} from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import {getCurrentNepaliDate, getCurrentNepaliDateInNumber, getFormaedBSDate} from "../renttracker/RentTrackerService";
import {Link, Route} from "react-router-dom";
import {EmiCalculator} from "../emi/EmiCalculator";
import Stock from "../stockanalyzer/Stock";
import Statics from "../statics/Statics";
import EUnitCalculator from "../euc/EUnitCalculator";
import {RentTrackerPage} from "../renttracker/RentTrackerPage";
import {DateTimeCard} from "./DateTimeCard";
import {DuoSharp, GamepadOutlined, GamesOutlined} from "@material-ui/icons";
import {Handshake, HandymanOutlined} from "@mui/icons-material";

const features = [
    {
        id: 1,
        icon: <AccountBalanceWalletIcon style={{fontSize: 40, color: '#4caf50'}}/>,
        label: 'EMI',
        onclickUrl: '/emi'
    },
    {id: 2, icon: <WaterfallChartIcon style={{fontSize: 40, color: '#2196f3'}}/>, label: 'Stock', onclickUrl: '/stock'},
    {id: 3, icon: <EqualizerIcon style={{fontSize: 40, color: '#f44336'}}/>, label: 'Statics', onclickUrl: '/statics'},
    {
        id: 4,
        icon: <ElectricBoltIcon style={{fontSize: 40, color: '#ff9800'}}/>,
        label: 'Electricity',
        onclickUrl: '/e-unit'
    },
    {
        id: 5,
        icon: <PersonPinIcon style={{fontSize: 40, color: '#4caf50'}}/>,
        label: 'Rent Tracker',
        onclickUrl: '/rent-tracker'
    },
    {id: 6, icon: <AnalyticsIcon style={{fontSize: 40, color: '#ff9800'}}/>, label: 'Growth', onclickUrl: '/growth'},
    {
        id: 7,
        icon: <TipsAndUpdatesIcon style={{fontSize: 40, color: '#2196f3'}}/>,
        label: 'Probability',
        onclickUrl: '/probability'
    },
    {
        id: 8,
        icon: <GamesOutlined style={{fontSize: 40, color: '#2196f3'}}/>,
        label: 'Tic-Tac-Toe',
        onclickUrl: '/tic-tac-toe'
    },
    {
        id: 9,
        icon: <GamepadOutlined style={{fontSize: 40, color: '#2196f3'}}/>,
        label: 'RPS',
        onclickUrl: '/rps'
    },

    {
        id:10,
        icon: <GamepadOutlined style={{fontSize: 40, color: '#2196f3'}}/>,
        label: 'Hangman',
        onclickUrl: '/hangman'
    },
];


const FeatureIcon = ({icon, label, onclickUrl}) => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={2}>
            <Link to={onclickUrl} style={{textDecoration: 'none', color: 'inherit'}}>
                <IconButton style={{backgroundColor: '#f5f5f5', padding: 15, borderRadius: '50%'}}>
                    {icon}
                </IconButton>
                <Typography variant="subtitle1" style={{marginTop: 8, fontWeight: 'bold'}}>
                    {label}
                </Typography>
            </Link>
        </Box>
    );
};


function HomeLandingPage(props) {


    return (

            <Box>
                <DateTimeCard className="date-time-card"/>

                <Grid container spacing={2} justifyContent="flex-start">
                    {features.map((feature) => (
                        <Grid item key={feature.id} sm={4} md={4} xs={4}>
                            <FeatureIcon icon={feature.icon} label={feature.label} onclickUrl={feature.onclickUrl}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>

    );
}

export default HomeLandingPage;