// var display;
// var spriteData = {
//     sheet: undefined,
//     digit_nums: {
//         width: 13,
//         height: 24,
//         pos: [
//             { x: 0, y: 0 },
//             { x: 13, y: 0 },
//             { x: 26, y: 0 },
//             { x: 39, y: 0 },
//             { x: 52, y: 0 },
//             { x: 65, y: 0 },
//             { x: 78, y: 0 },
//             { x: 91, y: 0 },
//             { x: 104, y: 0 },
//             { x: 117, y: 0 },
//             { x: 130, y: 0 },
//             { x: 143, y: 0 }
//         ]
//     },
//     blocks: {
//         width: 16,
//         height: 16,
//         pos: {
//             empty: { x: 0, y: 39 },
//             empty_press: { x: 0, y: 23 },
//             flag: { x: 16, y: 39 },
//             mine_red: { x: 32, y: 39 },
//             mine_cross: { x: 48, y: 39 },
//             mine: { x: 64, y: 39 },
//             unknown: { x: 80, y: 39 },
//             unknown_press: { x: 96, y: 39 },
//             whitespace: { x: 112, y: 39 }
//         }
//     },
//     digit_blocks: {
//         width: 16,
//         height: 16,
//         pos: [
//             { x: 0, y: 23 },
//             { x: 16, y: 23 },
//             { x: 32, y: 23 },
//             { x: 48, y: 23 },
//             { x: 64, y: 23 },
//             { x: 80, y: 23 },
//             { x: 96, y: 23 },
//             { x: 112, y: 23 },
//             { x: 128, y: 23 }
//         ]
//     },
//     face: {
//         width: 26,
//         height: 26,
//         pos: {
//             default: { x: 0, y: 55 },
//             default_pressed: { x: 26, y: 55 },
//             fail: { x: 78, y: 55 },
//             clear: { x: 104, y: 55 }
//         }
//     }
// }

// window.addEventListener("DOMContentLoaded", (e) => {
//     display = document.getElementById("display");
//     spriteData.sheet = new Image();
//     spriteData.sheet.setAttribute("crossOrigion", "anonoymous");
//     spriteData.sheet.onload = () => { init(); };
//     spriteData.sheet.src = "./sprite.gif";

//     display.addEventListener("mousedown", (e) => {
//         e.preventDefault();
//         pressBlock(getMPos(e));
//     })
    
//     display.addEventListener("mouseup", (e) => {
//         e.preventDefault();
//         openBlock(getMPos(e));
//     })

//     // 컨텍스트 메뉴 비활성화
//     display.addEventListener("contextmenu", (e) => {
//         e.preventDefault();
//     })

//     document.getElementById("init").addEventListener("click", () => {
//         clear()
//         init();
//     })
// });

// function openBlock(pos) {

// } 

// function pressBlock(pos) {
//     // 이미 눌린 블록들을 release합니다.
//     gameData.minefield.forEach((row) => {
//         gameData.minefield.forEach((block, idx) => {
//             if (Math.floor(block / 10) == 2) {
//                 row[idx] = 10 + block % 10;
//             }
//         })
//     })

//     gameData.minefield[pos.y][pos.x] = 20 + gameData.minefield[pos.y][pos.x] % 10;
//     draw();
// }

// function init() {

//     gameData.start_date = new Date();
//     gameData.options.width = parseInt(document.getElementById("width").value);
//     gameData.options.height = parseInt(document.getElementById("height").value);
//     gameData.options.mine = parseInt(document.getElementById("mine").value);
    
//     gameData.minefield = [];
//     for (var i = 0; i < gameData.options.height; i++) {
//         gameData.minefield.push(new Array(gameData.options.width).fill(0));
//     }
    
//     gameData.game_status = "started";

//     initField();
//     draw();
//     drawTimer();
//     if (gameData.timer != undefined) {
//         clearInterval(gameData.timer);
//         gameData.timer = undefined;
//     }
//     gameData.timer = setInterval(() => {
//         drawTimer();
//     }, 1000);

// }

// function clear() {
//     var ctx = display.getContext("2d");
//     ctx.clearRect(0, 0, display.width, display.height);
// }

// function draw() {
//     var ctx = display.getContext("2d");

//     // 상단 패널을 그립니다. 타이머는 그리지 않습니다.

//     // draw face
//     var face_data = undefined;
//     if (gameData.game_status == "started") {
//         face_data = spriteData.face.pos.default;
//     } else if (gameData.game_status == "clear") {
//         face_data = spriteData.face.pos.clear;
//     } else if (gameData.game_status == "fail") {
//         face_data = spriteData.face.pos.fail;
//     }

//     ctx.drawImage(
//         spriteData.sheet,
//         face_data.x,
//         face_data.y,
//         spriteData.face.width,
//         spriteData.face.height,
//         gameData.constants.border.horizontal + spriteData.digit_nums.width * 3 + gameData.constants.border.horizontal,
//         gameData.constants.border.vertical,
//         spriteData.face.width,
//         spriteData.face.height
//     )

