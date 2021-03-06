import React, { useState, useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Tabs,
  Tab,
  TextField,
  Fade,
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form } from "../../components/Form/useForm";
import Controls from "../../components/Controls/Controls";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
// styles
import useStyles from "./styles";

// context
import { useUserDispatch } from "../../context/UserContext";

const GreenTextTypography = withStyles({
  root: {
    color: "#00FF00"
  }
})(Typography);


var initialRenterValues = {
  id: 0,
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  role: "",
  password: "",
  password2: ""
};

var loginValues = {
  username: "",
  password: ""
}

var holdPassword = ''

const duplicateUserNameCheck = (list, value)=> {
  var check = true
  if(list.length === 0){
    return check
  }else{
    for (let i=0; i< list.length; i ++){
        if(value === list[i].email){       
          return check = false
        }
      }
    }
    return check;
}

function Login(props) {
  var classes = useStyles();

  // global
  var dispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  const [ userList, setUserList] = useState([]);
  const [ groupList, setGroupList] = useState([]);
  const [message, setMessage] = useState(null)


  const validationSchema = yup.object().shape({
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
    phone: yup
    .number()
    .typeError("Invalid Input: numbers please")
    // .max(11, "Not more than 11")
    .positive("Must be greater than zero")
    .required("Phone number is required.")
    .integer(),
    email: yup.string().required("Email is required")
    .test("Unique", "Email already exist.Try other.", (values) => {
      return duplicateUserNameCheck(userList, values)
    }),
    password: yup
    .string()
    .required("Password is required")
    .test((values)=>{
      holdPassword = values
      return true
    }),
    password2: yup
    .string()
    .required("Confirm Password is required")
    .test("Match", "Password doesn't match!", (values) => {
      if (values === holdPassword){
        return true
      }
      return false
    }),
  });


  const RenterFormik = useFormik({
    initialValues: initialRenterValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      addOrEdit(values, resetForm, setSubmitting);
    },
  });


  const LoginFormik = useFormik({
    initialValues: loginValues,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      login(values);
      resetForm();
    },
  });

  const login = async (values) => {
    setIsLoading(true);
    const requestOptions = {
      headers: {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
    };

    try {
      axios
      .post("/api/token/", values, requestOptions)
      .then((res) => {
        setTimeout(() => {
          localStorage.setItem('refresh_token', res.data.refresh)
          localStorage.setItem('access_token', res.data.access)
          localStorage.setItem('id', res.data.id)
          localStorage.setItem('first_name', res.data.first_name)
          localStorage.setItem('last_name', res.data.last_name)
          localStorage.setItem('user_type', res.data.user_type)
          localStorage.setItem('nid', res.data.nid)
          setError(null)
          dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
          setIsLoading(false);
          if (localStorage.getItem("user_type") === 'Admin'){
            props.history.push('/app/dashboard')
          }else{
            props.history.push('/app/profile')
          }
          
        }, 1000);
      })
      .catch((err) => {
        // dispatch({ type: "LOGIN_FAILURE" });
        setError(true);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const userRegistration = async (values, setSubmitting) => {
    setIsLoading(true);
    const requestOptions = {
      headers: {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      },
    };

    try {
      await axios
        .post("/api/registration/", values, {
          requestOptions,
        })
        .then((resp) => {
          setTimeout(() => {
            setMessage(resp.data.message)
            setIsLoading(false);
            setSubmitting(false);
          }, 1000);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const addOrEdit = (userData, resetForm, setSubmitting) => {
    if (userData.id === 0) userRegistration(userData, setSubmitting);
    resetForm();
  };

  useEffect(() => {
    async function getUsers() {
      const response = await fetch("/api/user/list/");
      const body = await response.json();
      setUserList(body);
    }
    getUsers();
    async function getGroups() {
      const response = await fetch("/api/group/list/");
      const body = await response.json();
      setGroupList(body);
    }
    getGroups();
  }, []);

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        {/* <Typography className={classes.logotypeText}>Jahangirnogar University</Typography> */}
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="New User" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Typography variant="h3" className={classes.greeting}>
                <a href="https://juniv.edu/" target="_blank" style={{color: "green"}}>Jahangirnagar University</a>
              </Typography>
              <Typography variant="h3" className={classes.greeting1}>
                House Renting System
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :
                </Typography>
              </Fade>
              <Form onSubmit={LoginFormik.handleSubmit}>
                <Grid container justify="space-between" alignItems="flex-start" spacing={0}>
                    <Grid item md={12} sm={12} xs={12}>
                      <TextField 
                        label="Email"
                        name="username"
                        InputProps={{
                          classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                          },
                        }}
                        value={LoginFormik.values.username}
                        onChange={LoginFormik.handleChange}
                        onBlur={LoginFormik.handleBlur}
                        margin="normal"
                        type="email"
                        error={LoginFormik.touched.username && Boolean(LoginFormik.errors.username)}
                        helperText={LoginFormik.touched.username && LoginFormik.errors.username}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                      <TextField
                        label="Password"
                        name="password"
                        id="password"
                        InputProps={{
                          classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                          },
                        }}
                        value={LoginFormik.values.password}
                        onChange={LoginFormik.handleChange}
                        onBlur={LoginFormik.handleBlur}
                        margin="normal"
                        type="password"
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                    {isLoading ? (
                        <CircularProgress size={26} className={classes.loginLoader} />
                      ) : (
                      <Controls.Button
                          type="submit"
                          disabled={
                            LoginFormik.isSubmitting, 
                            LoginFormik.values.username.length === 0 || LoginFormik.values.password.length === 0
                          }
                          text="Login"
                      />
                      )}
                    </Grid>
                </Grid>
              </Form>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>
              <Fade in={message}>
                <GreenTextTypography variant="subtitle1">
                  {message}
                </GreenTextTypography>
              </Fade>
              <Form onSubmit={RenterFormik.handleSubmit}>
                <Grid container justify="space-between" alignItems="flex-start" spacing={0}>
                  <Grid item md={12} sm={12} xs={12}>
                    <TextField
                      label="First Name"
                      name="first_name"
                      id="name"
                      InputProps={{
                        classes: {
                          underline: classes.textFieldUnderline,
                          input: classes.textField,
                        },
                      }}
                      value={RenterFormik.values.first_name}
                      onChange={RenterFormik.handleChange}
                      onBlur={RenterFormik.handleBlur}
                      margin="normal"
                      type="text"
                      error={RenterFormik.touched.first_name && Boolean(RenterFormik.errors.first_name)}
                      helperText={RenterFormik.touched.first_name && RenterFormik.errors.first_name}
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={12} sm={12} xs={12}>
                    <TextField 
                      label="Last Name"
                      name="last_name"
                      InputProps={{
                        classes: {
                          underline: classes.textFieldUnderline,
                          input: classes.textField,
                        },
                      }}
                      value={RenterFormik.values.last_name}
                      onChange={RenterFormik.handleChange}
                      onBlur={RenterFormik.handleBlur}
                      margin="normal"
                      type="text"
                      error={RenterFormik.touched.last_name && Boolean(RenterFormik.errors.last_name)}
                      helperText={RenterFormik.touched.last_name && RenterFormik.errors.last_name}
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={12} sm={12} xs={12}>
                    <TextField 
                      label="Phone"
                      name="phone"
                      InputProps={{
                        classes: {
                          underline: classes.textFieldUnderline,
                          input: classes.textField,
                        },
                      }}
                      value={RenterFormik.values.phone}
                      onChange={RenterFormik.handleChange}
                      onBlur={RenterFormik.handleBlur}
                      margin="normal"
                      type="number"
                      error={RenterFormik.touched.phone && Boolean(RenterFormik.errors.phone)}
                      helperText={RenterFormik.touched.phone && RenterFormik.errors.phone}
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={12} sm={12} xs={12}>
                    <TextField 
                      label="Email"
                      name="email"
                      InputProps={{
                        classes: {
                          underline: classes.textFieldUnderline,
                          input: classes.textField,
                        },
                      }}
                      value={RenterFormik.values.email}
                      onChange={RenterFormik.handleChange}
                      onBlur={RenterFormik.handleBlur}
                      margin="normal"
                      type="email"
                      error={RenterFormik.touched.email && Boolean(RenterFormik.errors.email)}
                      helperText={RenterFormik.touched.email && RenterFormik.errors.email}
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={12} sm={12} xs={12}>
                      <FormControl fullWidth
                        {...(error && {error:true})}>
                            <InputLabel>Role</InputLabel>
                            <MuiSelect
                                label="Role"
                                name="role"
                                value={RenterFormik.values.role}
                                onChange={RenterFormik.handleChange}
                                onBlur={RenterFormik.handleBlur}
                                error={RenterFormik.touched.role && Boolean(RenterFormik.errors.role)}
                                helperText={RenterFormik.touched.role && RenterFormik.errors.role}
                                >
                                <MenuItem value="">None</MenuItem>
                                {
                                    groupList.map(
                                        item => (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                                    )
                                }
                            </MuiSelect>
                        </FormControl>
                  </Grid>
                  <Grid item md={12} sm={12} xs={12}>
                    <TextField 
                      label="Password"
                      name="password"
                      InputProps={{
                        classes: {
                          underline: classes.textFieldUnderline,
                          input: classes.textField,
                        },
                      }}
                      value={RenterFormik.values.password}
                      onChange={RenterFormik.handleChange}
                      onBlur={RenterFormik.handleBlur}
                      margin="normal"
                      type="password"
                      error={RenterFormik.touched.password && Boolean(RenterFormik.errors.password)}
                      helperText={RenterFormik.touched.password && RenterFormik.errors.password}
                      fullWidth  
                   />
                  </Grid>
                
                <Grid item md={12} sm={12} xs={12}>
                  <TextField 
                    label="Confirm Password"
                    name="password2"
                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    value={RenterFormik.values.password2}
                    onChange={RenterFormik.handleChange}
                    onBlur={RenterFormik.handleBlur}
                    margin="normal"
                    type="password"
                    error={RenterFormik.touched.password2 && Boolean(RenterFormik.errors.password2)}
                    helperText={RenterFormik.touched.password2 && RenterFormik.errors.password2}
                    fullWidth
                  />
                </Grid>
                
                <Grid item style={{ marginTop: 3 }} md={12} sm={12} xs={12}>
                    <div className={classes.wrapper}>
                    {isLoading ? (
                        <CircularProgress size={26} className={classes.loginLoader} />
                      ) : (
                        <Controls.Button
                            type="submit"
                            disabled={
                              RenterFormik.isSubmitting,
                              RenterFormik.values.first_name.length === 0 || RenterFormik.values.last_name.length === 0 || RenterFormik.values.phone.length === 0 ||
                              RenterFormik.values.email.length === 0 || RenterFormik.values.role.length === 0 || RenterFormik.values.password.length === 0 || RenterFormik.values.password2.length === 0
                            }
                            text="Sign Up"
                        />
                      )}
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick = {RenterFormik.resetForm}
                        />
                    </div> 
                </Grid>
                </Grid>
              </Form>
            </React.Fragment>
          )}
        </div>
        <Typography color="primary" className={classes.copyright}>
        ?? {new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://www.linkedin.com/in/md-abdul-alim-milon/" rel="noopener noreferrer" target="_blank">Design & Develop by <span style={{color: "purple"}}>Md. Abdul Alim</span></a>
        </Typography>
        <Typography color="black" className={classes.pmscs}>
          Batch: <span style={{color: "green"}}>PMSCS 26</span>
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
