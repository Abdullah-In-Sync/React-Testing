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
  activeTabs: any;
  editable?: boolean;
  onTabChange?: any;
};

const TabsGeneratorTherapistPatient = (props: propTypes) => {
  const router = useRouter();
  const { tabsList, activeTabs, editable, onTabChange } = props;
  const [activeTab, setActiveTab] = useState(activeTabs);

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (router?.query.tabName) {
      setActiveTab(router.query.tabName);
    }
  }, []);

  useEffect(() => {
    onTabChange?.(activeTab);
  }, [activeTab]);

  return (
    <div style={{ overflowX: "hidden", minHeight: 500 }}>
      {!editable && (
        <Tabs
          data-testid="tabId"
          value={activeTab}
          indicatorColor="primary"
          textColor="primary"
          color="secondary"
          onChange={handleTabChange}
          style={{
            borderBottom: "2px solid #689c8b",
          }}
          TabIndicatorProps={{
            style: {
              height: 0,
            },
          }}
          aria-label="dashboard"
        >
          {tabsList.map(({ label, value }) => {
            const isActive = value.toLowerCase() === activeTab.toLowerCase();
            return (
              <Tab
                style={{
                  textTransform: "none",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  marginBottom: 0,
                  color: isActive ? "white" : "#9e9e9e",
                  backgroundColor: isActive ? `#689c8b` : "white",
                  font: "16px",
                  fontWeight: 600,
                  borderRadius: "5px 5px 0px 0px",
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
          activeTab === value && (
            <TabPanel key={value} value={value} index={value}>
              {component}
            </TabPanel>
          )
      )}
    </div>
  );
};

export default TabsGeneratorTherapistPatient;
