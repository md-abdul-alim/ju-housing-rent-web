import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import MUIDataTable from "mui-datatables";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import FormDialog from "../../components/FormDialog/FormDialog";
import Popup from "../../components/Controls/Popup";
import Notification from "../../components/SnackBar/Notification";
import { makeStyles, Tooltip } from "@material-ui/core";
import AddMachineToLineForm from "./AddMachineToLineForm";
import AddMachineToLineByBarcodeForm from "./AddMachineToLineByBarcodeForm";
import BarcodeScanner from "../../components/Barcode/BarcodeScanner";
import FullScreenPopup from "../../components/FullScreenPopup/FullScreenPopup";
import CropFreeIcon from '@material-ui/icons/CropFree';
import Controls from "../../components/Controls/Controls";


const useStyles = makeStyles((theme) => ({
  pageContent: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(3),
  },
}));

export default function Line() {
  const classes = useStyles();
  const [addMachineToLineList, setAddMachineToLineList] = useState([]);
  const [compositionRecord, setCompositionRecord] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [updateSignal, setUpdateSignal] = useState(null);



  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  async function fetchCompositions() {
    const requestOptions = {
      headers: {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    };

    try {
      await axios
        .get("/api/line/approval/list/", { requestOptions })
        .then((res) => {
          setAddMachineToLineList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }


  const updateLine = async (values, setSubmitting) => {
    const requestOptions = {
      headers: {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      },
    };

    try {
      await axios
        .put(`/api/unit/update/`, values, {
          requestOptions,
        })
        .then((resp) => {
          setCompositionRecord(resp.data);
          setSubmitting(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const removeMachineFromLine = async (values) => {
    await axios
      .delete(`/api/remove/machine/from/line/`, {
        params: { line: values.id,machine: values.machine_name },
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
      }) 
      .then((resp) => {
        setUpdateSignal(resp.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetchCompositions();
  }, [compositionRecord, updateSignal]);


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
      name: "line_name",
      label: "Lines",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "machine_name",
      label: "Machines",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "parent_unit_name",
      label: "Parent Units",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "current_unit_name",
      label: "Current Units",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "machine_status",
      label: "Machine Status",
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
          tableMeta.tableData.forEach(function (fabric) {
            if (fabric.id == tableMeta.rowData[0]) return (item = fabric);
          });
          return (
            <>
              <IconButton
                color="primary"
                onClick={() => {
                  removeMachineFromLine(item);
                }}
              >
                <Controls.Button
                  type="submit"
                  text="DeActive"
                  style={{backgroundColor: "red"}}
                />
              </IconButton>
            </>
          );
        },
      },
    },
  ];

  const addOrEdit = (composition, resetForm, setSubmitting) => {
    if (composition.id === 0) updateLine(composition, setSubmitting);
    else updateLine(composition, setSubmitting);
    resetForm();
    setOpenPopup(false);
    setOpenPopup2(false);
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
        <Tooltip title={"Add New"}>
          <IconButton className={classes.iconButtonColor}
            onClick={() => {
              setOpenPopup(true);
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
         <Tooltip title={"Scan Barcode"}>
         <IconButton className={classes.iconButtonColor}
           onClick={() => {
             setOpen(true);
           }}
         >
           <CropFreeIcon />
         </IconButton>
       </Tooltip>
        </>
      );
    },
    print: false,
    download: false,
  };

  return (
    <div>
      <MUIDataTable
        title={"Machine List Per Unit"}
        data={addMachineToLineList}
        columns={columns}
        options={options}
        className={classes.pageContent}
      />
      <FormDialog
        title="Add Machine to Line Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        maxWidth="xs"
      >
        <AddMachineToLineForm  addOrEdit={addOrEdit}  />
      </FormDialog>
      <Popup
        title="Add Machine To Line By Barcode Scan"
        openPopup={openPopup2}
        setOpenPopup={setOpenPopup2}
      >
        <AddMachineToLineByBarcodeForm addOrEdit={addOrEdit} searchValue={searchValue}/>
      </Popup>
      <FullScreenPopup
          title="Barcode Scanner"
          open={open}
          setOpen={setOpen}
        >
          <BarcodeScanner setOpenPopup2={setOpenPopup2} setOpen={setOpen} setSearchValue = {setSearchValue} />
        </FullScreenPopup>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
