import { headers } from "../headers"

export async function register({url, data}) {
  try {
    const postData = {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);

    if(!response.ok) {
      throw new Error(`Server status: ${response.status}`);
    }

    const json = await response.json();

    return json;
  } catch(error) {
    console.error(`Error message: ${error.message}`);
  }
}
