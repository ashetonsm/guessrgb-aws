const CheckGuess = (
    answer: { r: number; g: number; b: number; },
    guess: { r: number; g: number; b: number; },
    difficulty: number
) => {

    var result = [];

    (answer.r >= (guess.r - difficulty) && answer.r <= (guess.r + difficulty)) ? result.push(1) : result.push(0);
    (answer.g >= (guess.g - difficulty) && answer.g <= (guess.g + difficulty)) ? result.push(1) : result.push(0);
    (answer.b >= (guess.b - difficulty) && answer.b <= (guess.b + difficulty)) ? result.push(1) : result.push(0);

    return result;
}

export default CheckGuess;
