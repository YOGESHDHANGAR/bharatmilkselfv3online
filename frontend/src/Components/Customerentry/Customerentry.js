import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCustomerAction,
  deleteCustomerAction,
  getAllCustomerAction,
  singleCustomerAction,
  updateCustomerAction,
} from "../../Redux/actions/customerActions";
import {
  getFatRateAction,
  updateFatRateAction,
} from "../../Redux/actions/fatRateActions";
import Loading from "../Loading/Loading";
import Allcustomers from "./Allcustomers";
import "./Customerentry.css";
import { clearErrors } from "../../Redux/actions/purchaseActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const unfiltered = true;

const Customerentry = () => {
  const showErrorToast = (message) => {
    toast.error(message, {
      autoClose: 5000,
    });
  };

  const dispatch = useDispatch();

  const {
    allcustomers,
    loading: allcustomersLoading,
    error: allcustomersError,
  } = useSelector((state) => state.allcustomers);

  const {
    singlecustomer,
    loading: singlecustomerLoading,
    error: singlecustomerError,
  } = useSelector((state) => state.singlecustomer);

  const {
    createcustomer,
    loading: createcustomerLoading,
    error: createcustomerError,
  } = useSelector((state) => state.createcustomer);

  const {
    updatecustomer,
    loading: updatecustomerLoading,
    error: updatecustomerError,
  } = useSelector((state) => state.updatecustomer);

  const {
    deletecustomer,
    loading: deletecustomerLoading,
    error: deletecustomerError,
  } = useSelector((state) => state.deletecustomer);

  const {
    getfatrate,
    loading: getfatrateLoading,
    error: getfatrateError,
  } = useSelector((state) => state.getfatrate);

  const {
    updatefatrate,
    loading: updatefatrateLoading,
    error: updatefatrateError,
  } = useSelector((state) => state.updatefatrate);

  const [customerId, setCustomerId] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [milkFatState, setMilkFatState] = useState(0);

  const handleCustomerId = (e) => {
    dispatch(singleCustomerAction(e.target.value));
    setCustomerId(e.target.value);
  };

  const handleCustomerName = (e) => {
    setCustomerName(e.target.value);
  };

  const resetStates = () => {
    setCustomerId(
      allcustomersLoading === false
        ? Math.max(...allcustomers.map((o) => o.customer_id)) + 1
        : 0
    );
    setCustomerName("");
  };

  const handleRegisterCustomer = (event) => {
    event.preventDefault();
    const myForm = new FormData();

    myForm.set("customer_id", customerId);
    myForm.set("customer_name", customerName);

    dispatch(createCustomerAction(myForm));
    resetStates();
    dispatch(getAllCustomerAction());
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const myForm = new FormData();

    myForm.set("customer_id", customerId);
    myForm.set("customer_name", customerName);

    dispatch(updateCustomerAction(customerId, myForm));
    resetStates();
    dispatch(getAllCustomerAction());
  };

  const handleDelete = () => {
    dispatch(deleteCustomerAction(customerId));
    resetStates();
    dispatch(getAllCustomerAction());
  };

  const handleFatRate = (e) => {
    setMilkFatState(e.target.value);
  };

  const submitFatRate = () => {
    const myForm = new FormData();

    myForm.set("fat_rate", milkFatState);
    dispatch(updateFatRateAction(myForm));
  };

  useEffect(() => {
    dispatch(getAllCustomerAction(unfiltered));
    dispatch(getFatRateAction());
  }, [dispatch]);

  useEffect(() => {
    setCustomerId(
      allcustomersLoading === false
        ? Math.max(...allcustomers.map((o) => o.customer_id)) + 1
        : 0
    );
  }, [allcustomersLoading, allcustomers]);

  useEffect(() => {
    setMilkFatState(
      getfatrateLoading === false &&
        getfatrate.length > 0 &&
        getfatrate[0].fat_rate &&
        getfatrate[0].fat_rate.toFixed(2)
    );
  }, [getfatrate, getfatrateLoading]);

  useEffect(() => {
    if (singlecustomerLoading === false && singlecustomer.length > 0) {
      setCustomerId(singlecustomer[0].customer_id);
      setCustomerName(singlecustomer[0].customer_name);
    }
  }, [singlecustomerLoading, singlecustomer]);

  useEffect(() => {
    if (
      createcustomerLoading === false &&
      createcustomer &&
      createcustomer.affectedRows === 1
    ) {
      alert("Successful");
    }
  }, [createcustomerLoading, createcustomer]);

  useEffect(() => {
    if (
      updatecustomerLoading === false &&
      updatecustomer &&
      updatecustomer.affectedRows === 1
    ) {
      alert("Successful");
    }
  }, [updatecustomerLoading, updatecustomer]);

  useEffect(() => {
    if (
      deletecustomerLoading === false &&
      deletecustomer &&
      deletecustomer.affectedRows === 1
    ) {
      alert("Successful");
    }
  }, [deletecustomerLoading, deletecustomer]);

  useEffect(() => {
    if (
      updatefatrateLoading === false &&
      updatefatrate &&
      updatefatrate.affectedRows === 1
    ) {
      alert("Successful");
    }
  }, [updatefatrateLoading, updatefatrate]);

  useEffect(() => {
    if (allcustomersError) {
      showErrorToast(allcustomersError);
      dispatch(clearErrors());
    }
    if (singlecustomerError) {
      showErrorToast(singlecustomerError);
      dispatch(clearErrors());
    }
    if (createcustomerError) {
      showErrorToast(createcustomerError);
      dispatch(clearErrors());
    }
    if (updatecustomerError) {
      showErrorToast(updatecustomerError);
      dispatch(clearErrors());
    }
    if (deletecustomerError) {
      showErrorToast(deletecustomerError);
      dispatch(clearErrors());
    }
    if (getfatrateError) {
      showErrorToast(getfatrateError);
      dispatch(clearErrors());
    }
    if (updatefatrateError) {
      showErrorToast(updatefatrateError);
      dispatch(clearErrors());
    }
  }, [
    dispatch,
    alert,
    allcustomersError,
    singlecustomerError,
    createcustomerError,
    updatecustomerError,
    deletecustomerError,
    getfatrateError,
    updatefatrateError,
  ]);

  return (
    <>
      <div className="heading_and_form_container">
        <form
          className="customer_entry_container"
          onSubmit={handleRegisterCustomer}
        >
          <label className="customerentry_id_lable">
            Customer Id:
            <input
              autoFocus
              type="number"
              value={customerId}
              onChange={(e) => handleCustomerId(e)}
            />
          </label>

          <label className="createcustomer_name_lable">
            Customer Name:
            <input
              type="text"
              value={customerName}
              onChange={(e) => handleCustomerName(e)}
            />
          </label>
          <div className="buttons_input_container">
            <input className="register_input" type="submit" value="Register" />
            <input
              className="update_input"
              type="button"
              value="Update"
              onClick={handleUpdate}
            />
            <input
              className="refresh_input"
              type="button"
              onClick={resetStates}
              value="Refresh"
            />
            <input
              className="delete_input"
              type="button"
              onClick={handleDelete}
              value="Delete"
            />
          </div>
        </form>
        <form className="fat_rate_entry_container" onSubmit={submitFatRate}>
          <label className="fate_rate_lable">
            Fat Rate
            <input
              className="fat_rate_input"
              type="number"
              step={0.01}
              onChange={(e) => {
                handleFatRate(e);
              }}
              value={milkFatState}
            />
          </label>

          <input
            className="submit_fat_rate_input"
            type="button"
            onClick={submitFatRate}
            value="Update"
          />
        </form>
      </div>
      {allcustomersLoading === true ? (
        <Loading />
      ) : (
        <Allcustomers allcustomers={allcustomers} />
      )}
      <ToastContainer />
    </>
  );
};

export default Customerentry;
