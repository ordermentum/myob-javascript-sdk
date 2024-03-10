import {AuthorizationCode} from 'simple-oauth2';

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
    options:  {
      authorizationMethod: 'body'
    }
  };
  const instance = new AuthorizationCode(credentials);

  return {
    credentials,
    instance,

    getAccessCodeUri(redirectUri) {
      const authorizationUri = instance.authorizeURL({
        redirect_uri: redirectUri,
        scope: 'CompanyFile',
      });

      return authorizationUri;
    },

    async refresh(currentToken) {
      logger.debug('refreshing token', currentToken);

      const token = instance.createToken(currentToken);
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

      logger.debug('credentials object being passed is ', credentials);
      logger.debug('params being passed to accessToken call ', params);

      return instance.getToken(params);
    },
  };
}
