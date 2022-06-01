import React, { useEffect, useState } from "react";
import { Form } from "../../components/Form/useForm";
import Controls from "../../components/Controls/Controls";
import { useFormik } from "formik";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import MuiDialogActions from "@material-ui/core/DialogActions";
import {
  CircularProgress,
  Grid,
  withStyles,
  Tooltip,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  FormHelperText,
  MenuItem,
  Select as MuiSelect
} from "@material-ui/core";

const style = makeStyles({
  wrapper: {
    position: "relative",
  },

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});



const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

var initialValues = {
  id: 0,
  unit: "",
  line: "",
  machine: ""
};


const AddMachineToLineForm = (props) => {
  const [units, setUnits] = useState([]);
  const [lineNames, setLineNames] = useState([]);
  const [lines, setLines] = useState([]);
  const [MachineList, setMachineList] =useState([]);
  const [Machines, setMachines] =useState([]);



  const { addOrEdit } = props;


  const validationSchema = yup.object().shape({
    unit: yup.string().required("Unit is required"),
    line: yup.string().required("Line is required"),
    machine: yup.string().required("Machine is required"),

  });

  const classes = style();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(false);
      addOrEdit(values, resetForm, setSubmitting);
    },
  });

  const lineFilter= ()=>{
    setLines(lineNames.filter(line => line.unit===formik.values.unit))
  }

  const machineFilter= ()=>{
    setMachines(MachineList.filter(machine => machine.current_unit===formik.values.unit))
  }

  useEffect(() => {
    async function getLines() {
        const response = await fetch("/api/line/name/list/", {headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },});
        const body = await response.json();
        setLineNames(body);
    }
    getLines();
    async function getMachineNameList() {
        const response = await fetch("/api/deActive/machine/name/list/", {headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },});
        const body = await response.json();
        setMachineList(body);
    }
    getMachineNameList();
    async function getUnits() {
      const response = await fetch("/api/unit/name/list/", {headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      },});
      const body = await response.json();
      setUnits(body);
    }
    getUnits();
}, []);

  useEffect(() => {
    lineFilter();
    machineFilter();
  }, [formik.values.unit]);

  return (
    <Form onSubmit={formik.handleSubmit}>
        <Grid container alignItems="flex-start" spacing={2}>
        <Grid item md={12} sm={12} xs={12}>
            <Controls.Select
              label="Unit"
              name="unit"
              value={formik.values.unit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={units}
              error={formik.touched.unit && Boolean(formik.errors.unit)}
              helperText={formik.touched.unit && formik.errors.unit}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Controls.Select
              label="Line"
              name="line"
              value={formik.values.line}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={lines}
              error={formik.touched.line && Boolean(formik.errors.line)}
              helperText={formik.touched.line && formik.errors.line}
            />
          </Grid>

          <Grid item md={12} sm={12} xs={12}>
            <Controls.Select
              label="Machine"
              name="machine"
              value={formik.values.machine}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={Machines}
              error={formik.touched.machine && Boolean(formik.errors.machine)}
              helperText={formik.touched.machine && formik.errors.machine}
            />
          </Grid>
        </Grid>

        <Grid item md={12} sm={12} xs={12}>
          <div className={classes.wrapper}>
            <Controls.Button
              type="submit"
              disabled={formik.isSubmitting}
              text="Submit"
            />
            {formik.isSubmitting && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
            <Controls.Button
              text="Reset"
              color="default"
              onClick={formik.resetForm}
            />
          </div>
        </Grid> 
    </Form>
  );
};

export default AddMachineToLineForm;
