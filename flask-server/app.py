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
        params = decode_params(request.get_data())
        grid = flood_fill(*params)
        return encode_grid(grid)
    except Exception as e:
        logging.exception(e)
        return str(e), 500


def decode_params(params: bytes):
    print(int.from_bytes(params[3:11]))
    color: str = params[0:3].hex()
    x: int = int.from_bytes(params[3:11])
    y: int = int.from_bytes(params[11:19])
    xSize: int = int.from_bytes(params[19:27])
    ySize: int = int.from_bytes(params[27:35])
    gridBytes = params[35:]
    grid = [[None] * ySize for _ in range(0, xSize)]
    for x_i in range(0, xSize):
        column_start = x_i * ySize * 3
        for y_i in range(0, ySize):
            start = column_start + y_i * 3
            grid[x_i][y_i] = gridBytes[start:start+3].hex()
    return (grid, x, y, color)


def encode_grid(grid: list[list[str]]):
    return bytes(
        [byte for column in grid for color in column for byte in hex_color_to_ints(color)])


def hex_color_to_ints(color: str):
    return [int(color[0:2], 16), int(color[2:4], 16), int(color[4:6], 16)]


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
