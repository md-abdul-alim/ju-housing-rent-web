import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import Popup from "../../components/Controls/Popup";
import Notification from "../../components/SnackBar/Notification";
import { makeStyles } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import Grid from "@material-ui/core/Grid";

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(3),
  },
  iconButtonColor: {
    color: "#fff",
    "&:hover": {
      color: "#0000ff",
    },
  },
}));

export default function CheckOut() {
  const classes = useStyles();

  const [checkoutList, setCheckoutList] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [toLetRecord, setToLetRecord] = useState(null);


  const AxiosHeader = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    },
  }

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MUIDataTableToolbar: {
        root: {
          backgroundColor: "#50d07d",
          color: "#fff",
        },
        icon: {
          color: "#fff",
          "&:hover": {
            color: "#0000ff",
          },
        },
      },
      MuiTableCell: {
        root: {  //This can be referred from Material UI API documentation. 
            padding: '6px',
        },
      },
    },
    typography: {
      "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
      "fontSize": 14,
      "fontWeightLight": 300,
      "fontWeightRegular": 400,
      "fontWeightMedium": 500
     }
  });

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      // color: theme.palette.common.black,
      color: 'red',
    },
    [`& .${tooltipClasses.tooltip}`]: {
      // backgroundColor: theme.palette.common.black,
      color: 'white',
      backgroundColor: 'rgba(139,0,0, 0.87)',
    },
  }));

  async function fetchCheckoutList() {

    try {
      await axios
        .get("/api/check/out/list/", AxiosHeader)
        .then((res) => {
          setCheckoutList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }


  const updateRenterStatus = async (values, setSubmitting) => {
    try {
      await axios
        .put(`/api/check/out/update/${values.id}/`, values, AxiosHeader)
        .then((resp) => {
          setToLetRecord(resp.data);
          setSubmitting(false);
        });
    } catch (error) {
      console.log(error);
    }
  };


  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetchCheckoutList();
  }, [toLetRecord]);


  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    {
      name: "renter_name",
      label: "Renter Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "renter_email",
      label: "Renter Email",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "renter_phone",
      label: "Renter Phone",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "previous_house_owner_name",
      label: "Owner Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "previous_house_owner_email",
      label: "Owner Email",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "previous_house_owner_phone",
      label: "Owner Phone",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "check_out_date",
      label: "Check Out Date",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "rent_of_date",
      label: "Rent of Date",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Actions",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          let item;
          tableMeta.tableData.forEach(function (toLet) {
            if (toLet.id === tableMeta.rowData[0])
              return (item = toLet);
          });
          return (
            <>
              <Grid container spacing={1}>
                <Grid item md={3} sm={6} xs={6}>
                  <Tooltip title={"Mark Done"} placement="bottom" arrow>
                    <IconButton
                      onClick={() => {
                        updateRenterStatus(item);
                      }}
                    >
                      <CheckCircleOutlineIcon fontSize="default" style={{color: "red"}} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </>
          );
        },
      },
    },
  ];


  const options = {
    filterType: "dropdown",
    selectableRows: "none",
    responsive: "standard",
    print: false,
    download: false,
  };

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <BreadCrumb routeSegments={[{ name: "Check Out" }]} />
    <div>
      <MUIDataTable
        title={"Check Out"}
        data={checkoutList}
        columns={columns}
        options={options}
        className={classes.pageContent}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </div>
    </MuiThemeProvider>
  );
}
