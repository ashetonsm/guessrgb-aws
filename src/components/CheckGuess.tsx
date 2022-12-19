const CheckGuess = (answer: { r: number; g: number; b: number; }, guess: { r: number; g: number; b: number; }) => {
    var result = [];

    (answer.r >= (guess.r - 25) && answer.r <= (guess.r + 25)) ? result.push(1) : result.push(0);
    (answer.g >= (guess.g - 25) && answer.g <= (guess.g + 25)) ? result.push(1) : result.push(0);
    (answer.b >= (guess.b - 25) && answer.b <= (guess.b + 25)) ? result.push(1) : result.push(0);

    return result;
}

export default CheckGuess;
