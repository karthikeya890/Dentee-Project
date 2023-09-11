import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import "./Appointments.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import {
  useEventsQuery,
  useAddEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
} from "../../api/event";

const Appointments = () => {
  return <div className="Appointments-container row">{calenderHandler()}</div>;
};

const calenderHandler = () => {
  const { data, isLoading, isSuccess } = useEventsQuery();
  const [currentEvents, setCurrentEvents] = useState();

  const [addEvent] = useAddEventMutation();

  const [deleteEvent] = useDeleteEventMutation();

  const [updateEvent] = useUpdateEventMutation();

  let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: uuidv4(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        {!eventInfo.allDay && <div className="event"></div>}
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  const handleEventClick = (clickInfo) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  if (isSuccess)
    return (
      <div className="Appointments-calender col-12">
        <div className="Appointments-calender-main">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              bootstrap5Plugin,
            ]}
            themeSystem="bootstrap5"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "timeGridDay,timeGridWeek,dayGridMonth",
            }}
            initialView="timeGridDay"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            initialEvents={data} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
             */
            eventAdd={(e) =>
              addEvent({
                id: e.event.id,
                title: e.event.title,
                start: e.event.startStr,
                end: e.event.endStr,
                allDay: e.event.allDay,
              })
            }
            eventRemove={(e) => deleteEvent({ id: e.event.id })}
            eventChange={(e) =>
              updateEvent({
                id: e.event.id,
                title: e.event.title,
                start: e.event.startStr,
                end: e.event.endStr,
                allDay: e.event.allDay,
              })
            }
          />
        </div>
      </div>
    );
};

export default Appointments;
