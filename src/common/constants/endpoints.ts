export const endpoints = {
  auth: {
    login: "/auth/login",
  },
  user: {
    root: "/user",
    me: "/user/me",
    register: "/user/register",
  },
  assin: {
    root: "/assin",
  },
  documents: {
    root: "/documents",
    byId: (id: string | number) => `/documents/${id}`,
    assign: "/documents/assign",
  },
};
