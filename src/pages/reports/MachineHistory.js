import React, { useState, useEffect } from "react";
// import AddIcon from "@material-ui/icons/Add";
import MUIDataTable from "mui-datatables";
// import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
// import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
// import Popup from "../../components/Controls/Popup";
import Notification from "../../components/SnackBar/Notification";
import {
  makeStyles,
  // Tooltip 
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import MachineHistoryForm from "./MachineHistoryForm";
// import { orange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
  },
  iconButtonColor: {
    color: "#fff",
    "&:hover": {
      color: "#0000ff",
    },
  },
}));

export default function MachineHistory() {
  const classes = useStyles();
  const [fabricSearchList, setFabricSearchList] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);

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
        MUIDataTableHeadCell:{
          fixedHeader:{
              backgroundColor: "orange",
          }
        },
        MuiTableCell: {
          root: {
              padding: '13px',
          },
          head: {
              color: "Black",
          }
        },
      },
      typography: {
        "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
        "fontSize": 15,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
       }
    });

  async function fetchHistoryList(values, setSubmitting) {

    try {
      await axios
        .get("/api/history/", {
          params: values,
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
          },
        })
        .then((res) => {
          setFabricSearchList(res.data);
          // setSubmitting(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }


  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetchHistoryList();
  }, []);

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
      name: "machine_name",
      label: "Machine",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "unit_name",
      label: "Unit",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "line_name",
      label: "Line Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "created_date",
      label: "Date",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "created_time",
      label: "Time",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const addOrEdit = (fiberPercentage, resetForm, setSubmitting) => {
    if (fiberPercentage.id === 0)
      fetchHistoryList(fiberPercentage, setSubmitting);
    resetForm();
    setRecordForEdit(null);
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };

  const options = {
    selectableRows: "none",
    search: true,
    filter:true,
    responsive: "standard",
    print: true,
    download: false,
  };

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <div>
        <BreadCrumb
          routeSegments={[
            { name: "Reports", path: "/app/report" },
            { name: "Machine History" },
          ]}
        />
        <Paper className={classes.pageContent}>
          <MachineHistoryForm
            addOrEdit={addOrEdit}
          />
        </Paper>
        <MUIDataTable
          title={"Machine History"}
          data={fabricSearchList}
          columns={columns}
          options={options}
          className={classes.pageContent}
        />
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </MuiThemeProvider>
  );
}