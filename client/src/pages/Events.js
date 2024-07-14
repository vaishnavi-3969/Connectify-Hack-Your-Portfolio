import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../App.css';

/**
 * This React component creates an event management interface with a 
 * calendar and event creation functionality.
 * Allows users to select dates and view events and provides a form to create new events
 * 
 * TODO: Create backend functionalities for scheduling and displaying content
 */
const Events = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setEvents([{ title: 'Sample Event', description: 'This is a placeholder event.' }]);
  };

  const handleCreateEvent = () => {
    setShowForm(true);
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    setShowForm(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '84vh',
      backgroundColor: '#e6f3f5',
      boxSizing: 'border-box' 
    }}>
      <div style={{ flex: 1, marginTop: '2.5%', padding: '20px' }}>
        <h1 style={{ fontSize: '60px' }}><strong>Upcoming Events:</strong></h1>
        <button 
          onClick={handleCreateEvent} 
          style={{ 
            float: 'right', 
            padding: '10px', 
            backgroundColor: '#0F084B', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px' 
          }}
        >
          + Create Event Form
        </button>
        <div style={{ clear: 'both' }}></div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          marginTop: '20px', 
          height: '50vh' ,
        }}>
          <Calendar
            className={['c1','c2']}
            onChange={handleDateClick}
            value={selectedDate}
          />
        </div>
        
        {events.length > 0 && (
          <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
            <h2>Events for {selectedDate.toDateString()}</h2>
            {events.map((event, index) => (
              <div key={index}>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div style={{ 
            position: 'fixed', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '10px', 
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            width: '300px'
          }}>
            <button 
              onClick={handleCloseForm} 
              style={{ 
                position: 'absolute', 
                top: '10px', 
                right: '10px', 
                background: 'none', 
                border: 'none', 
                fontSize: '20px', 
                cursor: 'pointer' 
              }}
            >
              ×
            </button>
            <h2>Create New Event</h2>
            <form onSubmit={handleSubmitEvent}>
              <div>
                <label>What:</label>
                <input type="text" required style={{ width: '100%', marginBottom: '10px' }} />
              </div>
              <div>
                <label>When:</label>
                <input type="datetime-local" required style={{ width: '100%', marginBottom: '10px' }} />
              </div>
              <div>
                <label>Where:</label>
                <input type="text" required style={{ width: '100%', marginBottom: '10px' }} />
              </div>
              <div>
                <label>Description of Event:</label>
                <textarea required style={{ width: '100%', marginBottom: '10px' }}></textarea>
              </div>
              <button 
                type="submit" 
                style={{ 
                  backgroundColor: '#007bff', 
                  color: 'white', 
                  padding: '10px', 
                  border: 'none', 
                  borderRadius: '5px', 
                  width: '100%' 
                }}
              >
                Register
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;