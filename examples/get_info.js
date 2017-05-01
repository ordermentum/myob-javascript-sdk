
import createClient from '../src';

const client = createClient({
  username: process.env.MYOB_USERNAME,
  password: process.env.MYOB_PASSWORD,
  apiBase: process.env.MYOB_URL,
});


async function getInfo() {
  const response = await client.getInfo().catch(console.error);
  console.log(response);
}

getInfo();