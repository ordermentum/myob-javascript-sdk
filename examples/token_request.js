import createClient from '../src';

const client = createClient({
  clientId: process.env.MYOB_CLIENT_ID,
  secret: process.env.MYOB_SECRET,
  logger: console,
});


async function getToken() {
  try {
    const token = await client.authentication.getToken(process.env.CALLBACK_CODE,
                                                       process.env.CALLBACK_URL);
    console.log(token);
  } catch (e) {
    console.log(e);
  }
}

getToken();
