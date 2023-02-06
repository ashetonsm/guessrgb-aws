const loginReducer = (state: any, action: { type: string; payload: any; }) => {
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
        case 'SET_DARK_MODE':
            return {
                ...state,
                darkMode: action.payload,
            };
        case 'SET_DARK_MODE_CHECKED':
            return {
                ...state,
                darkModeChecked: action.payload,
            };
        default:
            return state
    };
}

export default loginReducer;