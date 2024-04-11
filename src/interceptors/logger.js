export const loggerInterceptor = (instance, client) => {
  return instance.interceptors.response.use(
    (response) => {
      if (client.verbose) {
        client.logger.info(
          'Response Headers',
          JSON.stringify(response.headers, null, 2)
        );
      }
      return response;
    }
  );
};

export default loggerInterceptor;