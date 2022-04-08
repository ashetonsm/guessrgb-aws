import React, {useState} from 'react';

const GuessEntry = props => {
    const pickerInput = "";
    const [guessInput, setGuess] = useState("");

    function changeGuess(e: any) {
        let converter = document.querySelector("#converter");
        converter.style.color = e.target.value;
        setGuess(converter.style.color.slice(4, -1).split(", "));
    }

    function submitGuess() {
        if (props.gamePlaying) {
            props.submit(guessInput);
        }
    }

    return (
        <div>
        <h4 id="converter">Color:</h4>
        <input type="color" value="#000000" id="colorPicker" onChange={changeGuess}/>
        <button value="submit" onClick={submitGuess}>Submit</button>
        </div>
    );
}

export default GuessEntry;
