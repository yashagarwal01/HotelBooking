import { Typography, Box, Modal } from "@mui/material";
import "./basicModal.css";
import HotelForm from "../../modals/miniComponent/HotelForm";

const BasicModal = (props) => {
  const { open, handleClose, getHotels, modalType, initialValues, rowData } =
    props;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="basic-modal-container">
        {modalType !== "view" ?
         ( <>
            <Typography
              color="primary"
              id="modal-modal-title"
              variant="h5"
              component="h2"
            >
              {modalType === "add" ? "ADD HOTEL" : "EDIT HOTEL"}
            </Typography>
            <HotelForm
              handleClose={handleClose}
              modalType={modalType}
              getHotels={getHotels}
              initialValues={initialValues}
              rowData={rowData}
            />
          </>)
        :(<Box>
          
          <img src={rowData?.image} alt="" className="basic-modal-image" />
          <Typography variant="subtitle1" fontWeight="500" >{rowData?.hotelName}</Typography>
          <Typography variant="subtitle1" >{rowData?.location}</Typography>
          <Typography variant="subtitle1" fontWeight="500" >RS {rowData?.price}</Typography>
          <Typography variant="subtitle2"  >Maximum Person Allowed in a room {rowData?.maxPerson}</Typography>
          <Typography variant="body2" color="text.secondary" >{rowData?.description}</Typography>
          </Box>)
      }
      </Box>
    </Modal>
  );
};

export default BasicModal;
