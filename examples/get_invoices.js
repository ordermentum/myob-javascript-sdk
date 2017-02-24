import createClient from '../src';

const client = createClient({
  clientId: process.env.MYOB_CLIENT_ID,
  token: { accessToken: process.env.MYOB_TOKEN, refreshToken: process.env.MYOB_REFRESH_TOKEN },
  secret: process.env.MYOB_SECRET,
  apiBase: process.env.BASE_URL,
  username: process.env.USERNAME,
  callback: (token) => { console.log('..........', token, 'callled'); },
  logger: console,
});


client.invoiceItems.findAll().then(invoices => {
  console.log(invoices);
}).catch(e => console.error(e));