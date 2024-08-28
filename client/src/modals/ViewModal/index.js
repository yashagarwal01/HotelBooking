import BasicModal from "../../components/BasicModal";


const ViewModal = (props) => {
  const { open, handleClose, modalType, rowData } = props;

  return (
    <div>
      <BasicModal
        open={open}
        handleClose={handleClose}
        modalType={modalType}
        rowData={rowData}
        
      />
    </div>
  );
};

export default ViewModal;
