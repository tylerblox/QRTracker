import React from 'react'

export const ConfirmEventModal = (props) => {
    
    return (
          <div className="confirm-event-modal">
            <div className="confirm-event-content">
                {props.error_with_confirmation && (<p className="error-text">Error in confirming event.  Please try again, or <span onClick={props.resetScanner}>Scan a new Code</span></p>)}
                <h1>Confirm this Event</h1>
                <ul>
                <li>
                    {props.most_recent_code.event.name}
                </li>
                <li>
                    {props.most_recent_code.event.date}
                </li>
                <li>
                    {props.most_recent_code.event.location.name}
                </li>
                </ul>
            </div>
            <div className="confirmation-buttons">
                <button
                className="button--primary"
                onClick={
                    () => {
                      props.confirmQrCode(true, {event_promoter: props.most_recent_code.id})
                    }
                }
                >
                Yes
                </button>

                <button
                className="button--secondary"
                onClick={
                    () => {
                      props.confirmQrCode(false, {})
                    }
                }
                >
                No
                </button>
            </div>

          </div>
        )
        
}