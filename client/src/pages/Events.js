import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Events = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    { id: 1, title: 'Tech Meetup', description: 'Discuss latest trends in tech.', location: 'Virtual', datetime: '2024-08-15T10:00' },
    { id: 2, title: 'Project Kick-off', description: 'Start new project with team.', location: 'Office A', datetime: '2024-08-16T14:00' },
    { id: 3, title: 'Webinar on AI', description: 'Learn about AI applications.', location: 'Online', datetime: '2024-08-20T16:30' },
    { id: 4, title: 'UX Workshop', description: 'Hands-on workshop on UX design.', location: 'Studio B', datetime: '2024-07-14T09:30' },
    { id: 5, title: 'Product Launch', description: 'Launch of new product line.', location: 'Headquarters', datetime: '2024-07-15T15:00' },
    { id: 6, title: 'Hackathon Finals', description: 'Final round of global hackathon.', location: 'Virtual', datetime: '2024-07-15T18:00' },
    { id: 7, title: 'Panel Discussion', description: 'Panel on future of AI in healthcare.', location: 'Conference Center', datetime: '2024-07-16T11:00' },
    { id: 8, title: 'Networking Mixer', description: 'Networking event for tech professionals.', location: 'Rooftop Lounge', datetime: '2024-07-16T18:30' },
    { id: 9, title: 'Workshop on ML', description: 'Introductory workshop on machine learning.', location: 'Lab C', datetime: '2024-07-17T13:00' },
    { id: 10, title: 'Webinar on Blockchain', description: 'Deep dive into blockchain technology.', location: 'Online', datetime: '2024-07-18T17:00' }
  ]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    // Filter events for the selected date
    const filteredEvents = events.filter(event => new Date(event.datetime).toDateString() === date.toDateString());
    setEvents(filteredEvents);
  };

  const handleCreateEvent = () => {
    setShowForm(true);
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newEvent = {
      id: events.length + 1,
      title: formData.get('eventTitle'),
      description: formData.get('eventDescription'),
      location: formData.get('eventLocation'),
      datetime: formData.get('eventDateTime')
    };
    setEvents([...events, newEvent]);
    setShowForm(false);
    // Placeholder for submitting event data to backend
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <div className="flex-1 flex flex-col justify-start items-center mt-4 px-4">
        <h1 className="text-4xl font-bold mb-6">Upcoming Events:</h1>
        <button
          onClick={handleCreateEvent}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          + Create Event Form
        </button>

        <div className="mt-8">
          <div className="flex justify-center items-center">
            <Calendar
              onChange={handleDateClick}
              value={selectedDate}
              className="shadow-lg rounded-lg"
            />
          </div>
        </div>

        {events.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-lg p-4">
                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                <p className="text-gray-700 mb-2">{event.description}</p>
                <p className="text-gray-600 mb-2">{event.location}</p>
                <p className="text-gray-600 mb-2">{new Date(event.datetime).toLocaleString()}</p>
                <div className="flex justify-between">
                  <span className={`text-sm px-2 py-1 rounded-md ${new Date(event.datetime).toDateString() === new Date().toDateString() ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
                    {new Date(event.datetime).toDateString() === new Date().toDateString() ? 'Today' : 'Upcoming'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
            <button
              onClick={handleCloseForm}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h2 className="text-2xl font-semibold mb-4">Create New Event</h2>
            <form onSubmit={handleSubmitEvent} className="space-y-4">
              <div>
                <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700">Title:</label>
                <input type="text" id="eventTitle" name="eventTitle" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="eventDateTime" className="block text-sm font-medium text-gray-700">Date & Time:</label>
                <input type="datetime-local" id="eventDateTime" name="eventDateTime" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="eventLocation" className="block text-sm font-medium text-gray-700">Location:</label>
                <input type="text" id="eventLocation" name="eventLocation" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">Description:</label>
                <textarea id="eventDescription" name="eventDescription" required rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none">
                Register Event
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;