const loginReducer = (state, action) => {
    switch (action.type) {

        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload,
            };
        case 'SET_USERID':
            return {
                ...state,
                userId: action.payload,
            };
        case 'SET_FETCH_COMPLETE':
            return {
                ...state,
                fetchComplete: action.payload,
            };
        case 'SET_FETCHED_HISTORY':
            return {
                ...state,
                fetchedHistory: action.payload,
            };
        default:
            return state
    };
}

export default loginReducer;