//hier wird ein phaser spiel erstellt und mit socket.io verbunden
//wir erstellen zuerst eine szene mit create und update, laden racetrack.jpg als tilesprite
//und erstellen ein auto als sprite, das sich mit den pfeiltasten bewegen lässt
//wir verbinden das spiel mit socket.io, damit wir die position des autos an den server senden können
//und die position des autos von anderen Spielern empfangen können

const socket = io();

class OmegaIo extends Phaaser.Scene {
    preload() {
        this.load.image("racetrack", "assets/racetrack.jpg");
        this.load.image("car",  "assets/car.png");
    }

    create() {
        this.add.titleSprite(0, 0, 1200, 800, "racetrack")
    }
    update() {
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
            debug: false
        }
    }
});