import MovingDirection from "./MovingDirection.js";

export default class Stickman {
  constructor(x, y, tileSize, velocity, tileMap) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;

    this.currentMovingDirection = null;
    this.requestedMovingDirection = null;

    document.addEventListener("keydown", this.#keydown);

    this.#loadStickmanImages();
  }

  draw(ctx) {
    this.#move();
    ctx.drawImage(
      this.stickmanImages[this.stickmanImageIndex],
      this.x,
      this.y,
      this.tileSize,
      this.tileSize
    );
  }

  #loadStickmanImages() {
    const stickmanImage = new Image();
    stickmanImage.src = "../images/stickman.png";

    this.stickmanImages = [stickmanImage];
    this.stickmanImageIndex = 0;
  }

  #keydown = (event) => {
    // Up-w
    if (event.keyCode === 87) {
      this.requestedMovingDirection = MovingDirection.up;
    }
    // Down-s
    else if (event.keyCode === 83) {
      this.requestedMovingDirection = MovingDirection.down;
    }
    // Left-a
    else if (event.keyCode === 65) {
      this.requestedMovingDirection = MovingDirection.left;
    }
    // Right-d
    else if (event.keyCode === 68) {
      this.requestedMovingDirection = MovingDirection.right;
    }
    // Interact-e
    else if (event.keyCode === 69) {
      const tileType = this.tileMap.getTileType(this.x, this.y, this.requestedMovingDirection);
      if (tileType === 4) {
        this.tileMap.showText("Oncology:\n This department specializes in the diagnosis and treatment of cancer.");
      }
      else if (tileType === 5) {
        this.tileMap.showText("<b>Radiology</b>:\n This department specializes in interpreting imaging tests such as X-rays, \nCT scans, MRI scans, or ultrasounds.");
      }
      else if (tileType === 6) {
        this.tileMap.showText("Records:\n This department is responsible for maintaining secure,\n accurate and comprehensive patient records.");
      }
      else if (tileType === 7) { //Oncology
        this.tileMap.showText("Oncology's Impact of Computing in Society.\n Advanced imaging systems: Uses CT scans and MRIs\n to see tumors inside of patients. \n Electronic Health Records (EHRs):\n assists with continuity of patient care.");
      }
      else if (tileType === 8) {
        this.tileMap.showText("Dep. Advancement.\n Precision medicine using genetic testing.\n Robotic-assisted surgery \n Immunotherapy ");
      }
      else if (tileType === 9) { //Radiology
        this.tileMap.showText("\n Radiology's Impact of computing in Society:\n Digital Imaging Picture Archiving and\n Communicatione Systems (PACS):\n They are able to collect gamma radiation and\n turn it into a digital image instead of disposable cartridges. \n Electronic Medical Records (EMRs): Radiology reports and images \n are able to be digitally stored in patients health records,\n to assist in patient care.");
      }
      else if (tileType === 10) {
        this.tileMap.showText("Dep. Advancement.\n New technology innovation include:\n - Computed Tomography (CT) \n -Magnetic Resonance Imaging (MRI) \n - positron emission tomography PET scans (PACS) ");
      }
      else if (tileType === 11) { // Records
        this.tileMap.showText("Impact of computing in Society.\n Electronic Health Records (EHRs):\n Helps improved patient care and security/privacy\n by encypting then digitizing patient's records.");
      }
      else if (tileType === 12) {
        this.tileMap.showText("Dep. Advancement.\n -Electronic Health Records (EHRs):\n -Health information exchange\n -Mobile health\n -Blockchain for security");
      }
    }

    this.moveStickmanOneTile();
  };

  #move() {
    if (this.requestedMovingDirection === null) {
      return;
    }

    const tileSize = this.tileSize;

    switch (this.requestedMovingDirection) {
      case MovingDirection.up:
        if (this.y % tileSize === 0) {
          this.y -= tileSize;
          this.requestedMovingDirection = null;
        }
        break;
      case MovingDirection.down:
        if (this.y % tileSize === 0) {
          this.y += tileSize;
          this.requestedMovingDirection = null;
        }
        break;
      case MovingDirection.left:
        if (this.x % tileSize === 0) {
          this.x -= tileSize;
          this.requestedMovingDirection = null;
        }
        break;
      case MovingDirection.right:
        if (this.x % tileSize === 0) {
          this.x += tileSize;
          this.requestedMovingDirection = null;
        }
        break;
    }
  }

  moveStickmanOneTile() {
    const tileSize = this.tileSize;

    switch (this.currentMovingDirection) {
      case MovingDirection.up:
        if (this.y % tileSize === 0) {
          this.y -= tileSize;
        }
        break;
      case MovingDirection.down:
        if (this.y % tileSize === 0) {
          this.y += tileSize;
        }
        break;
      case MovingDirection.left:
        if (this.x % tileSize === 0) {
          this.x -= tileSize;
        }
        break;
      case MovingDirection.right:
        if (this.x % tileSize === 0) {
          this.x += tileSize;
        }
        break;
    }
  }
}
