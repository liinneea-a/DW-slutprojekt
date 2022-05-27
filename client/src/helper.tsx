export const makeReq = async (url: string, method: string, body?: any) => {
  
  let response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return { data: await response.json(), ok: response.ok };
};
