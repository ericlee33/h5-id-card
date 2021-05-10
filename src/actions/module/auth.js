import { SET_HAS_TOKEN } from '../../constants/constants';

export function setHasToken(hasToken) {
    return {
        type: SET_HAS_TOKEN,
        hasToken,
    };
}
