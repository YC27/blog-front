const YC_GAME_OBJECTS = []

export class YcGameObject {
    constructor() {
        YC_GAME_OBJECTS.push(this);
        this.timedelta = 0;
        this.has_call_start = false;
    }

    start() { // 创建时执行一次

    }

    update() { // 除了第一帧，后面每一帧执行

    }

    on_destory() { // 删除之前执行

    }

    destroy() {
        this.on_destory()
        for ( let i = 0; i < YC_GAME_OBJECTS.length; i ++ ) {
            const obj = YC_GAME_OBJECTS[i];
            if ( obj === this ) {
                YC_GAME_OBJECTS.splice(i);
                break;
            }
        }
    }
}

let last_timestamp
const step = timestamp => {
    for ( let obj of YC_GAME_OBJECTS) {
        if ( !obj.has_call_start ) {
            obj.has_call_start = true;
            obj.start();
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;
    requestAnimationFrame(step);
}

requestAnimationFrame(step);