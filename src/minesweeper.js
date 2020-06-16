import spriteData, { blockDisplayMap } from './spriteData';

const gameStatus = {
    ready: "ready",
    progress: "progress",
    fail: "fail",
    success: "success"
};

export default class MineSweeper {
    constructor(display_id, option_ids) {
        this.options = {
            option_ids: option_ids,
            width: undefined,
            height: undefined,
            mine: undefined
        }
        this.gameData = {
            minefield: [],
            minefield_display: [],
            face_pressed: false,
            start_date: undefined,
            end_date: undefined,
            timer: undefined,
            game_status: gameStatus.ready
        }
        this.spriteData = new spriteData("./sprite.gif");

        this.display = document.getElementById(display_id);

        this.display.addEventListener("mousedown", (e) => {
            e.preventDefault();
            var pos = this.getMPos(e);

            if (e.button == 0) {
                if (this.gameData.game_status === gameStatus.progress) {
                    if (pos.x >= 0 && pos.y >= 0) {
                        switch (this.gameData.minefield_display[pos.y][pos.x]) {
                            case this.spriteData.sprites.blocks.pos.empty.display_id:
                                this.gameData.minefield_display[pos.y][pos.x] =
                                    this.spriteData.sprites.blocks.pos.empty_press.display_id;
                                break;
    
                        }
                        this.draw();
                    }
                }
            } else if (e.button == 2) {
                if (pos.x >= 0 && pos.y >= 0) {
                    switch (this.gameData.minefield_display[pos.y][pos.x]) {
                        case this.spriteData.sprites.blocks.pos.empty.display_id:
                            this.gameData.minefield_display[pos.y][pos.x] =
                                this.spriteData.sprites.blocks.pos.flag.display_id;
                            break;
                    
                        case this.spriteData.sprites.blocks.pos.flag.display_id:
                            this.gameData.minefield_display[pos.y][pos.x] =
                                this.spriteData.sprites.blocks.pos.empty.display_id;
                            break;
                    }
                    this.draw();
                }
            }

        })

        this.display.addEventListener("mouseup", (e) => {
            e.preventDefault();
            if (e.button != 0)
                return;
            var pos = this.getMPos(e);
            if (this.gameData.game_status === gameStatus.progress) {
                if (pos.x >= 0 && pos.y >= 0) {
                    switch (this.gameData.minefield_display[pos.y][pos.x]) {
                        case this.spriteData.sprites.blocks.pos.empty_press.display_id:
                            // open block
                            // open()
                            if (this.gameData.minefield[pos.y][pos.x] < 0) {
                                // end game
                                this.gameData.minefield_display[pos.y][pos.x] =
                                    this.spriteData.sprites.blocks.pos.mine_red.display_id;
                                    
                                this.end(gameStatus.fail);
                            } else {
                                this.openBlock(pos.x, pos.y);
                            }
                            break;
                    }

                    this.draw();
                }
                    
                var changed = 0;
                this.gameData.minefield_display.forEach((row, i) => {
                    row.forEach((block, j) => {
                        if (block == this.spriteData.sprites.blocks.pos.empty_press.display_id) {
                            this.gameData.minefield_display[i][j] = 
                                this.spriteData.sprites.blocks.pos.empty.display_id;
                            changed++;
                        }
                    })
                })
                if (changed > 0)
                    this.draw()
            }
        })

        this.display.addEventListener("mouseleave", (e) => {
            e.preventDefault();
            if (this.gameData.game_status == gameStatus.progress) {
                this.gameData.minefield_display.forEach((row, i) => {
                    row.forEach((block, j) => {
                        if (block == this.spriteData.sprites.blocks.pos.empty_press.display_id) {
                            this.gameData.minefield_display[i][j] = 
                                this.spriteData.sprites.blocks.pos.empty.display_id;
                        }
                    })
                })
                this.draw()
            }
        })

        this.display.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        })

        this.init();
    }

    start() {
        let self = this;

        if (this.gameData.game_status === gameStatus.progress) {
            this.end(gameStatus.ready);
        }
        this.init();

        this.gameData.start_date = new Date();
        this.gameData.end_date = undefined;
        this.gameData.game_status = gameStatus.progress;

        this.draw();
        this.gameData.timer = setInterval(() => {
            self.draw();    
        }, 1000);
    }

    end(status) {
        this.gameData.end_date = new Date();

        if (this.gameData.timer != undefined) {
            clearInterval(this.gameData.timer);
            this.gameData.timer = undefined;
        }
        
        this.gameData.game_status = status;

        if (this.gameData.game_status === gameStatus.fail || this.gameData.game_status === gameStatus.success) {
            this.gameData.minefield_display.forEach((row, i) => {
                row.forEach((block, j) => {
                    if (block == this.spriteData.sprites.blocks.pos.empty.display_id) {
                        if (this.gameData.minefield[i][j] < 0 && this.gameData.minefield_display[i][j] != this.spriteData.sprites.blocks.pos.mine_red.display_id) {
                            this.gameData.minefield_display[i][j] =
                                this.spriteData.sprites.blocks.pos.mine.display_id;
                        } else {
                            this.gameData.minefield_display[i][j] =
                                20 + this.gameData.minefield[i][j]
                        }
                    }
                })
            })
        }

        this.draw();
    }

    openBlock(x, y) {
        var sprites = this.spriteData.sprites;

        if (this.gameData.minefield[y][x] < 0) {
            this.gameData.minefield_display[y][x] = sprites.blocks.pos.mine.display_id;
        } else if (this.gameData.minefield[y][x] > 0) {
            this.gameData.minefield_display[y][x] = sprites.digit_blocks.pos[this.gameData.minefield[y][x]].display_id;
        } else {
            this.gameData.minefield_display[y][x] = sprites.blocks.pos.empty.display_id;
            var openEmpty = (x, y) => {
                if (this.gameData.minefield[y][x] >= 0 &&
                        (this.gameData.minefield_display[y][x] == sprites.blocks.pos.empty.display_id 
                            || this.gameData.minefield_display[y][x] == sprites.blocks.pos.flag.display_id)) {
                    if (this.gameData.minefield[y][x] == 0) {
                        this.gameData.minefield_display[y][x] = sprites.digit_blocks.pos[0].display_id;
                        if (x - 1 >= 0)
                            openEmpty(x-1, y);
                        if (x + 1 < this.options.width)
                            openEmpty(x+1, y);
                        if (y - 1 >= 0)
                            openEmpty(x, y-1);
                        if (y+1 < this.options.height)
                            openEmpty(x, y+1);
                    } else {
                        this.gameData.minefield_display[y][x] = sprites.digit_blocks.pos[this.gameData.minefield[y][x]].display_id;
                    }
                }
            }
            openEmpty(x, y);
        }

        if (this.getRemainBlockCount() <= 0) {
            this.end(gameStatus.success);
        }
    }

    init() {
        // init options
        this.init_options();

        // init canvas
        var ctx = this.display.getContext("2d");
        ctx.canvas.width = this.drawingOptions.canvas_size.width;
        ctx.canvas.height = this.drawingOptions.canvas_size.height;
        ctx.clearRect(0, 0, this.display.width, this.display.height);

        // init minefield
        this.initField();
    }

    init_options() {
        var ids = this.options.option_ids;
        this.options.width = parseInt(document.getElementById(ids.width).value)
        this.options.height = parseInt(document.getElementById(ids.height).value)
        this.options.mine = parseInt(document.getElementById(ids.mine).value)

        this.drawingOptions = {
            margin: {
                horizontal: 8,
                vertical: 8
            },
            top_pannel: {
                height: 46
            },
            block_position: { x: 0, y: 0},
            canvas_size: { width: 0, height: 0 }
        }
        this.drawingOptions.block_position = {
            x: this.drawingOptions.margin.horizontal,
            y: this.drawingOptions.margin.vertical + this.drawingOptions.top_pannel.height
        }
        this.drawingOptions.canvas_size = {
            width: 
                this.drawingOptions.margin.horizontal * 2 
                + this.spriteData.sprites.blocks.width * this.options.width,
            height: 
                this.drawingOptions.margin.vertical * 3
                + this.drawingOptions.top_pannel.height
                + this.spriteData.sprites.blocks.height * this.options.height
        }
    }
    
    draw() {
        var ctx = this.display.getContext("2d");
        var sp_sheet = this.spriteData.sheet;
        var sprites = this.spriteData.sprites;

        ctx.clearRect(0, 0, this.display.width, this.display.height);

        // draw face
        var face_sprite;

        if (this.gameData.game_status === gameStatus.progress || this.gameData.game_status === gameStatus.ready) {
            if (this.gameData.face_pressed) {
                face_sprite = sprites.face.pos.default_pressed;
            } else {
                face_sprite = sprites.face.pos.default;
            }
        } else {
            face_sprite = sprites.face.pos[this.gameData.game_status];
        }

        ctx.drawImage(
            sp_sheet,
            face_sprite.x,
            face_sprite.y,
            sprites.face.width,
            sprites.face.height,
            ctx.canvas.width / 2 - sprites.face.width / 2,
            this.drawingOptions.margin.vertical,
            sprites.face.width,
            sprites.face.height
        );


        // draw timer
        this.getElapsedTime().forEach((item, idx) => {
            ctx.drawImage(
                sp_sheet,
                sprites.digit_nums.pos[item].x,
                sprites.digit_nums.pos[item].y,
                sprites.digit_nums.width,
                sprites.digit_nums.height,
                this.drawingOptions.margin.horizontal + sprites.digit_nums.width * idx,
                this.drawingOptions.margin.vertical + 1,
                sprites.digit_nums.width,
                sprites.digit_nums.height
            )
        })

        // draw mine_counter
        this.getMineCount().reverse().forEach((item, idx) => {
            ctx.drawImage(
                sp_sheet,
                sprites.digit_nums.pos[item].x,
                sprites.digit_nums.pos[item].y,
                sprites.digit_nums.width,
                sprites.digit_nums.height,
                ctx.canvas.width - (this.drawingOptions.margin.horizontal + sprites.digit_nums.width * (idx + 1)),
                this.drawingOptions.margin.vertical + 1,
                sprites.digit_nums.width,
                sprites.digit_nums.height
            )
        })

        // draw blocks
        this.gameData.minefield_display.forEach((row, i) => {
            row.forEach((cell, j) => {
                var block_display = this.gameData.minefield_display[i][j];
                var block_sprite = undefined;
                switch(block_display) {
                    case sprites.blocks.pos.empty.display_id:
                        block_sprite = sprites.blocks.pos.empty;
                        break;
                    case sprites.blocks.pos.empty_press.display_id:
                        block_sprite = sprites.blocks.pos.empty_press;
                        break;
                    case sprites.blocks.pos.mine.display_id:
                        block_sprite = sprites.blocks.pos.mine;
                        break;
                    case sprites.blocks.pos.mine_cross.display_id:
                        block_sprite = sprites.blocks.pos.mine_cross;
                        break;
                    case sprites.blocks.pos.mine_red.display_id:
                        block_sprite = sprites.blocks.pos.mine_red;
                        break;
                    case sprites.blocks.pos.flag.display_id:
                        block_sprite = sprites.blocks.pos.flag;
                        break;
                    case sprites.blocks.pos.unknown.display_id:
                        block_sprite = sprites.blocks.pos.unknown;
                        break;
                    case sprites.blocks.pos.unknown_press.display_id:
                        block_sprite = sprites.blocks.pos.unknown_press;
                        break;
                }

                // pblock 계열인 경우
                if (Math.floor(block_display / 10) == 2) {
                    block_sprite = sprites.digit_blocks.pos[Math.floor(block_display % 10)];
                }
                
                ctx.drawImage(
                    sp_sheet,
                    block_sprite.x,
                    block_sprite.y,
                    sprites.blocks.width,
                    sprites.blocks.height,
                    this.drawingOptions.block_position.x + sprites.blocks.width * j,
                    this.drawingOptions.block_position.y + sprites.blocks.height * i,
                    sprites.blocks.width,
                    sprites.blocks.height
                );
            })
        })
    }

    initField() {
        this.gameData.minefield = [];
        var field = this.gameData.minefield;
        for (var i = 0; i < this.options.height; i++) {
            field.push(new Array(this.options.width).fill(0));
        }

        this.gameData.minefield_display = JSON.parse(JSON.stringify(this.gameData.minefield));
        
        // mine == -1
        for(var i = 0; i < this.options.mine; i++) {
            var x = Math.floor(Math.random() * this.options.width);
            var y = Math.floor(Math.random() * this.options.height);

            if (field[y][x] < 0) {
                i--;
                continue;
            } else {
                field[y][x] = -1;
                // 주변 8블록 지뢰 정보 넣음
                for(var j = y-1 < 0 ? 0 : y-1; j <= y+1; j++) {
                    if (j >= field.length)
                        break;

                    for(var k = x-1 < 0 ? 0 : x-1; k <= x+1; k++) {
                        if (k >= field[j].length)
                            break;

                        if (field[j][k] >= 0) {
                            field[j][k]++;
                        }
                    }
                }
            }
        }
    }
    
    getMPos(mouseEvent) {
        return {
            x: Math.floor((mouseEvent.offsetX - this.drawingOptions.block_position.x) / this.spriteData.sprites.blocks.width),
            y: Math.floor((mouseEvent.offsetY - this.drawingOptions.block_position.y) / this.spriteData.sprites.blocks.width)
        }
        
    }

    setOption(opt_name, opt_val) {
        this.options[opt_name] = opt_val
    }
    
    getMineCount() {
        var remains = 0;
        this.gameData.minefield.forEach(row => {
            remains += row.filter(block => {
                return block == -1;
            }).length;
        });

        this.gameData.minefield_display.forEach(row => {
            remains -= row.filter(block => {
                return block == this.spriteData.sprites.blocks.pos.flag.display_id;
            }).length;
        })

        return [
            Math.floor(remains / 100 % 10),
            Math.floor(remains / 10 % 10),
            Math.floor(remains % 10)
        ];
    }

    getRemainBlockCount() {
        var remains = 0;

        this.gameData.minefield_display.forEach(row => {
            remains += row.filter(block => {
                return block == this.spriteData.sprites.blocks.pos.empty.display_id
                    || block == this.spriteData.sprites.blocks.pos.empty_press.display_id;
            }).length;
        })

        this.gameData.minefield.forEach(row => {
            remains -= row.filter(block => {
                return block == -1;
            }).length;
        })

        return remains;
    }

    getElapsedTime() {
        var check_date = this.gameData.end_date ? this.gameData.end_date : new Date();
        var seconds = Math.floor((check_date - this.gameData.start_date) / 1000);
        return [
            Math.floor(seconds / 100 % 10),
            Math.floor(seconds / 10 % 10),
            Math.floor(seconds % 10),
        ];
    }
}