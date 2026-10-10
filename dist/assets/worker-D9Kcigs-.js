const e=`/pyodide/314.0.7/`,t=[`fetch`,`XMLHttpRequest`,`WebSocket`,`WebSocketStream`,`EventSource`,`Worker`,`SharedWorker`,`caches`,`WebTransport`,`BroadcastChannel`,`indexedDB`],n=[`numpy`,`scipy`,`sympy`,`matplotlib`],r=65536;let i,a=!1;const o=e=>self.postMessage(e),s={messageCallback:()=>{}};async function c(e){await i.loadPackage(e,s),e.includes(`matplotlib`)&&await i.runPythonAsync(`import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot`),e.includes(`sympy`)&&await i.runPythonAsync(`import sympy`)}function l(){for(let e=self;e&&e!==Object.prototype;e=Object.getPrototypeOf(e))for(let n of t)Object.prototype.hasOwnProperty.call(e,n)&&(delete e[n],Object.prototype.hasOwnProperty.call(e,n)&&Object.defineProperty(e,n,{value:void 0,writable:!1,configurable:!1}));i.runPython(`import sys
sys.modules.pop('pyodide_js', None)
sys.modules.pop('micropip', None)`),i.unregisterJsModule(`pyodide_js`),a=!0}async function u(t){let n=performance.now();i=await(await import(
/* @vite-ignore */
`${e}pyodide.mjs`)).loadPyodide({indexURL:e}),await i.loadPackage([`numpy`,`scipy`,...t],s),await i.runPythonAsync(`import numpy, scipy.optimize, scipy.integrate`),await c(t.filter(e=>e===`matplotlib`||e===`sympy`)),o({type:`ready`,ms:Math.round(performance.now()-n)})}async function d(e,t,s){let u=performance.now(),d=n.filter(e=>new RegExp(String.raw`\b${e}\b`).test(t)&&!i.loadedPackages[e]);if(d.length&&a)return o({type:`error`,id:e,error:`needs ${d.join(`, `)}`,needsRespawn:d});d.length&&await c(d),a||l();let f=``,p={batched:e=>{f.length<=r&&(f+=e+`
`)}};i.setStdout(p),i.setStderr(p);let m=i.globals.get(`dict`)();o({type:`started`,id:e});try{if(await i.runPythonAsync(t,{globals:m}),!m.has(`result`))throw Error(`code must set result = {...}`);i.runPython(`import json as _j
_out = _j.dumps(result, default=lambda o: o.tolist() if hasattr(o, "tolist") else str(o), allow_nan=False)`,{globals:m});let n=m.get(`_out`);if(s===`solve`&&n.length>16384)throw Error(`result too large`);let a=[];if(i.loadedPackages.matplotlib){let e=JSON.parse(i.runPython(`import io, base64, json
import matplotlib.pyplot as plt
figs, notes = [], []
for i, n in enumerate(plt.get_fignums()):
    if i >= 4:
        notes.append("[figure limit: only the first 4 figures are returned]")
        break
    b = io.BytesIO()
    plt.figure(n).savefig(b, format="png")
    if b.tell() > 500000:
        notes.append(f"[figure {n} dropped: PNG over 500 KB]")
    else:
        figs.append(base64.b64encode(b.getvalue()).decode())
plt.close("all")
json.dumps({"figs": figs, "notes": notes})`));a=e.figs;for(let t of e.notes)f+=t+`
`}f.length>r&&(f=f.slice(0,r)+`
[output truncated]`),o({type:`result`,id:e,result:JSON.parse(n),stdout:f,figures:a,ms:Math.round(performance.now()-u)})}catch(t){i.loadedPackages.matplotlib&&i.runPython(`import matplotlib.pyplot as plt
plt.close("all")`),o({type:`error`,id:e,error:String(t.message||t).slice(-600)})}finally{m.destroy()}}self.onmessage=async({data:e})=>{try{e.type===`init`?await u(e.packages):await d(e.id,e.code,e.mode)}catch(e){o({type:`fatal`,error:String(e.message||e).slice(-800)})}};