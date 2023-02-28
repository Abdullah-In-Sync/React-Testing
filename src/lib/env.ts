/* istanbul ignore file */
export const env = {
  which: process.env.NEXT_PUBLIC_ENVIRONMENT,
  graphql: {
    url: process.env.NEXT_PUBLIC_GRAPHQL_SERVER,
  },
  v1: {
    rootUrl: process.env.NEXT_PUBLIC_V1_ROOT_URL,
  },
  btb: {
    course1: {
      url: process.env.NEXT_PUBLIC_BTB_COURSE_1_URL,
    },
  },
  corpWebsite: {
    terms: "https://myhelp.co.uk/terms-of-use.html",
    cookies: "https://myhelp.co.uk/cookies-policy.html",
    privacy: "https://myhelp.co.uk/privacy-policy.html",
  },
};
