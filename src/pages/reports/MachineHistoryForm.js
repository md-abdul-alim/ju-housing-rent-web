import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  useForm, 
  Form 
} from "../../components/Form/useForm";
import Controls from "../../components/Controls/Controls";
// import Divider from "@material-ui/core/Divider";
// import Typography from "@material-ui/core/Typography";
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import Select from "@material-ui/core/Select";
import { useFormik } from "formik";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

// import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import {
  // InputLabel,
  // Icon,
  Grid,
  // Radio,
  // RadioGroup,
  // FormControl,
  // MenuItem,
  // TextField,
  CircularProgress,
  // FormHelperText,
} from "@material-ui/core";
// import { VerticalAlignCenter } from "@material-ui/icons";

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

var today = new Date()
var fromDate = new Date()
fromDate.setMonth(fromDate.getMonth() - 1)

var initialFValues = {
  id: 0,
  from_date: fromDate,
  to_date: today,
  machine: "",
  unit: "",
  line: ""
};


const MachineHistoryForm = (props) => {
  const [machines, setMachines] = useState([]);
  const [units, setUnits] = useState([]);
  const [lines, setLines] = useState([]);

  const { addOrEdit, recordForEdit } = props;
  const { values, setValues, handleChange } = useForm(initialFValues);
  const classes = style();


  const formik = useFormik({
    initialValues: initialFValues,
    // validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      addOrEdit(values, resetForm, setSubmitting);
    },
  });

  const AxiosHeader = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    },
  }

  useEffect(() => {
    if (recordForEdit != null)
      formik.setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  useEffect(() => {
    async function getUnitName() {
      const response = await fetch("/api/unit/list/", AxiosHeader);
      const body = await response.json();
      setUnits(body);
    }
    getUnitName();

    async function getMachineName() {
      const response = await fetch("/api/all/machine/name/list/", AxiosHeader);
      const body = await response.json();
      setMachines(body);
    }
    getMachineName();

    async function getLineName() {
      const response = await fetch("/api/line/name/list/", AxiosHeader);
      const body = await response.json();
      setLines(body);
    }
    getLineName();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Grid container alignItems="flex-start" spacing={2}>
        <Grid item md={2} sm={4} xs={6}>
        <Controls.DatePicker
            label="From"
            name="from_date"
            value={formik.values.from_date}
            onChange={value => {
              formik.setFieldValue("from_date", value)
            }}
            onBlur={formik.handleBlur}
            fullWidth
          />
        </Grid>

        <Grid item md={2} sm={4} xs={6}>
        <Controls.DatePicker
            label="To"
            name="to_date"
            value={formik.values.to_date}
            onChange={value => {
              formik.setFieldValue("to_date", value)
            }}
            onBlur={formik.handleBlur}
            fullWidth
          />
        </Grid>

        <Grid item md={2} sm={4} xs={6}>
          <Controls.Autocomplete
            label="Machine"
            name="machine"
            onChange={(e, value) => {
              formik.setFieldValue(
                "machine",
                value !== null ? value : initialFValues.machine
              );
            }}
            value={formik.values.machine}
            onBlur={formik.handleBlur}
            options={machines}
          />
        </Grid>
        <Grid item md={2} sm={4} xs={6}>
          <Controls.Autocomplete
            label="Unit"
            name="unit"
            
            onChange={(e, value) => {
              formik.setFieldValue(
                "unit",
                value !== null ? value : initialFValues.unit
              );
            }}
            value={formik.values.unit}
            onBlur={formik.handleBlur}
            options={units}
          />
        </Grid>
        <Grid item md={2} sm={4} xs={6}>
          <Controls.Autocomplete
            label="Line"
            name="line"
            
            onChange={(e, value) => {
              formik.setFieldValue(
                "line",
                value !== null ? value : initialFValues.line
              );
            }}
            value={formik.values.line}
            onBlur={formik.handleBlur}
            options={lines}
          />
        </Grid>
        <Grid item style={{ marginTop: 16 }} md={2} sm={4} xs={6}>
          <div className={classes.wrapper}>
            <Controls.Button
              type="submit"
              disabled={formik.isSubmitting}
              text="Submit"
            />
            {formik.isSubmitting && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default MachineHistoryForm;
