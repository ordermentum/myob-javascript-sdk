import 'babel-polyfill';

import Client from './client';
import NULL_LOGGER from './logger';
import resources from './resources';

function createClient({
  clientId,
  secret,
  token = {},
  logger = NULL_LOGGER,
  username,
  password,
  timeout = 3000,
  apiBase = 'https://api.myob.com/accountright/',
 }) {
  const client = new Client({
    clientId,
    username,
    password,
    secret,
    token,
    apiBase,
    timeout,
    logger });

  return {
    client,
    accounts: resources.accounts(client),
    inventoryItems: resources.inventoryItems(client),
    invoiceItems: resources.invoiceItems(client),
    getCompanyFiles() { return client.getCompanyFiles(); },
    contactCustomers: resources.contactCustomers(client),
    taxCodes: resources.taxCodes(client),
    authentication: client.authentication,
  };
}

export default createClient;
