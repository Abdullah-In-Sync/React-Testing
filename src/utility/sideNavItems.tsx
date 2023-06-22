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

import { Link } from "../lib/helpers/common";

type RoutesType =
  | {
      key: number;
      label: string;
      path: string;
      icon: JSX.Element;
      showNow?: number;
      type?: string;
    }
  | {
      key: number;
      label: string;
      path: string;
      icon: JSX.Element;
      showNow?: number;
      type?: string;
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
    path: "/admin/organization/list",
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
      key: 15,
      label: "Assesment",
      path: "/admin/assessment",
      icon: <EqualizerIcon />,
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
      path: "/admin/safetyPlan/",
      icon: <BadgeIcon />,
    },
    {
      key: 14,
      label: "Measures",
      path: "/admin/measures",
      icon: <StraightenIcon />,
    },
    {
      key: 15,
      label: "Monitor",
      path: "/admin/monitor",
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
      path: "/admin/relapsePlan",
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

export const btb_actions_patient_routes: RoutesType[] = [
  {
    key: 1,
    label: "Home",
    path: "/patient/course",
    icon: <HomeIcon />,
    showNow: 1,
    type: "CBT_COURSE",
  },
  {
    key: 2,
    label: "Service Agreement",
    path: "/patient/view",
    icon: <PersonIcon />,
    type: "MY_PROFILE",
  },
];

//** PATIENT ROUTES **//
export const patient_routes: RoutesType[] = [
  {
    key: 1,
    label: "Home",
    path: "/patient/home",
    icon: <HomeIcon />,
    showNow: 1,
    type: "MYHELP_HOME",
  },
  {
    key: 2,
    label: "My Profile",
    path: "/patient/view",
    icon: <PersonIcon />,
    type: "MY_PROFILE",
  },
  {
    key: 3,
    label: "Appointments",
    path: Link + "/patient/appointments",
    icon: <CalendarMonthIcon />,
    type: "APPOINTMENT",
  },

  {
    key: 4,
    label: "Therapy",
    path: "/patient/therapy/?tab=safety-plan",
    icon: <NewspaperIcon />,
    type: "THERAPY",
  },
  {
    key: 5,
    label: "Communication",
    path: Link + "/patient/communication/1",
    icon: <ChatIcon />,
    type: "COMMUNICATION",
  },
  {
    key: 6,
    label: "Assessment",
    path: "/patient/assessment",
    icon: <CalendarMonthIcon />,
    type: "APPOINTMENT",
  },
];

export const default_patient_routes: RoutesType[] = [
  {
    key: 1,
    label: "Home",
    path: "/patient/home",
    icon: <HomeIcon />,
    showNow: 1,
  },
  {
    key: 2,
    label: "My Profile",
    path: "/patient/view",
    icon: <PersonIcon />,
  },
];
