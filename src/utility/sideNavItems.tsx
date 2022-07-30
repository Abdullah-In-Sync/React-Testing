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

//** SUPER ADMIN ROUTES **//
export const superadmin_routes = [
  { key:1,label: "Home", path: "/dashboard", icon: <HomeIcon /> },
  [
    { key:2,label: "Hospital", path: "/hospital", icon: <ApartmentIcon /> },
    { key:3,label: "Therapist", path: "/therapist", icon: <PersonIcon /> }
  ],
  { key:4,label: "Package", path: "/package", icon: <PersonIcon /> },
  { key:5,label: "Organization", path: "/organization", icon: <CorporateFareIcon /> },
  { key:6,label: "Therapies", path: "/therapies", icon: <PersonIcon /> },
  [
    { key:7,label: "Users", path: "/Users", icon: <PersonIcon /> },
    { key:8,label: "Library", path: "/library", icon: <LibraryBooksIcon /> },
    { key:9,label: "Formulation", path: "/formulation", icon: <FactCheckIcon /> }
  ],
  { key:10,label: "Risks", path: "/risks", icon: <CrisisAlertIcon /> },
  { key:11,label: "Keywords", path: "/keywords", icon: <StyleIcon /> },
  [
    { key:12,label: "Clinical Analysis", path: "/clinical-analysis", icon: <MedicalInformationIcon /> },
    { key:13,label: "Safety Plan", path: "/clinical-analysis/safety-plan", icon: <BadgeIcon /> },
    { key:14,label: "Measures", path: "/measures", icon: <StraightenIcon /> },
    { key:15,label: "Monitor", path: "/monitor", icon: <EqualizerIcon /> },
    { key:16,label: "Feedback", path: "/clinical-analysis/feedback", icon: <ThumbUpAltIcon /> },
    { key:17,label: "Agenda", path: "/agenda", icon: <AppRegistrationIcon /> },
    { key:18,label: "Contacts", path: "/contacts", icon: <ContactPhoneIcon /> },
    { key:19,label: "Diary", path: "/diary", icon: <AutoStoriesIcon /> },
    { key:20,label: "CPD", path: "/cpd", icon: <DifferenceIcon /> }
  ],
  { key:21,label: "File", path: "/file", icon: <FilePresentIcon /> },
  [{ key:22,label: "TODOs", path: "todo", icon: <ListAltIcon /> },
  { key:23, label:"Relapse", path: "/relapse", icon: <TungstenIcon /> }],
];


