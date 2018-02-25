# Real Time Log Monitor

This is a `Tail -F`-_like_ monitor, for your server logs.
Whenever your log changes, it sends each new line as a message to each client, that is, a simple browser, in real time via Websockets.

Demo link: <https://log.joseserodio.es/>

## Real world examples

- Monitoring server attacks.
- Snooping game servers in-game chat.
- Bulding RCON (Remote console) client.
- Or just monitoring random files in your server.

## Requirements

Debian based GNU/Linux server with NodeJS.
Or just NodeJS with any os.

# Getting started

## Install NodeJS

First we need to install **nodejs** and **npm** packages.

```bash
sudo apt update
sudo apt install nodejs
sudo apt install npm
```

## Clone project and setup npm packages

Use the following command to clone this repository.

```bash
git clone https://github.com/jserodio/real-time-log-monitor.git
cd real-time-log-monitor/
```

Now that we have downloaded our repository and we have the `npm` command working, we will install **tail**, **websocket** and **http(s)** packages from **npm** in this folder.

```bash
npm install tail
npm install websocket
npm install https
```

It's possible to work with `ws:\\` protocol only, but today we'll work all secure with `wss:\\` and `https:\\` protocols.

As a side note, I won't be diving in to nginx/apache or TLS/SSL configurations.

## Run node server

Move into the backend folder, **edit log.js** with your preferences: **port**, **log file** and **certificates**.

Run the server.

```bash
cd backend/
node log.js
```

## Test it with WebSocket.org

You can test your own server with the **Echo Test** from websocket.org
<http://websocket.org/echo.html>

![Echo Test](https://user-images.githubusercontent.com/5813094/36641497-8a33aa72-1a30-11e8-9261-875fe09c3d1a.PNG)

## Build your own WebSocket client

Edit the file **custom.js** inside _/frontend/js/_ folder, and as you did in the previous step, edit the location of your websocket server.

```javascript
var connection = new WebSocket('wss://myhostname.domain:1337');
```

Remember that if you are not using certificates, the protocol must be ``ws://`` with the ``http`` package.

## Final Result

Real time logging, directly from your server to your client.

![websocket-frontend](https://user-images.githubusercontent.com/5813094/36641629-12d7ced8-1a33-11e8-832c-ebf57de1e8a2.PNG)

❤️ Special thanks to **@juanan** <https://github.com/juananpe> for being my mentor.