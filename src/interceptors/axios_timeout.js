import axios from "axios";


export default function timeoutInterceptor(instance) {
  return instance.interceptors.request.use(config => {
    if (config.timeout === undefined || config.timeout === 0) {
      return config;
    }
  
    const source = axios.CancelToken.source();
  
    setTimeout(() => {
      source.cancel(`Cancelled request. Took longer than ${config.timeout}ms to get complete response.`);
    }, config.timeout);
  
    if (config.cancelToken) {
      config.cancelToken.promise.then(cancel => {
        source.cancel(cancel.message);
      });
    }
  
    return { ...config, cancelToken: source.token };
  });
}
