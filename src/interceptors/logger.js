export const loggerInterceptor = (instance, client) => {
  return instance.interceptors.response.use(
    (response) => {
      if (client.verbose) {
        client.logger.info(
          'Response Headers',
          JSON.stringify(response.headers, null, 2)
        );
        return response;
      }
    },
    (error) => {
      Promise.reject(error);
    }
  );
};

export default loggerInterceptor;