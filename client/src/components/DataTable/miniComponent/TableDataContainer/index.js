import React from "react";
import { TableBody, TableRow, TableCell, IconButton } from "@mui/material";
import "../../dataTable.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TableDataContainer = (props) => {
  const { data, page, rowsPerPage, columns, handleOpen } = props;
  return (
    <TableBody>
      {data
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        ?.map((row, i) => {
          return (
            <TableRow key={row._id}>
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell align={column.align} key={column.id}>
                    {column.id === "action" ? (
                      <ActionIcons handleOpen={handleOpen} rowData={row} />
                    ) : (
                      <div className="table-data">
                        {column.format ? column.format(value) : value}
                      </div>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
    </TableBody>
  );
};

export default TableDataContainer;

const ActionIcons = (props) => {
  const { handleOpen, rowData } = props;
  return (
    <div>
      <IconButton className="table-icon" color="primary" 
      onClick={handleOpen("view", rowData)}
      
      >
        <VisibilityIcon color="primary" />
      </IconButton>

      <IconButton
        className="table-icon"
        color="warning"
        onClick={handleOpen("edit", rowData)}
      >
        <EditIcon color="warning" />
      </IconButton>
      <IconButton
        className="table-icon"
        color="error"
        onClick={handleOpen("delete", rowData)}
      >
        <DeleteIcon color="error" />
      </IconButton>
    </div>
  );
};
