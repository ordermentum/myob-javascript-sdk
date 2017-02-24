import createClient from '../src';

const client = createClient({
  clientId: process.env.MYOB_CLIENT_ID,
  secret: process.env.MYOB_SECRET,
});


console.log(client.authentication.getAccessCodeUri(process.env.CALLBACK_URL));
