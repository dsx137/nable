import * as nable from "../src/index";

await nable.enableHof();

const l = [1, 2, 3];

console.log(l.onEach((it) => console.log(it)));
