const INITIAL_STATE = {
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    user: {}
}

export default function token(state = INITIAL_STATE, action) {
    if (action.type === 'AUTHENTICATED') {
        state = {
            ...state,
            accessToken: action.accessToken,
            refreshToken: action.refreshToken,
            isAuthenticated: true,
        }
    }

    if (action.type === 'TOGGLE_USER') {
        state ={
            ...state,
            user: action.user
        } 
    }

    return state;
}

