import { headers } from "../headers";

let accessToken;

export async function login(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    const json = await response.json();
    console.log(json); //delete later!!

    if(response.ok) {
      accessToken = json.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      window.location.href = "/post/feed/";
      return json;
    } else {
      throw new Error(json.errors[0].message);
    }
  } catch(error) {
    throw error;
  }
}