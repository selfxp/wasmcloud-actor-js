# Actor + external component

Experiment on using component functionality in an ts actor: 

1. Build the component that exposes a `hello-world` function: 
```
cargo component build --release --target=wasm32-unknown-unknown
```

2. Check for the component interface is present
```
wasm-tools component wit target/wasm32-unknown-unknown/release/rust.wasm
```

3. Transpile component to js 
```
jco transpile target/wasm32-unknown-unknown/release/rust.wasm -o jco-transpile
```

4. Import the resulting js as [documented](https://github.com/bytecodealliance/jco?tab=readme-ov-file#transpile) inside actor.
```
import { helloWorld } from "./components/rust/jco-transpile/rust.js";

```

5. Build the actor 
```
wash build
```

it fails with
```
failed to build actor with custom command: "Import './components/rust/jco-transpile/rust.js' in source.js is not defined as a world import
```

