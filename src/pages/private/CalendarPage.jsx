/**
 * @file CalendarPage.jsx
 * @description Content calendar — monthly calendar grid with event dots and a sidebar event list.
 */
import { useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine, RiAddLine } from 'react-icons/ri';
import { MOCK_EVENTS } from '../../mock/calendar.mock';
import Card from '../../components/ui/Card';

const DAYS   = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarPage() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(2024, 6, 1)); // July 2024 to match mock data

  const year  = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth  = getDaysInMonth(year, month);
  const firstDaySlot = getFirstDayOfMonth(year, month);
  const totalCells   = Math.ceil((firstDaySlot + daysInMonth) / 7) * 7;

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Map events to their date strings for quick lookup
  const eventsByDate = MOCK_EVENTS.reduce((acc, ev) => {
    if (!acc[ev.date]) acc[ev.date] = [];
    acc[ev.date].push(ev);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Content Calendar</h2>
          <p className="text-sm text-gray-500 mt-0.5">Plan and schedule your content</p>
        </div>
        <button className="inline-flex items-center gap-1.5 bg-brand-600 text-white text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-brand-700 transition-colors">
          <RiAddLine size={16} /> Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Calendar grid */}
        <Card className="xl:col-span-2 p-5">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-5">
            <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <RiArrowLeftSLine size={20} className="text-gray-600" />
            </button>
            <h3 className="text-base font-semibold text-gray-900">{MONTHS[month]} {year}</h3>
            <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <RiArrowRightSLine size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
            ))}
          </div>

          {/* Date cells */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: totalCells }).map((_, idx) => {
              const dayNum = idx - firstDaySlot + 1;
              const isCurrentMonth = dayNum >= 1 && dayNum <= daysInMonth;
              const dateStr = isCurrentMonth
                ? `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
                : null;
              const dayEvents = dateStr ? (eventsByDate[dateStr] || []) : [];
              const isToday = dateStr === today.toISOString().split('T')[0];

              return (
                <div
                  key={idx}
                  className={`min-h-[72px] rounded-lg p-1.5 ${
                    !isCurrentMonth ? 'opacity-0 pointer-events-none' :
                    isToday ? 'bg-brand-50 border border-brand-200' : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <span className={`text-xs font-medium block mb-1 ${
                    isToday ? 'text-brand-600' : 'text-gray-700'
                  }`}>
                    {isCurrentMonth ? dayNum : ''}
                  </span>
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 2).map(ev => (
                      <div
                        key={ev.id}
                        className={`text-[10px] text-white px-1 py-0.5 rounded truncate ${ev.color}`}
                        title={ev.title}
                      >
                        {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[10px] text-gray-400">+{dayEvents.length - 2} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Upcoming events list */}
        <Card className="p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {MOCK_EVENTS.sort((a, b) => a.date.localeCompare(b.date)).map(ev => (
              <div key={ev.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div className={`h-2.5 w-2.5 rounded-full flex-shrink-0 mt-1.5 ${ev.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 leading-tight">{ev.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{ev.date} &middot; {ev.assignee}</p>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                  ev.status === 'scheduled' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                }`}>{ev.status}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
