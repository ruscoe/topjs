# TopJS

A lightweight Node.js server that runs the Linux `top` command, parses memory usage, and lists all running processes, exposing the result as JSON via an HTTP API.

## Requirements

- Linux system
- Node.js (v14 or later recommended)
- npm
- `top` command (available on most Linux distros)

## Set up

```bash
git clone https://github.com/ruscoe/topjs.git
cd topjs
npm install
```

## Running the server

`npm start`

## Endpoints

### /top

`http://localhost:3000/top`

Provides memory usage and running processes from the `top` command as JSON.
