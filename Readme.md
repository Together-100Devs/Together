BRAINSTORM

tagged with hacktoberfest
100devs classes and events are registered and displayed

MVP
- Anyone can visit site
- We add events or users personally request us for accounts to add events
- Events can be clickable for more info
- Database takes in event objects
- Visualize objects in corresponding objects

Implement
- take either date object for each day or event object and conditionally check day
- Start time, no end time

Questions 
- What type of framework?

Next level 

- users authenticate with discord oauth2 
- oauth will check to see if they are in the 100devs guild(server)
- users can add or delete events (two step delete process for confirmation)
- (can have an event log tied to user name)

Next next level stuff
- users rsvp events and a total is displayed
- events can have channels tagged that match the server channel emojis daily view. clicking on the day can bring up a day planner view just like google calendar
- users can add event to their calendar through a click
- users can share events to twitter
- new event notification dots(easy mode might be to just highlight new events on each reload)

thinking ahead
keep these in mind to prevent the project from being "caged"
can integrate with slack or discord and work on other servers besides 100devs

resources:
https://codepen.io/robstinson/pen/BaKOZry 

# Install

`npm install`

---

# Things to add

- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`

---

# Run

`npm start`

