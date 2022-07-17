import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Popup from "../../components/Controls/Popup";
import ProfileForm from './ProfileForm'
import axios from "axios";
import {
  Paper,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

function ProfileDetail(props) {

  const [openPopup, setOpenPopup] = useState(false);
  const [userData, setUserData] = useState([])
  const [profileData, setProfileData] = useState([])
  const [updateSignal, setUpdateSignal] = useState(null);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const AxiosHeader = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    },
  }

  async function fetchProfile() {

    try {
      await axios
        .get("/api/profile/", AxiosHeader)
        .then((res) => {
          setUserData(res.data.user);
          setProfileData(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const updateProfile = async (values, setSubmitting) => {

    try {
      await axios
        .put(`/api/profile/update/`, values, AxiosHeader)
        .then((resp) => {
          setUpdateSignal(resp.data);
          setSubmitting(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const addOrEdit = (userData, setSubmitting) => {
    updateProfile(userData, setSubmitting);
    setOpenPopup(false);
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };

  useEffect(() => {
    fetchProfile();
  }, [updateSignal]);


  return (
    <div>
      <Paper
        elevation={3}
        square={false}
        style={{ paddingTop: 6, margin: "16px" }}
      >
        <div>
          <Grid container alignItems="flex-start" spacing={5}>
            <Grid item md={6} sm={12} xs={12}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Name:</TableCell>
                    <TableCell align="right">{userData.get_full_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Email:</TableCell>
                    <TableCell align="right">{userData.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Phone:</TableCell>
                    <TableCell align="right">{userData.phone}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Birthday:</TableCell>
                    <TableCell align="right">{userData.birthday_date}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>NID:</TableCell>
                    <TableCell align="right">{userData.nid}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Passport:</TableCell>
                    <TableCell align="right">{userData.passport}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Married Status:</TableCell>
                    <TableCell align="right">{userData.married_status_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Occupation:</TableCell>
                    <TableCell align="right">{userData.occupation}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Occupation Institution:</TableCell>
                      <TableCell align="right">{userData.occupation_institution}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Religion:</TableCell>
                      <TableCell align="right">{userData.religion_name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Education Qualification:</TableCell>
                      <TableCell align="right">{userData.education_qualification}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Present Address:</TableCell>
                      <TableCell align="right">{userData.present_address}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Permanent Address:</TableCell>
                      <TableCell align="right">{userData.permanent_address}</TableCell>
                    </TableRow>
                    {/* <TableRow>
                      <TableCell>Previous House Owner:</TableCell>
                      <TableCell align="right">{profileData.previous_house_owner_name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Present House Owner:</TableCell>
                      <TableCell align="right">{profileData.present_house_owner_name}</TableCell>
                    </TableRow> */}
                    <TableRow>
                      <TableCell>Rent Of Date:</TableCell>
                      <TableCell align="right">{profileData.rent_of_date}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item md={4} sm={4} xs={4}></Grid>
            <Grid item md={4} sm={4} xs={4} style={{'text-align': 'center'}}>
                <Button
                  variant="contained"
                  color="primary"
                  className="mr-4 py-2"
                  style={{marginBottom: "5px"}}
                  onClick={() => {
                    setOpenPopup(true);
                  }}
                >
                  Update
                </Button>
            </Grid>
            <Grid item md={4} sm={4} xs={4}>
              <Popup title="Profile update" openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <ProfileForm addOrEdit={addOrEdit} userData={userData}/>
              </Popup>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
}

export default ProfileDetail;
