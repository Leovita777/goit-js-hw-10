import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{f as h,i as u}from"./assets/vendor-651d7991.js";let n=!1;const s=document.querySelector("button[data-start]"),o=document.getElementById("datetime-picker"),y=document.querySelectorAll(".timer .field");s.disabled=!0;h(o,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){e[0]<new Date?(u.warning({title:"Warning",message:"Please choose a date in the future"}),s.disabled=!0):s.disabled=!1}});s.addEventListener("click",()=>{if(!n){n=!0,s.disabled=!0,o.disabled=!0,i(userSelectedDate-new Date);const e=setInterval(()=>{const a=i(userSelectedDate-new Date);for(const d of y){const t=d.querySelector(".value"),r=t.dataset.days?`data-${t.dataset.days}`:`data-${t.dataset.hours}`?`data-${t.dataset.hours}`:`data-${t.dataset.minutes}`?`data-${t.dataset.minutes}`:`data-${t.dataset.seconds}`;t.textContent=b(a[r])}a.days===0&&a.hours===0&&a.minutes===0&&a.seconds===0&&(clearInterval(e),n=!1,u.success({title:"Success",message:"Time is up!"}),o.disabled=!1)},1e3)}});function i(e){const c=Math.floor(e/864e5),l=Math.floor(e%864e5/36e5),m=Math.floor(e%864e5%36e5/6e4),f=Math.floor(e%864e5%36e5%6e4/1e3);return{days:c,hours:l,minutes:m,seconds:f}}function b(e){return`0${e}`.slice(-2)}
//# sourceMappingURL=commonHelpers.js.map
