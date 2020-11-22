import { faPray } from "@fortawesome/free-solid-svg-icons";
import React, {useReducer, useEffect, useState} from "react";
import {getEvents, getEventRegistrations} from '../../actions'
import {statisticsPageReducer, initialState} from '../../reducers/adminReducers'

export default function Statistics(props){
    const [state, dispatch] = useReducer(statisticsPageReducer, initialState)
    const [tableEvent, setTableEvent] = useState(null)
    useEffect(() => {
        getEvents()(dispatch)
    }, [])

    if(state.loading){
        return 'Loading'
    }
    if (state.events){
        return <>
            {state.events.map((event, i) => 
                <button key={event.id} name={event.name} onClick={() => setTableEvent(event)}>
                    {event.name}
                </button>
                )
            }
            {
                tableEvent ? (
                    <table style={{width: '100%', textAlign: 'center'}}>
                        <thead>
                            <tr>
                                <th>Promoter</th>
                                <th>Registration Count</th>
                            </tr> 
                        </thead>
                        <tbody>
                            {
                                tableEvent.event_promoters.map(
                                    promoter => (
                                        <tr>
                                            <td>
                                                {promoter.promoter_name}
                                            </td>
                                            <td>
                                                {promoter.registration_count}
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                ) : null
            }
        </>
    }
    if (state.error){
        return 'error'
    }
    return null
}