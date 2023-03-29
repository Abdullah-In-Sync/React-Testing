import ApartmentIcon from "@mui/icons-material/Apartment";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChatIcon from "@mui/icons-material/Chat";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import DescriptionIcon from "@mui/icons-material/Description";
import DifferenceIcon from "@mui/icons-material/Difference";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import StraightenIcon from "@mui/icons-material/Straighten";
import StyleIcon from "@mui/icons-material/Style";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import TungstenIcon from "@mui/icons-material/Tungsten";
import { Box } from "@mui/system";
import SideBar from "./sideBar";

const TemplateArrow = () => {
  const onClickEvent = (e) => {
    console.log("clicked", e);
  };
  const iconItems = [
    <ApartmentIcon style={{ padding: "2px" }} onClick={onClickEvent} />,
    <AppRegistrationIcon style={{ padding: "2px" }} onClick={onClickEvent} />,
    <AutoStoriesIcon style={{ padding: "2px" }} onClick={onClickEvent} />,
    <CalendarMonthIcon style={{ padding: "2px" }} onClick={onClickEvent} />,
    <ChatIcon style={{ padding: "2px" }} onClick={onClickEvent} />,
    <ConnectWithoutContactIcon
      style={{ padding: "2px" }}
      onClick={onClickEvent}
    />,
    <ContactPhoneIcon style={{ padding: "2px" }} onClick={onClickEvent} />,
  ];
  return (
    <Box
      sx={{ display: "flex", flexDirection: "row" }}
      style={{ border: "1px solid #cecece", borderRadius: "7px" }}
    >
      <SideBar iconItems={iconItems} />
      <Box
        style={{
          height: "500px",
          width: "100%",
          alignItems: "center",
          marginRight: "5px",
        }}
      >
        drop area
      </Box>
    </Box>
    // <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "row",
    //     border: "1px solid #cecece",
    //     borderRadius: "7px",
    //   }}
    // >
    //   <div
    //     style={{
    //       height: "500px",
    //       width: "30px",
    //       alignItems: "center",
    //       background: "#dadada52",
    //       border: "1px solid #cecece",
    //       textAlign: "center",
    //     }}
    //   >
    //     <ApartmentIcon style={{ padding: "2px" }} />
    //     <AppRegistrationIcon style={{ padding: "2px" }} />
    //     <AutoStoriesIcon style={{ padding: "2px" }} />
    //     <CalendarMonthIcon style={{ padding: "2px" }} />
    //     <ChatIcon style={{ padding: "2px" }} />
    //     <ConnectWithoutContactIcon style={{ padding: "2px" }} />
    //     <ContactPhoneIcon style={{ padding: "2px" }} />
    //   </div>
    //   <div
    //     style={{
    //       height: "500px",
    //       width: "100%",
    //       alignItems: "center",
    //       marginRight: "5px",
    //     }}
    //   >
    //     drop area
    //   </div>
    // </div>
  );
};
export default TemplateArrow;
