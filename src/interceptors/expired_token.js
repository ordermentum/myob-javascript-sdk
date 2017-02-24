import axios from 'axios';

export default function expiredToken(instance, client, retries = 5) {
  return instance.interceptors.response.use(null, (error) => {
    const config = error.config;

    if (!config) {
      return Promise.reject(error);
    }

    config.expiredTokenRetry = config.expiredTokenRetry || 0;
    const canTry = (!config.expiredTokenRetry || config.expiredTokenRetry < retries);

    if (error.code !== 'ECONNABORTED' && error.response.status === 401 && canTry) {
      config.expiredTokenRetry += 1;

      return client.authentication.refresh(client.token).then((token) => {
        console.log('dog.....', token);
        config.headers.Authorization = `Bearer ${token.access_token}`;
        client.callback(token);
        return instance(config);
      });
    }

    throw error;
  });
}
