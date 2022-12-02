import { Link } from "../lib/helpers/common";

//** SUPER ADMIN ROUTES **//
export const superadmin_routes = [
  {
    key: 1,
    label: "Change Password",
    path: Link + "/superadmin/dashboard?page=changepwd",
  },
  {
    key: 2,
    label: "Log Out",
    path: Link + "/account/logout",
  },
];

//** THERAPIST ROUTES **//
export const therapistRoutes = [
  {
    key: 1,
    label: "Change Password",
    path: Link + "/therapist/dashboard?page=changepwd",
  },
  {
    key: 2,
    label: "Log Out",
    path: Link + "/account/logout",
  },
];

//** PATINET ROUTES **//
export const patient_routes = [
  {
    key: 1,
    label: "Change Password",
    path: Link + "/patient/dashboard?page=changepwd",
  },
  {
    key: 2,
    label: "Log Out",
    path: Link + "/account/logout",
  },
];
