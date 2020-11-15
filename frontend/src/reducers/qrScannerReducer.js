import {
    QR_SCANNER_START,
    QR_SCANNER_SUCCESS,
    QR_SCANNER_ERROR,
    CONFIRM_CODE_START,
    CONFIRM_CODE_SUCCESS,
    CONFIRM_CODE_ERROR,
    SET_SCANNER_ACTIVE,
    RESET
} from '../actions'

const initialState = {
    scanner_active: true,
    fetching_qr_code: false,
    qr_code_fetch_error: null,
    most_recent_code: null,
    qr_code_fetched: false,
    confirming_qr_code: false,
    error_with_confirmation: null,
    confirmed_qr_code: false,
}


export const qr_scanner = (state=initialState, action) => {
    switch(action.type){
        case RESET:
            return {
                ...state,
                ...initialState
            }
        case SET_SCANNER_ACTIVE:
            return {
                ...state,
                ...action.payload
            }
        case QR_SCANNER_START:
            return {
                ...state,
                fetching_qr_code: true,
                scanner_active: false,
            }
        case QR_SCANNER_SUCCESS:
            return {
                ...state,
                ...initialState,
                scanner_active: false,
                qr_code_fetched: true,
                fetching_qr_code: false,
                most_recent_code: action.payload.value
            }
        case QR_SCANNER_ERROR:
            return {
                ...state,
                scanner_active: false,
                qr_code_fetched: false,
                fetching_qr_code: false,
                qr_code_fetch_error: action.payload.error
            }
        case CONFIRM_CODE_START:
            return {
                ...state,
                confirming_qr_code: true
            }
        case CONFIRM_CODE_SUCCESS:
            return {
                ...state,
                scanner_active: false,
                confirmed_qr_code: true
            }
        case CONFIRM_CODE_ERROR:
            return {
                ...state,
                error_with_confirmation: action.payload.error
            }
        default:
            return state
    }
}
