import { useQuery } from "@apollo/client";
import { GET_MASTER_DATA } from "../../../../../graphql/Therapist/graphql";

export const queryMasterData = () => {
  const specializationQuery = useQuery(GET_MASTER_DATA, {
    variables: {
      name: "specialization",
    },
  });
  const professionalQuery = useQuery(GET_MASTER_DATA, {
    variables: {
      name: "professional",
    },
  });
  return [specializationQuery, professionalQuery];
};
