import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import FeedbackIcon from "@mui/icons-material/Feedback";
import GroupsIcon from "@mui/icons-material/Groups";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import MonitorOutlinedIcon from "@mui/icons-material/MonitorOutlined";
import PersonIcon from "@mui/icons-material/Person";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SettingsIcon from "@mui/icons-material/Settings";
import TungstenIcon from "@mui/icons-material/Tungsten";

import { SpaOutlined } from "@mui/icons-material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LockPersonIcon from "@mui/icons-material/LockPerson";

type RoutesType =
  | {
      key: number;
      label: string;
      path: string;
      icon: JSX.Element;
      showNow?: number;
      type?: string;
      moduleName?: string;
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
    path: "/admin/dashboard",
    icon: <HomeIcon />,
    moduleName: "default",
  },
  {
    key: 2,
    label: "Organization",
    path: "/admin/organization/list",
    icon: <GroupsIcon />,
    moduleName: "Organization",
  },
  {
    key: 3,
    label: "Therapies",
    path: "/admin/therapies?mainTab=therapy",
    icon: <PersonIcon />,
    moduleName: "Therapies",
  },
  {
    key: 4,
    label: "Access Control Listing",
    path: "/admin/accessControl",
    icon: <LockPersonIcon />,
    moduleName: "Access Control Listing",
  },
  {
    key: 5,
    label: "Therapist",
    path: "/admin/therapist/list",
    icon: <PsychologyIcon />,
    moduleName: "Therapist",
  },

  {
    key: 6,
    label: "Library",
    path: "/admin/resource",
    icon: <LibraryBooksIcon />,
    moduleName: "Library",
  },
  {
    key: 7,
    label: "Assessment",
    path: "/admin/assessment",
    icon: <MedicalInformationOutlinedIcon />,
    moduleName: "Assessment",
  },
  {
    key: 8,
    label: "Relapse",
    path: "/admin/relapsePlan",
    icon: <TungstenIcon />,
    moduleName: "Relapse",
  },
  {
    key: 9,
    label: "Safety Plan",
    path: "/admin/safetyPlan/",
    icon: <HealthAndSafetyOutlinedIcon />,
    moduleName: "Safety Plan",
  },
  {
    key: 10,
    label: "Measures",
    path: "/admin/measures",
    icon: <EqualizerIcon />,
    moduleName: "Measures",
  },
  {
    key: 11,
    label: "Monitors",
    path: "/admin/monitor",
    icon: <MonitorOutlinedIcon />,
    moduleName: "Monitors",
  },
  {
    key: 12,
    label: "Feedback",
    path: "/admin/feedback",
    icon: <FeedbackIcon />,
    moduleName: "Feedback",
  },
  {
    key: 13,
    label: "Agenda",
    path: "/admin/agenda",
    icon: <AppRegistrationIcon />,
    moduleName: "Agenda",
  },
  {
    key: 15,
    label: "Users",
    path: "/admin/customUsers",
    icon: <GroupsIcon />,
    moduleName: "Users",
  },
];

//** THERAPIST ROUTES **//
export const therapistRoutes: RoutesType[] = [
  {
    key: 1,
    label: "Home",
    path: "/therapist/dashboard",
    icon: <HomeIcon />,
    moduleName: "default",
  },
  {
    key: 2,
    label: "Patients",
    // path: Link + "/therapist/patient/list",
    path: "/therapist/patientlist",
    icon: <GroupsIcon />,
    moduleName: "default",
  },
  {
    key: 4,
    label: "Library",
    path: "/therapist/resource",
    icon: <LibraryBooksIcon />,
    moduleName: "Library",
  },
  {
    key: 5,
    label: "Settings",
    path: "/therapist/settings/?mainTab=profile",
    icon: <SettingsIcon />,
    moduleName: "Settings",
  },
  {
    key: 6,
    label: "Users",
    path: "/therapist/userList",
    icon: <GroupsIcon />,
    moduleName: "Users",
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
    moduleName: "default",
  },
  {
    key: 2,
    label: "My Profile",
    path: "/patient/view",
    icon: <PersonIcon />,
    type: "MY_PROFILE",
    moduleName: "Profile",
  },
  {
    key: 3,
    label: "Assessment",
    path: "/patient/assessment",
    icon: <MedicalInformationOutlinedIcon />,
    type: "APPOINTMENT",
    moduleName: "Assessment",
  },
  {
    key: 4,
    label: "Therapy",
    path: "/patient/therapy/?mainTab=therapy",
    icon: <SpaOutlined />,
    type: "THERAPY",
    moduleName: "Therapy",
  },
  {
    key: 4,
    label: "Files",
    path: "/patient/files/?mainTab=files",
    icon: <DescriptionOutlinedIcon />,
    type: "FILES",
    moduleName: "Files",
  },
  {
    key: 5,
    label: "Users",
    path: "/patient/users",
    icon: <GroupsIcon />,
    type: "FILES",
    moduleName: "Users",
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
