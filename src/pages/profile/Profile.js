import React from "react";
import Grid from "@material-ui/core/Grid";
import ProfileUpdateForm from "./ProfileUpdateForm";
import ProfileDetail from './ProfileDetail'
import FamilyMember from "./FamilyMember";
import EmergencyContact from "./EmergencyContact";
import Cleaner from "./Cleaner";
import Driver from "./Driver";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";

function Profile() {
  return (
    <div>
      <BreadCrumb routeSegments={[{ name: "Profile" }]} />
          <Grid container>
                <Grid item md={4} sm={12} xs={12}>
                    <ProfileDetail/>
                </Grid>
                <Grid container item md={8} sm={12} xs={12}>
                  <Grid item md={6} sm={6} xs={12}>
                    <FamilyMember/>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <EmergencyContact/>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <Cleaner/>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <Driver/>
                  </Grid>
                </Grid>
            </Grid>
    </div>
  );
}

export default Profile;
