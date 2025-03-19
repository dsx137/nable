import * as nable from "../src/index";

const client = nable.lazy({
  p: () => "helloworld!",
});

console.log(client.p);
