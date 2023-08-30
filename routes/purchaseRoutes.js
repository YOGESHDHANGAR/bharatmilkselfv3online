const express = require("express");
const {
  getAllPurchases,
  createPurchase,
  weekWisePurchase,
  singlePurchase,
  updatePurchase,
  deletePurchase,
  customerWisePurchase,
  getLatestPurchaseSerial,
  customerWisePurchaseOutliers,
} = require("../controllers/purchaseController");

const router = express.Router();

router.route("/getlatestpurchaseserial").get(getLatestPurchaseSerial);

router.route("/createpurchase").post(createPurchase);

router.route("/allpurchases").get(getAllPurchases);

router.route("/weekwisepurchase").get(weekWisePurchase);

router.route("/singlepurchase").get(singlePurchase);

router.route("/customerwisepurchase").get(customerWisePurchase);

router.route("/customerwisepurchaseoutliers").get(customerWisePurchaseOutliers);

router.route("/updatepurchase").put(updatePurchase);

router.route("/deletepurchase").delete(deletePurchase);

module.exports = router;
