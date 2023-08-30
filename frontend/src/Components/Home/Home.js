import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Filter from "./Filter";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllPurchaseAction,
} from "../../Redux/actions/purchaseActions";
import "./Home.css";
import Column from "./Column";
import Loading from "../Loading/Loading";
import { getAllCustomerAction } from "../../Redux/actions/customerActions";
import Header from "./Header";
import MetaData from "../MetaData/MetaData";
import Hometotalfieldbottom from "./Hometotalfieldbottom";

const Home = () => {
  const showErrorToast = (message) => {
    toast.error(message, {
      autoClose: 5000,
    });
  };
  const dispatch = useDispatch();
  const {
    allpurchases,
    error: allpurchasesError,
    loading: allpurchasesLoadig,
    totalQuantityAmountQueryResultofallpurchases,
  } = useSelector((state) => state.allpurchases);

  const { allcustomers, error: allcustomersError } = useSelector(
    (state) => state.allcustomers
  );

  const {
    deletepurchase,
    error: deletepurchaseError,
    loading: deletepurchaseLoading,
  } = useSelector((state) => state.deletepurchase);

  const [storedArrayInParent, setStoredArrayInParent] = useState([]);
  const [allpurchasesState, setallpurchasesState] = useState(allpurchases);

  const handleDeleteEntryParent = (purchase_serial) => {
    setallpurchasesState((prevComponents) =>
      prevComponents.filter(
        (component) => component.purchase_serial !== purchase_serial
      )
    );
  };

  const handleToggleFromParent = (purchase_serial) => {
    const containsOrNot = storedArrayInParent.includes(purchase_serial);
    const updatedArray = containsOrNot
      ? storedArrayInParent.filter((item) => item !== purchase_serial)
      : [...storedArrayInParent, purchase_serial];

    setStoredArrayInParent(updatedArray);
  };

  useEffect(() => {
    setallpurchasesState(allpurchases);
  }, [allpurchases]);

  useEffect(() => {
    const storedArray = localStorage.getItem("home_markedEntriesArray");
    if (storedArray) {
      setStoredArrayInParent(JSON.parse(storedArray));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "home_markedEntriesArray",
      JSON.stringify(storedArrayInParent)
    );
  }, [storedArrayInParent]);

  useEffect(() => {
    dispatch(getAllPurchaseAction());
    dispatch(getAllCustomerAction());
  }, [dispatch]);

  useEffect(() => {
    if (allpurchasesError) {
      showErrorToast(allpurchasesError);
      dispatch(clearErrors());
    }
    if (allcustomersError) {
      showErrorToast(allcustomersError);
      dispatch(clearErrors());
    }
    if (deletepurchaseError) {
      showErrorToast(deletepurchaseError);
      dispatch(clearErrors());
    }
  }, [allcustomersError, deletepurchaseError, allpurchasesError]);

  return (
    <div>
      <MetaData title="Home" />
      <Filter allcustomers={allcustomers} loading={allpurchasesLoadig} />
      <Header />
      {allpurchasesLoadig === true ? (
        <Loading />
      ) : allpurchasesState === undefined || allpurchasesState.length === 0 ? (
        <div className="no_result_found">
          <h1>No Result Found!</h1>
        </div>
      ) : (
        allpurchasesState.map((elem, index) => {
          return (
            <Column
              key={index}
              count={index}
              purchase_serial={elem.purchase_serial}
              purchase_date={elem.purchase_date}
              customer_id={elem.customer_id}
              customer_name={elem.customer_name}
              purchase_shift={elem.purchase_shift}
              milk_type={elem.milk_type}
              milk_quantity={elem.milk_quantity}
              milk_fat={elem.milk_fat}
              milk_rate={elem.milk_rate}
              milk_clr={elem.milk_clr}
              milk_amount={elem.milk_amount}
              handleDeleteEntryParent={handleDeleteEntryParent}
              handleToggleFromParent={() => {
                handleToggleFromParent(elem.purchase_serial);
              }}
              markedEntryOrNot={storedArrayInParent.includes(
                elem.purchase_serial
              )}
            />
          );
        })
      )}
      {allpurchasesLoadig === false &&
        allpurchasesState !== undefined &&
        allpurchasesState.length !== 0 && (
          <Hometotalfieldbottom
            totalQuantityAmountQueryResultofallpurchases={
              totalQuantityAmountQueryResultofallpurchases
            }
          />
        )}

      <ToastContainer />
    </div>
  );
};

export default Home;
