import React, { useState, useEffect } from "react";
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

var initialFValues = {
  id: 0,
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  nid: "",
  passport: "",
  present_address: "",
  permanent_address: "",
  birthday: new Date(),
  married_status: "",
  occupation: "",
  occupation_institution: "",
  religion: "",
  education_qualification: "",
};


const ProfileForm = (props) => {

  const [units, setUnits] = useState([]);


  const { addOrEdit, recordForEdit, userId } = props;

  const validationSchema = yup.object().shape({
    model_no: yup.string().required("Model No is required"),
    parent_unit: yup.string().required("Parent Unit is required"),
    category: yup.string().required("Please select a category"),
    type: yup.string().required("Type is required"),
    brand: yup.string().required("Brand is required"),
    warranty_details: yup.string().required("Warranty details is required"),
  });

  

  const classes = style();  

  const formik = useFormik({
    initialValues: initialFValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
        setSubmitting(false);
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
      <p>{userId}</p>
      <Grid container alignItems="flex-start" spacing={1}>
      <Grid item md={3} sm={4} xs={6}>
          <Controls.Input
            label="First Name"
            name="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
            helperText={formik.touched.first_name && formik.errors.first_name}
            fullWidth
          />
        </Grid>
        <Grid item md={3} sm={4} xs={6}>
          <Controls.Input
            label="Last Name"
            name="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
            fullWidth
          />
        </Grid>
        <Grid item md={3} sm={4} xs={12}>
          <Controls.Input
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
          />
        </Grid>
        <Grid item md={3} sm={4} xs={12}>
          <Controls.Input
            label="Phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type='number'
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            fullWidth
          />
        </Grid>
        <Grid item md={3} sm={4} xs={12}>
          <Controls.DatePicker
              label="Birthday"
              name="birthday"
              value={formik.values.birthday}
              onChange={value => {
                formik.setFieldValue("birthday", value)
              }}
              onBlur={formik.handleBlur}
              fullWidth
            />
        </Grid>
        <Grid item md={3} sm={4} xs={12}>
          <Controls.Input
            label="NID"
            name="nid"
            value={formik.values.nid}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nid && Boolean(formik.errors.nid)}
            helperText={formik.touched.nid && formik.errors.nid}
            fullWidth
          />
        </Grid>
        <Grid item md={3} sm={4} xs={12}>
          <Controls.Input
            label="Passport"
            name="passport"
            value={formik.values.passport}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.passport && Boolean(formik.errors.passport)}
            helperText={formik.touched.passport && formik.errors.passport}
            fullWidth
          />
        </Grid>
        <Grid item md={3} sm={4} xs={6}>
          <Controls.Select
              label="Married Status"
              name="married_status"
              value={formik.values.married_status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={units}
              error={formik.touched.married_status && Boolean(formik.errors.married_status)}
              helperText={formik.touched.married_status && formik.errors.married_status}
            />
        </Grid>
        <Grid item md={3} sm={4} xs={6}>
          <Controls.Select
              label="Religion"
              name="religion"
              value={formik.values.religion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={units}
              error={formik.touched.religion && Boolean(formik.errors.religion)}
              helperText={formik.touched.religion && formik.errors.religion}
            />
        </Grid>
        <Grid item md={3} sm={4} xs={12}>
          <Controls.Input
            label="Occupation"
            name="occupation"
            value={formik.values.occupation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.occupation && Boolean(formik.errors.occupation)}
            helperText={formik.touched.occupation && formik.errors.occupation}
            fullWidth
          />
        </Grid>
        <Grid item md={3} sm={4} xs={12}>
          <Controls.Input
            label="Occupation Institution"
            name="occupation_institution"
            value={formik.values.occupation_institution}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.occupation_institution && Boolean(formik.errors.occupation_institution)}
            helperText={formik.touched.occupation_institution && formik.errors.occupation_institution}
            fullWidth
          />
        </Grid>
        <Grid item md={3} sm={4} xs={12}>
          <Controls.Input
            label="Education Qualification"
            name="education_qualification"
            value={formik.values.education_qualification}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.education_qualification && Boolean(formik.errors.education_qualification)}
            helperText={formik.touched.education_qualification && formik.errors.education_qualification}
            fullWidth
          />
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Controls.Input
            label="Present Address"
            name="present_address"
            value={formik.values.present_address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.present_address && Boolean(formik.errors.present_address)}
            helperText={formik.touched.present_address && formik.errors.present_address}
            multiline
            rows={2}
            fullWidth
          />
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Controls.Input
            label="Permanent Address"
            name="permanent_address"
            value={formik.values.permanent_address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.permanent_address && Boolean(formik.errors.permanent_address)}
            helperText={formik.touched.permanent_address && formik.errors.permanent_address}
            multiline
            rows={2}
            fullWidth
          />
        </Grid>
        <Grid item style={{ marginTop: 10 }}>
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
      </Grid>
    </Form>
  );
};

export default ProfileForm;
