﻿const dialogAdd = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_DIALOG':
            return !state;
        default:
            return state;
    }
}

export default dialogAdd;