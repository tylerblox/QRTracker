import React, { Component } from 'react';
import { connect } from 'react-redux'
import QrReader from 'react-qr-reader'
import {scanQrCode, confirmQrCode, setScannerActive, resetScanner} from './actions'
import logo from './logo.svg';
import './App.css';
import {ConfirmEventModal} from './components/ConfirmEventModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faArrowDown } from '@fortawesome/free-solid-svg-icons'

function App(props) {
  const [state, setState] = React.useState({
    scanMode: true
  })

  const {most_recent_code:resultFromScanner} = props

  React.useEffect(() => {
    resultFromScanner && props.setScannerActive(false)
  },[resultFromScanner])

  const handleScan = data => {
    if (data) {
      props.scanQrCode(data)
    }
  }

  const handleError = err => {
    console.log('DO SOME THING WITH THIS ERROR')
    console.error(err)
  }
  const changeScanModeSetting = () => {
    const {scanMode} = state
    props.resetScanner()
    setState({...state, scanMode: !scanMode})
    
  }

  const showModal = (
    props.most_recent_code
    && props.qr_code_fetched &&
    !props.qr_code_fetch_error 
    && !props.confirmed_qr_code
  )

  const qrContent = React.useCallback((()=>{
    console.log(props)
    switch(true){
      case !! props.qr_code_fetch_error:
        return (
          <p>
            There was an error scanning the QR code.. {props.qr_code_fetch_error}
          </p>
        )
      case props.most_recent_code && props.confirmed_qr_code:
        return <h2 className="registration-success">Successfully registered!</h2>
      case props.scanner_active:
        return (
          <QrReader
            className="qr-scanner"
            delay={1000}
            onError={handleError}
            onScan={handleScan}
          />
        )
      default:
        return <>
          <p> Begin Scanning Below...</p>
          <div style={{position: 'relative', height: '100%'}}>
          <FontAwesomeIcon icon={faArrowDown} size={'2x'}
            className="arrow-moving-down"
            style={{color: "#FFF", marginLeft: 'auto', position: 'absolute', marginRight: 'auto', left: 0, right: 0}}
          />
          </div>
          </>

    }
  }
  )(), [props])
  return (
    <div className="App" style={{height: window.innerHeight}}>

      {
        showModal && <ConfirmEventModal 
            most_recent_code = {props.most_recent_code}
            confirmed_qr_code = {props.confirmed_qr_code}
            error_with_confirmation = { props.error_with_confirmation}
            resetScanner = {props.resetScanner}
            confirmQrCode = {props.confirmQrCode}
          />
      }

      <button onClick={changeScanModeSetting}>
        {state.scanMode ? 'Switch To Manual Input' : 'Switch to Scanner Mode'}
      </button>
      {
        state.scanMode ? (
          <>
            <div className="qr-content">
              {qrContent}
              {props.loading && <p>Loading...</p>}
              
            </div>
            {
              !showModal ? (
                <button className={
                  props.most_recent_code 
                  ? 'scan-again' 
                  : props.scanner_active 
                  ? 'scan-stop' 
                  : 'scan'
                }
                  onClick={
                    () => {
                      props.setScannerActive(!props.scanner_active)
                    }
                  }
                >
                  <FontAwesomeIcon icon={faCamera} size={'2x'}/>
                </button>
              ) : null
            }
          </>
        ) : <p> manual entry mode todo: </p>
      }
    </div>
  );
}

const mapDispatchToProps = {
  scanQrCode,
  confirmQrCode,
  setScannerActive,
  resetScanner,
}
const mapStateToProps = ({qr_scanner}) => qr_scanner

export default connect(mapStateToProps, mapDispatchToProps)(App);
