import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import MUIDataTable from "mui-datatables";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DetailsIcon from "@material-ui/icons/Details";
import CheckIcon from "@material-ui/icons/Check"
import CloseIcon from "@material-ui/icons/Close"
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import Popup from "../../components/Controls/Popup";
import Notification from "../../components/SnackBar/Notification";
import { makeStyles } from "@material-ui/core";
import ToLetDetail from "./ToLetDetail";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { ToLetForm } from "./ToLetForm";
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

export default function ToLet() {
  const classes = useStyles();

  const user_type = localStorage.getItem("user_type")

  const [toLetList, setToLetList] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [toLetRecord, setToLetRecord] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup1, setOpenPopup2] = useState(false);


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

  async function fetchToLet() {

    try {
      await axios
        .get("/api/to/let/list/", AxiosHeader)
        .then((res) => {
          setToLetList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const postToLet = async (values, setSubmitting) => {

    try {
      await axios
        .post("/api/to/let/create/", values, AxiosHeader)
        .then((resp) => {
          setToLetRecord(resp.data);
          setSubmitting(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateToLet = async (values, setSubmitting) => {

    try {
      await axios
        .put(`/api/to/let/update/`, values, AxiosHeader)
        .then((resp) => {
          setToLetRecord(resp.data);
          setSubmitting(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateToLetStatus = async (values, setSubmitting) => {

    try {
      await axios
        .put(`/api/to/let/status/update/${values.id}/`, values, AxiosHeader)
        .then((resp) => {
          setToLetRecord(resp.data);
          setSubmitting(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteToLet = async (values) => {
    await axios
      .delete(`/api/to/let/delete/`, {
        params: { id: values.id},
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
      }) 
      .then((resp) => {
        setToLetRecord(resp.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetchToLet();
  }, [toLetRecord]);

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const openInPopup2 = (item) => {
    setRecordForEdit(item);
    setOpenPopup2(true);
  };

  let columns = ''

  const owner_columns = [
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
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "code",
      label: "Code",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "type",
      label: "Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "square_feet",
      label: "Square Feet",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "bedrooms",
      label: "Bedrooms",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "rent",
      label: "Rent",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "address",
      label: "Address",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "description",
      label: "Description",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "check_in_renter_name",
      label: "Check in Renter",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "check_in",
      label: "Check in Date",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "check_out_renter_name",
      label: "Check out Renter",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "check_out",
      label: "Check out Date",
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
          let to_let = JSON.parse(JSON.stringify(item))
          return (
            <>
              <Grid container spacing={1}>
                <Grid item md={3} sm={6} xs={6}>
                  <Tooltip title={"Update"} placement="bottom" arrow>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        openInPopup(item);
                      }}
                    >
                      <EditIcon fontSize="default" />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item md={3} sm={6} xs={6}>
                  <Tooltip title={"Status"} placement="bottom" arrow>
                    <IconButton
                      onClick={() => {
                        updateToLetStatus(item);
                      }}
                    >
                      {
                        to_let['status'] === 'True' ? <CheckIcon fontSize="default" style={{color: "green"}} /> : <CloseIcon fontSize="default" style={{color: "red"}} />
                      }
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item md={3} sm={6} xs={6}>
                  <Tooltip title={"Detail"} placement="bottom" arrow>
                    <IconButton
                      onClick={() => {
                        openInPopup2(item);
                      }}
                    >
                      <DetailsIcon fontSize="default" style={{color: "violet"}}/>
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item md={3} sm={6} xs={6}>
                  <BootstrapTooltip title={"Delete"} placement="bottom" disableFocusListener disableTouchListener arrow>
                    <IconButton
                      onClick={() => {
                        deleteToLet(item);
                      }}
                    >
                      <DeleteIcon fontSize="default" style={{color: "red"}} />
                    </IconButton>
                  </BootstrapTooltip>
                </Grid>
              </Grid>
            </>
          );
        },
      },
    },
  ];
  const renter_columns = [
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
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "type",
      label: "Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "square_feet",
      label: "Square Feet",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "bedrooms",
      label: "Bedrooms",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "rent",
      label: "Rent",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "address",
      label: "Address",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "description",
      label: "Description",
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
              <Grid container>
                <Grid item md={12} sm={12} xs={12}>
                  <Tooltip title={"Detail"}>
                    <IconButton
                      onClick={() => {
                        openInPopup2(item);
                      }}
                    >
                      <DetailsIcon fontSize="default"  style={{color: "violet"}}/>
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

  if(user_type === 'Owner'){
    columns = owner_columns
  }else{
    columns = renter_columns
  }

  const addOrEdit = (toLet, resetForm, setSubmitting) => {
    if (toLet.id === 0) postToLet(toLet, setSubmitting);
    else updateToLet(toLet, setSubmitting);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };

  const options = {
    filterType: "dropdown",
    selectableRows: "none",
    responsive: "standard",
    customToolbar: () => {
      return (
        <>
        {
          user_type === 'Owner' ? <Tooltip title={"Add New"}>
          <IconButton className={classes.iconButtonColor}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip> : ''
        }
        </>
      );
    },
    print: false,
    download: false,
  };

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <BreadCrumb routeSegments={[{ name: "To Let" }]} />
    <div>
      <MUIDataTable
        title={"To Lets"}
        data={toLetList}
        columns={columns}
        options={options}
        className={classes.pageContent}
      />
      <Popup
        title="To Let Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ToLetForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Popup
        title="To Let Detail"
        openPopup={openPopup1}
        setOpenPopup={setOpenPopup2}
      >
        <ToLetDetail record={recordForEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
    </MuiThemeProvider>
  );
}
