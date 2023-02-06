const gameReducer = (state: any, action: { type: string; payload: any; }) => {
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
        case 'SET_RECORDED_RESULT':
            return {
                ...state,
                recordedResult: action.payload,
            };
        case 'SET_DIFFICULTY':
            return {
                ...state,
                difficulty: action.payload,
            };
        default:
            return state
    };
}

export default gameReducer;