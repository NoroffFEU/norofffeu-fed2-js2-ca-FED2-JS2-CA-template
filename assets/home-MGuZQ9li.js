import{a as u}from"./authGuard-C2GFzsuy.js";import{r as m}from"./read-CvYznuT1.js";import{r as p}from"./read-CPXTQGQW.js";const b="https://v2.api.noroff.dev/social/posts/";async function f(t){const r={headers:{"Content-Type":"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hpcndhYyIsImVtYWlsIjoic2hpYWJkMzgzNjlAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MjczNTc5MDd9.UEUvSk-fipXHIozj7MpWRRbzWAp3dSK6W3kkNCQc9xA","X-Noroff-API-Key":"9b16dd46-dba3-44c7-a516-66599a3c7358"}},e=await fetch(`${b}${t}`,{method:"DELETE",headers:r.headers});if(!e.ok)throw new Error("Failed to create post");console.log(e)}function l(){localStorage.removeItem("token"),window.location.href="./auth/login/"}function g(){const t=document.getElementById("logOut"),r=document.getElementById("logOutMobile");t&&t.addEventListener("click",e=>{e.preventDefault(),l()}),r&&r.addEventListener("click",e=>{e.preventDefault(),l()})}g();u();const h=await p();async function d(){const t=document.querySelector(".main-content");if(!t){console.error("Main content element not found");return}t.innerHTML="Populating posts...";try{let e=(await m(12,1)).data;if(e=e.slice(0,12),!Array.isArray(e)){console.error("Error: Expected an array of posts, but got:",e),t.innerHTML="<p>Failed to load posts. Please try again later.</p>";return}if(e.length===0){t.innerHTML="<p>No posts available at the moment.</p>";return}t.innerHTML="",e.forEach(o=>{const n=document.createElement("div");n.classList.add("bg-white","rounded-lg","shadow-lg","p-6","mb-10","max-w-xl","mx-auto","border","border-gray-200","cursor-pointer"),n.innerHTML=`
        <a href="/post/?id=${o.id}" class="no-underline text-inherit">
          <div class="flex items-center mb-4">
            <img src="${o.author?.avatar?.url||"../../../public/images/shirwacProfile.avif"}" alt="${o.author?.name||"Unknown User"}" class="w-12 h-12 rounded-full mr-3">
            <div class="font-semibold text-lg text-gray-800">${o.author?.name||"Unknown User"}</div>
          </div>
        </a>
        <h2 class="text-xl font-semibold mb-2">${o.title||"Untitled Post"}</h2>
        <div class="text-sm text-gray-600 mb-4">${o.body||"No content available."}</div>

        <div class="mb-4">
          <img src="${o.media?.url||"../../../public/images/weather.avif"}" alt="Post Image" class="w-full rounded-lg">
        </div>

        <div class="flex items-center space-x-3 mb-4">
          <button class="bg-blue-500 text-white px-4 py-2 rounded text-sm transition hover:bg-blue-700">👍 Like</button>
          ${o.author?.name===h.data.name?`
                <button class="bg-blue-500 text-white px-4 py-2 rounded text-sm transition hover:bg-blue-700 edit-button" data-id="${o.id}">Edit</button>
                <button class="bg-red-500 text-white px-4 py-2 rounded text-sm transition hover:bg-red-600 delete-btn">Delete</button>`:""}
        </div>

        <div class="mt-4">
          <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded mb-2 text-sm" placeholder="Add a comment...">
          <button class="bg-green-500 text-white px-4 py-2 rounded text-sm transition hover:bg-green-600">Comment</button>
          <div class="mt-4 pl-4 border-l-2 border-gray-300">
            <div class="text-sm text-gray-700 mt-2">Sample comment text</div>
          </div>
        </div>
      `,n.addEventListener("click",a=>{a.target.closest("button")||(window.location.href=`/post/?id=${o.id}`)});const s=n.querySelector(".delete-btn");s&&s.addEventListener("click",async()=>{if(confirm("Are you sure you want to delete this post?"))try{await f(o.id),n.remove(),alert("Post deleted successfully.")}catch(c){console.error("Error deleting post:",c),alert("Failed to delete post.")}});const i=n.querySelector(".edit-button");i&&i.addEventListener("click",()=>{const a=i.getAttribute("data-id");window.location.href=`/post/edit/?id=${a}`}),t.appendChild(n)})}catch(r){console.error("Error populating posts:",r),t.innerHTML="<p>Failed to load posts. Please try again later.</p>"}}window.addEventListener("load",()=>{d()});d();
