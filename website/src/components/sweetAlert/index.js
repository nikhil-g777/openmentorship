import React, { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
export default function Sweet({setPageState,pageState,handleConfirm}) {

  return (
    <SweetAlert
    danger={true}
    show={pageState}
    showCancel={true}
    confirmBtnText={'Confirm'}
    cancelBtnBsStyle="success"
    title={"Warning"}
    btnSize="sm"
    onConfirm={handleConfirm}
    onCancel={() => setPageState(false)}
    confirmBtnCssClass="text-white "
    style={{ padding: "1.5rem 1.5rem 2.5rem", borderRadius: "0.5rem" }}
  >
    Are you sure you want to exit the registration?
  </SweetAlert>
  );
};

