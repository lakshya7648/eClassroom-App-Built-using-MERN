export const fetchRequestedData = async (
  url,
  method = "GET",
  headers = null,
  body = null
) => {
  let response, result;
  try {
    if (headers != null && body != null) {
      response = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      });
      if(response.status == 404) throw "Resource not found";
      result = await response.json();
    } else if (headers != null && body == null) {
      response = await fetch(url, {
        method: method,
        headers: headers,
      });
      if(response.status == 404) throw "Resource not found";
      result = await response.json();
    } else if (headers == null && body == null) {
      response = await fetch(url);
      if(response.status == 404) throw "Resource not found";
      result = await response.json();
    }
  } catch (error) {
    throw error;
  }
  return result;
};
