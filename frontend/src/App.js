import React, { Component } from 'react';
import { connect } from 'react-redux'
import QrReader from 'react-qr-reader'
import {scanQrCode, confirmQrCode, setScannerActive, resetScanner} from './actions'
import logo from './logo.svg';
import './App.css';
import {ConfirmEventModal} from './components/ConfirmEventModal'

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

  console.log(props.most_recent_code)

  const handleError = err => {
    console.error(err)
  }
  const changeScanModeSetting = () => {
    const {scanMode} = state
    setState({...state, scanMode: !scanMode})
  }

  const showModal = (
    props.most_recent_code
    && props.qr_code_fetched &&
    !props.qr_code_fetch_error 
    && !props.confirmed_qr_code
  )

 
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
              {
                props.scanner_active && (
                  <QrReader
                    className="qr-scanner"
                    delay={1000}
                    onError={handleError}
                    onScan={handleScan}
                  />
                ) || <p> Begin Scanning Below...</p>
              }
              {
                props.most_recent_code && props.confirmed_qr_code && (
                  <h2 className="registration-success">Successfully registered!</h2>
                )
              }
              {props.loading && <p>Loading...</p>}
            {props.qr_code_fetch_error && <p>There was an error scanning the QR code.. {props.qr_code_fetch_error.message}</p>}
            </div>
            {
              !showModal ? (
                <button
                  onClick={
                    () => {
                      props.setScannerActive(!props.scanner_active)
                    }
                  }
                >
                  {props.most_recent_code ? 'Scan Again' : props.scanner_active ? 'Stop Scanning' : 'Start Scanning'}
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
  resetScanner
}
const mapStateToProps = ({qr_scanner}) => qr_scanner

export default connect(mapStateToProps, mapDispatchToProps)(App);
