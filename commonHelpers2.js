import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{i as o}from"./assets/vendor-bfb47a51.js";function m(e,t){return new Promise((i,s)=>{t==="fulfilled"?setTimeout(()=>{i(e)},e):t==="rejected"&&setTimeout(()=>{s(e)},e)})}document.querySelector("form").addEventListener("submit",e=>{e.preventDefault();const t=parseInt(document.querySelector("input[name='delay']").value),i=document.querySelector("input[name='state']:checked").value;m(t,i).then(r=>{o.success({title:"Fulfilled",message:`✅ Fulfilled promise in ${r}ms`})},r=>{o.error({title:"Rejected",message:`❌ Rejected promise in ${r}ms`})})});
//# sourceMappingURL=commonHelpers2.js.map
