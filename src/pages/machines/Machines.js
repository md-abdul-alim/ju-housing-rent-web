import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import MachineForm from "./MachineForm";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import UploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import MUIDataTable from "mui-datatables";
import EditIcon from "@material-ui/icons/Edit";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import CropFreeIcon from '@material-ui/icons/CropFree';
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import {
  useMachineState,
  useMachineDispatch,
  MachineProvider,
  initialState,
  MachineList,
} from "../../context/index";
import useTable from "../../components/Table/useTable";
import Controls from "../../components/Controls/Controls";
import Popup from "../../components/Controls/Popup";
import Upload from "../../components/Controls/Upload";
import FullScreenPopup from "../../components/FullScreenPopup/FullScreenPopup";
import Notification from "../../components/SnackBar/Notification";
import BarcodeScanner from "../../components/Barcode/BarcodeScanner";
import {
  makeStyles,
  TableCell,
  Tooltip
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
  iconButtonColor: {
    color: "#fff",
    '&:hover': {
      color: "#0000ff"
  }
  }
}));


function Machines() {
  const classes = useStyles();
  const getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableToolbar: {
        root: {
          backgroundColor: "#50d07d",
          color: "#fff"
        },
        icon: {
          color: "#fff",
          '&:hover': {
               color: "#0000ff"
           }
       },
      },
      MuiTableCell: {
        root: {
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
  })
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [records, setRecords] = useState(null);
  const [fabricRecord, setFabricRecord] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const [upload, setUpload] = useState(false);
  const [MachineList, setMachineList] = useState([]);
  const [fiber, setFiber] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const dispatch = useMachineDispatch();
  const { fabricList, loading, errorMessage } = useMachineState(); //read the values of loading and errorMessage from context

  const fetchFabricList = async () => {
    try {
      await MachineList(dispatch);
    } catch (error) {
      console.log(error);
    }
  };

  const AxiosHeader = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    },
  }

  async function fetchMachines() {

    try {
      await axios
        .get("/api/machine/list/", AxiosHeader)
        .then((res) => {
          setMachineList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const postFabric = async (values, setSubmitting) => {

    try {
      await axios
        .post("/api/machine/create/", values, AxiosHeader)
        .then((resp) => {
          setFabricRecord(resp.data);
          // alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateFabric = async (values, setSubmitting) => {

    try {
      await axios
        .put(`/api/machine/update/${values.id}/`, values, AxiosHeader)
        .then((resp) => {
          setFabricRecord(resp.data);
          // alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetchFabricList();
    fetchMachines();
    async function getFiber() {
      const response = await fetch("/api/machine/list");
      const body = await response.json();
      setFiber(body);
    }
    getFiber();
  }, [fabricRecord, searchOpen]);


  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
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
      name: "model_no",
      label: "Model No",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "parent_unit_name",
      label: "Parent Unit",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "current_unit_name",
      label: "Current Unit",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "line",
      label: "Line",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "category_value",
      label: "Category",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "type_value",
      label: "Type",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "brand",
      label: "Brand",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "acquisition_value",
      label: "Acquisition Value",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "status_value",
      label: "Status",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Actions",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          let item;
          tableMeta.tableData.forEach(function (fabric) {
            if (fabric.id == tableMeta.rowData[0]) return (item = fabric);
          });
          return (
            <>
              <IconButton
                color="primary"
                onClick={() => {
                  if (item.parent_unit_name === localStorage.getItem("unit")){
                    openInPopup(item);
                  }else{
                    alert("You have no update permission")
                  }
                  
                }}
              >
                <EditIcon fontSize="medium" />
              </IconButton>
              <Link
                to={{
                  pathname: "/app/machine/details",
                  state: item,
                }}
              >
                <IconButton color="primary">
                  <ArrowRightAltIcon fontSize="medium" />
                </IconButton>
              </Link>
            </>
          );
        },
      },
    },
  ];


  const addOrEdit = (fabric, resetForm, setSubmitting) => {
    if (fabric.id == 0) postFabric(fabric, setSubmitting);
    else updateFabric(fabric, setSubmitting);
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
    filterType: "select",
    selectableRows: "none",
    responsive: "standard",
    customToolbar: () => {
      return (
        <>
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
        </>
      );
    },
    print: false,
    download: false,
    searchText: searchValue,
    searchOpen: searchOpen,
  };

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
    <div>
      <BreadCrumb routeSegments={[{ name: "Machines" }]} />
      <MUIDataTable
        title={"Machine List"}
        data={MachineList}
        columns={columns}
        options={options}
        className = {classes.pageContent}
      />
      <TableCell
       className= {classes.MuiTableCell}
      />
      <Popup
        title="Machine Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <MachineForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} fabricList={fabricList}/>
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
    </MuiThemeProvider>
  );
}

export default Machines;
