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

export default function TransferMachineFromLine() {
  const classes = useStyles();
  const [addMachineToLineList, setAddMachineToLineList] = useState([]);
  const [compositionRecord, setCompositionRecord] = useState(null);

  console.log(localStorage.getItem('user_type'))


  async function fetchApprovalList() {
    const requestOptions = {
      headers: {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    };

    try {
      await axios
        .get("/api/line/list/", { requestOptions })
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
    console.log(values)
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
        .put(`/api/line/transfer/${values.id}/`, {
          requestOptions,
        })
        .then((resp) => {
          setCompositionRecord(resp.data);
        });
    } catch (error) {
      console.log(error);
    }
  };


  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetchApprovalList();
  }, [compositionRecord]);


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
      name: "unit_name",
      label: "Units",
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
                  text="Transfer"
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
        title={"Machine Transfer"}
        data={addMachineToLineList}
        columns={columns}
        options={options}
        className={classes.pageContent}
      />
    </div>
  );
}
