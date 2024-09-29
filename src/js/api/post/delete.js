const API_URL = "https://v2.api.noroff.dev/social/posts/";
export async function deletePost(id) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hpcndhYyIsImVtYWlsIjoic2hpYWJkMzgzNjlAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MjczNTc5MDd9.UEUvSk-fipXHIozj7MpWRRbzWAp3dSK6W3kkNCQc9xA",
      "X-Noroff-API-Key": "9b16dd46-dba3-44c7-a516-66599a3c7358",
    },
  };

  const response = await fetch(`${API_URL}${id}`, {
    method: "DELETE",
    headers: options.headers,
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  console.log(response);
}
