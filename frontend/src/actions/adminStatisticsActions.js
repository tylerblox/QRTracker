export const FETCH_EVENTS_START = 'FETCH_EVENTS_START'
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS'
export const FETCH_EVENTS_ERROR = 'FETCH_EVENTS_ERROR'

const fetchEventsBegin = () => ({
    type: FETCH_EVENTS_START
})
const fetchEventsSuccess = (events) => ({
    type: FETCH_EVENTS_SUCCESS,
    payload: {events}
})
const fetchEventsError = (error) => ({
    type: FETCH_EVENTS_ERROR,
    payload: {error}
})

export function getEvents(queryParameter=''){
    return (dispatch) => {
        dispatch(fetchEventsBegin)
        fetch(
            process.env.REACT_APP_HOST + `/api/events/${queryParameter ? '?' : ''}${queryParameter}`,
            {
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                redirect: 'follow', // manual, *follow, error
            }
        )
        .then(res => {
            if (!res.ok){
                throw 'whoops'
            }
            
            return res.json()
        })
        .then(
            json => dispatch(fetchEventsSuccess(json))
        )
        .catch(err => dispatch(fetchEventsError(err)))
    }
}