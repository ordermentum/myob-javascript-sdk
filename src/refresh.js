import moment from 'moment';
import qs from 'qs';

export default async function refresh(client) {
  const { clientId, secret, refreshToken, logger } = client;

  const params = {
    client_id: clientId,
    client_secret: secret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  };

  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
  let result = null;

  try {
    result = await client.post('https://secure.myob.com/oauth2/v1/authorize',
                              qs.stringify(params),
                              { headers, json: true }).then(response => response.data);
  } catch (ex) {
    logger.error('error refreshing token', ex, params);
    throw ex;
  }

  token.expires_at = moment().add(1195, 'seconds');
  return { token };
};
