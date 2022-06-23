import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import MUIDataTable from "mui-datatables";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DetailsIcon from "@material-ui/icons/Details";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import Popup from "../../components/Controls/Popup";
import Notification from "../../components/SnackBar/Notification";
import { makeStyles, Tooltip } from "@material-ui/core";
import {OtherForm} from "./OtherForm";
import OtherDetail from "./OtherDetail";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

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

export default function Driver() {
  const classes = useStyles();
  const [driverList, setDriverList] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [driversRecord, setDriversRecordsRecord] = useState(null);
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

  async function fetchDriver() {

    try {
      await axios
        .get("/api/profile/other/member/list/", {
          params: { type: "driver" },
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
          },
        })
        .then((res) => {
          setDriverList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const postDriver = async (values, setSubmitting) => {
    values['type'] = 'driver'

    try {
      await axios
        .post("/api/profile/other/member/create/", values, AxiosHeader)
        .then((resp) => {
          setDriversRecordsRecord(resp.data);
          setSubmitting(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateDriver = async (values, setSubmitting) => {

    try {
      await axios
        .put(`/api/profile/other/member/update/`, values, AxiosHeader)
        .then((resp) => {
          setDriversRecordsRecord(resp.data);
          setSubmitting(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDriver = async (values) => {
    await axios
      .delete(`/api/profile/other/member/delete/`, {
        params: { member: values.id, type: 'driver' },
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
      }) 
      .then((resp) => {
        setDriversRecordsRecord(resp.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetchDriver();
  }, [driversRecord]);

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const openInPopup2 = (item) => {
    setRecordForEdit(item);
    setOpenPopup2(true);
  };

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
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "phone",
      label: "Phone",
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
          tableMeta.tableData.forEach(function (driver) {
            if (driver.id === tableMeta.rowData[0])
              return (item = driver);
          });
          return (
            <>
              <Tooltip title={"Update"}>
                <IconButton
                  color="primary"
                  onClick={() => {
                    openInPopup(item);
                  }}
                >
                  <EditIcon fontSize="default" />
                </IconButton>
              </Tooltip>
              <Tooltip title={"Detail"}>
                <IconButton
                  onClick={() => {
                    openInPopup2(item);
                  }}
                >
                  <DetailsIcon fontSize="default"/>
                </IconButton>
              </Tooltip>
              <Tooltip title={"Delete"}>
                <IconButton
                  onClick={() => {
                    deleteDriver(item);
                  }}
                >
                  <DeleteIcon fontSize="default" style={{color: "red"}} />
                </IconButton>
              </Tooltip>
            </>
          );
        },
      },
    },
  ];

  const addOrEdit = (driver, resetForm, setSubmitting) => {
    if (driver.id === 0) postDriver(driver, setSubmitting);
    else updateDriver(driver, setSubmitting);
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
        <Tooltip title={"Add New"}>
          <IconButton className={classes.iconButtonColor}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      );
    },
    print: false,
    download: false,
  };

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
    <div>
      <MUIDataTable
        title={"Drivers"}
        data={driverList}
        columns={columns}
        options={options}
        className={classes.pageContent}
      />
      <Popup
        title="Driver Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <OtherForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Popup
        title="Driver Detail"
        openPopup={openPopup1}
        setOpenPopup={setOpenPopup2}
      >
        <OtherDetail record={recordForEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
    </MuiThemeProvider>
  );
}
