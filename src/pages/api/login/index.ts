import { Amplify, Auth } from "aws-amplify";
const { COGNITO_REGION, COGNITO_APP_CLIENT_ID, COGNITO_USER_POOL_ID } =
  process.env;

/* istanbul ignore next */
Amplify.configure({
  Auth: {
    region: COGNITO_REGION,
    userPoolId: COGNITO_USER_POOL_ID,
    userPoolWebClientId: COGNITO_APP_CLIENT_ID,
  },
});

/* istanbul ignore next */
const handler = async (req, res) => {
  const authParameters = {
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const response = await Auth.signIn(authParameters);
    const {
      signInUserSession: {
        accessToken: { jwtToken, payload },
      },
    } = response;
    return res.status(200).json({
      jwtToken,
      userType: payload["cognito:groups"][0],
      exp: payload["exp"],
      iat: payload["iat"],
    });
  } catch (error) {
    return res.status(403).json({ error, message: error.message });
  }
};

export default handler;
