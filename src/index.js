import Client from './client';
import NULL_LOGGER from 'null-logger';
import resources from './resources';

function createClient({
  clientId,
  secret,
  token = {},
  logger = NULL_LOGGER,
  username,
  password,
  callback,
  verbose = false,
  timeout = 5000,
  apiBase = 'https://api.myob.com/accountright/',
}) {
  const client = new Client({
    clientId,
    username,
    password,
    secret,
    callback,
    token,
    verbose,
    apiBase,
    timeout,
    logger
  });

  return {
    client,
    accounts: resources.accounts(client),
    inventoryItems: resources.inventoryItems(client),
    invoiceItems: resources.invoiceItems(client),
    orderItems: resources.orderItems(client),
    getCompanyFiles() { return client.getCompanyFiles(); },
    getInfo() { return client.getInfo(); },
    contactCustomers: resources.contactCustomers(client),
    employees: resources.employees(client),
    taxCodes: resources.taxCodes(client),
    jobs: resources.jobs(client),
    categories: resources.categories(client),
    authentication: client.authentication,
  };
}

export * from './client';
export * from './resources';
export default createClient;
