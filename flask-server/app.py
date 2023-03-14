from flask import Flask
from flask_cors import CORS
from flask import request
import logging
app = Flask(__name__)
CORS(app)


@app.route("/ping")
def ping():
    return "pong"


@app.route("/flood-fill", methods=['POST'])
def flood_fill_request():
    try:
        paramNames = ['grid', 'x', 'y', 'color']
        body: dict[str] = request.get_json()
        missing_params = [x for x in paramNames if x not in body]
        if len(missing_params):
            return "Missing parameters: " + str(missing_params), 400
        params = [body[x] for x in paramNames]
        return flood_fill(*params)
    except Exception as e:
        logging.exception(e)
        return str(e), 500


def flood_fill(grid: list[list[str]], x: int, y: int, color: str):
    width = len(grid)
    height = len(grid[0])
    old_color = grid[x][y]
    stack = [(x, y)]
    visited = set()  # necessary when old_color == color

    while len(stack) > 0:
        x, y = stack.pop()
        if grid[x][y] != old_color or (x, y) in visited:
            continue
        visited.add((x, y))
        grid[x][y] = color

        north = y-1
        east = x+1
        south = y+1
        west = x-1

        northBorder = north < 0
        eastBorder = east >= width
        southBorder = south >= height
        westBorder = west < 0

        # North
        if not northBorder:
            stack.append((x, north))
        # North-East
        if not northBorder and not eastBorder:
            stack.append((east, north))
        # East
        if not eastBorder:
            stack.append((east, y))
        # South-East
        if not southBorder and not eastBorder:
            stack.append((east, south))
        # South
        if not southBorder:
            stack.append((x, south))
        # South-West
        if not southBorder and not westBorder:
            stack.append((west, south))
        # West
        if not westBorder:
            stack.append((west, y))
        # North-West
        if not northBorder and not westBorder:
            stack.append((west, north))

    return grid
