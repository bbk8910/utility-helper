import React, { useState } from "react";
import { Button, TextField, Typography, Box, Grid } from "@mui/material";

// Words to guess
const questions = [
    { question: "A popular JavaScript library for building user interfaces.", answer: "REACT" },
    { question: "The programming language used to add interactivity to web pages.", answer: "JAVASCRIPT" },
    { question: "The UI framework commonly used with React.", answer: "MATERIAL" },
    { question: "A reusable piece of code in React.", answer: "COMPONENT" },
    { question: "The runtime environment for executing JavaScript code outside a browser.", answer: "NODE" },
    { question: "A version control system for tracking changes in source code.", answer: "GIT" },
    { question: "The open-source version control repository hosting service.", answer: "GITHUB" },
    { question: "A NoSQL database used for high-volume data storage.", answer: "MONGODB" },
    { question: "The framework for building web applications in Java.", answer: "SPRING" },
    { question: "A lightweight JavaScript library used for DOM manipulation.", answer: "JQUERY" },
    { question: "A CSS preprocessor for making CSS more maintainable.", answer: "SASS" },
    { question: "A protocol for securely sending HTTP requests.", answer: "HTTPS" },
    { question: "A popular programming language used for mobile app development (Android).", answer: "KOTLIN" },
    { question: "A key-value data structure store, used as a database, cache, and message broker.", answer: "REDIS" },
    { question: "A cloud service provider that offers on-demand computing resources.", answer: "AWS" },
    { question: "A container orchestration platform for automating deployment and management.", answer: "KUBERNETES" },
    { question: "A widely used relational database management system.", answer: "MYSQL" },
    { question: "The command-line interface for package management in Node.js.", answer: "NPM" },
    { question: "A backend framework for building web APIs in Python.", answer: "DJANGO" },
    { question: "A task runner that automates repetitive tasks in web development.", answer: "GULP" },
    { question: "A design system for building modern web interfaces in React.", answer: "ANTD" },
    { question: "A server-side JavaScript framework for building APIs and microservices.", answer: "EXPRESS" },
    { question: "A cross-platform app development framework from Google.", answer: "FLUTTER" },
    { question: "The language that powers the iOS app ecosystem.", answer: "SWIFT" },
    { question: "A JavaScript framework used for building mobile apps with a single codebase.", answer: "IONIC" },
    { question: "A tool for automating infrastructure as code.", answer: "TERRAFORM" },
    { question: "A continuous integration and delivery platform.", answer: "JENKINS" },
    { question: "A SQL database service provided by Amazon Web Services.", answer: "RDS" },
    { question: "A platform for containerized applications.", answer: "DOCKER" },
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function Hangman(props) {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    const [word] = useState(randomQuestion.answer);
    const [question] = useState(randomQuestion.question);
    const [guesses, setGuesses] = useState(new Set());
    const [wrongGuesses, setWrongGuesses] = useState(0);

    const maxWrongGuesses = 6;

    const handleGuess = (letter) => {
        if (!guesses.has(letter)) {
            setGuesses((prev) => new Set(prev).add(letter));

            if (!word.includes(letter)) {
                setWrongGuesses((prev) => prev + 1);
            }
        }
    };

    const isGameOver = wrongGuesses >= maxWrongGuesses;
    const isWinner = word.split("").every((letter) => guesses.has(letter));

    const displayWord = word
        .split("")
        .map((letter) => (guesses.has(letter) ? letter : "_"))
        .join(" ");

    // Render hangman graphics based on wrong guesses
    const renderHangmanGraphic = () => {
        return (
            <Box className="hangman-drawing">
                {/* Stand and Rope */}
                <Box className="stand"></Box>
                <Box className="top-bar"></Box>
                <Box className="base"></Box>
                <Box className="rope"></Box>

                {/* Hangman parts */}
                {wrongGuesses >= 1 && <Box className="hangman-part head" />}
                {wrongGuesses >= 2 && <Box className="hangman-part body" />}
                {wrongGuesses >= 3 && <Box className="hangman-part arm-left" />}
                {wrongGuesses >= 4 && <Box className="hangman-part arm-right" />}
                {wrongGuesses >= 5 && <Box className="hangman-part leg-left" />}
                {wrongGuesses >= 6 && <Box className="hangman-part leg-right" />}
            </Box>
        );
    };

    // Render letter buttons for guessing
    const renderLetterButtons = () => {
        return (
            <Grid container spacing={1} justifyContent="center">
                {alphabet.map((letter) => (
                    <Grid item key={letter}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={guesses.has(letter) || isGameOver || isWinner}
                            onClick={() => handleGuess(letter)}
                        >
                            {letter}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        );
    };

    return (
        <div className="hangman-container">


            {/* Display the question */}
            <Typography variant="h6" gutterBottom>
                Question: {question}
            </Typography>

            {renderHangmanGraphic()}

            {/* Display the word as underscores and guessed letters */}
            <Typography className="word-display">{displayWord}</Typography>

            {isGameOver ? (
                <Typography className="game-over">
                    You Lost! The word was {word}.
                </Typography>
            ) : isWinner ? (
                <Typography className="congratulations">
                    Congratulations! You guessed the word.
                </Typography>
            ) : (
                renderLetterButtons()
            )}

            <Typography variant="body1" className="wrong-guess-count">
                Wrong guesses: {wrongGuesses} / {maxWrongGuesses}
            </Typography>
        </div>
    );
}

export default Hangman;