const con = require("../databases/database");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhander");

const util = require("util");

const queryAsync = util.promisify(con.query).bind(con);

exports.createCustomer = catchAsyncErrors(async (req, res, next) => {
  const customer_name = req.body.customer_name;
  const trimmedName = customer_name.trim();
  const formattedName = trimmedName.replace(/\s+/g, " ");

  // Capitalize the first letter of each word and convert the rest to lowercase
  const capitalizedWords = formattedName
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

  const finalName = capitalizedWords.join(" ");

  if (finalName.length < 1) {
    return next(new ErrorHandler("Please Select Valid Customer Name", 500));
  }

  let defaultQuerry = `insert into customer(customer_name) values("${finalName}")`;

  const createcustomer = await queryAsync(defaultQuerry);

  res.send(createcustomer);
});

exports.getAllCustomers = catchAsyncErrors(async (req, res, next) => {
  const unfiltered = req.query.unfiltered;
  let defaultQuerry = unfiltered
    ? `select * from customer order by customer_name`
    : `select * from customer where customer_active_or_not=${1} order by customer_name`;

  const allcustomers = await queryAsync(defaultQuerry);

  res.send(allcustomers);
});

exports.singleCustomer = catchAsyncErrors(async (req, res, next) => {
  const customer_id = req.query.customer_id;

  let defaultQuerry = `select * from customer where customer_id=${customer_id} `;

  const singlecustomer = await queryAsync(defaultQuerry);

  res.send(singlecustomer);
});

exports.updateCustomer = catchAsyncErrors(async (req, res, next) => {
  const customer_id = req.body.customer_id;
  const customer_name = req.body.customer_name;
  const trimmedName = customer_name.trim();
  const formattedName = trimmedName.replace(/\s+/g, " ");

  // Capitalize the first letter of each word and convert the rest to lowercase
  const capitalizedWords = formattedName
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

  const finalName = capitalizedWords.join(" ");

  if (finalName.length < 1) {
    return next(new ErrorHandler("Please Select Valid Customer Name", 500));
  }

  let defaultQuerry = `update customer SET  customer_name= "${finalName}" where customer_id = ${customer_id} `;

  let updateCustomerNameInPurchase = `update purchase SET customer_name = "${finalName}" where customer_id = ${customer_id}`;

  let updateCustomerNameInPurchase_hub = `update purchase_hub SET customer_name = "${finalName}" where customer_id = ${customer_id}`;

  const updatecustomer = await queryAsync(defaultQuerry);

  const updateCustomerNameInPurchaseResult = await queryAsync(
    updateCustomerNameInPurchase
  );

  const updateCustomerNameInPurchase_hubResult = await queryAsync(
    updateCustomerNameInPurchase_hub
  );

  res.send(updatecustomer);
});

exports.deleteCustomer = catchAsyncErrors(async (req, res, next) => {
  const customer_id = req.query.customer_id;

  let defaultQuerry = `Delete from customer where customer_id=${customer_id}`;

  const deletecustomer = await queryAsync(defaultQuerry);

  res.send(deletecustomer);
});

exports.customerActiceOrInactive = catchAsyncErrors(async (req, res, next) => {
  const customer_id = req.query.customer_id;
  const new_customer_active_or_not = req.query.new_customer_active_or_not;
  let defaultQuerry = `update customer set customer_active_or_not= "${new_customer_active_or_not}" where customer_id = ${customer_id} `;

  let updatePurchaseActiveOrInactiveInPurchaseQuery = `update purchase set purchase_active_or_not= "${new_customer_active_or_not}" where customer_id = ${customer_id}`;

  let updatePurchaseActiveOrInactiveInPurhase_hubQuery = `update purchase_hub set purchase_active_or_not= "${new_customer_active_or_not}" where customer_id = ${customer_id}`;

  const customerActiceOrInactiveResult = await queryAsync(defaultQuerry);

  const updatePurchaseActiveOrInactiveResut = await queryAsync(
    updatePurchaseActiveOrInactiveInPurchaseQuery
  );

  const updatePurchaseActiveOrInactiveInPurhase_hubQueryResut =
    await queryAsync(updatePurchaseActiveOrInactiveInPurhase_hubQuery);

  res.send(customerActiceOrInactiveResult);
});
