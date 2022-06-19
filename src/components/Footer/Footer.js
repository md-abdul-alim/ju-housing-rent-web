import React from "react";
import { Box, Button } from "@material-ui/core";
import classnames from "classnames";

// styles
import useStyles from "../Layout/styles";



export default function Footer({ theme }) {
  var classes = useStyles();

  return (
    <Box width={1}>
      <div
        className={`footer flex flex-middle ${classnames(classes.fixedBottom)}`}
      >
        <div className="flex flex-middle container px-sm-30 w-100">
            <p className="m-0">PMSCS Batch:  
            <Button variant="contained" color="Primary">
              26
            </Button>
            </p>
            
          <span className="m-auto"></span>
          <p className="m-0" style={{textAlign: 'right'}}>
            Design and Developed by{" "}
            <a href="https://www.linkedin.com/in/md-abdul-alim-milon/" target="_blank">
              <Button variant="contained" color="secondary">
                Md. Abdul Alim
              </Button>
            </a>
          </p>
        </div>
      </div>
    </Box>
  );
}
