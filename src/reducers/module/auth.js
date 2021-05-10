import { SET_HAS_TOKEN } from '../../constants/constants';

function auth(state = { hasToken: false }, action) {
    const { type, hasToken } = action;

    switch (type) {
        case SET_HAS_TOKEN:
            return {
                ...state,
                hasToken,
            };
        default:
            return state;
    }
}

export default auth;
