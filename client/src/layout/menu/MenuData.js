const menu = [
  {
    icon: "dashlite",
    text: "Dashboard",
    link: "/",
  },
  {
    heading: "Departments: ",
  },
  {
    icon: "tile-thumb",
    text: "Finance",
    active: false,
    subMenu: [
      {
        text: "Activities",
        link: "/finance",
      },
      {
        text: "Balance Sheet",
        link: "/balance1",
      },
      {
        text: "Score",
        link: "/b2",
      },
    ],
  },
  {
    icon: "users",
    text: "Adovocacy",
    active: false,
    subMenu: [
      {
        text: "Compaign Activities",
        link: "/adovocacy",
      },
      {
        text: "Balance Sheet",
        link: "/b2",
      },
      {
        text: "Score",
        link: "/b3",
      },
      
    ],
  },
  {
    icon: "file-docs",
    text: "Operations",
    active: false,
    subMenu: [
      {
        text: "Operations",
        link: "/operation",
      },
      {
        text: "Balance Sheet",
        link: "/c1",
      },
    ],
  },
  {
    heading: "Transactions: ",
  },
  {
    icon: "tranx",
    text: "Transactions",
    active: false,
    subMenu: [
      {
        text: "Trans List - Basic",
        link: "/transaction-basic",
      },
      {
        text: "Score",
        link: "/c2",
      },
    ],
  },
  {
    heading: "Users: ",
  },
  {
    icon: "users",
    text: "User management",
    active: false,
    subMenu: [
      {
        text: "User List",
        link: "/user-list-compact",
      },
      {
        text: "Score",
        link: "/sa",
      },
      
    ],
  },
  
];
export default menu;
