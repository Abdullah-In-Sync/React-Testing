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

const TherapyTabsGenerator = (props: propTypes) => {
  const router = useRouter();
  const { tabsList, activeTabs, editable, onTabChange } = props;
  const [activeTab, setActiveTab] = useState(activeTabs);

  const tabType = router?.query.tab as string;

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (router?.query.tabName) {
      setActiveTab(router.query.tabName);
    }
  }, []);

  useEffect(() => {
    /* istanbul ignore next */
    onTabChange?.(activeTab);
    const redirectUrl =
      tabsList &&
      tabsList?.find((list) => list.value === activeTab)?.redirectUrl;
    /* istanbul ignore next */
    if (redirectUrl) {
      window.location.href = redirectUrl;
      // router?.push(redirectUrl);
    }
  }, [activeTab]);

  useEffect(() => {
    if (tabType === "feedback") {
      setActiveTab("feedback");
    }
    if (tabType === "resources") {
      setActiveTab("resources");
    }
  }, []);

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
                  margin: "0px 5px",
                  color: "white",
                  backgroundColor: isActive ? "#689c8b" : "#6EC9DB",
                  font: "16px",
                  fontWeight: 600,
                  borderRadius: "5px ",
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

export default TherapyTabsGenerator;
