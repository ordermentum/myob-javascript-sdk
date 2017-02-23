import resource from './resource';

export default {
  inventoryItems: resource('/Inventory/Item', 'Item'),
  invoiceItems: resource('/Sale/Invoice/Item', 'Item'),
  contactCustomers: resource('/Contact/Customer', 'Customer'),
  taxCodes: resource('/GeneralLedger/TaxCode', 'Items'),
};
