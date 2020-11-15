import { combineReducers } from 'redux'
import {qr_scanner} from './qrScannerReducer'
const rootReducer = combineReducers({
    qr_scanner
})

export default rootReducer