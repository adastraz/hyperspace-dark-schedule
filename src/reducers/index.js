import {
    FETCHING_START,
    FETCHING_ERROR,
    FETCHING_SUCCESS
} from '../actions'

const initialState = {
    isLoading: false,
    error: null,
    schedule: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_START:
            return {
                ...state,
                isLoading: true
            }
        case FETCHING_SUCCESS:
            return {
                ...state,
                isLoading: false,
                schedule: action.payload
            }
        case FETCHING_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        default:
            return state
    }
}