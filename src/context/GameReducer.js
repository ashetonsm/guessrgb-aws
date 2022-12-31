const gameReducer = (state, action) => {
    switch (action.type) {

        case 'SET_GUESSES':
            return {
                ...state,
                guesses: action.payload,
            };
        case 'SET_GAMEPLAYING':
            return {
                ...state,
                gamePlaying: action.payload,
            };
        case 'SET_GAMEWON':
            return {
                ...state,
                gameWon: action.payload,
            };
        case 'SET_CORRECTANSWER':
            return {
                ...state,
                correctAnswer: action.payload,
            };
        default:
            return state
    };
}

export default gameReducer;