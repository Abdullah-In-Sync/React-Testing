import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonIcon from "@mui/icons-material/Person";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import StyleIcon from "@mui/icons-material/Style";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import BadgeIcon from "@mui/icons-material/Badge";
import StraightenIcon from "@mui/icons-material/Straighten";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import DifferenceIcon from "@mui/icons-material/Difference";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TungstenIcon from "@mui/icons-material/Tungsten";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import DescriptionIcon from "@mui/icons-material/Description";
import InventoryIcon from "@mui/icons-material/Inventory";
import SettingsIcon from "@mui/icons-material/Settings";
import StarsIcon from "@mui/icons-material/Stars";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PreviewIcon from "@mui/icons-material/Preview";
import ChatIcon from "@mui/icons-material/Chat";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";

import useStorage from "../components/common/hooks/useStorage";
import { Link } from "../lib/helpers/common";

const { getItem } = useStorage();
const patientId = getItem("patient_id");

type RoutesType =
  | {
      key: number;
      label: string;
      path: string;
      icon: JSX.Element;
      showNow?: number;
    }
  | {
      key: number;
      label: string;
      path: string;
      icon: JSX.Element;
      showNow?: number;
    }[];

//** SUPER ADMIN ROUTES **//
export const superadmin_routes: RoutesType[] = [
  {
    key: 1,
    label: "Home",
    path: Link + "/superadmin/dashboard",
    icon: <HomeIcon />,
  },
  [
    {
      key: 2,
      label: "Hospital",
      path: Link + "/superadmin/hospital/list",
      icon: <ApartmentIcon />,
    },
    {
      key: 3,
      label: "Therapist",
      path: Link + "/superadmin/therapist/list",
      icon: <PersonIcon />,
    },
  ],
  {
    key: 4,
    label: "Package",
    path: Link + "/superadmin/package/list",
    icon: <PersonIcon />,
  },
  {
    key: 5,
    label: "Organization",
    path: Link + "/superadmin/organization/list",
    icon: <CorporateFareIcon />,
  },
  {
    key: 6,
    label: "Therapies",
    path: Link + "/superadmin/therapies",
    icon: <PersonIcon />,
  },
  [
    {
      key: 7,
      label: "Users",
      path: Link + "/superadmin/users/list",
      icon: <PersonIcon />,
    },
    {
      key: 8,
      label: "Library",
      path: Link + "/v2/admin/resource",
      icon: <LibraryBooksIcon />,
    },
    {
      key: 9,
      label: "Formulation",
      path: Link + "/superadmin/formulationmodel",
      icon: <FactCheckIcon />,
    },
  ],
  {
    key: 10,
    label: "Risks",
    path: Link + "/superadmin/risks/list",
    icon: <CrisisAlertIcon />,
  },
  {
    key: 11,
    label: "Keywords",
    path: Link + "/superadmin/keywords/list",
    icon: <StyleIcon />,
  },
  [
    {
      key: 12,
      label: "Clinical Analysis",
      path: Link + "/superadmin/clinical-analysis",
      icon: <MedicalInformationIcon />,
    },
    {
      key: 13,
      label: "Safety Plan",
      path: Link + "/superadmin/safety/list",
      icon: <BadgeIcon />,
    },
    {
      key: 14,
      label: "Measures",
      path: Link + "/superadmin/measure",
      icon: <StraightenIcon />,
    },
    {
      key: 15,
      label: "Monitor",
      path: Link + "/superadmin/monitor/list",
      icon: <EqualizerIcon />,
    },
    {
      key: 16,
      label: "Feedback",
      path: Link + "/v2/admin/feedback",
      icon: <ThumbUpAltIcon />,
    },
    {
      key: 17,
      label: "Agenda",
      path: Link + "/superadmin/agenda/list",
      icon: <AppRegistrationIcon />,
    },
    {
      key: 18,
      label: "Contacts",
      path: Link + "/superadmin/contact/list",
      icon: <ContactPhoneIcon />,
    },
    {
      key: 19,
      label: "Diary",
      path: Link + "/superadmin/diary/list",
      icon: <AutoStoriesIcon />,
    },
    {
      key: 20,
      label: "CPD",
      path: Link + "/superadmin/cpd/list",
      icon: <DifferenceIcon />,
    },
  ],
  {
    key: 21,
    label: "File",
    path: Link + "/superadmin/patientfiles",
    icon: <FilePresentIcon />,
  },
  [
    {
      key: 22,
      label: "TODOs",
      path: Link + "/superadmin/patienttodo",
      icon: <ListAltIcon />,
    },
    {
      key: 23,
      label: "Relapse",
      path: Link + "/superadmin/relapse/list",
      icon: <TungstenIcon />,
    },
  ],
];

