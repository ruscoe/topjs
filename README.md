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

## Frontend

There is a [React frontend you can use with TopJS](https://github.com/ruscoe/topjs-fe).

## Endpoints

### /top

`http://localhost:3001/top`

Provides memory usage and running processes from the `top` command as JSON.

```
{
  "memory": {
    "free": 3975.8,
    "used": 5719,
    "buff/cache": 22247.7
  },
  "processes": [
    {
      "pid": 291264,
      "user": "ruscoe",
      "cpu": 36.8,
      "mem": 1.6,
      "time": "0:30.72",
      "command": "brave"
    }
  ]
}
```
