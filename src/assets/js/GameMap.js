import { YcGameObject } from "./YcGameObject";
import {errorMsg} from "../../util/box.js";
import { usePkStore } from "../../store/pk.js";
import {useUserStore} from "../../store/user.js";

const userStore = useUserStore()
const pkStore = usePkStore()
export class GameMap extends YcGameObject {
    constructor(ctx, parent) {
        super()
        this.ctx = ctx;
        this.parent = parent;
        this.rows = 14;
        this.cols = 14;
        this.pieces = [];
        this.L = 0;
        this.step = 0;
        this.click_handler = null
        this.state = 0;
        this.status = "play";
        this.chesses = []
    }

    start() {
        // this.state = pkStore.game.currentStatus
        this.render()
        this.update_size()
        this.init()
        this.add_event()
    }

    init() {
        for (let i = 0; i < 14; i++) {
            this.chesses[i] = [];
            for (let j = 0; j < 14; j++) {
                this.chesses[i][j] = -1; // 或者你想要的初始值
            }
        }
    }

    add_click(e) {
        if ( this.status === "play" ) {
            // if ( pkStore.game.currentUser === userStore.user.userId ) {
                let x = Math.round(e.offsetY / this.L), y = Math.round(e.offsetX / this.L)
                if ( x < 1 || x >= this.cols ||  y >= this.cols || y < 1 ) return;
                for ( let i = 0; i < this.pieces.length; i ++ ) {
                    if ( x === this.pieces[i].x && y === this.pieces[i].y ) {
                        errorMsg("不能在这里放置")
                        return
                    }
                }
                // this.state = pkStore.game.currentStatus
                this.chesses[x][y] = this.state
                let status = this.state
                this.pieces.push({x, y, status})
                this.state = (this.state + 1) % 2
                // pkStore.socket.send(JSON.stringify(
                //     {
                //     "event": "move",
                //     "playerA": pkStore.game.playerA.user.userId,
                //     "playerB": pkStore.game.playerB.user.userId,
                //     "step": {
                //         userId: userStore.user.userId,
                //         x: x,
                //         y: y,
                //         status: state
                //     }
                // }))
            // } else {
            //     errorMsg("不是你的回合")
            // }
        } else {
            this.ctx.canvas.removeEventListener("click", this.click_handler)
        }
    }

    add_event() {
        this.click_handler = (e) => this.add_click(e)
        this.ctx.canvas.addEventListener("click", this.click_handler)
    }

    update_size() {
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    update() {
        this.update_size()
        if ( this.status === "play" ) {
            this.render();
            this.show_win()
        } else {
            this.render();
        }
    }

    render() {
        const rectColor = "#d6ba9d", lineColor = "#96815d";
        for ( let r = 0; r < this.rows; r ++ ) {
            for ( let c = 0; c < this.cols; c ++ ) {
                this.ctx.beginPath()
                this.ctx.fillStyle = rectColor
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
                this.ctx.closePath()
            }
        }
        
        for ( let r = 1; r < this.rows; r ++ ) {
            this.ctx.beginPath()
            if ( r !== 0 ) {
                this.ctx.lineWidth = 1
            } else {
                this.ctx.lineWidth = 2
            }
            this.ctx.fillStyle = lineColor
            this.ctx.moveTo(this.L, r * this.L);
            this.ctx.lineTo((this.rows - 1) * this.L, r * this.L);
            this.ctx.stroke();
            this.ctx.closePath()
        }

        for ( let c = 1; c < this.cols; c ++ ) {
            if ( c !== 0 ) {
                this.ctx.lineWidth = 1
            } else {
                this.ctx.lineWidth = 2
            }
            this.ctx.fillStyle = lineColor
            this.ctx.moveTo(c * this.L, this.L);
            this.ctx.lineTo(c * this.L, (this.rows - 1) * this.L);
            this.ctx.stroke();
        }
        // if ( pkStore.game.stepList ) {
        //     this.pieces = []
        //     for ( let i = 0; i < pkStore.game.stepList.length; i ++ ) {
        //         this.pieces.push(pkStore.game.stepList[i])
        //     }
        // }
        for ( let i = 0; i < this.pieces.length; i ++ ) {
            const {x, y, status} = this.pieces[i]
            this.draw_chess(x, y, status)
        }
    }

    draw_chess(x, y, state) {
        this.ctx.beginPath()
        this.ctx.arc(y * this.L, x * this.L,this.L * (0.35),0,2 * Math.PI, false);
        if (state === 1 || state === "1" ) {
            this.ctx.fillStyle = "#FFFFFF"
        } else if ( state === 0 || state === "0" ) {
            this.ctx.fillStyle = "#000000"
        }
        this.ctx.fill()
        this.ctx.closePath()
    }

    show_win() {
        let win = this.checkWin(this.chesses)
        if ( win === 0 ) {
            this.render()
            setTimeout(function () {
                pkStore.winner = "Black"
                pkStore.showColor = {color: "black"}
            }, 50)
        } else if ( win === 1 ) {
            this.render()
            setTimeout(function () {
                pkStore.winner = "White"
                pkStore.showColor = {color: "white"}
            }, 50)
        } else {
            return
        }
    }

    checkWin(board) {
        const rows = this.rows
        const cols = this.cols
        let index = -1;

        // 检查行
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols - 4; j++) {
                const curr = board[i][j];
                if ( curr !== -1 && curr === board[i][j + 1] && curr === board[i][j + 2] && curr === board[i][j + 3] && curr === board[i][j + 4]) {
                    index = curr;
                }
            }
        }

        // 检查列
        for (let i = 0; i < rows - 4; i++) {
            for (let j = 0; j < cols; j++) {
                const curr = board[i][j];
                if ( curr !== -1 && curr === board[i + 1][j] && curr === board[i + 2][j] && curr === board[i + 3][j] && curr === board[i + 4][j]) {
                    index = curr;
                }
            }
        }

        // 检查对角线
        for (let i = 0; i < rows - 4; i++) {
            for (let j = 0; j < cols - 4; j++) {
                const curr = board[i][j];
                if ( curr !== -1 && curr === board[i + 1][j + 1] && curr === board[i + 2][j + 2] && curr === board[i + 3][j + 3] && curr === board[i + 4][j + 4]) {
                    index = curr;
                }
            }
        }

        // 检查反对角线
        for (let i = 0; i < rows - 4; i++) {
            for (let j = cols - 1; j >= 4; j--) {
                const curr = board[i][j];
                if ( curr !== -1 && curr === board[i + 1][j - 1] && curr === board[i + 2][j - 2] && curr === board[i + 3][j - 3] && curr === board[i + 4][j - 4]) {
                    index = curr;
                }
            }
        }
        if ( index !== -1 ) {
            this.status = "end"
        }
        // 如果没有人胜利，返回-1
        return index;
    }
}