//** THERAPIST ROUTES **//
export const therapistRoutes: RoutesType[] = [
  {
    key: 1,
    label: "Home",
    path: Link + "/therapist/dashboard",
    icon: <HomeIcon />,
  },
  {
    key: 2,
    label: "Calendar",
    path: Link + "/therapist/calendar",
    icon: <CalendarMonthIcon />,
  },
  {
    key: 3,
    label: "Patients",
    path: Link + "/therapist/patient/list",
    icon: <PersonIcon />,
  },
  {
    key: 4,
    label: "Library",
    path: Link + "/v2/therapist/resource",
    icon: <LibraryBooksIcon />,
  },
  {
    key: 5,
    label: "Connect",
    path: Link + "/therapist/communication",
    icon: <ConnectWithoutContactIcon />,
  },
  {
    key: 6,
    label: "Contacts",
    path: Link + "/therapist/contact/list",
    icon: <ContactPhoneIcon />,
  },
  {
    key: 7,
    label: "Diary",
    path: Link + "/therapist/diary/list",
    icon: <DescriptionIcon />,
  },
  {
    key: 8,
    label: "CPD",
    path: Link + "/therapist/cpd/list",
    icon: <DifferenceIcon />,
  },
  {
    key: 9,
    label: "Packages",
    path: Link + "/therapist/packages",
    icon: <InventoryIcon />,
  },
  {
    key: 10,
    label: "Settings",
    path: Link + "/therapist/settings",
    icon: <SettingsIcon />,
  },
];

//** PATIENT ROUTES **//
export const patient_routes: RoutesType[] = [
  {
    key: 1,
    label: "Home",
    path: Link + "/patient/dashboard",
    icon: <HomeIcon />,
    showNow: 1,
  },
  {
    key: 2,
    label: "My Profile",
    path: "/patient/view/" + patientId,
    icon: <PersonIcon />,
  },
  {
    key: 3,
    label: "Appointments",
    path: Link + "/patient/appointments",
    icon: <CalendarMonthIcon />,
  },
  { key: 4, label: "Goals", path: Link + "/patient/goal", icon: <StarsIcon /> },
  {
    key: 5,
    label: "Safety Plan",
    path: Link + "/patient/safety_plan",
    icon: <BadgeIcon />,
  },
  [
    { key: 6, label: "Therapy", path: "/therapies", icon: <NewspaperIcon /> },
    {
      key: 7,
      label: "Homework",
      path: Link + "/patient/homework",
      icon: <HomeWorkIcon />,
    },
    {
      key: 8,
      label: "Relapse",
      path: Link + "/patient/relapse",
      icon: <HomeWorkIcon />,
    },
  ],
  [
    { key: 9, label: "Review", path: "/review", icon: <PreviewIcon /> },
    {
      key: 10,
      label: "Measures",
      path: Link + "/patient/measure/patientmeasure",
      icon: <PreviewIcon />,
    },
    {
      key: 11,
      label: "Monitoring",
      path: Link + "/patient/monitoring",
      icon: <PreviewIcon />,
    },
  ],
  {
    key: 12,
    label: "Resources",
    path: "/patient/resource",
    icon: <CrisisAlertIcon />,
  },
  [
    {
      key: 13,
      label: "Communication",
      path: "/communication",
      icon: <ChatIcon />,
    },
    {
      key: 14,
      label: "Video",
      path: Link + "/patient/communication/1",
      icon: <VideoCallIcon />,
    },
    {
      key: 15,
      label: "Audio",
      path: Link + "/patient/communication/2",
      icon: <HeadsetMicIcon />,
    },
    {
      key: 16,
      label: "Messages",
      path: Link + "/patient/communication/4",
      icon: <ChatIcon />,
    },
  ],
  {
    key: 17,
    label: "Feedback",
    path: "/patient/feedback",
    icon: <StyleIcon />,
  },
];

export const default_patient_routes: RoutesType[] = [
  {
    key: 1,
    label: "Home",
    path: Link + "/patient/dashboard",
    icon: <HomeIcon />,
    showNow: 1,
  },
  {
    key: 2,
    label: "My Profile",
    path: "/patient/view/" + patientId,
    icon: <PersonIcon />,
  },
];
