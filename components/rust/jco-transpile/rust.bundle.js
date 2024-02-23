// components/rust/jco-transpile/rust.js
var dv = new DataView(new ArrayBuffer());
var dataView = (mem) => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);
var isNode = typeof process !== "undefined" && process.versions && process.versions.node;
var _fs;
async function fetchCompile(url) {
  if (isNode) {
    _fs = _fs || await import("fs/promises");
    return WebAssembly.compile(await _fs.readFile(url));
  }
  return fetch(url).then(WebAssembly.compileStreaming);
}
var instantiateCore = WebAssembly.instantiate;
var utf8Decoder = new TextDecoder();
var exports0;
var memory0;
var postReturn0;
function helloWorld() {
  const ret = exports0["hello-world"]();
  var ptr0 = dataView(memory0).getInt32(ret + 0, true);
  var len0 = dataView(memory0).getInt32(ret + 4, true);
  var result0 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr0, len0));
  postReturn0(ret);
  return result0;
}
var $init = (async () => {
  const module0 = fetchCompile(new URL("./rust.core.wasm", import.meta.url));
  ({ exports: exports0 } = await instantiateCore(await module0));
  memory0 = exports0.memory;
  postReturn0 = exports0["cabi_post_hello-world"];
})();
await $init;
export {
  helloWorld
};
