const adminSidebarRoutes = [
  {
    id: 1,
    path: "/admin/dashboard",
    name: "Dashboard",
    icon: "fas fa-tv ",
  },
  {
    id: 2,
    path: "/admin/settings",
    name: "Settings",
    icon: "fas fa-tools ",
  },
  {
    id: 3,
    path: "/admin/tables",
    name: "Tables",
    icon: "fas fa-table ",
  },
  {
    id: 4,
    path: "/admin/brands",
    name: "Brands",
    icon: "fas fa-tag ",
    options: [
      {
        id: 4.1,
        path: "/admin/brands/add",
        name: "Add Brand",
        icon: "fas fa-plus ",
      },
      {
        id: 4.2,
        path: "/admin/brands/all",
        name: "All Brands",
        icon: "fas fa-tag ",
      },
    ],
  },
  {
    id: 5,
    path: "/admin/categories",
    name: "Categories",
    icon: "fas fa-tag ",
    options: [
      {
        id: 4.1,
        path: "/admin/categories/add",
        name: "Add categories",
        icon: "fas fa-plus ",
      },
      {
        id: 4.2,
        path: "/admin/categories/all",
        name: "All categories",
        icon: "fas fa-tag ",
      },
    ],
  },
  {
    id: 6,
    path: "/admin/products",
    name: "Products",
    icon: "fas fa-tag ",
    options: [
      {
        id: 4.1,
        path: "/admin/products/add",
        name: "Add products",
        icon: "fas fa-plus ",
      },
      {
        id: 4.2,
        path: "/admin/products/all",
        name: "All products",
        icon: "fas fa-tag ",
      },
    ],
  },
];

const authSidebarRoutes = [
  {
    id: 1,
    path: "/auth/login",
    name: "Login",
    icon: "fas fa-fingerprint",
  },
  {
    id: 2,
    path: "/auth/register",
    name: "Register",
    icon: "fas fa-clipboard-list",
  },
];

export { adminSidebarRoutes, authSidebarRoutes };
