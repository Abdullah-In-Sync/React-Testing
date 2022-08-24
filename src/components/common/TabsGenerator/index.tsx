import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
};

const TabsGenerator = ({ tabsList, activeTabs }) => {
  const [activeTab, setActiveTab] = useState(activeTabs);

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div style={{ overflowX: "hidden", minHeight: 500 }}>
      <Tabs
        data-testid="tabId"
        value={activeTab}
        indicatorColor="primary"
        textColor="primary"
        color="secondary"
        // className={classes.root}
        onChange={handleTabChange}
        style={{
          marginBottom: "1rem",
          backgroundColor: "#f0f0f0",
          height: "30px",
          boxShadow: "1px 0px 6px 0px #9e9e9e",
        }}
        TabIndicatorProps={{
          style: {
            height: 5,
            backgroundColor: `palette.primary.main`,
          },
        }}
        aria-label="dashboard"
      >
        {tabsList.map(({ label, value }) => (
          <Tab
            style={{ outline: "none", textTransform: "none" }}
            key={value}
            value={value}
            label={label}
          />
        ))}
      </Tabs>

      {/** Render tab screens here */}

      {tabsList.map(
        ({ value, component }) =>
          activeTab === value && (
            <TabPanel key={value} value={value} index={value}>
              {component}
            </TabPanel>
          )
      )}
    </div>
  );
};

export default TabsGenerator;
