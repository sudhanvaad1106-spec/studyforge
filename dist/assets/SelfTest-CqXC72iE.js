import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{a as t,n,o as r}from"./index-frPbDIOc.js";var i=e(r(),1),a=[],o=(e,t,n)=>a.push({name:e,pass:t,detail:n.slice(-200)}),s=e=>e.ok?``:e.error,c=e=>e.trim().split(`
`).pop()??``,l=async()=>{let e=await n(`result = {"v": 41 + 1}`);return e.ok&&e.result.v===42},u=[[`from js import fetch`,`from js import fetch
fetch`],[`js.fetch("/")`,`import js
await js.fetch("/")`],[`proto chain fetch`,`import js
o = js.Object.getPrototypeOf(js.self)
found = []
while o:
    if js.Object.prototype.hasOwnProperty.call(o, "fetch"): found.append(1)
    o = js.Object.getPrototypeOf(o)
assert not found, "fetch still on prototype"
raise Exception("no fetch anywhere")`,`no fetch anywhere`],[`globalThis.fetch`,`import js
f = getattr(js.globalThis, "fetch", None)
assert f is None or f is js.undefined, "present"
raise Exception("absent")`,`absent`],[`js.eval`,`import js
js.eval("1+1")`],[`js.Function`,`import js
js.Function.new("return 1")()`],[`run_js`,`from pyodide.code import run_js
run_js("1+1")`],[`XMLHttpRequest`,`import js
js.XMLHttpRequest.new()`],[`WebSocket`,`import js
js.WebSocket.new("wss://example.com")`],[`WebSocketStream`,`import js
js.WebSocketStream.new("wss://example.com")`],[`EventSource`,`import js
js.EventSource.new("/x")`],[`nested Worker`,`import js
js.Worker.new("/x.js")`],[`caches.open`,`import js
await js.caches.open("x")`],[`indexedDB.open`,`import js
js.indexedDB.open("x")`],[`BroadcastChannel`,`import js
js.BroadcastChannel.new("x")`],[`import pyodide_js`,`import pyodide_js
pyodide_js.loadPackage`,`pyodide_js`],[`import micropip`,`import micropip`,`micropip`],[`pyfetch`,`from pyodide.http import pyfetch
await pyfetch("/")`],[`dynamic import()`,`import js
js.Function.new("return import('/x.js')")()`],[`forged postMessage`,`import js
from pyodide.ffi import to_js
js.postMessage(to_js({"type":"result","id":999,"stdout":"<img src=x onerror=alert(1)>","figures":["nope"],"ms":1,"result":{}}, dict_converter=js.Object.fromEntries))
raise Exception("sent forged message")`,`sent forged message`]];async function d(){a.length=0;let e=0,t=()=>e++;document.addEventListener(`securitypolicyviolation`,t);let r=await n(`import numpy as np
from scipy.optimize import brentq
ca0, tau, k = 2.0, 5.0, 0.3
ca = brentq(lambda c: (ca0 - c) / tau - k * c, 0, ca0)
result = {"ca": np.float64(ca), "arr": np.arange(3)}`),i=r.ok?r.result.ca:NaN;o(`numpy+scipy brentq steady state`,r.ok&&Math.abs(i-.8)<1e-6,r.ok?`ca=${i}`:s(r)),r=await n(`import matplotlib.pyplot as plt
plt.plot([1, 2, 3])
result = {"n": 1}`),o(`matplotlib figure`,r.ok&&r.figures.length===1&&r.figures[0].startsWith(`iVBORw0KGgo`),r.ok?`${r.figures.length} figure(s)`:s(r)),r=await n(`import numpy as np, matplotlib.pyplot as plt
plt.plot(np.arange(3))
result = {}`),o(`one-line multi-import plot`,r.ok&&r.figures.length===1,r.ok?`${r.figures.length} figure(s)`:s(r)),r=await n(`import sympy as sp
x = sp.symbols("x")
result = {"d": str(sp.diff(sp.sin(x) * x, x))}`);let d=r.ok?r.result.d:``;o(`sympy diff`,d===`x*cos(x) + sin(x)`,r.ok?d:s(r)),r=await n(`print("x" * 200000)
result = {}`),o(`200 KB print truncated`,r.ok&&r.stdout.endsWith(`[output truncated]`)&&r.stdout.length<=65556,r.ok?`stdout length ${r.stdout.length}`:s(r)),r=await n(`x = 1`),o(`missing result`,!r.ok&&r.error.includes(`result`),s(r)||`unexpected ok`),r=await n(`result = {"a": list(range(10000))}`),o(`solve result > 16 KB`,!r.ok&&r.error.includes(`result too large`),s(r)||`unexpected ok`),r=await n(`result = {"a": list(range(10000))}`,{mode:`chemlab`}),o(`chemlab result uncapped`,r.ok,s(r)||`ok`),document.removeEventListener(`securitypolicyviolation`,t),o(`no CSP violations during normal runs`,e===0,`${e} violation(s)`);let f=performance.now();r=await n(`while True:
    pass`),o(`infinite loop is killed`,!r.ok&&r.error===`timeout`,`${s(r)||`unexpected ok`} after ${Math.round(performance.now()-f)} ms`),o(`run succeeds after kill`,await l(),`respawned`);let p=performance.now();r=await n(`import js
from pyodide.ffi import to_js
for i in range(1, 51):
    js.postMessage(to_js({"type":"result","id":i,"stdout":"","figures":[],"ms":0,"result":{}}, dict_converter=js.Object.fromEntries))
while True:
    pass`);let m=Math.round(performance.now()-p);o(`forged result + hang is killed`,!r.ok&&r.error===`timeout`&&m<11500&&await l(),`${s(r)||`unexpected ok`} after ${m} ms`);for(let[e,t,i]of u){r=await n(`${t}\nresult = {"escaped": True}`);let a=s(r);o(`escape: ${e}`,!r.ok&&a!==`timeout`&&(!i||a.includes(i)),r.ok?`ESCAPED`:c(a))}return o(`escape: client healthy after forged postMessage`,await l(),`next run returned 42`),r=await n(`import numpy as np
a = np.ones(2**28)
result = {"n": int(a.size)}`),o(`2 GB allocation fails safely`,!r.ok,r.ok?`allocation succeeded`:c(r.error)),o(`run succeeds after memory failure`,await l(),`ok`),[...a]}var f=t();function p(){let[e,t]=(0,i.useState)(null);return(0,i.useEffect)(()=>{d().then(e=>{Object.assign(window,{__selftest:e}),t(e)})},[]),e?(0,f.jsxs)(`main`,{className:`p-4`,children:[(0,f.jsxs)(`h1`,{className:`text-xl font-bold`,children:[`Sandbox self-test: `,e.filter(e=>e.pass).length,`/`,e.length,` passed`]}),(0,f.jsx)(`table`,{className:`mt-4 text-sm`,children:(0,f.jsx)(`tbody`,{children:e.map(e=>(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`pr-4`,children:e.pass?`PASS`:`FAIL`}),(0,f.jsx)(`td`,{className:`pr-4`,children:e.name}),(0,f.jsx)(`td`,{children:e.detail})]},e.name))})})]}):(0,f.jsx)(`p`,{className:`p-4`,children:`Running sandbox self-test (first run downloads Python)...`})}export{p as default};