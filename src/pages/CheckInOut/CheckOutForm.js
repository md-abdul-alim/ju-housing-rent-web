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
  check_out_date: new Date(),
};


const CheckOutForm = (props) => {

  const { addOrEditCheckOut } = props;

  const validationSchema = yup.object().shape({
    check_out_date: yup.string().required("Date is required"),
  });

  const classes = style();


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        addOrEditCheckOut(values, resetForm, setSubmitting);
    },
  });



  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
          <Grid item md={12} sm={12} xs={12}>
            <Controls.DatePicker
              label="Check out date"
              name="check_out_date"
              value={formik.values.check_out_date}
              minDate={new Date()}
              maxDate={new Date().setDate(new Date().getDate() + 60)}
              onChange={value => {
                formik.setFieldValue("check_out_date", value)
              }}
              onBlur={formik.handleBlur}
              fullWidth
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12} alignItems="center">
            <div className={classes.wrapper}>
              <Controls.Button
                type="submit"
                disabled={formik.isSubmitting}
                text="Submit"
              />
            </div>
          </Grid>
      </Form>
    </>
  );
};

export {
  CheckOutForm,
}
