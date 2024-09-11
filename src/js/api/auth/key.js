import { API_AUTH_KEY } from "../constants";
import { headers } from "../headers";

export async function getKey(name) {
  const body = {
    name: "Tompe Talk",
  };

  try {
    const response = await fetch(API_AUTH_KEY, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(body),
    });

    console.log("test: ", response);

    if (response.ok) {
      const key = await response.json();
      console.log(key);
    }
  } catch (error) {
    console.log(error);
    alert("something went wrong trying to get apiKey");
  }
}
