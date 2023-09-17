import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Tabs, Badge } from "antd";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { format, parse } from "date-fns";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
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

const emptyArray = [];

const calenderHandler = () => {
  const { data, isLoading, isSuccess } = useEventsQuery(undefined, {
    onQueryUpdated: (currentResult, previousResult) => {
      // Get the current and previous data length
      const currentLength = console.log(currentResult.data?.length);
      const previousLength = console.log(previousResult.data?.length);

      // Compare the lengths and do something if they are different
      if (currentLength !== previousLength) {
        console.log(
          `The data length has changed from ${previousLength} to ${currentLength}`
        );
      }
    },
  });

  const [addEvent] = useAddEventMutation();

  const [deleteEvent] = useDeleteEventMutation();

  const [updateEvent] = useUpdateEventMutation();

  const [width, setWidth] = useState(innerWidth);

  const [appointment, setAppointment] = useState({
    display: false,
    title: "",
    titleError: false,
    startDate: "",
    endDate: "",
    allDay: false,
  });

  const handleAppointmentClose = () =>
    setAppointment((prevState) => ({ ...prevState, display: false }));

  const handleAppointmentShow = (calendarApi, info) =>
    setAppointment((prevState) => ({
      ...prevState,
      reset: {
        display: true,
        startDate: info.startStr,
        endDate: info.endStr,
        allDay: info.allDay,
      },
      api: calendarApi,
      display: true,
      startDate: info.startStr,
      endDate: info.endStr,
      allDay: info.allDay,
    }));

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  }, []);

  const handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    handleAppointmentShow(calendarApi, selectInfo);

    // if (title) {
    //   calendarApi.addEvent({
    //     id: uuidv4(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   });
    // }
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

  if (isSuccess)
    return (
      <div className="Appointments-calender">
        {appointmentBox(data)}
        <div className="Appointments-calender-main">
          <FullCalendar
            customButtons={{
              myCustomButton: {
                text: "hamburger",
                icon: "bi-list",
                click: handleShow,
              },
            }}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
              bootstrap5Plugin,
            ]}
            themeSystem="bootstrap5"
            headerToolbar={{
              left: width < 992 ? "myCustomButton,prev,next" : "prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listDay",
            }}
            initialView="dayGridMonth"
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
        <Offcanvas
          className="calender-offCanvas"
          style={{ width: "250px" }}
          show={show}
          onHide={handleClose}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>title</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>body</Offcanvas.Body>
        </Offcanvas>

        <Offcanvas
          placement="end"
          className="calender-offCanvas-appointment "
          style={{ width: "350px" }}
          show={appointment.display}
          onHide={handleAppointmentClose}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Add Event</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <TextField
              className="textField"
              error={appointment.titleError}
              id="outlined-required"
              label="Title"
              helperText={`${
                appointment.titleError ? "This field is required" : ""
              }`}
              value={appointment.title}
              onChange={(e) => {
                e.target.value !== ""
                  ? setAppointment((prevState) => ({
                      ...prevState,
                      title: e.target.value,
                      titleError: false,
                    }))
                  : setAppointment((prevState) => ({
                      ...prevState,
                      title: e.target.value,
                      titleError: true,
                    }));
              }}
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {appointment.allDay ? (
                <>
                  <DatePicker
                    error
                    helperText="This field is required"
                    className="mt-4 textField"
                    label="Start Date"
                    value={new Date(appointment.startDate)}
                    onChange={(newValue) => {
                      setAppointment((prevState) => ({
                        ...prevState,
                        startDate: newValue,
                      }));
                    }}
                  />
                  <DatePicker
                    error
                    helperText="This field is required"
                    className="mt-4 textField"
                    label="End Date"
                    value={new Date(appointment.endDate)}
                    onChange={(newValue) => {
                      setAppointment((prevState) => ({
                        ...prevState,
                        endDate: newValue,
                      }));
                    }}
                  />
                </>
              ) : (
                <>
                  <DateTimePicker
                    error
                    helperText="This field is required"
                    className="mt-4 textField"
                    label="Start Date"
                    value={new Date(appointment.startDate)}
                    onChange={(newValue) => {
                      setAppointment((prevState) => ({
                        ...prevState,
                        startDate: newValue,
                      }));
                    }}
                  />

                  <DateTimePicker
                    error
                    helperText="This field is required"
                    className="mt-4 textField"
                    label="End Date"
                    value={new Date(appointment.endDate)}
                    onChange={(newValue) => {
                      setAppointment((prevState) => ({
                        ...prevState,
                        endDate: newValue,
                      }));
                    }}
                  />
                </>
              )}
              <div className="mt-4">
                <Switch
                  name="allDay"
                  checked={appointment.allDay}
                  onChange={(e) =>
                    setAppointment((prevState) => ({
                      ...prevState,
                      allDay: e.target.checked,
                    }))
                  }
                />
                <label className="fw-bold">All Day</label>
              </div>
            </LocalizationProvider>

            <FormControl sx={{ mt: 3, minWidth: "100%" }}>
              <InputLabel id="demo-select-small-label">Patient</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Patient"
              >
                <MenuItem value={10}>Demo 1</MenuItem>
                <MenuItem value={20}>Demo 2</MenuItem>
                <MenuItem value={30}>Demo 3</MenuItem>
              </Select>
            </FormControl>
          </Offcanvas.Body>
          <div className="py-4 bg-secondary">
            <button
              onClick={() => {
                appointment.api.addEvent({
                  id: uuidv4(),
                  title: appointment.title,
                  start: appointment.startDate,
                  end: appointment.endDate,
                  allDay: appointment.allDay,
                });
                setAppointment({
                  display: false,
                  title: "",
                  titleError: false,
                  startDate: "",
                  endDate: "",
                  allDay: false,
                });
                handleAppointmentClose();
              }}
              className="btn btn-primary fw-bold px-3 mx-3"
            >
              ADD
            </button>
            <button
              onClick={() => {
                setAppointment((prevState) => ({
                  ...prevState,
                  ...prevState.reset,
                  title: "",
                }));
              }}
              className="btn btn-warning fw-bold mx-3 px-3"
            >
              RESET
            </button>
          </div>
        </Offcanvas>
      </div>
    );
};

const appointmentBox = () => {
  const items = [
    {
      key: "1",
      label: (
        <Badge className="text-white" count={0} offset={[-5, -10]}>
          <span>Scheduled</span>
        </Badge>
      ),
      children: "Content of Tab pane 1",
    },
    {
      key: "2",
      label: (
        <Badge className="text-white" count={0} offset={[-5, -10]}>
          <span>Waiting</span>
        </Badge>
      ),
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: (
        <Badge className="text-white" count={0} offset={[-5, -10]}>
          <span>Engaged</span>
        </Badge>
      ),
      children: "Content of Tab Pane 3",
    },
    {
      key: "4",
      label: (
        <Badge className="text-white" count={0} offset={[-5, -10]}>
          <span>completed</span>
        </Badge>
      ),
      children: "Content of Tab Pane 3",
    },
    {
      key: "5",
      label: (
        <Badge className="text-white" count={0} offset={[-5, -10]}>
          <span>Missed</span>
        </Badge>
      ),
      children: "Content of Tab Pane 3",
    },
  ];

  return (
    <Tabs
      items={items}
      className="appointments-box"
      defaultActiveKey="1"
    ></Tabs>
  );
};

export default Appointments;
