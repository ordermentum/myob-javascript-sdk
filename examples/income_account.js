import createClient from '../src';

const client = createClient({
  clientId: process.env.MYOB_CLIENT_ID,
  token: { access_token: process.env.MYOB_TOKEN, refresh_token: process.env.MYOB_REFRESH_TOKEN },
  secret: process.env.MYOB_SECRET,
  apiBase: process.env.BASE_URL,
  username: process.env.USERNAME,
  logger: console,
});

const salesCode = 'GST';
client.accounts.findOne({ filter: `DisplayID eq'${salesCode}'` }).then(account => {
  console.log(account);
}).catch(e => console.error(e));
