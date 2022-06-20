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
  unit: "",
  name: "",
};



const DriverForm = (props) => {

  const { addOrEdit, recordForEdit, lineNameList } = props;

  const [units, setUnits] = useState([]);
  const [ errorMessage, setErrorMessage ] = useState("")
  
  // console.log(lineNameList)

  const validationSchema = yup.object().shape({
    unit: yup.string().required("Unit is required"),
    name: yup.string().required("Name is required"),
  });

  const classes = style();

  function duplicateUnitLineNameCheck(values){
    for(let i=0; i < lineNameList.length; i++){
      if(values.unit === lineNameList[i].unit & values.name === lineNameList[i].name){
        return false
      }
    }
    return true
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      if(duplicateUnitLineNameCheck(values)){
        setErrorMessage("")
        addOrEdit(values, resetForm, setSubmitting);
      }else{
        setErrorMessage("Unit & Line name must be unique.")
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
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
        <Grid item md={12} sm={12} xs={12}>
          <p style={{fontSize: "15px", margin: "0px", color: "red"}}>{errorMessage.length > 0 ? errorMessage : null}</p>
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
                setErrorMessage("")
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
  DriverForm,
}