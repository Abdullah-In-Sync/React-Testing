import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { useRouter } from "next/router";
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

type propTypes = {
  tabsList: any;
  activeTabs: any;
  editable?: boolean;
  onTabChange?: any;
};

const TabsGenerator = (props: propTypes) => {
  const router = useRouter();
  const { tabsList, activeTabs, editable, onTabChange } = props;
  const [activeTab, setActiveTab] = useState(activeTabs);
  const { query: { index = activeTabs } = {} } = router || {};
  const tabLabel = "&index=";

  const handleTabChange = (_, newValue) => {
    router.push(`?mainTab=therapy&tab=resources${tabLabel}${newValue}`);
    if (!activeTab.includes(newValue)) setActiveTab(newValue);
  };

  useEffect(() => {
    if (router?.query.tabName) {
      setActiveTab(router.query.tabName);
    }
  }, []);
  useEffect(() => {
    setActiveTab(index);
  }, [index]);

  useEffect(() => {
    onTabChange?.(activeTab);
  }, [activeTab]);

  return (
    <div style={{ overflowX: "hidden" }}>
      {!editable && (
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
      )}

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
