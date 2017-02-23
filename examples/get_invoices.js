import createClient from '../src';

const client = createClient({
  clientId: process.env.MYOB_CLIENT_ID,
  token: process.env.MYOB_TOKEN,
  refreshToken: process.env.MYOB_REFRESH_TOKEN,
  secret: process.env.MYOB_SECRET,
  apiBase: process.env.BASE_URL,
  username: process.env.USERNAME,
  logger: console,
});


async function getInvoices() {
  const invoices = await client.invoiceItems.findAll();
  for (const invoice of invoices) {
    console.log(invoice);
  }
}

getInvoices();