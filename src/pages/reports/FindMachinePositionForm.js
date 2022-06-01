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


var initialFValues = {
  id: 0,
  machine: ""
};


const FindMachinePositionForm = (props) => {
  const [machines, setMachines] = useState([]);

  const { addOrEdit } = props;
  const classes = style();


  const formik = useFormik({
    initialValues: initialFValues,
    // validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      addOrEdit(values, resetForm, setSubmitting);
    },
  });


  useEffect(() => {

    async function getMachineName() {
      const response = await fetch("/api/active/machine/name/list/");
      const body = await response.json();
      setMachines(body);
    }
    getMachineName();

  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Grid container alignItems="flex-start" spacing={2}>

        <Grid item md={4} sm={2} xs={2}>
        </Grid>

        <Grid item md={2} sm={6} xs={6}>
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

        <Grid item style={{ marginTop: 16 }} md={2} sm={2} xs={2}>
          <div className={classes.wrapper}>
            <Controls.Button
              type="submit"
              disabled={formik.isSubmitting}
              text="Find"
            />
            {formik.isSubmitting && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </Grid>
        <Grid item md={4} sm={2} xs={2}>
        </Grid>
      </Grid>
    </Form>
  );
};

export default FindMachinePositionForm;
