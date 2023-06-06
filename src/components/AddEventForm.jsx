// reacts
import React, { useState, useEffect, useRef } from "react";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

// rrd imports
import { Form, useFetcher } from "react-router-dom"

// library imports
import { CurrencyDollarIcon } from "@heroicons/react/24/solid"

const AddEventForm = ({ userName }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting"

  const formRef = useRef();
  const focusRef = useRef();

  // event date
  const [datevalue, onDateChange] = useState(new Date());
  //event time
  const [timevalue, onTimeChange] = useState('10:00');

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset()
      focusRef.current.focus()
    }
  }, [isSubmitting])

  const venues = [
    {name: 'Bonifacio Hall', id: 1},
    {name: 'Rizal Hall', id: 2},
    {name: 'Kalayaan Hall', id: 3}
  ]

  const holdingrooms = [
    {name: 'Holding Room 1', id: 1},
    {name: 'Holding Room 2', id: 2},
    {name: 'Holding Room 3', id: 3}
  ]

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Create event
      </h2>
      <fetcher.Form
        method="post"
        className="grid-sm"
        ref={formRef}
      >
        <div className="grid-xs">
          <label htmlFor="newEvent">Event Name</label>
          <input
            type="text"
            name="newEvent"
            id="newEvent"
            placeholder="e.g., Event One 2023"
            required
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newEventPax">No. of Pax</label>
          <input
            type="number"
            step="1"
            name="newEventPax"
            id="newEventPax"
            placeholder="e.g., 50"
            required
            inputMode="numeric"
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newEventDate">Event Date</label>
          <DatePicker
            name="newEventDate"
            id="newEventDate"
            onChange={onDateChange}
            value={datevalue}
            required />
        </div>

        <div className="grid-xs">
          <label htmlFor="newEventTime">Event Time</label>
          <TimePicker
            name="newEventTime"
            id="newEventTime"
            onChange={onTimeChange}
            value={timevalue}
            format="hh:mm a"
            required />
        </div>

        <br />


        <div className="grid-xs">
          <label>Event Venue</label>
          <select name="newEventVenue" id="newEventVenue" required>
            {
              venues
                .sort((a, b) => a.name - b.name)
                .map((venue) => {
                  return (
                    <option key={venue.id} value={venue.name}>
                      {venue.name}
                    </option>
                  )
                })
            }
          </select>
        </div>

        <div className="grid-xs">
          <label>Event Holding Room</label>
          <select name="newEventHoldingRoom" id="newEventHoldingRoom" required>
            {
              holdingrooms
                .sort((a, b) => a.name - b.name)
                .map((room) => {
                  return (
                    <option key={room.id} value={room.name}>
                      {room.name}
                    </option>
                  )
                })
            }
          </select>
        </div>

        <div className="grid-xs">
          <label htmlFor="newUserName">User Name</label>
          <input
            type="text"
            name="newUserName"
            id="newUserName"
            value={userName}
            readonly
          />
        </div>

        <input type="hidden" name="_action" value="createEvent" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {
            isSubmitting ? <span>Submitting…</span> : (
              <>
                <span>Create event</span>
                <CurrencyDollarIcon width={20} />
              </>
            )
          }
        </button>
      </fetcher.Form>
    </div>
  )
}
export default AddEventForm