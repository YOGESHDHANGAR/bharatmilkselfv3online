import React from "react";
import "./Weekpaymenttotalfieldbottom.css";
import Box from "@mui/material/Box";

const Weekpaymenttotalfieldbottom = (props) => {
  return (
    <div>
      <Box className="box_component" sx={{ border: 0.3 }} />
      <div className="weekpayment_totalling_Field">
        <h3 className="weekpayment_totalMilk_Field">
          {props.lastWeek1.calculaeWeekWisePurchaseTotalAmountQueryResult[0].weekTotalQuantity.toFixed(
            1
          )}
          L
        </h3>
        <h3 className="weekpayment_total_Amount_Field">
          ₹
          {props.lastWeek1.calculaeWeekWisePurchaseTotalAmountQueryResult[0].weekTotalAmount.toFixed(
            2
          )}
        </h3>
      </div>
      <Box className="box_component" sx={{ border: 1.6 }} />
    </div>
  );
};

export default Weekpaymenttotalfieldbottom;
