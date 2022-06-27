import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import MUIDataTable from "mui-datatables";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import Popup from "../../components/Controls/Popup";
import Notification from "../../components/SnackBar/Notification";
import { makeStyles, Tooltip } from "@material-ui/core";
import {FamilyMemberForm} from "./FamilyMemberForm";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";


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

export default function FamilyMember() {
  const classes = useStyles();
  const [lineNameList, setLineNameList] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [familyMembersRecord, setFamilyMembersRecord] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);




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

  async function fetchFamilyMembers() {

    try {
      await axios
        .get("/api/profile/family/member/list/", AxiosHeader)
        .then((res) => {
          setLineNameList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const postFamilyMember = async (values, setSubmitting) => {

    try {
      await axios
        .post("/api/profile/family/member/create/", values, AxiosHeader)
        .then((resp) => {
          setFamilyMembersRecord(resp.data);
          setSubmitting(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateFamilyMember = async (values, setSubmitting) => {

    try {
      await axios
        .put(`/api/profile/family/member/update/`, values, AxiosHeader)
        .then((resp) => {
          setFamilyMembersRecord(resp.data);
          setSubmitting(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFamilyMember = async (values) => {
    await axios
      .delete(`/api/profile/family/member/delete/`, {
        params: { member: values.id },
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
      }) 
      .then((resp) => {
        setFamilyMembersRecord(resp.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetchFamilyMembers();
  }, [familyMembersRecord]);

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
      name: "age",
      label: "Age",
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
      name: "relation",
      label: "Relation",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "occupation",
      label: "Occupation",
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
          tableMeta.tableData.forEach(function (fabricType) {
            if (fabricType.id === tableMeta.rowData[0])
              return (item = fabricType);
          });
          return (
            <>
              <Grid container>
                <Grid item md={6} sm={6} xs={6}>
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
                </Grid>
                <Grid item md={6} sm={6} xs={6}>
                  <Tooltip title={"Delete"}>
                    <IconButton
                      onClick={() => {
                          deleteFamilyMember(item);
                      }}
                    >
                      <DeleteIcon fontSize="default" style={{color: "red"}} />
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

  const addOrEdit = (familyMember, resetForm, setSubmitting) => {
    if (familyMember.id === 0) postFamilyMember(familyMember, setSubmitting);
    else updateFamilyMember(familyMember, setSubmitting);
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
        title={"Family Members"}
        data={lineNameList}
        columns={columns}
        options={options}
        className={classes.pageContent}
      />
      <Popup
        title="Family Member Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <FamilyMemberForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
    </MuiThemeProvider>
  );
}
