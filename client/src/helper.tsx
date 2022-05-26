export const makeReq = async (url: string, method: string, body?: any) => {
  console.log(url, method, body)
  
  let response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return { data: await response.json(), ok: response.ok };
};
