import React from "react";
import BasicModal from "../../components/BasicModal";

const AddModal = (props) => {
  const { open, handleClose,  modalType, getHotels } = props;
  const initialValues = {
    hotelName: "",
    location: "",
    price:"",
    maxPerson:"",
    maxRoom:"",
    description:"",
   
  };
  return (
    <div>
      <BasicModal open={open} handleClose={handleClose} getHotels={getHotels} modalType={modalType} initialValues={initialValues} />
    </div>
  );
};

export default AddModal;
