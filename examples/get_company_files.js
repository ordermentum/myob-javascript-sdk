import createClient from '../src';

const client = createClient({
  clientId: process.env.MYOB_CLIENT_ID,
  secret: process.env.MYOB_SECRET,
  callback: (token) => { console.log('************', token, '****************'); },
  token: {
    accessToken: process.env.MYOB_TOKEN,
    refreshToken: process.env.MYOB_REFRESH_TOKEN,
  },
});


async function getCompanyFiles() {
  const companyFiles = await client.getCompanyFiles();
  console.log(companyFiles);
}

getCompanyFiles();
