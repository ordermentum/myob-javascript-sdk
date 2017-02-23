import createClient from '../src';

const client = createClient({
  clientId: process.env.MYOB_CLIENT_ID,
  secret: process.env.MYOB_SECRET,
  logger: console,
});


console.log(client.authentication.getAccessCodeUri(process.env.CALLBACK_URL));