//     // draw mine_counter
//     getMineCount().forEach((item, idx) => {
//         ctx.drawImage(
//             spriteData.sheet,
//             spriteData.digit_nums.pos[item].x,
//             spriteData.digit_nums.pos[item].y,
//             spriteData.digit_nums.width,
//             spriteData.digit_nums.height,
//             gameData.constants.border.horizontal * 3 + spriteData.digit_nums.width * 3 + spriteData.face.width + spriteData.digit_nums.width * idx,
//             gameData.constants.border.vertical,
//             spriteData.digit_nums.width,
//             spriteData.digit_nums.height
//         )
//     })

//     // draw blocks
//     for(var i = 0; i < gameData.options.height; i++) {
//         for(var j = 0; j < gameData.options.width; j++) {
//             var field_block = gameData.minefield[i][j];
//             var block_data = undefined;
//             switch(field_block) {
//                 case 00:
//                 case 40:
//                     block_data = spriteData.blocks.pos.empty;
//                     break;
//                 case 01:
//                 case 10:
//                 case 41:
//                     block_data = spriteData.blocks.pos.empty_press;
//                     break;
//                 case 42:
//                     block_data = spriteData.blocks.pos.mine;
//                     break;
//                 default:
//                     block_data = spriteData.blocks.pos.whitespace;
//             }

//             if (Math.floor(field_block / 10) == 1 && field_block % 10 > 0) {
//                 block_data = spriteData.blocks.pos.empty;
//             }


//             if (Math.floor(field_block / 10) == 2 && field_block % 10 > 0) {
//                 block_data = spriteData.digit_blocks.pos[field_block % 10];
//             }

//             ctx.drawImage(
//                 spriteData.sheet,
//                 block_data.x,
//                 block_data.y,
//                 spriteData.blocks.width,
//                 spriteData.blocks.height,
//                 gameData.constants.border.horizontal + spriteData.blocks.width * j,
//                 gameData.constants.border.vertical + gameData.constants.top_pannel.height + spriteData.blocks.height * i,
//                 spriteData.blocks.width,
//                 spriteData.blocks.height
//             )
//         }
//     }
// }

// function drawTimer() {
//     var ctx = display.getContext("2d");

//     // draw top pannel
//     getElapsedTime().forEach((item, idx) => {
//         ctx.drawImage(
//             spriteData.sheet,
//             spriteData.digit_nums.pos[item].x,
//             spriteData.digit_nums.pos[item].y,
//             spriteData.digit_nums.width,
//             spriteData.digit_nums.height,
//             gameData.constants.border.horizontal + spriteData.digit_nums.width * idx,
//             gameData.constants.border.vertical,
//             spriteData.digit_nums.width,
//             spriteData.digit_nums.height
//         )
//     })
// }

// function initField() {
//     for(var i = 0; i < gameData.options.mine; i++) {
//         var x = Math.floor(Math.random() * gameData.options.width);
//         var y = Math.floor(Math.random() * gameData.options.height);

//         if (gameData.minefield[y][x] > 0) {
//             i--;
//             continue;
//         } else {
//             gameData.minefield[y][x] = 40;
//             for(var j = y-1 < 0 ? 0 : y-1; j <= y+1; j++) {
//                 if (j >= gameData.minefield.length)
//                     break;

//                 for(var k = x-1 < 0 ? 0 : x-1; k <= x+1; k++) {
//                     if (k >= gameData.minefield[j].length)
//                         break;
                    
//                     if (gameData.minefield[j][k] == 0) {
//                         gameData.minefield[j][k] = 11;
//                     } else if (Math.floor(gameData.minefield[j][k] / 10) == 1) {
//                         gameData.minefield[j][k]++;
//                     }
//                 }
//             }
//         }
//     }
// }

// function getMineCount() {
//     var remains = 0;
//     gameData.minefield.forEach(row => {
//         remains += row.filter(block => {
//             return Math.floor(block / 10) == 3;
//         }).length;
//     });

//     return [
//         Math.floor(remains / 100 % 10),
//         Math.floor(remains / 10 % 10),
//         Math.floor(remains % 10)
//     ];
// }

// function getElapsedTime() {
//     var seconds = Math.floor((new Date() - gameData.start_date) / 1000);
//     return [
//         Math.floor(seconds / 100 % 10),
//         Math.floor(seconds / 10 % 10),
//         Math.floor(seconds % 10),
//     ];
// }

// function getMPos(e) {
//     return {
//         x: Math.floor((e.offsetX - ) / spriteData.blocks.width),
//         y: Math.floor((e.offsetY - (gameData.constants.border.vertical + gameData.constants.top_pannel.height)) / spriteData.blocks.width)
//     }
// }