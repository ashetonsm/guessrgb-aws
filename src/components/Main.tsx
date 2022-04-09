import React from 'react';
import GuessEntry from "./GuessEntry";
import GuessDisplay from "./GuessDisplay";

class Main extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            children: [],
            correct: false,
            gamePlaying: true,
            answer: [Math.floor(Math.random() * (255 - 0 + 1) + 0),
            Math.floor(Math.random() * (255 - 0 + 1) + 0),
            Math.floor(Math.random() * (255 - 0 + 1) + 0)]
        };
    }


    render() {
        var numberOfGuesses = 0;
        var gamePlaying = this.state.gamePlaying;
        var correct = this.state.correct;
        const children = this.state.children;
        const answer = this.state.answer;

        const addChild = (guessText: any) => {
            this.setState({ children: [...this.state.children, guessText] });
        }

        const clearList = () => {
            this.setState({ children: [] });
            this.setState({ correct: false });
            this.setState({ gamePlaying: true });
            this.setState({
                answer: [Math.floor(Math.random() * (255 - 0 + 1) + 0),
                Math.floor(Math.random() * (255 - 0 + 1) + 0),
                Math.floor(Math.random() * (255 - 0 + 1) + 0)]
            });
        }

        const winCondition = () => {
            console.log("You win!");
            this.setState({ correct: true })
            this.setState({ gamePlaying: false })
        }

        const loseCondition = () => {
            console.log("You lose!");
            this.setState({ gamePlaying: false })
        }


        return (
            <>
            <div className="center" id="mainArea">
                {children.length >= 5 && !correct && gamePlaying ? loseCondition() : null}
                {correct ? <h1 id="youWin">You win!</h1> : children.length >= 5 && !correct ?
                    <h1 id="youLose">You lose...</h1> : null}
                {children.length >= 5 || correct ? <button onClick={clearList} id="restartButton">Restart?</button> : null}

                <GuessEntry submit={addChild} gamePlaying={gamePlaying} />
                {children ?.map((guess: any) =>
                    <div className="guessContainer" key={numberOfGuesses++}>
                    <GuessDisplay guess={guess} num={numberOfGuesses} answer={answer} winCondition={winCondition} gamePlaying={gamePlaying} />
                    </div>)}
            </div>
            </>
        );
    }
}

export default Main;
