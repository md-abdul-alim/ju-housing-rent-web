import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import MUIDataTable from "mui-datatables";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import FormDialog from "../../components/FormDialog/FormDialog";
import Notification from "../../components/SnackBar/Notification";
import { makeStyles, Tooltip } from "@material-ui/core";
import AddMachineToLineForm from "./AddMachineToLineForm";
import Controls from "../../components/Controls/Controls";


const useStyles = makeStyles((theme) => ({
  pageContent: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(3),
  },
}));

export default function ProductionApproveMachineToLine() {
  const classes = useStyles();
  const [addMachineToLineList, setAddMachineToLineList] = useState([]);
  const [updateSignal, setUpdateSignal] = useState(null);

  const AxiosHeader = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
      },
  };

  async function fetchApprovalList() {

    try {
      await axios
        .get("/api/line/production/approval/list/", AxiosHeader )
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



  const approveLine = async (values) => {
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
        .put(`/api/line/production/approval/list/`, values, AxiosHeader)
        .then((resp) => {
          setUpdateSignal(resp.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const rejectLine = async (values) => {

    await axios
      .delete(`/api/line/production/approval/list/`, {
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
    fetchApprovalList();
  }, [updateSignal]);


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
                  approveLine(item);
                }}
              >
                <Controls.Button
                  type="submit"
                  text="Approve"
                />
              </IconButton>
              <IconButton
                color="primary"
                onClick={() => {
                  rejectLine(item);
                }}
              >
                <Controls.Button
                  type="submit"
                  text="Reject"
                  style={{backgroundColor: "red"}}
                />
              </IconButton>
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
    <div>
      <MUIDataTable
        title={"Machine Production Approval"}
        data={addMachineToLineList}
        columns={columns}
        options={options}
        className={classes.pageContent}
      />
    </div>
  );
}
