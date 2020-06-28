const INITIAL_STATE = {
    profileModalIsOpen: false
}

export default function modal(state = INITIAL_STATE, action) {
    if (action.type === 'PROFILE') {
        state = {
            ...state,
            profileModalIsOpen: action.isOpen
        }
    }
    return state;
}

