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
  phone: "324",
  relation: "fs",
  address: "ds",
};



const EmergencyContactForm = (props) => {

  const { addOrEdit, recordForEdit } = props;

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    phone: yup.string().required("Phone is required"),
    relation: yup.string().required("Relation is required"),
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
            label="Relation"
            name="relation"
            value={formik.values.relation}
            onChange={formik.handleChange}
            error={formik.touched.relation && Boolean(formik.errors.relation)}
            helperText={formik.touched.relation && formik.errors.relation}
            fullWidth
          />
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Controls.Input
            label="Address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
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
  EmergencyContactForm,
}
