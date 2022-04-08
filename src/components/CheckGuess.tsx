const CheckGuess = (answer: any, guess: string[], numberOfGuesses: any): number => {
    //console.log("Answer: " + answer);
    const guessDiv = document.getElementById(`guessNum${numberOfGuesses}`);
    const guessSpans = guessDiv!.getElementsByTagName("span");
    var guessR = parseInt(guessSpans[0].innerText);
    var guessG = parseInt(guessSpans[1].innerText);
    var guessB = parseInt(guessSpans[2].innerText);
    var red = answer[0];
    var green = answer[1];
    var blue = answer[2];
    var numCorrect = 0;

    if (red > guessR - 26 && red < guessR + 26) {
        guessSpans[0].style.color = "green";
        console.log("R is close");
        numCorrect++;
    }

    if (green > guessG - 26 && green < guessG + 26) {
        guessSpans[1].style.color = "green";
        console.log("G is close");
        numCorrect++;
    }

    if (blue > guessB - 26 && blue < guessB + 26) {
        guessSpans[2].style.color = "green";
        console.log("B is close");
        numCorrect++;
    }

    return numCorrect;
}

export default CheckGuess;
