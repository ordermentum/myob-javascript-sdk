const Oauth2 = require('simple-oauth2');

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

  return {
    credentials,

    getAccessCodeUri(redirectUri) {
      const oauth2 = Oauth2.create(credentials);
      const authorizationUri = oauth2.authorizationCode.authorizeURL({
        redirect_uri: redirectUri,
        scope: 'CompanyFile',
      });

      return authorizationUri;
    },

    getToken(code, redirectUri) {
      const params = {
        code,
        'Content-Type': 'application/x-www-form-urlencoded',
        redirect_uri: redirectUri,
        scope: 'CompanyFile',
      };

      const oauth2 = Oauth2.create(credentials);

      logger.trace('credentials object being passed is ', credentials);
      logger.trace('params being passed to accessToken call ', params);

      return oauth2.authorizationCode.getToken(params)
                   .then(result => oauth2.accessToken.create(result));
    },
  };
}
