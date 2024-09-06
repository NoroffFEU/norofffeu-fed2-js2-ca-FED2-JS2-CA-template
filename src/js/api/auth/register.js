import { API_AUTH_REGISTER } from "../constants";
import { headers } from "../headers"

export async function register({ name, email, password }) {
  const body = JSON.stringify({ name, email, password });

  const response = await fetch(API_AUTH_REGISTER, {
    headers: headers(),
    method: "POST",
    body,
  });

  if(response.ok) {
    const { data } = await response.json();
    return data
  }

  const errorData = await response.json();
  const errorMessage = errorData.errors[0]?.message || "Could not register this account";
  throw new Error(errorMessage);

  // try {
  //   const postData = {
  //     method: "POST",
  //     headers: headers(),
  //     body: JSON.stringify(data),
  //   };

  //   const response = await fetch(url, postData);
  //   const json = await response.json();
  //   console.log(json); //delete later!!

  //   if(!response.ok) {
  //     throw new Error(`Error: ${json.errors[0].message}`);
  //   }

  //   return json;
  // } catch(error) {
  //   throw error;
  // }
}
