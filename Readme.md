# Together
Together is a new app designed for 100devs. Together is a group calendar for public events, so you can see what's going on in your community. We're making it easier to find out about the events that are happening in Discord and let you know how much fun they'll be!

**Link to project:** https://together.cyclic.app/

![alt tag](https://i.ibb.co/vVH3qjx/Screen-Shot-2022-11-05-at-12-13-17-PM.png)

## How It's Made:

**Tech used:** Tailwind, JavaScript, MERN

Work in Progress

## Optimizations
*(optional)*

Work in Progress

## Lessons Learned:

Work in Progress

## Want to Contribute?

Look below to see what MVP tasks are currently open. We have instructions on how to contribute [here](https://github.com/Caleb-Cohen/Together/blob/main/CONTRIBUTING.md). To claim a task add your name and status to the specifc task as a PR. 

## BRAINSTORM

tagged with hacktoberfest
100devs classes and events are registered and displayed
This section is to assign tasks to collaborators for project completion.

## MVP Tasks (Task - Person Responsible - Status)
- [x] Anyone can visit the site - @Caleb#9822 - Completed
- [x] Update readme to give a better description of what Together is - @Caleb#9822 - Completed
- [x] Update readme for tasklist - @Caleb#9822 - In Progress
- [x] Add contributing.md to give instructions on how to contribute - @intelagense#1958 - Completed
- [x] import calendar into views (https://codepen.io/robstinson/pen/BaKOZry) - @KaKo#3766 - Completed
- [x] Diagram for main view, event view and database - @intelagense#1958 - In Progress [here](https://cdn.discordapp.com/attachments/1038482732633825442/1038547318103867514/image.png)
- [x] Event Addition form to submit event objects to database - @InstincDev#9789 - In Progress
- [ ] Event Schema added to models - @Caleb#9822 - In Progress & Requested Review
- [x] Database takes in event objects through form submit (may be mergeable with @InstincDev#9789 current task)
- [x] Calendar Views interactability (Shows current months and can click for future months) - @KaKo#3766 - Completed
- [ ] Visualize event objects for corresponding days
- [ ] Events can be clickable for more info
- [ ] Landing page design
- [ ] How it works/description page
- [ ] General design element changed. Remove the BOB favicon, and remove mention of BUB and 100 Devs social network.

Implement
- take either the date object for each day or the event object and conditionally check the day
- Start time, no end time

## Next Level 

- users authenticate with discord oauth2 
- OAuth will check to see if they are in the 100devs guild(server)
- users can add or delete events (two-step delete process for confirmation)
- (can have an event log tied to the user name)

## Next next-level stuff
- users rsvp events, and a total is displayed
- events can have channels tagged that match the server channel emojis' daily view. Clicking on the day can bring up a day planner view, just like the google calendar
- users can add an event to their calendar through a click
- users can share events on Twitter
- new event notification dots(easy mode might be to just highlight new events on each reload)

## thinking ahead,
keep these in mind to prevent the project from being "caged."
can integrate with slack or Discord and work on other servers besides 100devs

Resources:
https://codepen.io/robstinson/pen/BaKOZry 

# Install

`npm install`

---

# Things to add

- Create a `.env` file in the config folder and add the following as `key = value.`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your Cloudinary cloud name`
  - API_KEY = `your Cloudinary API key`
  - API_SECRET = `your Cloudinary API secret`

---

# Run

`npm start`

