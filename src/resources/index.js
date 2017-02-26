import resource from './resource';

export default {
  inventoryItems: resource('/Inventory/Item', 'Items'),
  invoiceItems: resource('/Sale/Invoice/Item', 'Items'),
  contactCustomers: resource('/Contact/Customer', 'Items'),
  taxCodes: resource('/GeneralLedger/TaxCode', 'Items'),
  accounts: resource('/GeneralLedger/Account', 'Items'),
};
