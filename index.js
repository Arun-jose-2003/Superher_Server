require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
require('./db/connection');

const Server = express();

// Define frontend and dashboard URLs
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3001';
const DASHBOARD_URL = process.env.DASHBOARD_URL || 'http://localhost:3002';


const corsOptions = {
    origin: [FRONTEND_URL, DASHBOARD_URL], 
    credentials: true, 
};
Server.use(cors(corsOptions));


Server.use(express.json());

Server.use(router);




const PORT = process.env.PORT || 3000;

// Root endpoint
Server.get('/', (req, res) => {
    res.status(200).send(`
        <h1 style="color: red; text-align: center;">
            White Matrix server started, and waiting for client requests! 🎉
        </h1>
        <p style="text-align: center;">
            Frontend running at: <a href="${FRONTEND_URL}" target="_blank">${FRONTEND_URL}</a><br />
            Dashboard running at: <a href="${DASHBOARD_URL}" target="_blank">${DASHBOARD_URL}</a>
        </p>
    `);
});

// Start the server
Server.listen(PORT, () => {
    console.log(`White Matrix server started at port: ${PORT}`);
    console.log(`Frontend URL: ${FRONTEND_URL}`);
    console.log(`Dashboard URL: ${DASHBOARD_URL}`);
});
