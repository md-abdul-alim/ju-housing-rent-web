import React, { useState, useRef } from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Popup from "../../components/Controls/Popup";
import FabricBarcode from "../../components/Barcode/FabricBarcode";
import ProfileForm from './ProfileForm'
import { useReactToPrint } from "react-to-print";
import {
  Paper,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from "@material-ui/core";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import { CenterFocusStrong } from "@material-ui/icons";

function ProfileDetail(props) {
  // let machine = props.location.state;

  const [openPopup, setOpenPopup] = useState(false);
  const [machine, setMachine] = useState([])
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <Paper
        elevation={3}
        square={false}
        style={{ paddingTop: 6, margin: "16px" }}
      >
        <div>
          <Grid container alignItems="flex-start" spacing={6}>
            <Grid item md={12} sm={12} xs={12}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Name:</TableCell>
                    <TableCell align="right">{machine.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Email:</TableCell>
                    <TableCell align="right">{machine.model_no}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Phone:</TableCell>
                    <TableCell align="right">{machine.parent_unit_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Birthday:</TableCell>
                    <TableCell align="right">{machine.current_unit_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>NID:</TableCell>
                    <TableCell align="right">{machine.line}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Passport:</TableCell>
                    <TableCell align="right">{machine.category_value}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Married Status:</TableCell>
                    <TableCell align="right">{machine.type_value}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Occupation:</TableCell>
                    <TableCell align="right">{machine.brand}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Occupation Institution:</TableCell>
                    <TableCell align="right">{machine.supplier}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Education Qualification:</TableCell>
                    <TableCell align="right">{machine.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Religion:</TableCell>
                    <TableCell align="right">{machine.acquisition_value}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Present Address:</TableCell>
                    <TableCell align="right">{machine.acquisition_value}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Permanent Address:</TableCell>
                    <TableCell align="right">{machine.acquisition_value}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item md={4} sm={4} xs={4}></Grid>
            <Grid item md={4} sm={4} xs={4} style={{'text-align': 'center'}}>
                <Button
                  variant="contained"
                  color="primary"
                  className="mr-4 py-2"
                  style={{marginBottom: "5px"}}
                  onClick={() => {
                    setOpenPopup(true);
                  }}
                >
                  Update
                </Button>
            </Grid>
            <Grid item md={4} sm={4} xs={4}>
              <Popup title="Profile update" openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <ProfileForm />
              </Popup>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
}

export default ProfileDetail;
