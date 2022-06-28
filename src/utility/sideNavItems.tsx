import * as React from "react";
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonIcon from '@mui/icons-material/Person';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import StyleIcon from '@mui/icons-material/Style';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import BadgeIcon from '@mui/icons-material/Badge';
import StraightenIcon from '@mui/icons-material/Straighten';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DifferenceIcon from '@mui/icons-material/Difference';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TungstenIcon from '@mui/icons-material/Tungsten';

export const routes = [
  { label: "Home", path: "/home", icon: <HomeIcon /> },
  [
    { label: "Hospital", path: "/hospital", icon: <ApartmentIcon /> },
    { label: "Therapist", path: "/therapist", icon: <PersonIcon /> }
  ],
  { label: "Package", path: "/package", icon: <PersonIcon /> },
  { label: "Organization", path: "/organization", icon: <CorporateFareIcon /> },
  { label: "Therapies", path: "/therapies", icon: <PersonIcon /> },
  [
    { label: "Users", path: "/Users", icon: <PersonIcon /> },
    { label: "Library", path: "/library", icon: <LibraryBooksIcon /> },
    { label: "Formulation", path: "/formulation", icon: <FactCheckIcon /> }
  ],
  { label: "Risks", path: "/risks", icon: <CrisisAlertIcon /> },
  { label: "Keywords", path: "/keywords", icon: <StyleIcon /> },
  [ 
    { label: "Clinical Analysis", path: "/clinical-analysis", icon: <MedicalInformationIcon /> },
    { label: "Safety Plan", path: "/safety-plan", icon: <BadgeIcon /> },
    { label: "Measures", path: "/measures", icon: <StraightenIcon /> },
    { label: "Monitor", path: "/monitor", icon: <EqualizerIcon /> },
    { label: "Feedback", path: "/feedback", icon: <ThumbUpAltIcon /> },
    { label: "Agenda", path: "/agenda", icon: <AppRegistrationIcon /> },
    { label: "Contacts", path: "/contacts", icon: <ContactPhoneIcon /> },
    { label: "Diary", path: "/diary", icon: <AutoStoriesIcon /> },
    { label: "CPD", path: "/cpd", icon: <DifferenceIcon /> }
  ],
  { label: "File", path: "/file", icon: <FilePresentIcon /> },
  { label: "TODOs", path: "todo", icon: <ListAltIcon /> },
  { label: "Relapse", path: "/relapse", icon: <TungstenIcon /> },
];

//   {
//     label: 'Dashboard',
//     icon: dashboardIcon,
//     path: '/dashboard',
//     key: 'sa_dashbaord',
//     onlySA: false,
//     component: Dashboard,
//     visible: false,
//     background: false,
// },


// export const routes = [
//   { label: "Home", path: "/home" ,icon:<HomeIcon/>},
//   { label: "Calender", path: "/calender",icon:<MailIcon/> },
//   { label: "Patients", path: "/Patients" },
//   { label: "Library", path: "/Library" },
//   { label: "Connect", path: "/connect" },
//   { label: "Packages", path: "/packages" },
//   { label: "Settings", path: "/settings" }
// ];


