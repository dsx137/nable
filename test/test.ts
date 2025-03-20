import * as nable from "../src/index";

await nable.enableEof();

const o = {
  a: "hello",
};

console.log(
  o.nApply(function () {
    console.log(this.a);
  })
);
