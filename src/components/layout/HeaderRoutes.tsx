export const headerRoutes = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "*",
    submenu: [
      { label: "Company", path: "/about/company" },
      { label: "Team", path: "/about/team" },
    ],
  },
  {
    label: "Service",
    path: "/service",
  },
  {
    label: "Product",
    path: "/product",
    requiresAuth: true,
  },
  // {
  //   label: "Login",
  //   path: "/login",
  // },
];
