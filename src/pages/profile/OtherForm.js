import React, { useEffect, useState } from "react";
import { Form } from "../../components/Form/useForm";
import Controls from "../../components/Controls/Controls";
import { useFormik } from "formik";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  CircularProgress,
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

var initialValues = {
  id: 0,
  name: "x",
  age: 0,
  phone: "324",
  nid: 0,
  present_address: "ds",
  permanent_address: "ds",
};



const OtherForm = (props) => {

  const { addOrEdit, recordForEdit } = props;

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    age: yup.string().required("Age is required"),
    phone: yup.string().required("Phone is required"),
    nid: yup.string().required("Nid is required"),
    present_address: yup.string().required("Present Address is required"),
    permanent_address: yup.string().required("Permanent Address is required"),
  });

  const classes = style();


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        addOrEdit(values, resetForm, setSubmitting);
    },
  });


  useEffect(() => {
    if (recordForEdit != null)
      formik.setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);


  return (
    <Form onSubmit={formik.handleSubmit}>
      <Grid container alignItems="flex-start" spacing={2}>
        <Grid item md={6} sm={6} xs={12}>
          <Controls.Input
            label="Name"
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
          />
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Controls.Input
            label="Age"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
            fullWidth
          />
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Controls.Input
            label="Phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            fullWidth
          />
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Controls.Input
            label="Nid"
            name="nid"
            value={formik.values.nid}
            onChange={formik.handleChange}
            error={formik.touched.nid && Boolean(formik.errors.nid)}
            helperText={formik.touched.nid && formik.errors.nid}
            fullWidth
          />
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Controls.Input
            label="Present Address"
            name="present_address"
            value={formik.values.present_address}
            onChange={formik.handleChange}
            error={formik.touched.present_address && Boolean(formik.errors.present_address)}
            helperText={formik.touched.present_address && formik.errors.present_address}
            fullWidth
          />
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Controls.Input
            label="Permanent Address"
            name="permanent_address"
            value={formik.values.permanent_address}
            onChange={formik.handleChange}
            error={formik.touched.permanent_address && Boolean(formik.errors.permanent_address)}
            helperText={formik.touched.permanent_address && formik.errors.permanent_address}
            fullWidth
          />
        </Grid>
        <Grid item style={{ marginTop: 16 }}>
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
              onClick={(e)=>{
                formik.resetForm(e)
              }}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export {
  OtherForm,
}
