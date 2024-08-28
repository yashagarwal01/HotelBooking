import BasicModal from "../../components/BasicModal";


const EditModal = (props) => {
  const { open, handleClose, modalType, rowData,getHotels } = props;
  const initialValues = {
    hotelName: rowData?.hotelName,
    location: rowData?.location,
    price:rowData?.price,
    maxPerson:rowData?.maxPerson,
    maxRoom:rowData?.maxRoom,
    description:rowData?.description,
    
  };
  return (
    <div>
      <BasicModal
        open={open}
        handleClose={handleClose}
        modalType={modalType}
        initialValues={initialValues}
        getHotels={getHotels}
        rowData={rowData}
        
      />
    </div>
  );
};

export default EditModal;
