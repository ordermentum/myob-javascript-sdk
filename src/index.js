import Client from './client';
import NULL_LOGGER from './logger';
import resources from './resources';
import authentication from './authentication';

function createClient({
  clientId,
  secret,
  token,
  refreshToken,
  logger = NULL_LOGGER,
  username,
  password,
  timeout = 3000,
  apiBase = 'https://api.myob.com/accountright/',
 }) {
  const client = new Client({ clientId, username, password, refreshToken, secret, token, apiBase, timeout, logger });

  return {
    client,
    inventoryItems: resources.inventoryItems(client),
    invoiceItems: resources.invoiceItems(client),
    contactCustomers: resources.contactCustomers(client),
    taxCodes: resources.taxCodes(client),
    authentication: authentication(clientId, secret, logger),
  };
}

export default createClient;
