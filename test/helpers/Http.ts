import request = require("request");
import app from './App';
function makeRequest<T>(method, uri, data?): Promise<T> {
  return new Promise((resolve, reject) => {
    request(app.url + uri, {
      method: method,
      json: true,
      body: data
    }, (error, response, body) => {
      if (error || (response.statusCode >= 400 && response.statusCode <= 599)) {
        reject(error || response.body);
      } else {
        resolve(body);
      }
    })
  });
}
export default {
  get: <T>(url): Promise<T> => {
    return makeRequest<T>('GET', url);
  },
  post: <T>(url, data): Promise<T> => {
    return makeRequest<T>('POST', url, data);
  },
  put: <T>(url, data): Promise<T> => {
    return makeRequest<T>('PUT', url, data);
  },
  delete: (url): Promise<void> => {
    return makeRequest<void>('DELETE', url);
  }
}