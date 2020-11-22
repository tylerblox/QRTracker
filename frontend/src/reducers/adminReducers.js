import {
    FETCH_EVENTS_START,
    FETCH_EVENTS_SUCCESS,
    FETCH_EVENTS_ERROR
} from '../actions'

export const initialState = {
    loading: false,
    error: null,
    events: null
}

export const statisticsPageReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_EVENTS_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                events: action.payload.events
            }
        case FETCH_EVENTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state
    }
}