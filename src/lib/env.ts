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
  cognito: {
    region: process.env.NEXT_PUBLIC_COGNITO_REGION,
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
    clientId: process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID,
  },
  rollbar: {
    accessToken: "4f3a122536834cf18716cbf016d2f837",
  },
  corpWebsite: {
    terms: "https://myhelp.co.uk/terms-of-use.html",
    cookies: "https://myhelp.co.uk/cookies-policy.html",
    privacy: "https://myhelp.co.uk/privacy-policy.html",
  },
};
