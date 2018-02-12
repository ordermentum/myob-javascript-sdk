import get from 'lodash.get';

export default function expiredToken(instance, client, retries = 5) {
  return instance.interceptors.response.use(null, async (error) => {
    const config = error.config;
    const connectionError = error && ['ECONNABORTED', 'ECONNREFUSED'].includes(error.code);

    if (connectionError) {
      return Promise.reject(error);
    }

    if (!config) {
      return Promise.reject(error);
    }

    config.expiredTokenRetry = config.expiredTokenRetry || 0;

    const accessDenied = get(error, ['data', 'Message']) === 'Access denied';
    const status = get(error, ['response', 'status']);
    const canTry = (!config.expiredTokenRetry || config.expiredTokenRetry < retries);

    if (!accessDenied && status === 401 && canTry) {
      config.expiredTokenRetry += 1;

      try {
        const token = await client.authentication.refresh(client.token);
        try {
          await client.callback(token);
        } catch (e) {
          client.logger.error(e);
        }
        config.headers.Authorization = `Bearer ${token.access_token}`;
        return instance(config);
      } catch (e) {
        client.logger.error('could not refresh token', e, error);
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  });
}
