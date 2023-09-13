import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";

import { useAppContext } from "../../../../contexts/AuthContext";
import { GET_THERAPIST_BY_ID } from "../../../../graphql/Therapist/graphql";
import { TherapistData } from "../../../../graphql/Therapist/types";
import TherapistProfileView from "./TherapistProfileView";
import { queryMasterData } from "./hook/fetchDropdown";
import Loader from "../../../common/Loader";

const TherapistProfile: React.FC = () => {
  const { user: { _id: user_id } = {} } = useAppContext();
  const [specializationQuery, professionalQuery] = queryMasterData();

  const { data: { getMasterData: specialization = undefined } = {} } =
    specializationQuery;
  const { data: { getMasterData: professional = undefined } = {} } =
    professionalQuery;

  const [
    getTherapist,
    {
      data: { getTherapistById: therapistData = undefined } = {},
      loading: therapistDataLoading,
    },
  ] = useLazyQuery<TherapistData>(GET_THERAPIST_BY_ID, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (user_id)
      getTherapist({
        variables: {
          user_id,
        },
      });
  }, [user_id]);

  return (
    <>
      <Loader visible={therapistDataLoading} />
      <TherapistProfileView
        masterData={{
          specialization,
          professional,
        }}
        therapistData={therapistData}
      />
    </>
  );
};

export default TherapistProfile;
