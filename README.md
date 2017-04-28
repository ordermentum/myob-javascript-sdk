# MYOB AccountRight 2.0 Javascript SDK
[![Build Status](https://travis-ci.org/ordermentum/myob-javascript-sdk.svg?branch=master)](https://travis-ci.org/ordermentum/myob-javascript-sdk)
[![dependencies Status](https://david-dm.org/ordermentum/myob-javascript-sdk/status.svg)](https://david-dm.org/ordermentum/myob-javascript-sdk)

MYOB AccountRight 2.0 SDK (unofficial) for Node.js.

See http://developer.myob.com/api/accountright/ for more details and registration for the API.

## Resources Currently Supported

* /Inventory/Item
* /Sale/Invoice/Item
* /Contact/Customer
* /Contact/Employee
* /GeneralLedger/TaxCode
* /GeneralLedger/Account
* /GeneralLedger/Job
* /GeneralLedger/Category


# Usage

```bash
yarn add myob
```

```javascript
const myob = require('myob').default;

const client = myob.createClient({
  clientId: process.env.MYOB_CLIENT_ID,
  secret: process.env.MYOB_SECRET,
});

```

see `examples/` more example code
