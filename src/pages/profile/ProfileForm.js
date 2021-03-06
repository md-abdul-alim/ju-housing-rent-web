import React, { useState, useEffect } from "react";
import { Form } from "../../components/Form/useForm";
import Controls from "../../components/Controls/Controls";
import { useFormik } from "formik";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import defaultImage from'./images/Default_Image_Thumbnail.png';

import {
  Button,
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
  password: "",
  password2: "",
  present_address: "",
  permanent_address: "",
  birthday: new Date(),
  married_status: "",
  occupation: "",
  occupation_institution: "",
  religion: "",
  education_qualification: "",
};

const duplicateUserNameCheck = (list, value, own_email)=> {
  var check = true
  if(list.length === 0){
    return check
  }else{
    for (let i=0; i< list.length; i ++){
        if(value === list[i].email && value !==own_email){       
          return check = false
        }
      }
    }
    return check;
}

const verifyNid = (renterNid, value)=> {
  if(renterNid.length === 0){
    return false;
  }else{
    for (let i=0; i< renterNid.length; i ++){
      if(parseInt(renterNid[i].nid) === parseInt(value)){
        return false;
      }
    }
    return true;
  }
};


const ProfileForm = (props) => {

  const [userList, setUserList] = useState([]);
  const [religions, setReligions] = useState([]);
  const [marriedStatus, setMarriedStatuses] = useState([]);
  const [renterNid, setRenterNid] = useState([]);


  const [previewImage1, setPreviewImage1] = useState(defaultImage)
  const [imageObject1, setImageObject1] = useState()

  const [previewImage2, setPreviewImage2] = useState(defaultImage)
  const [imageObject2, setImageObject2] = useState()


  const {addOrEdit, userData } = props;

  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required")
    .test("Unique", "Email already exist.Try other.", (values) => {
      return duplicateUserNameCheck(userList, values, userData['email'])
    }),
    nid: yup
    .number()
    .integer()
    .nullable()
    .test("Unique", "This Nid already registered.", (value) => {
      if(parseInt(value) > 0){
        return verifyNid(renterNid, value)
      }
      return true
    }),
    password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length'),
    password2: yup
    .string('Enter your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
  });

  

  const classes = style();  

  const formik = useFormik({
    initialValues: initialFValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
        setSubmitting(false);
        let data = new FormData();

        data.append('id', values.id);
        data.append('first_name', values.first_name);
        data.append('last_name', values.last_name);
        data.append('email', values.email);
        data.append('phone', values.phone);
        data.append('nid', values.nid);
        data.append('passport', values.passport);
        data.append('password', values.password);
        data.append('present_address', values.present_address);
        data.append('permanent_address', values.permanent_address);
        data.append('birthday', values.birthday);
        data.append('married_status', values.married_status);
        data.append('occupation', values.occupation);
        data.append('occupation_institution', values.occupation_institution);
        data.append('religion', values.religion);
        data.append('education_qualification', values.education_qualification);

        if(imageObject1 !=undefined){
          data.append('nid_font_image', imageObject1);
        }else{
          data.append('nid_font_image', 'null');
        }
        if(imageObject2 !=undefined){
          data.append('nid_back_image', imageObject2);
        }else{
          data.append('nid_back_image', 'null');
        }
        console.log(data)
        addOrEdit(data, setSubmitting);
    },
  });

  useEffect(() => {
    async function getReligions() {
      const response = await fetch("/api/religion/list");
      const body = await response.json();
      setReligions(body);
    }
    getReligions();
    async function getMarriedStatuses() {
      const response = await fetch("/api/married/list");
      const body = await response.json();
      setMarriedStatuses(body);
    }
    getMarriedStatuses();
    async function getUsers() {
      const response = await fetch("/api/user/list");
      const body = await response.json();
      setUserList(body);
    }
    getUsers();
    async function getRenterNid() {
      const response = await fetch("/api/renter/nid/list/");
      const body = await response.json();
      setRenterNid(body);
    }
    getRenterNid();

    if (userData != null)
      userData['password'] = '';
      userData['password2'] = '';
      if(userData.nid_font_image){
        setPreviewImage1(userData.nid_font_image)
      }
      if(userData.nid_back_image){
        setPreviewImage2(userData.nid_back_image)
      }
      formik.setValues({
        ...userData,
      });
  }, [userData]);


  return (
    <Form onSubmit={formik.handleSubmit}>
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
            placeholder="Not changeable"
            value={formik.values.nid}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nid && Boolean(formik.errors.nid)}
            helperText={formik.touched.nid && formik.errors.nid}
            disabled={userData.nid !== null ? true : false}
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
              options={marriedStatus}
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
              options={religions}
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
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
          />
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Controls.Input
            label="Confirm Password"
            name="password2"
            value={formik.values.password2}
            onChange={formik.handleChange}
            type="password"
            onBlur={formik.handleBlur}
            error={formik.touched.password2 && Boolean(formik.errors.password2)}
            helperText={formik.touched.password2 && formik.errors.password2}
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
        <Grid item md={6} sm={12} xs={12}>
            <div className="mg20">
                <Grid container justify="space-between" spacing={2}>
                    <Grid justify="flex-start" item md={12} sm={12} xs={12}>
                        <label htmlFor="btn-upload">
                            <input
                                id="btn-upload"
                                name="image"
                                style={{ display: 'none' }}
                                type="file"
                                accept="image/*"
                                onChange={(e)=>{
                                    setPreviewImage1(URL.createObjectURL(e.target.files[0]))
                                    setImageObject1(e.target.files[0])
                                }}
                            />
                            <Grid  alignItems="center" container justify="space-between"spacing={2}>
                                <Grid item md={7} sm={12} xs={12}>
                                    <Button
                                        className="btn-choose"
                                        variant="outlined"
                                        component="span" >
                                        Choose Font NID Image
                                    </Button>
                                </Grid>
                                <Grid item md={5} sm={12} xs={12}>
                                    <div className="file-name">
                                        {imageObject1 ? imageObject1.name : null}
                                    </div>
                                </Grid>
                            </Grid>
                        </label>
                    </Grid>
                </Grid>
            </div>
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
            <div className="mg20">
                <Grid container justify="space-between" spacing={2}>
                    <Grid justify="flex-start" item md={12} sm={12} xs={12}>
                        <label htmlFor="btn-upload">
                            <input
                                id="btn-upload"
                                name="image"
                                style={{ display: 'none' }}
                                type="file"
                                accept="image/*"
                                onChange={(e)=>{
                                    setPreviewImage2(URL.createObjectURL(e.target.files[0]))
                                    setImageObject2(e.target.files[0])
                                }}
                            />
                            <Grid  alignItems="center" container justify="space-between"spacing={2}>
                                <Grid item md={7} sm={12} xs={12}>
                                    <Button
                                        className="btn-choose"
                                        variant="outlined"
                                        component="span" >
                                        Choose Back NID Image
                                    </Button>
                                </Grid>
                                <Grid item md={5} sm={12} xs={12}>
                                    <div className="file-name">
                                        {imageObject2 ? imageObject2.name : null}
                                    </div>
                                </Grid>
                            </Grid>
                        </label>
                    </Grid>
                </Grid>
            </div>
        </Grid>
        <Grid item md={6}>
            <Grid container alignItems="center" spacing={6}>
                <Grid align='center' item md={12} sm={12} xs={12} >
                    {previewImage1 && (
                    <div>
                        <img className="preview my20" src={previewImage1} alt="Style Image"  height="60%" width="60%" />                                                        </div>
                    )}
                </Grid>
            </Grid>
        </Grid>
        <Grid item md={6}>
            <Grid container alignItems="center" spacing={6}>
                <Grid align='center' item md={12} sm={12} xs={12} >
                    {previewImage2 && (
                    <div>
                        <img className="preview my20" src={previewImage2} alt="Style Image"  height="60%" width="60%" />                                                        </div>
                    )}
                </Grid>
            </Grid>
        </Grid>
        <Grid item md={12} sm={12} xs={12} >
            <Controls.Button
              type="submit"
              disabled={formik.isSubmitting}
              text="Update"
            />
            {formik.isSubmitting && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
        </Grid>
      </Grid>
    </Form>
  );
};

export default ProfileForm;
