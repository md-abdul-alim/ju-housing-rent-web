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
  type: "d",
  square_feet: 12,
  bedrooms: 2,
  rent: 2000,
  address: "d",
  description: "s",
};



const ToLetForm = (props) => {

  const { addOrEdit, recordForEdit } = props;

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    type: yup.string().required("Type is required"),
    square_feet: yup.string().required("Square Feet is required"),
    bedrooms: yup.string().required("Bedroom is required"),
    rent: yup.string().required("Rent is required"),
    address: yup.string().required("Address is required"),
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
            label="Type"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            error={formik.touched.type && Boolean(formik.errors.type)}
            helperText={formik.touched.type && formik.errors.type}
            fullWidth
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Controls.Input
            label="Square Feet"
            name="square_feet"
            value={formik.values.square_feet}
            onChange={formik.handleChange}
            error={formik.touched.square_feet && Boolean(formik.errors.square_feet)}
            helperText={formik.touched.square_feet && formik.errors.square_feet}
            fullWidth
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Controls.Input
            label="Bedrooms"
            name="bedrooms"
            value={formik.values.bedrooms}
            onChange={formik.handleChange}
            error={formik.touched.bedrooms && Boolean(formik.errors.bedrooms)}
            helperText={formik.touched.bedrooms && formik.errors.bedrooms}
            fullWidth
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Controls.Input
            label="Rent"
            name="rent"
            value={formik.values.rent}
            onChange={formik.handleChange}
            error={formik.touched.rent && Boolean(formik.errors.rent)}
            helperText={formik.touched.rent && formik.errors.rent}
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
            multiline
            rows={2}
            fullWidth
          />
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Controls.Input
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            multiline
            rows={2}
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
  ToLetForm,
}
