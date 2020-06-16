import * as spriteImage from './sprite.gif';

export default class spriteData {
    constructor() {
        this.sprites = {
            digit_nums: {
                width: 13,
                height: 24,
                pos: [
                    { x: 0, y: 0 },
                    { x: 13, y: 0 },
                    { x: 26, y: 0 },
                    { x: 39, y: 0 },
                    { x: 52, y: 0 },
                    { x: 65, y: 0 },
                    { x: 78, y: 0 },
                    { x: 91, y: 0 },
                    { x: 104, y: 0 },
                    { x: 117, y: 0 },
                    { x: 130, y: 0 },
                    { x: 143, y: 0 }
                ]
            },
            blocks: {
                width: 16,
                height: 16,
                pos: {
                    empty: { x: 0, y: 39, display_id: 0 },
                    empty_press: { x: 0, y: 23, display_id: 1 },
                    flag: { x: 16, y: 39, display_id: 2 },
                    mine_red: { x: 32, y: 39, display_id: 5 },
                    mine_cross: { x: 48, y: 39, display_id: 6 },
                    mine: { x: 64, y: 39, display_id: 7 },
                    unknown: { x: 80, y: 39, display_id: 3 },
                    unknown_press: { x: 96, y: 39, display_id: 4 },
                    whitespace: { x: 112, y: 39 }
                }
            },
            digit_blocks: {
                width: 16,
                height: 16,
                pos: [
                    { x: 0, y: 23, display_id: 20 },
                    { x: 16, y: 23, display_id: 21 },
                    { x: 32, y: 23, display_id: 22 },
                    { x: 48, y: 23, display_id: 23 },
                    { x: 64, y: 23, display_id: 24 },
                    { x: 80, y: 23, display_id: 25 },
                    { x: 96, y: 23, display_id: 26 },
                    { x: 112, y: 23, display_id: 27 },
                    { x: 128, y: 23, display_id: 28 }
                ]
            },
            face: {
                width: 26,
                height: 26,
                pos: {
                    default: { x: 0, y: 55 },
                    default_pressed: { x: 26, y: 55 },
                    fail: { x: 78, y: 55 },
                    success: { x: 104, y: 55 }
                }
            }
        }
        this.sheet = new Image();
        this.sheet_loaded = false;
        this.sheet.setAttribute("crossOrigin", "anonymous");
        this.sheet.onload = () => { this.sheet_loaded = true; };
        this.sheet.src = spriteImage.default;
    }
}