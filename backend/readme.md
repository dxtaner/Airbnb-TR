Airbnb Clone
============

A simplified Airbnb clone using Node.js, Express, MongoDB, and Socket.io.

Table of Contents
-----------------

*   [Installation](#installation)
*   [Usage](#usage)
*   [Technologies](#technologies)
*   [Features](#features)
*   [API Endpoints](#api-endpoints)
*   [Socket Events](#socket-events)
*   [Database](#database)
*   [Contributing](#contributing)
*   [License](#license)

Installation
------------

1.  Clone the repository:
`git clone https://github.com/dxtaner/Airbnb-TR  Navigate to the project directory:
`cd airbnb-clone`5.  Install dependencies:
`npm install`7.  Set up MongoDB:

*   Create a MongoDB Atlas account and set up a cluster.
*   Replace the `url` variable in `index.js` with your MongoDB connection string.

Usage
-----

1.  Start the server:
`npm start`3.  The server will be running at `http://localhost:3033/`.

Technologies
------------

*   Node.js
*   Express.js
*   MongoDB
*   Socket.io
*   Multer
*   etc.

Features
--------

*   User authentication and sessions.
*   Dashboard for managing spots.
*   Booking spots and managing bookings.
*   Real-time notifications using Socket.io.
*   ...

API Endpoints
-------------

*   `POST /sessions`: User authentication.
*   `GET /dashboard`: Display user's dashboard.
*   `GET /spots`: Retrieve list of spots.
*   `POST /spots`: Create a new spot.
*   `POST /spots/:spot_id/bookings`: Create a booking for a spot.
*   `GET /bookings`: Retrieve list of bookings.
*   `POST /bookings/:booking_id/approvals`: Approve a booking.
*   `POST /bookings/:booking_id/rejections`: Reject a booking.

Socket Events
-------------

*   `connection`: Handles new socket connections.
*   `disconnect`: Handles socket disconnections.
*   ...

Database
--------

*   MongoDB is used for storing data.
*   Ensure you have set up the database connection string in `index.js`.

Contributing
------------

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md).

License
-------

This project is licensed under the _Your License_ License - see the [LICENSE.md](LICENSE.md) file for details.
