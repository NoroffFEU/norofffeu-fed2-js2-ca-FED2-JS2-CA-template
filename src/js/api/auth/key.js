import {API_AUTH_KEY, } from "../constants"

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRyaWFuZjk4IiwiZW1haWwiOiJhZHJhYnUwMDIwMUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcyNzYxNDk0OX0.dxoJObNwnYgL6fN7YgCS0p8TLPaBRqAW9GLYX-cUaQo"

export async function getKey() {

    const response = await fetch(API_AUTH_KEY, {
        method: `POST`,
        headers: { 
            "Content-Type": "application/json" ,
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            name: "TestKey",
        })
    });
    
    if (response.ok) {
        return await response.json();
    }

    console.error(await response.json());
    throw new Error("Could not register for key!")
}

getKey().then(console.log)