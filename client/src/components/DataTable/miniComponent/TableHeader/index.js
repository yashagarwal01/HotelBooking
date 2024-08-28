import React from "react";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import "../../dataTable.css";

const TableHeader = (props) => {
  const { columns, handleRequestSort, valueToOrderBy, orderDirection } = props;
  const sortCheck = ["hotelName","createdAt"]

  const handleCreateSort = (property) => (event) => {
    handleRequestSort(event,property);
  };
  return (
    <TableHead>
      <TableRow>
        {columns.map((column, index) => (
          <TableCell align={column.align} className="table-heading" key={index}>
          {sortCheck.includes(column.id)?
            (<TableSortLabel
              className="table-heading"
              active={valueToOrderBy === column.id}
              direction={valueToOrderBy===column.id?orderDirection:"asc"}
              onClick={handleCreateSort(column.id)}
            >
              {column.label}
            </TableSortLabel>)
            :
            (
              <div className="table-heading">
              {column.label}
              </div>
            )
            }
          </TableCell>
        ))}
      
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
