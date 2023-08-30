import React from "react";
import "./Hometotalfieldbottom.css";
import Box from "@mui/material/Box";

const commonStyles = {
  bgcolor: "black",
  borderColor: "black",
  width: "100vw",
};

const Hometotalfieldbottom = (props) => {
  return (
    <div>
      <Box sx={{ ...commonStyles, border: 0.3 }} />
      <div className="home_totalling_Field">
        <h3 className="home_totalMilk_Field">
          {
            props.totalQuantityAmountQueryResultofallpurchases[0]
              .requiredTotalMilkQuantity
          }
          L
        </h3>
        <h3 className="home_total_Amount_Field">
          ₹
          {
            props.totalQuantityAmountQueryResultofallpurchases[0]
              .requiredTotalMilkAmount
          }
        </h3>
      </div>
      <Box sx={{ ...commonStyles, border: 1.6 }} />
    </div>
  );
};

export default Hometotalfieldbottom;
