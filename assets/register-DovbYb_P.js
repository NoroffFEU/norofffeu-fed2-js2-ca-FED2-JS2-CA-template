async function i(e){return await fetch("https://v2.api.noroff.dev/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function c(e){e.preventDefault();const s=e.target,t=new FormData(s),o={name:t.get("name"),email:t.get("email"),password:t.get("password")};if(o.password!==t.get("confirmPassword")){alert("Passwords do not match");return}try{const r=await i(o);if(r.ok)alert("Registration successful"),window.location.href="/auth/login/";else{const a=await r.json();a.errors.length>0&&a.errors.forEach(n=>{alert(n.message)})}}catch(r){alert(`Registration failed: ${r}`)}}const f=document.forms.register;f.addEventListener("submit",c);
