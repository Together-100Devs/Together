<h1 align="center">
  <a href="https://github.com/Caleb-Cohen/Together">
    <img src="docs/images/logo.png" alt="Together logo" width="125">
  </a>
</h1>

<div align="center">
  Group calendar for public events, so you can see 
  <br/>
  what's going on in the 100Devs community!
  <br/>
  <br/>
  <a href="https://github.com/Caleb-Cohen/Together/blob/development/.github/CONTRIBUTING.md">Contributing guide</a>
  ·
  <a href="https://together.cyclic.app/"><strong>Link to project</strong></a>
  ·
  <a href="https://github.com/dec0dOS/amazing-github-template/discussions">Ask a Question</a>
</div>

<br/>

<div align="center">
<img height="25px" src="https://img.shields.io/badge/React-0e062a?style=for-the-badge&logo=react&logoColor=61DAFB" alt="instagram" style="margin-bottom: 5px;" />
<img height="25px" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="instagram" style="margin-bottom: 5px;" />
<img height="25px" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="instagram" style="margin-bottom: 5px;" />
<img height="25px" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" alt="instagram" style="margin-bottom: 5px;" />
<img height="25px" src="https://img.shields.io/badge/Node.js-90c53f?style=for-the-badge&logo=node.js&logoColor=white" alt="instagram" style="margin-bottom: 5px;" />
<img height="25px" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="instagram" style="margin-bottom: 5px;" />
</div>


<br/>
<br/>

<div align="center">
<table>
  <tr>
    <td valign="top">
      <details open="open">
  <summary>Table of Contents</summary>

  - [About](#about)
    - [Built With](#built-with)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Usage](#usage)
      - [Cookiecutter template](#cookiecutter-template)
      - [Manual setup](#manual-setup)
      - [Variables reference](#variables-reference)
  - [Roadmap](#roadmap)
  - [Contributing](#contributing)
  - [Support](#support)
  - [License](#license)
  - [Acknowledgements](#acknowledgements)
  </details>
    </td>
    <td valign="top"><img src="docs/images/coolkidsbubbles.png"/></td>
  </tr>
</table>
</div>



<br/>
<br/>














Together is a new app designed for 100devs. Together is a group calendar for public events, so you can see what's going on in your community. We're making it easier to find out about the events that are happening in Discord and let you know how much fun they'll be!

**Link to project:** https://together.cyclic.app/

![alt tag](https://i.ibb.co/vVH3qjx/Screen-Shot-2022-11-05-at-12-13-17-PM.png)

## How It's Made:

**Tech used:** Tailwind, JavaScript, MERN

Work in Progress

## Optimizations

_(optional)_

Work in Progress

## Lessons Learned:

Work in Progress

## Want to Contribute?

For complete contributing instructions, read our [Contributing guide](.github/CONTRIBUTING.md). Visit the [Issues tab](https://github.com/Caleb-Cohen/Together/issues) to request an issue or to open a new issue. You can also convert a "draft todo" to an issue on the [MVP Tasks Project Board.](https://github.com/users/Caleb-Cohen/projects/1/views/1)



## The Penultimate Goal

- [ ] Discord guilds can create their own together calendar

## thinking ahead,

keep these in mind to prevent the project from being "caged."
can integrate with slack or Discord and work on other servers besides 100devs

Resources:
https://codepen.io/robstinson/pen/BaKOZry

---

# Things to add

- Create a `.env` file in the config folder and add the following as `key = value.`
  - PORT = 2121 (Do not change)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your Cloudinary cloud name`
  - API_KEY = `your Cloudinary API key`
  - API_SECRET = `your Cloudinary API secret`
  - DISCORD_CLIENT_ID = `discord client ID`
  - DISCORD_CLIENT_SECRET = `discord client secret`
  - OAUTH_REDIRECT_URL = http://localhost:3000/

---

# Install & Run

- ensure `.env` file is located in `server/config` file.
- `npm install` in the root folder. installs the required dependencies.
- `npm run build` compiles the build folder. Lint must have no errors for build file command to complete. 
- `npm run dev-concurrent` in the root folder.

If you make changes to the front end you must execute `npm run build` otherwise the backend will serve the outdated build file.

Still having troubles?

You can join the discussion in the together discord channel [here](https://discord.com/channels/735923219315425401/1038482732633825442). You must be a part of the 100Devs discord to view the discussion.
