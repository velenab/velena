//hier wird ein phaser spiel erstellt und mit socket.io verbunden
//wir erstellen zuerst eine szene mit create und update, laden racetrack.jpg als tilesprite
//und erstellen ein auto als sprite, das sich mit den pfeiltasten bewegen lässt
//wir verbinden das spiel mit socket.io, damit wir die position des autos an den server senden können
//und die position des autos von anderen Spielern empfangen können



const socket = io();

class OmegaIo extends Phaser.Scene {
    preload() {
        this.load.image("racetrack", "assets/racetrack.jpg");
        this.load.image("car",  "assets/car1.png");
    }

    create() {
        this.add.tileSprite(0, 0, 1200, 800, "racetrack").setOrigin(0, 0);
    
        this.car = this.physics.add.sprite(600, 400, 'car').setCollideWorldBounds(true).setScale(0.5);
          
        this.cursors = this.input.keyboard.createCursorKeys();
        this.car.setCircle(50, 25, 50);
    }
    update() {
      //Bewegung des Autos ,it den Pfeiltasten, links und rechts rotieren und vorwärts und rückwerts bewegen
      const rotationSpeed = 200; // Geschwindigkeit der Rotation
      const speed = 300; // Geschwindigkeit der Bewegung  
      
      if (this.cursors.left.isDown) {
            this.car.setAngularVelocity(-rotationSpeed);
        } else if (this.cursors.right.isDown) {
            this.car.setAngularVelocity(rotationSpeed);
        } else {
            this.car.setAngularVelocity(0);
        }

        if (this.cursors.up.isDown) {
            this.physics.velocityFromRotation(this.car.rotation - Math.PI / 2, speed, this.car.body.velocity);
        } else if (this.cursors.down.isDown) {
            this.physics.velocityFromRotation(this.car.rotation - Math.PI / 2, -speed, this.car.body.velocity);
        } else {
            //wenn keine taste gedrückt wird, soll das auto sehr schnell langsamer werden und stehen bleiben
            this.car.body.velocity.scale(0.98);
        }
        //hier können wir die position des autos aktualisieren und an den server senden
    }
}

new Phaser.Game({
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    scene: OmegaIo,
    parent: "game-container",
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    }
}); 