import resource from './resource';

export default {
  inventoryItems: resource('/Inventory/Item', 'Items'),
  invoiceItems: resource('/Sale/Invoice/Item', 'Items'),
  invoiceServices: resource('/Sale/Invoice/Service', 'Items'),
  orderItems: resource('/Sale/Order/Item', 'Items'),
  orderServices: resource('/Sale/Order/Service', 'Items'),
  contactCustomers: resource('/Contact/Customer', 'Items'),
  employees: resource('/Contact/Employee', 'Items'),
  taxCodes: resource('/GeneralLedger/TaxCode', 'Items'),
  accounts: resource('/GeneralLedger/Account', 'Items'),
  jobs: resource('/GeneralLedger/Job', 'Items'),
  categories: resource('/GeneralLedger/Category', 'Items'),
};
