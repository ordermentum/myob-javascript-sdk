import oauth2 from 'simple-oauth2';

export default function authentication(clientId, secret, logger) {
  const credentials = {
    client: {
      id: clientId,
      secret,
    },
    auth: {
      tokenHost: 'https://secure.myob.com',
      authorizePath: '/oauth2/account/authorize',
      tokenPath: '/oauth2/v1/authorize',
    },
  };
  const instance = oauth2.create(credentials);
  return {
    credentials,
    instance,

    getAccessCodeUri(redirectUri) {
      const authorizationUri = this.instance.authorizationCode.authorizeURL({
        redirect_uri: redirectUri,
        scope: 'CompanyFile',
      });

      return authorizationUri;
    },

    async refresh(currentToken) {
      logger.info('refreshing token', currentToken);

      const token = this.instance.accessToken.create(currentToken);
      const result = await token.refresh();
      return result.token;
    },

    getToken(code, redirectUri) {
      const params = {
        code,
        'Content-Type': 'application/x-www-form-urlencoded',
        redirect_uri: redirectUri,
        scope: 'CompanyFile',
      };

      logger.info('credentials object being passed is ', credentials);
      logger.info('params being passed to accessToken call ', params);

      return this.instance.authorizationCode.getToken(params)
                   .then(result => this.instance.accessToken.create(result));
    },
  };
}
