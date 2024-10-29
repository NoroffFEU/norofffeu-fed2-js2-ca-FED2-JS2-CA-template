import { onLogout } from "../auth/logout";

export const makeHeader = (header) => {
  const outerContainer = document.createElement("div");
  outerContainer.className =
    "flex justify-between sticky top-0 pt-10 pb-3 bg-gradient-to-b from-blue to-transparent bg-no-repeat";

  const logo = document.createElement("p");
  logo.innerHTML = `
    <span class="header font-semibold">Tompe</span><span class="text-lightGrayBlue text-3xl font-bold">Talk</span>
    `;

  const nav = document.createElement("nav");
  nav.className = "flex gap-10 items-center";

  const postCreate = document.createElement("a");
  postCreate.href = "/post/create/";
  postCreate.className = "buttonEffect";
  if (window.location.pathname === "/post/create/") {
    postCreate.innerHTML = `<i class="fa-solid fa-plus fa-2xl" style="color: #151616"></i
              >`;
  } else {
    postCreate.innerHTML = `<i class="fa-solid fa-plus fa-2xl" style="color: #ffffff"></i
              >`;
  }

  const home = document.createElement("a");
  home.href = "/";
  home.className = "buttonEffect";
  if (window.location.pathname === "/") {
    home.innerHTML = `<i class="fa-solid fa-house fa-2xl" style="color: #151616"></i
          >`;
  } else {
    home.innerHTML = `<i class="fa-solid fa-house fa-2xl" style="color: #ffffff"></i
          >`;
  }

  const profile = document.createElement("a");
  profile.href = "/profile/";
  profile.className = "buttonEffect";
  if (window.location.pathname === "/profile/") {
    profile.innerHTML = `<i class="fa-solid fa-user fa-2xl" style="color: #151616"></i
          >`;
  } else {
    profile.innerHTML = `<i class="fa-solid fa-user fa-2xl" style="color: #ffffff"></i
          >`;
  }

  const logOut = document.createElement("button");
  logOut.className = "buttonEffect";
  logOut.innerHTML = `<i
              class="fa-solid fa-right-from-bracket fa-2xl"
              style="color: #ffffff"
            ></i>`;
  logOut.addEventListener("click", onLogout);

  header.appendChild(outerContainer);
  outerContainer.append(logo, nav);
  nav.append(postCreate, home, profile, logOut);
};
