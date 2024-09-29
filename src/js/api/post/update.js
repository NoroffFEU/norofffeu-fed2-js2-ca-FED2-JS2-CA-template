export async function updatePost(id, { title, body, tags, media }) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hpcndhYyIsImVtYWlsIjoic2hpYWJkMzgzNjlAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MjczNTc5MDd9.UEUvSk-fipXHIozj7MpWRRbzWAp3dSK6W3kkNCQc9xA",
      "X-Noroff-API-Key": "9b16dd46-dba3-44c7-a516-66599a3c7358",
    },
  };

  const response = await fetch(`https://v2.api.noroff.dev/social/posts/${id}`, {
    method: "PUT",
    headers: options.headers,
    body: JSON.stringify({ title, body, tags, media }),
  });

  if (!response.ok) {
    throw new Error("Failed to edit post");
  }

  return await response.json();
}

export async function commentOnPost(id, { body }) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hpcndhYyIsImVtYWlsIjoic2hpYWJkMzgzNjlAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MjczNTc5MDd9.UEUvSk-fipXHIozj7MpWRRbzWAp3dSK6W3kkNCQc9xA",
      "X-Noroff-API-Key": "9b16dd46-dba3-44c7-a516-66599a3c7358",
    },
  };

  const response = await fetch(
    `https://v2.api.noroff.dev/social/posts/${id}/comment`,
    {
      method: "POST",
      headers: options.headers,
      body: JSON.stringify({ body }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to comment on the post");
  }

  return await response.json();
}
