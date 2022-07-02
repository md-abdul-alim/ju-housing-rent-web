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
  to_let_from: '',
  remark: '',
  code: '',
};


const CheckInForm = (props) => {

  const { addOrEditCheckIn, recordForEdit } = props;

  const validationSchema = yup.object().shape({
    to_let_from: yup.string().required("Date is required"),
  });

  const classes = style();


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log(values)
        setSubmitting(true);
        addOrEditCheckIn(values, resetForm, setSubmitting);
    },
  });


  useEffect(() => {
    if (recordForEdit != null){
      formik.setFieldValue("to_let_from", recordForEdit["to_let_from"]);
      formik.setFieldValue("code", recordForEdit["code"]);
    }
  }, [recordForEdit]);


  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
          <Grid item md={12} sm={12} xs={12}>
            <Controls.DatePicker
              label="Check in date"
              name="to_let_from"
              value={formik.values.to_let_from}
              minDate={recordForEdit !== null ? recordForEdit['to_let_from'] : new Date()}
              maxDate={new Date().setDate(new Date().getDate() + 60)}
              placeholder="Check in date"
              onChange={value => {
                formik.setFieldValue("to_let_from", value)
              }}
              onBlur={formik.handleBlur}
              fullWidth
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Controls.Input
              label="Remark"
              name="remark"
              id="remark"
              value={formik.values.remark}
              onChange={formik.handleChange}
              error={formik.touched.remark && Boolean(formik.errors.remark)}
              helperText={formik.touched.remark && formik.errors.remark}
              multiline
              rows={2}
              fullWidth
            />
          </Grid>
          {recordForEdit !== null ? parseInt(recordForEdit["check_in_permission_nid"]) === parseInt(localStorage.getItem("nid")) ?
          <Grid item md={12} sm={12} xs={12} alignItems="center">
            <div className={classes.wrapper}>
              <Controls.Button
                type="submit"
                disabled={formik.isSubmitting}
                text="Submit"
              />
            </div>
          </Grid> : <p style={{color: 'red'}}>You have no check in permission. Please contact with the owner.</p> : ''}
      </Form>
    </>
  );
};

export {
  CheckInForm,
}
