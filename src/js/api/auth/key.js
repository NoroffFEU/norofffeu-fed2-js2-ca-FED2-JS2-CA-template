import { API_AUTH_KEY } from "../constants";
import { headers } from "../headers";

/**
 * This will get the API KEY - and store it in local storage
 * @example
 * ```js
 * //use this function to fetch API KEY
 * getKey()
 * const key = JSON.parse(localStorage.getItem("API KEY"))
 * ```
 */

export async function getKey() {
  const body = {
    name: "Tompe Talk",
  };
  try {
    const response = await fetch(API_AUTH_KEY, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const key = await response.json();
      localStorage.setItem("API KEY", JSON.stringify(key));
    }
  } catch (error) {
    alert("something went wrong trying to get apiKey");
  }
}
