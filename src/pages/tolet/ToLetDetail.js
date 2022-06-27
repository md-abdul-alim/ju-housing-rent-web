import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

function ToLetDetail(props) {

  const [openPopup, setOpenPopup] = useState(false);
  const { record } = props;





  return (
    <div>
      <Paper
        elevation={3}
        square={false}
        style={{ paddingTop: 6, margin: "16px" }}
      >
        <div>
          <Grid container alignItems="flex-start" spacing={0}>
            <Grid item md={12} sm={12} xs={12}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Name:</TableCell>
                    <TableCell align="right">{record.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Type:</TableCell>
                    <TableCell align="right">{record.type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>SF:</TableCell>
                    <TableCell align="right">{record.square_feet}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bedroom:</TableCell>
                    <TableCell align="right">{record.bedrooms}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Rent:</TableCell>
                    <TableCell align="right">{record.rent}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Address:</TableCell>
                    <TableCell align="right">{record.address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Description:</TableCell>
                    <TableCell align="right">{record.description}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
}

export default ToLetDetail;
