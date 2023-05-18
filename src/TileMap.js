import Stickman from "./Stickman.js";
import MovingDirection from "./MovingDirection.js";

export default class TileMap {
  constructor(tileSize) {
    this.tileSize = tileSize;

    this.floor = new Image();
    this.floor.src = "../images/floor.png";

    this.wall = new Image();
    this.wall.src = "../images/wall.png";

    this.node = new Image();
    this.node.src = "../images/node.png";

    this.door = new Image();
    this.door.src = "../images/door.png";

    this.text = ""; // Text to display
    this.textPosition = { x: 2, y: 2 }; // Position of the text box on the map
    this.textBoxSize = 50; // Size of the text box
    this.textDisplayDuration = 5000; // Duration in milliseconds to display the text
    this.textDisplayTimeout = null; // Timeout ID for clearing the text display

    document.addEventListener("keydown", this.handleKeyPress);
  }

  // 0-Floor, 1-Wall, 2-Stickman, 3-Node, 4-door
  map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 7, 0, 0, 0, 0, 1, 0, 10, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 8, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 9, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 4, 1, 1, 1, 1, 5, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 1, 6, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 11, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 12, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  draw(ctx) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 1) {
          this.#drawWall
            (ctx, column, row, this.tileSize);
        } else if (tile === 0) {
          this.#drawFloor(ctx, column, row, this.tileSize);
        } else if (tile === 7 || tile === 8 || tile === 9 || tile === 10 || tile === 11 || tile === 12) {
          this.#drawNode(ctx, column, row, this.tileSize);
        } else if (tile === 4 || tile === 5 || tile === 6) {
          this.#drawDoor(ctx, column, row, this.tileSize);
        } 
      }
    }
    // Draw the stickman after drawing the tiles
    if (this.stickman) {
      this.stickman.draw(ctx);
    }

    // Draw text box and text
    if (this.text !== "") {
      this.#drawTextBox(ctx);
      this.#drawText(ctx);
    }
  }

  #drawWall(ctx, column, row, size) {
    ctx.drawImage(this.wall, column * this.tileSize, row * this.tileSize, size, size);
  }

  #drawFloor(ctx, column, row, size) {
    ctx.drawImage(this.floor, column * this.tileSize, row * this.tileSize, size, size);
  }

  #drawNode(ctx, column, row, size) {
    ctx.drawImage(this.node, column * this.tileSize, row * this.tileSize, size, size);
  }

  #drawDoor(ctx, column, row, size) {
    ctx.drawImage(this.door, column * this.tileSize, row * this.tileSize, size, size);
  }

  #drawTextBox(ctx) {
    const centerX = Math.floor(this.map[0].length / 2); // Calculate the center column index
    const centerY = Math.floor(this.map.length / 2); // Calculate the center row index

    const textBoxWidth = this.textBoxSize * centerX * 3; 
 // Calculate the width of the text box
    const textBoxHeight = this.textBoxSize; // Set the height of the text box

    const textBoxX = centerX - this.text.length / 2; // Calculate the x-coordinate of the text box
    const textBoxY = centerY - 0.5; // Calculate the y-coordinate of the text box

    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.fillRect(
      textBoxX * this.tileSize,
      textBoxY * this.tileSize,
      textBoxWidth * this.tileSize,
      textBoxHeight * this.tileSize
    );
  }


#drawText(ctx) {
  const centerX = Math.floor(this.map[0].length / 2); // Calculate the center column index
  const centerY = Math.floor(this.map.length / 2); // Calculate the center row index

  const textX = centerX * this.tileSize; // Calculate the x-coordinate of the text
  const textY = (centerY + 0.5) * this.tileSize; // Calculate the y-coordinate of the text

  const maxWidth = (this.textBoxSize * centerX * 2 - 10) * this.tileSize; // Set the maximum width of the text (adjust 10 for padding)

  const lines = this.text.split('\n'); // Split the text into separate lines

  // Draw each line of text
  ctx.font = '20px Arial'; // Set the font size and family
  ctx.fillStyle = 'black'; // Set the text color
  ctx.textAlign = 'center'; // Align the text horizontally to the center
  ctx.textBaseline = 'middle'; // Align the text vertically to the middle

  lines.forEach((line, index) => {
    const lineY = textY + (index - lines.length / 2 + 0.5) * 20; // Adjust the line height and position as needed
    ctx.fillText(line, textX, lineY);
  });
}



  getStickman(tileSize) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 2) {
          return new Stickman(
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            tileSize,
            this
          );
        }
      }
    }
    return null; // Return null if stickman is not found
  }

  setCanvasSize(canvas) {
    canvas.width = this.map[0].length * this.tileSize;
    canvas.height = this.map.length * this.tileSize;
  }

  didCollideWithEnvironment(x, y, direction) {
    if (Number.isInteger(x / this.tileSize) && Number.isInteger(y / this.tileSize)) {
      let column = 0;
      let row = 0;
      let nextColumn = 0;
      let nextRow = 0;
      switch (direction) {
        case MovingDirection.right:
          nextColumn = x + this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.left:
          nextColumn = x - this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.up:
          nextRow = y - this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
        case MovingDirection.down:
          nextRow = y + this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
      }

      const tile = this.map[row][column];
      if (
        tile === 1) {
        return true;
      }
    }
    return false;
  }

  handleKeyPress = (event) => {
    if (event.code === "Space") {
      const stickman = this.getStickman();
      if (stickman) {
        const { x, y } = stickman;
        const direction = stickman.currentMovingDirection;
        const tileType = this.getTileType(x, y, direction);
        if (tileType === 3) {
          this.showText("This is a node!");
        }
      }
    }
  };

  getTileType(x, y, direction) {
    const column = Math.floor(x / this.tileSize);
    const row = Math.floor(y / this.tileSize);
    switch (direction) {
      case MovingDirection.right:
        return this.map[row][column + 1];
      case MovingDirection.left:
        return this.map[row][column - 1];
      case MovingDirection.up:
        return this.map[row - 1][column];
      case MovingDirection.down:
        return this.map[row + 1][column];
      default:
        return this.map[row][column];
    }
  }

  showText(text) {
    // Clear existing text display timeout
    clearTimeout(this.textDisplayTimeout);
    // Set the text and start the timeout to clear the text
    this.text = text;
    this.textDisplayTimeout = setTimeout(() => {
      this.text = "";
    }, this.textDisplayDuration);
  }
}