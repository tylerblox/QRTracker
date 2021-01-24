import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faCalendarDay, faStore } from '@fortawesome/free-solid-svg-icons'

export const ConfirmEventModal = (props) => {
    
    return (
          <div className="confirm-event-modal">
            <div className="confirm-event-content">
                {props.error_with_confirmation && (<p className="error-text">Error in confirming event.  Please try again, or <span onClick={props.resetScanner}>Scan a new Code</span></p>)}
                <div className="confirm-event-content--topic">Confirm this Event</div>
                <div className="confirm-event-content--event">
                    <div className="event-name-display-holder">
                        <h1 className="confirm-event-content--event--name">
                            {props.most_recent_code.event.name}
                        </h1>
                    </div>
                    <ul>
                        <li>
                            <FontAwesomeIcon icon={faCalendarDay} size={'2x'} style={{width: 32}}/><span>{props.most_recent_code.event.date}</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faStore} size={'2x'} style={{width: 32}}/>{props.most_recent_code.event.location.name}
                        </li>
                    </ul>
                </div>
                
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
                <FontAwesomeIcon icon={faCheck} size={'4x'}/>
                </button>

                <button
                className="button--secondary"
                onClick={
                    () => {
                      props.confirmQrCode(false, {})
                    }
                }
                >
                <FontAwesomeIcon icon={faTimes} size={'4x'}/>
                </button>
            </div>

          </div>
        )
        
}