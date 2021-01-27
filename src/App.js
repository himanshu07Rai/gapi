import React from "react";
import "./App.css";

function App() {
  var gapi = window.gapi;
  var CLIENT_ID =
    "652321844461-ed2vel37s15o1qccl7nrf8l4klm12a61.apps.googleusercontent.com";
  var API_KEY = "AIzaSyCxJhZMn8xOk-QhmWHtl5FXi8uatZlzfsA";
  var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  var SCOPES = "https://www.googleapis.com/auth/calendar";

  const handleClick = () => {
    gapi.load("client:auth2", () => {
      console.log("loaded client");

      gapi.auth2.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
      // console.log("l");

      gapi.client.load("calendar", "v3", () => console.log("bam!"));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var event = {
            summary: "Google I/O 2015",
            location: "800 Howard St., San Francisco, CA 94103",
            start: {
              dateTime: "2020-01-28T09:00:00-07:00",
              timeZone: "America/Los_Angeles",
            },
            end: {
              dateTime: "2020-01-28T10:00:00-07:00",
              timeZone: "America/Los_Angeles",
            },
          };

          var request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });

          request.execute((event) => {
            console.log(event);
            window.open(event.htmlLink);
          });

          // get events
          gapi.client.calendar.events
            .list({
              calendarId: "primary",
              timeMin: new Date().toISOString(),
              showDeleted: false,
              singleEvents: true,
              maxResults: 10,
              orderBy: "startTime",
            })
            .then((response) => {
              const events = response.result.items;
              console.log("EVENTS: ", events);
            });
        });
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Click to sign in to Google Calendar</p>
        <button style={{ width: 100, height: 50 }} onClick={handleClick}>
          Sign In
        </button>
      </header>
    </div>
  );
}

export default App;
