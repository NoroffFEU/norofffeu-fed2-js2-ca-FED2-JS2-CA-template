function c(){localStorage.removeItem("userinfo"),localStorage.removeItem("token"),window.location.href="/auth/login/"}const i=f=>{const l=document.createElement("div");l.className="flex justify-between sticky top-0 pt-10 pb-3 bg-gradient-to-b from-blue to-transparent bg-no-repeat";const o=document.createElement("a");o.href="/",o.className="buttonEffect",o.innerHTML=`
    <span class="header font-semibold">Tompe</span><span class="text-lightGrayBlue text-3xl font-bold">Talk</span>
    `;const s=document.createElement("nav");s.className="flex items-center";const e=document.createElement("a");e.href="/post/create/",e.className="buttonEffect",window.location.pathname==="/post/create/"?e.innerHTML=`<i class="fa-solid fa-plus fa-2xl" style="color: #151616"></i
              >`:e.innerHTML=`<i class="fa-solid fa-plus fa-2xl" style="color: #ffffff"></i
              >`;const t=document.createElement("a");t.href="/",t.className="buttonEffect",window.location.pathname==="/"?t.innerHTML=`<i class="fa-solid fa-house fa-2xl" style="color: #151616"></i
          >`:t.innerHTML=`<i class="fa-solid fa-house fa-2xl" style="color: #ffffff"></i
          >`;const a=document.createElement("a");a.href="/profile/",a.className="buttonEffect",window.location.pathname==="/profile/"?a.innerHTML=`<i class="fa-solid fa-user fa-2xl" style="color: #151616"></i
          >`:a.innerHTML=`<i class="fa-solid fa-user fa-2xl" style="color: #ffffff"></i
          >`;const n=document.createElement("button");n.className="buttonEffect",n.innerHTML=`<i
              class="fa-solid fa-right-from-bracket fa-2xl"
              style="color: #ffffff"
            ></i>`,n.addEventListener("click",c),f.appendChild(l),l.append(o,s),s.append(e,t,a,n)};export{i as m};
//# sourceMappingURL=header-RH2cM1rY.js.map
