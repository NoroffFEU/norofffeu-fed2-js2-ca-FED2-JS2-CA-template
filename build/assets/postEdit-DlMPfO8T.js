import{m as l}from"./header-RH2cM1rY.js";import{b as m,h as d}from"./headers-C9OjJDj3.js";import{a as i}from"./authGuard-C2GFzsuy.js";async function p(t,{title:a,body:e,tags:o,media:n}){const r={title:a,body:e,tags:o,media:n};try{(await fetch(m+"/"+t,{method:"PUT",headers:d(),body:JSON.stringify(r)})).ok&&(alert("You updated the post!"),window.location.href="/")}catch{alert("Something went wrong trying to update the post!")}}async function c(t){t.preventDefault();const a=JSON.parse(localStorage.getItem("postID")),e=new FormData(t.target),o={url:e.get("url"),alt:e.get("alt")},n={title:e.get("title"),body:e.get("text"),tags:e.get("tags").split(","),media:o};p(a,n)}i();const u=document.forms.editPost;u.addEventListener("submit",c);const g=document.querySelector("header");l(g);const h=()=>{const t=JSON.parse(localStorage.getItem("post")),a=document.getElementById("editPost");a.innerHTML=`
<input class="formInputOne" type="text" name="title" placeholder="Title" value="${t.title}" maxlength="40" />
<textarea class="formInputTwo" type="text" name="text" placeholder="Add text here.."  maxlength="400"> ${t.body}</textarea>
<input class="formInputOne" type="url" name="url" placeholder="Insert image url here.." value="${t.media.url}" maxlength="300" />
<input class="formInputOne" type="text" name="alt" placeholder="insert an image description here..." value="${t.media.alt}" maxlength="100"/>
<input class="formInputOne" type="text" name="tags" placeholder="Title" value="${t.tags}" />
<button class="text-3xl text-blue buttonEffect font-bold"> Save </button>
`};h();export{h as makeEditForm};
//# sourceMappingURL=postEdit-DlMPfO8T.js.map
