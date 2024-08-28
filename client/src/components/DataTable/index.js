import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { setSnackbar } from "../../store/global/globalReducer";
import { get_hotel } from "../../api/hotel";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../store/auth/authSelector";
import TableHeader from "./miniComponent/TableHeader";
import TableDataContainer from "./miniComponent/TableDataContainer";
import { Button } from "@mui/material";
import "./dataTable.css";
import AddModal from "../../modals/AddModal";
import ViewModal from "../../modals/ViewModal";
import EditModal from "../../modals/EditModal";
import DeleteDialog from "../../modals/DeleteDialog";

import SearchBar from "../SearchBar";
import Loader from "../Loader";

const columns = [
  { id: "hotelName", label: "HOTEL NAME", align: "left" },
  { id: "location", label: "Location", align: "left" },
  {
    id: "createdAt",
    label: "CREATED AT",
    align: "left",
    format: (value) => new Date(value).toLocaleDateString(),
  },
  {
    id: "action",
    label: "ACTION",
    align: "center",
  },
];

export default function DataTable(props) {
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [valueToOrderBy, setvalueToOrderBy] = useState("hotelName");
  const [orderDirection, setOrderDirection] = useState("asc");
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [modalType, setModalType] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const keys = ["hotelName", "location"];
  const search = (q) => {
    if (q === "") {
      return data;
    }
    const query = q.toLowerCase();
    const newData = data?.filter((el) =>
      keys.some((key) => el[key].toLowerCase().includes(query))
    );
    return newData;
  };
  const searchData = useMemo(() => search(query), [query, data]);
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleSorting = (a, b, isAscending) => {
    if (isAscending) {
      return a > b ? -1 : 1;
    } else {
      return a > b ? 1 : -1;
    }
  };

  const handleOpen =
    (modalType, rowData = null) =>
    (event) => {
      setModalType(modalType);
      setOpen(true);
      if (rowData) {
        setRowData(rowData);
      }
    };

  const handleClose = () => {
    setOpen(false);
    if (rowData !== null) {
      setRowData(null);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setvalueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
    const newData = data?.sort((a, b) =>
      handleSorting(a[property], b[property], isAscending)
    );
    setData(newData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getHotels = async () => {
    try {
      setIsLoading(true);
      const response = await get_hotel(token);
      setData(response?.data);
    } catch (err) {
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message:
              err?.response?.status === 404
                ? "Something Went Wrong"
                : err?.response?.data?.message,
            severity: "error",
          },
        })
      );
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getHotels();
  }, []);

  return (
    <div>
      <SearchBar
        placeholder="Search Hotels...."
        handleSearch={handleSearch}
        query={query}
      />
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <Paper className="table-wrapper">
          <TableContainer className="table-container">
            <Table stickyHeader aria-label="sticky table">
              <TableHeader
                columns={columns}
                handleRequestSort={handleRequestSort}
                orderDirection={orderDirection}
                valueToOrderBy={valueToOrderBy}
              />
              <TableDataContainer
                data={searchData}
                page={page}
                rowsPerPage={rowsPerPage}
                columns={columns}
                handleOpen={handleOpen}
                searchData={searchData}
              />
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={searchData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
      <Button
        variant="contained"
        color="success"
        className="table-button"
        onClick={handleOpen("add")}
      >
        add
      </Button>
      {modalType === "add" && (
        <AddModal
          open={open}
          handleClose={handleClose}
          modalType={modalType}
          getHotels={getHotels}
        />
      )}
      {modalType === "edit" && (
        <EditModal
          open={open}
          handleClose={handleClose}
          modalType={modalType}
          rowData={rowData}
          getHotels={getHotels}
        />
      )}
      {modalType === "delete" && (
        <DeleteDialog
          open={open}
          handleClose={handleClose}
          modalType={modalType}
          rowData={rowData}
          getHotels={getHotels}
        />
      )}
      {modalType === "view" && (
        <ViewModal
          open={open}
          handleClose={handleClose}
          modalType={modalType}
          rowData={rowData}
        />
      )}
    </div>
  );
}
