import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import EventModal from './EventModal';

moment.locale('es');
const localizer = momentLocalizer(moment);

function EventList({ events, onEventUpdated, onEventDeleted, canEdit = false, tribbuId = null }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState('month');

  const handleSelectEvent = (event) => {
    setSelectedEvent(event.resource);
    setSelectedSlot(null);
    setIsModalOpen(true);
  };

  const handleSelectSlot = (slotInfo) => {
    if (!canEdit || !tribbuId) return;
    setSelectedSlot({
      start: slotInfo.start,
      end: slotInfo.end,
    });
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setSelectedSlot(null);
  };

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.resource.completed ? '#10b981' : '#6366f1',
      borderRadius: '5px',
      opacity: event.resource.completed ? 0.7 : 1,
      color: 'white',
      border: '0px',
      display: 'block',
      textDecoration: event.resource.completed ? 'line-through' : 'none',
    };
    return { style };
  };

  const hasEvents = Array.isArray(events) && events.length > 0;

  const calendarEvents = (events || []).map((event) => {
    let title = event.completed ? '✓ ' : '';
    title += event.title;

    if (event.childId?.name) {
      title += ` - 🐶 ${event.childId.name}`;
    }

    if (event.tribbuName) {
      title += ` (${event.tribbuName})`;
    }

    if (event.responsibles && event.responsibles.length > 0) {
      const respNames = event.responsibles.map((r) => r.name || r).join(', ');
      title += ` [${respNames}]`;
    }

    return {
      id: event._id,
      title,
      start: new Date(event.start),
      end: new Date(event.end),
      resource: event,
    };
  });

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
        {!hasEvents && (
          <div className="mb-4 text-center text-slate-500 italic">
            <p>No hay eventos programados</p>
            {canEdit && tribbuId && (
              <p className="text-slate-400 text-sm mt-1">
                Haz click en el calendario para crear un evento
              </p>
            )}
          </div>
        )}

        <div className="mb-4 flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-indigo-500"></div>
            <span className="text-slate-600">Pendiente</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500 opacity-70"></div>
            <span className="text-slate-600">Completado</span>
          </div>
        </div>

        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable={canEdit && tribbuId}
          eventPropGetter={eventStyleGetter}
          date={date}
          onNavigate={(newDate) => setDate(newDate)}
          view={view}
          onView={(newView) => setView(newView)}
          messages={{
            next: "Siguiente",
            previous: "Anterior",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
            agenda: "Agenda",
            date: "Fecha",
            time: "Hora",
            event: "Evento",
            noEventsInRange: "No hay eventos en este rango",
            showMore: (total) => `+ Ver más (${total})`
          }}
          views={['month', 'week', 'day', 'agenda']}
          defaultView="month"
          popup
        />
      </div>

      {isModalOpen && (
        <EventModal
          event={selectedEvent}
          slotInfo={selectedSlot}
          tribbuId={tribbuId}
          canEdit={canEdit}
          onClose={handleCloseModal}
          onEventUpdated={onEventUpdated}
          onEventDeleted={onEventDeleted}
        />
      )}
    </>
  );
}

export default EventList;