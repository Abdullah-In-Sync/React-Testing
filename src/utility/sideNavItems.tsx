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
import TungstenIcon from "@mui/icons-material/Tungsten";

import { SpaOutlined } from "@mui/icons-material";

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
    path: "/admin/dashboard",
    icon: <HomeIcon />,
  },
  {
    key: 2,
    label: "Organization",
    path: "/admin/organization/list",
    icon: <GroupsIcon />, //<Diversity3Icon />,
  },
  {
    key: 3,
    label: "Therapist",
    path: "/admin/therapist/list",
    icon: <PsychologyIcon />,
  },
  {
    key: 4,
    label: "Library",
    path: "/admin/resource",
    icon: <LibraryBooksIcon />,
  },
  {
    key: 5,
    label: "Assesment",
    path: "/admin/assessment",
    icon: <MedicalInformationOutlinedIcon />,
  },
  {
    key: 6,
    label: "Relapse",
    path: "/admin/relapsePlan",
    icon: <TungstenIcon />,
  },
  {
    key: 7,
    label: "Safety Plan",
    path: "/admin/safetyPlan/",
    icon: <HealthAndSafetyOutlinedIcon />,
  },
  {
    key: 8,
    label: "Measures",
    path: "/admin/measures",
    icon: <EqualizerIcon />,
  },
  {
    key: 9,
    label: "Monitors",
    path: "/admin/monitor",
    icon: <MonitorOutlinedIcon />,
  },
  {
    key: 10,
    label: "Feedback",
    path: "/admin/feedback",
    icon: <FeedbackIcon />,
  },
];

//** THERAPIST ROUTES **//
export const therapistRoutes: RoutesType[] = [
  {
    key: 1,
    label: "Home",
    path: "/therapist/dashboard",
    icon: <HomeIcon />,
  },
  {
    key: 2,
    label: "Patients",
    // path: Link + "/therapist/patient/list",
    path: "/therapist/patientlist",
    icon: <GroupsIcon />,
  },
  {
    key: 4,
    label: "Library",
    path: "/therapist/resource",
    icon: <LibraryBooksIcon />,
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
    label: "Assessment",
    path: "/patient/assessment",
    icon: <MedicalInformationOutlinedIcon />,
    type: "APPOINTMENT",
  },
  {
    key: 4,
    label: "Therapy",
    path: "/patient/therapy/?mainTab=therapy&tab=safety-plan",
    icon: <SpaOutlined />,
    type: "THERAPY",
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
