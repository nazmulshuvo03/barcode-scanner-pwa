import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    padding: "30px",
    [theme.breakpoints.down("sm")]: {
      padding: "6px",
    },
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const { children } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Dynamic boundary Cam" {...a11yProps(0)} />
          <Tab label="Fixed boundary Cam" {...a11yProps(1)} />
          <Tab label="QR Scanner Cam" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      {children.map((child, index) => (
        <TabPanel value={value} index={index}>
          <div className={classes.container}>{child}</div>
        </TabPanel>
      ))}
    </div>
  );
}
