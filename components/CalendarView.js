
'use client'

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { addEvent } from "@/app/actions/event";

export default function CalendarPage({ events, userRole }) {
    const [date, setDate] = useState(new Date());

    // Helper to find events for a specific day
    const getEventsForDate = (d) => {
        return events.filter(e => {
            const eventDate = new Date(e.date);
            return eventDate.getDate() === d.getDate() &&
                eventDate.getMonth() === d.getMonth() &&
                eventDate.getFullYear() === d.getFullYear();
        });
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dayEvents = getEventsForDate(date);
            if (dayEvents.length > 0) {
                return (
                    <div className="flex flex-col gap-1 mt-1">
                        {dayEvents.map(e => {
                            let color = 'bg-blue-500';
                            if (e.type === 'exam') color = 'bg-red-500';
                            if (e.type === 'holiday') color = 'bg-green-500';
                            return <div key={e._id} className={`w-2 h-2 rounded-full ${color} mx-auto`} title={e.title}></div>
                        })}
                    </div>
                )
            }
        }
    };

    const selectedDateEvents = getEventsForDate(date);

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">School Calendar</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Calendar View */}
                <div className="card bg-base-100 shadow-xl p-4 flex items-center justify-center">
                    <Calendar
                        onChange={setDate}
                        value={date}
                        tileContent={tileContent}
                        className="rounded-xl border-none shadow-none text-base-content"
                    />
                </div>

                {/* Details & Admin Panel */}
                <div>
                    <div className="card bg-base-100 shadow-xl mb-6">
                        <div className="card-body">
                            <h2 className="card-title">Events for {date.toDateString()}</h2>
                            {selectedDateEvents.length === 0 ? (
                                <p className="text-opacity-50">No events scheduled.</p>
                            ) : (
                                <ul className="space-y-2">
                                    {selectedDateEvents.map(e => (
                                        <li key={e._id} className="p-3 bg-base-200 rounded-box flex justify-between items-center">
                                            <div>
                                                <div className="font-bold flex items-center gap-2">
                                                    {e.title}
                                                    <span className={`badge badge-sm ${e.type === 'exam' ? 'badge-error' : e.type === 'holiday' ? 'badge-success' : 'badge-info'}`}>{e.type}</span>
                                                </div>
                                                <div className="text-sm opacity-70">{e.description}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Teacher Only: Add Event */}
                    {userRole === 'teacher' && (
                        <div className="card bg-base-100 shadow-xl border-2 border-primary/20">
                            <div className="card-body">
                                <h3 className="card-title text-sm uppercase tracking-wide text-primary">Add Event</h3>
                                <form action={addEvent}>
                                    <input type="hidden" name="date" value={date.toISOString()} />

                                    <div className="form-control mb-2">
                                        <label className="label"><span className="label-text">Title</span></label>
                                        <input type="text" name="title" className="input input-bordered" required />
                                    </div>

                                    <div className="form-control mb-2">
                                        <label className="label"><span className="label-text">Type</span></label>
                                        <select name="type" className="select select-bordered" defaultValue="event">
                                            <option value="exam">Exam</option>
                                            <option value="holiday">Holiday</option>
                                            <option value="event">Event</option>
                                        </select>
                                    </div>

                                    <div className="form-control mb-4">
                                        <label className="label"><span className="label-text">Description</span></label>
                                        <textarea name="description" className="textarea textarea-bordered"></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-primary w-full">Add to Calendar</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
