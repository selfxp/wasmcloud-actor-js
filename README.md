# Actor + external component

Experiment on using component functionality in an ts actor:

1. Build the component that exposes a `hello-world` function: 
```
cargo component build --release
```

2. Check for the component interface is present
```
wasm-tools component wit target/wasm32-wasi/release/rust.wasm
```

3. Import the interface exported by the rust component.
```
import { helloWorld } from "component:rust/ih";
```

4. Import the resulting js as [documented](https://github.com/bytecodealliance/jco?tab=readme-ov-file#transpile) inside actor.
```
import { helloWorld } from "./components/rust/jco-transpile/rust.js";
```

5. Build the js component
```
npm install
tsc
jco componentize dist/http-hello-world.js --wit wit --world-name hello -o dist/component.wasm
```

6.
```bash
wasm-tools compose dist/component.wasm -d ./components/rust/target/wasm32-wasi/release/rust.wasm -o dist/http-hello-world.wasm
```

7. Serve the component
```bash
wasmtime serve dist/http-hello-world.wasm -Scommon
```

1. In another terminal, curl the component
```bash
curl localhost:8080
```

This should print "Hello from Typescript!".

10. Take this component and run in wasmCloud. Be sure to stop your wasmtime serve to avoid port conflicts.
```bash
npm run build
npm run wadm:start
```

1.Curl the component
```bash
curl localhost:8080
```

This should print "Hello from Typescript!".
