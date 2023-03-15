# This is a demonstration of the 8-way flood fill algorithm

## Implemented for the Ottawa Hospital Research Institute interview round 2

### Description

The application has two components:

- A flask server
- A React / Vite front end

### API endpoints

The api has two endpoints:

- `/ping` : used to check that the API is accessible
- `/flood-fill` : Given a 2-D grid of numbers (representing a grid of color codes), an x and y co-ordinate, and a fill color, returns the result of the flood fill algorithm as a 2-D grid of numbers.

The `/flood-fill` endpoint expects the parameters as JSON in the request body:

```json
{
  "color": 8566518,
  "grid": [
    [4972933, 11616164, 4972933],
    [12326680, 12326680, 4972933],
    [4972933, 12326680, 11616164]
  ],
  "x": 1,
  "y": 1
}
```

The result is returned as a JSON array:

```json
[
  [4972933, 11616164, 4972933],
  [8566518, 8566518, 4972933],
  [4972933, 8566518, 11616164]
]
```

### Public access

The front end is hosted at https://flood-fill.netlify.app/

The API can be queried at https://flood-fill-server.herokuapp.com/

### Local Hosting

#### Requirements

- Python3 & pip
- Node.js & npm
- Web browser

#### Host Server

To run the server, navigate to the `flask-server/` directory.

First, create a virtual environment and activate it:

`python3 -m venv venv`

`./venv/Scripts/activate`

Then install dependencies in the virtual environment:

`pip install -r requirements.txt`

Finally, boot the flask server:

`flask run`

The API will then be accessible at http://localhost:5000

#### Host Frontend

To run the front end navigate to the `react-frontend/` directory.

First install dependencies:

`npm i`

Then boot the vite web server:

`npx vite`

The front end will then be accessible at http://localhost:5173
