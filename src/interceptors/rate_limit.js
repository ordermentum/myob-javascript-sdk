import axios from 'axios';
import get from 'lodash.get';

export default function rateLimit(instance, retries = 5, wait = 1000) {
  return instance.interceptors.response.use(null, (error) => {
    const config = error.config;
    const connectionError = error && ['ECONNABORTED', 'ECONNREFUSED'].includes(error.code);

    if (connectionError) {
      return Promise.reject(error);
    }

    if (!config) {
      return Promise.reject(error);
    }

    config.rateRetryRequest = config.rateRetryRequest || 0;
    const canTry = (!config.rateRetryRequest || config.rateRetryRequest < retries);
    const status = get(error, ['response', 'status']);

    if (status === 403 && canTry) {
      config.rateRetryRequest += 1;

      if (axios.defaults.agent === config.agent) {
        delete config.agent;
      }
      if (axios.defaults.httpAgent === config.httpAgent) {
        delete config.httpAgent;
      }
      if (axios.defaults.httpsAgent === config.httpsAgent) {
        delete config.httpsAgent;
      }

      return new Promise((resolve) => {
        setTimeout(() => { resolve(instance(config)); }, wait);
      });
    }

    throw error;
  });
}
