import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{f,i as u}from"./assets/vendor-651d7991.js";let r=!1;const s=document.querySelector("button[data-start]"),n=document.getElementById("datetime-picker"),h=document.querySelectorAll(".timer .field");s.disabled=!0;f(n,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){e[0]<new Date?(u.warning({title:"Warning",message:"Please choose a date in the future"}),s.disabled=!0):s.disabled=!1}});s.addEventListener("click",()=>{const e=n.value;if(!r){r=!0,s.disabled=!0,n.disabled=!0;const o=setInterval(()=>{const a=y(e-new Date);for(const i of h){const t=i.querySelector(".value"),d=t.dataset.days?`data-${t.dataset.days}`:`data-${t.dataset.hours}`?`data-${t.dataset.hours}`:`data-${t.dataset.minutes}`?`data-${t.dataset.minutes}`:`data-${t.dataset.seconds}`;t.textContent=b(a[d])}a.days===0&&a.hours===0&&a.minutes===0&&a.seconds===0&&(clearInterval(o),r=!1,u.success({title:"Success",message:"Time is up!"}),n.disabled=!1)},1e3)}});function y(e){const d=Math.floor(e/864e5),c=Math.floor(e%864e5/36e5),l=Math.floor(e%864e5%36e5/6e4),m=Math.floor(e%864e5%36e5%6e4/1e3);return{days:d,hours:c,minutes:l,seconds:m}}function b(e){return`0${e}`.slice(-2)}
//# sourceMappingURL=commonHelpers.js.map
