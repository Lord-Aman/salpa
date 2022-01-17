import React, { Component } from "react";
import Axios from "axios";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "../utils/event-utils";

class Calendar extends Component {
  state = {
    currentEvents: [],
    isAdmin: false,
  };

  isAdmin = () => {
    if (this.props.user) return true;

    return false;
  };

  async componentDidMount() {
    const events = await Axios.get("http://localhost:8080/api/event");
    this.setState({ currentEvents: events.data });
  }

  render() {
    const events = this.state.currentEvents;

    return (
      <>
        <div className="demo-app">
          {this.renderSidebar()}
          <div className="demo-app-main">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              initialView="dayGridMonth"
              editable={this.isAdmin()}
              selectable={this.isAdmin()}
              selectMirror={true}
              dayMaxEvents={true}
              initialEvents={INITIAL_EVENTS} //alternatively, use the 'events' setting to fetch from a feed
              events={"http://localhost:8080/api/event"}
              select={this.handleDateSelect}
              eventContent={renderEventContent} //custom render function
              eventClick={this.handleEventClick}
              eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            />
          </div>
        </div>
      </>
    );
  }
  renderSidebar() {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <h2>All Events ({this.state.currentEvents.length})</h2>
          <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

  handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); //clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.addDay,
      });

      Axios.post("http://localhost:8080/api/event", {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.addDay,
      });
    }
  };

  handleEventClick = async (clickInfo) => {
    const isAdmin = this.isAdmin();
    if (isAdmin) {
      if (
        window.confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        await Axios.delete("http://localhost:8080/api/event", {
          data: { id: clickInfo.event._def.extendedProps._id },
        });
        clickInfo.event.remove();
      }
    }
  };

  handleEvents = (events) => {
    this.setState({ currentEvents: events });
  };
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event) {
  return (
    <li key={event._id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}

export default Calendar;
