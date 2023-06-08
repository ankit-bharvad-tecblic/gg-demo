// import
import Dashboard from "views/Dashboard/Dashboard";
// import Tables from "views/Dashboard/Tables";
// import Billing from "views/Dashboard/Billing";
// import RTLPage from "views/Dashboard/RTL";
// import Profile from "views/Dashboard/Profile";
// import SignIn from "views/Auth/SignIn.js";
// import SignUp from "views/Auth/SignUp.js";

import {
  HomeIcon,
  StatsIcon,
  // CreditIcon,
  // PersonIcon,
  // DocumentIcon,
  // RocketIcon,
  // SupportIcon,
} from "components/Icons/Icons";
import FunctionalTable from "components/Tables/FunctionalTable";
import ZoneMaster from "views/ZoneMaster";
import StateMaster from "views/StateMaster";
import DistrictMaster from "views/DistrictMaster";
import AreaMaster from "views/AreaMaster";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/zone-master",
    name: "Zone master",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: ZoneMaster,
    layout: "/admin",
  },
  {
    path: "/state-master",
    name: "State master",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: StateMaster,
    layout: "/admin",
  },
  {
    path: "/district-master",
    name: "District master",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: DistrictMaster,
    layout: "/admin",
  },
  {
    path: "/area-master",
    name: "Area master",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: AreaMaster,
    layout: "/admin",
  },
  // {
  //   path: "/area-master",
  //   name: "Area master",
  //   rtlName: "لوحة القيادة",
  //   icon: <StatsIcon color="inherit" />,
  //   component: CmdMaster,
  //   layout: "/admin",
  // },
  // {
  //   path: "/billing",
  //   name: "Billing",
  //   rtlName: "لوحة القيادة",
  //   icon: <CreditIcon color="inherit" />,
  //   component: Billing,
  //   layout: "/admin",
  // },
  // {
  //   path: "/rtl-support-page",
  //   name: "RTL",
  //   rtlName: "آرتيإل",
  //   icon: <SupportIcon color="inherit" />,
  //   component: RTLPage,
  //   layout: "/rtl",
  // },
  // {
  //   name: "ACCOUNT PAGES",
  //   category: "account",
  //   rtlName: "صفحات",
  //   state: "pageCollapse",
  //   views: [
  //     {
  //       path: "/profile",
  //       name: "Profile",
  //       rtlName: "لوحة القيادة",
  //       icon: <PersonIcon color="inherit" />,
  //       secondaryNavbar: true,
  //       component: Profile,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/signin",
  //       name: "Sign In",
  //       rtlName: "لوحة القيادة",
  //       icon: <DocumentIcon color="inherit" />,
  //       component: SignIn,
  //       layout: "/auth",
  //     },
  //     {
  //       path: "/signup",
  //       name: "Sign Up",
  //       rtlName: "لوحة القيادة",
  //       icon: <RocketIcon color="inherit" />,
  //       secondaryNavbar: true,
  //       component: SignUp,
  //       layout: "/auth",
  //     },
  //   ],
  // },
];
export default dashRoutes;
