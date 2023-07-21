/* istanbul ignore file */
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      className="mb20"
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
  defaultTabs?: { [key: string]: string };
};

const TabsGeneratorTherapistPatient = (props: propTypes) => {
  const router = useRouter();
  const {
    tabsList,
    activeTabs,
    editable,
    tabLabel = "?mainTab=",
    defaultTabs,
  } = props;
  const [activeTab, setActiveTab] = useState<Array<string>>([]);
  const { query: { mainTab = "", mainSubTab1 = "" } = {} } = router || {};

  const handleTabChange = async (_, { value: newValue, redirectUrl }) => {
    if (redirectUrl) {
      document.location.href = redirectUrl;
      return;
    }
    const { [newValue]: tabName = "" } = activeTabs || {};
    router.push(
      `${tabLabel}${newValue}${tabName}${
        defaultTabs[newValue] ? defaultTabs[newValue] : ""
      }`
    );
    if (!activeTab.includes(newValue)) setActiveTab([newValue]);
  };

  useEffect(() => {
    setActiveTab([mainTab as string, mainSubTab1 as string]);
  }, [mainTab]);

  return (
    <div style={{ overflowX: "hidden" }}>
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
          {tabsList.map((item) => {
            const { label, value } = item;
            const isActive = activeTab.includes(value);
            return (
              <Tab
                style={{
                  textTransform: "none",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  marginBottom: 0,
                  color: isActive ? "white" : "#9e9e9e",
                  backgroundColor: isActive ? `#689c8b` : "white",
                  fontSize: "16px",
                  borderRadius: "5px 5px 0px 0px",
                }}
                key={value}
                value={item}
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

export default TabsGeneratorTherapistPatient;
