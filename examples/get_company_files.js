import createClient from '../src';

const client = createClient({
  clientId: process.env.MYOB_CLIENT_ID,
  secret: process.env.MYOB_SECRET,
  logger: console,
});


async function getCompanyFiles() {

}

getCompanyFiles();