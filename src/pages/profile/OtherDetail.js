import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Popup from "../../components/Controls/Popup";
import ProfileForm from './ProfileForm'
import axios from "axios";
import {
  Paper,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

function OtherDetail(props) {

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
                    <TableCell>AGe:</TableCell>
                    <TableCell align="right">{record.age}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Phone:</TableCell>
                    <TableCell align="right">{record.phone}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Nid:</TableCell>
                    <TableCell align="right">{record.nid}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Present Address:</TableCell>
                    <TableCell align="right">{record.present_address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Permanent Address:</TableCell>
                    <TableCell align="right">{record.permanent_address}</TableCell>
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

export default OtherDetail;
