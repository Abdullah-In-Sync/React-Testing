/* istanbul ignore file */
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
  activeTabs?: any;
  editable?: boolean;
  onTabChange?: any;
  loadFromUrl?: boolean;
  tabLabel?: string;
};

const TherapyTabsGenerator = (props: propTypes) => {
  const router = useRouter();
  const { tabsList, activeTabs = "", editable, tabLabel = "?tab=" } = props;
  const [activeTab, setActiveTab] = useState<Array<string>>([]);
  const { query: { tab = "", subTab1 = "" } = {} } = router || {};

  const handleTabChange = async (_, newValue) => {
    const { [newValue]: tabName = "" } = activeTabs || {};
    router.push(`${tabLabel}${newValue}${tabName}`);
    if (!activeTab.includes(newValue)) setActiveTab([newValue]);
  };

  useEffect(() => {
    setActiveTab([tab as string, subTab1 as string]);
  }, [tab, subTab1]);

  return (
    <div style={{ overflowX: "hidden", minHeight: 500 }}>
      {!editable && (
        <Tabs
          data-testid="tabId"
          value={activeTab}
          indicatorColor="primary"
          textColor="primary"
          color="secondary"
          // style={{ height: "32px" }}
          onChange={handleTabChange}
          TabIndicatorProps={{
            style: {
              height: 0,
            },
            sx: { display: "none" },
          }}
          sx={{
            "& .MuiTabs-flexContainer": {
              flexWrap: "wrap",
            },
          }}
          aria-label="dashboard"
        >
          {tabsList.map(({ label, value }) => {
            const isActive = activeTab.includes(value);
            return (
              <Tab
                style={{
                  textTransform: "none",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  margin: "3px 5px",
                  color: "white",
                  backgroundColor: isActive ? "#689c8b" : "#6EC9DB",
                  borderRadius: "5px",
                  height: 37,
                  fontSize: "14px",
                }}
                key={value}
                value={value}
                label={label}
              />
            );
          })}
        </Tabs>
      )}

      {/** Render tab screens here */}

      {tabsList.map(
        ({ value, component }) =>
          activeTab.includes(value) && (
            <TabPanel key={value} value={value} index={value}>
              {component}
            </TabPanel>
          )
      )}
    </div>
  );
};

export default TherapyTabsGenerator;
