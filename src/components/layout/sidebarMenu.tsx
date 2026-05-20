import {
  FaHome,
  FaUsers,
  FaCog,
  FaChartBar,
  FaUser,
  FaShoppingCart,
  FaHeadset,
} from "react-icons/fa";

export const adminMenu = [
  {
    label: "Dashboard",
    path: "/dashboard/admin",
    icon: <FaHome />,
  },
  {
    label: "Users",
    path: "/dashboard/admin/users",
    icon: <FaUsers />,
  },
  {
    label: "Settings",
    path: "/dashboard/admin/settings",
    icon: <FaCog />,
  },
  {
    label: "Reports",
    path: "/dashboard/admin/reports",
    icon: <FaChartBar />,
  },
];

export const userMenu = [
  {
    label: "Dashboard",
    path: "/dashboard/user",
    icon: <FaHome />,
  },
  {
    label: "Profile",
    path: "/dashboard/user/profile",
    icon: <FaUser />,
  },
  {
    label: "Orders",
    path: "/dashboard/user/orders",
    icon: <FaShoppingCart />,
  },
  {
    label: "Support",
    path: "/dashboard/user/support",
    icon: <FaHeadset />,
  },
];
