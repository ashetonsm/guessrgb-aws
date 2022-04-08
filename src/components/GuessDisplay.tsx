import React, { useEffect } from 'react';
import CheckGuess from "./CheckGuess";

const GuessDisplay: any = (props: any) => {

    useEffect(() => {
        if (props.gamePlaying) {
            if (CheckGuess(props.answer, props.guess, props.num) == 3) { props.winCondition(); }
        }
    });

    return (
        <div id={`guessNum${props.num}`}>
            <h2>Guess {props.num + 1}</h2>
            <span>{props.guess[0]}</span>,
            <span>{props.guess[1]}</span>,
            <span>{props.guess[2]}</span>
        </div>

    );
}

export default GuessDisplay;
