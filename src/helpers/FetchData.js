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
      if(result.msg) throw result.msg;
    } else if (headers != null && body == null) {
      response = await fetch(url, {
        method: method,
        headers: headers,
      });
      if(response.status == 404) throw "Resource not found";
      result = await response.json();
      if(result.msg) throw result.msg;
    } else if (headers == null && body == null) {
      response = await fetch(url, {method:method});
      if(response.status == 404) throw "Resource not found";
      result = await response.json();
      if(result.msg) throw result.msg;
    }
  } catch (error) {
    throw error;
  }
  return result;
};
