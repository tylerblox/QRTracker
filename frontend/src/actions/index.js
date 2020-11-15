export const QR_SCANNER_START = 'QR_SCANNER_START'
export const QR_SCANNER_SUCCESS = 'QR_SCANNER_SUCCESS'
export const QR_SCANNER_ERROR = 'QR_SCANNER_ERROR'

export const RESET = 'RESET'
export function resetScanner(){
    return (dispatch, getState) => {
        dispatch({
            type: RESET,
        })
    }
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const scanCodeBegin = () => ({
    type: QR_SCANNER_START
})
const scanCodeSuccess = (value) => ({
    type: QR_SCANNER_SUCCESS,
    payload: {value}
})
const scanCodeError = (error) => ({
    type: QR_SCANNER_ERROR,
    payload: {error}
})


export function scanQrCode(url){
    return (dispatch, getState) => {
        dispatch(scanCodeBegin)
        fetch(process.env.REACT_APP_SSL + '://' + url)
        .then(res => {

            if (!res.ok){
                throw 'whoops'
            }
            
            return res.json()
        })
        .then(
            json => dispatch(scanCodeSuccess(json))
        )
        .catch(err => dispatch(scanCodeError(err)))
    }
}


export const CONFIRM_CODE_START = 'CONFIRM_CODE_START'
export const CONFIRM_CODE_SUCCESS = 'CONFIRM_CODE_SUCCESS'
export const CONFIRM_CODE_ERROR = 'CONFIRM_CODE_ERROR'

const confirmCodeBegin = () => ({
    type: CONFIRM_CODE_START
})
const confirmCodeSuccess = (value) => ({
    type: CONFIRM_CODE_SUCCESS,
    payload: {value}
})
const confirmCodeError = (error) => ({
    type: CONFIRM_CODE_ERROR,
    payload: {error}
})

export function confirmQrCode(confirmed, payload){
    if (confirmed){
        return (dispatch, getState) => {
            dispatch(confirmCodeBegin)
            fetch(
                process.env.REACT_APP_HOST + '/api/event_register/',
                {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer', // no-referrer, *client
                    body: JSON.stringify(payload) // body data type must match "Content-Type" header
                }
            )
            .then(res => {
                if (!res.ok){
                    throw 'whoops'
                }
                
                return res.json()
            })
            .then(
                json => dispatch(confirmCodeSuccess(json))
            )
            .catch(err => dispatch(confirmCodeError(err)))
        }
    } else {
        return resetScanner()
    }
}
export const SET_SCANNER_ACTIVE = 'SET_SCANNER_ACTIVE'

export function setScannerActive(active=true){
    return (dispatch, getState) => {
        const most_recent_code = !active ? getState().qr_scanner.most_recent_code : null
        dispatch({
            type: SET_SCANNER_ACTIVE,
            payload: {scanner_active: active, most_recent_code}
        })
    }
}