import MineSweeper from './minesweeper';

window.mineSweeper = undefined;

window.addEventListener("DOMContentLoaded", (e) => {
    window.mineSweeper = new MineSweeper("display", {
        width: "width",
        height: "height",
        mine: "mine"
    });

    document.getElementById("init").addEventListener("click", () => {
        window.mineSweeper.start();
    })

    window.mineSweeper.start();
})