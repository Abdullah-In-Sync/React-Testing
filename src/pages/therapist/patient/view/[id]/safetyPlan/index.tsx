import { useLazyQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../../../../../../components/common/Loader";
import ContentHeader from "../../../../../../components/common/ContentHeader";
import { Box } from "@mui/material";
import { GET_SAFETY_PLAN_LIST_FOR_THERAPIST } from "../../../../../../graphql/SafetyPlan/graphql";
import TherapistSafetyPlanComponent from "../../../../../../components/therapist/patient/therapistSafetyPlan";

const TherapistSafetyPlanIndex: NextPage = () => {
  const router = useRouter();
  /* istanbul ignore next */
  const patId = router?.query.id as string;

  const [searchInputValue, setSearchInputValue] = useState();
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    getSafetyPlanList({
      variables: { patientId: patId },
    });
  }, []);

  const [
    getSafetyPlanList,
    { loading: loadingSafetyPlanList, data: listData },
  ] = useLazyQuery(GET_SAFETY_PLAN_LIST_FOR_THERAPIST, {
    onCompleted: (data) => {
      console.log("Koca: data ", data);
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  const onChangeSearchInput = (e) => {
    setSearchInputValue(() => {
      getSafetyPlanList({
        variables: {
          patientId: patId,
          searchText: e.target.value,
        },
      });

      return e.target.value;
    });
  };

  const onChangeFilterDropdown = (e) => {
    const temp = selectFilterOptions;
    /* istanbul ignore next */
    const searchText =
      searchInputValue && searchInputValue !== ""
        ? { searchText: searchInputValue }
        : {};

    /* istanbul ignore next */
    temp[e.target.name] = e.target.value !== "all" ? e.target.value : "";
    getSafetyPlanList({
      variables: {
        patientId: patId,
        ...searchText,
        ...temp,
      },
    });
    /* istanbul ignore next */

    setSelectFilterOptions({ ...temp });
  };

  return (
    <>
      <Box style={{ paddingTop: "10px" }} data-testid="resource_name">
        <Loader visible={loader} />
        <ContentHeader title="Safety Plan" />
        <Box style={{ paddingTop: "10px" }}>
          <TherapistSafetyPlanComponent
            safetyPlanList={listData}
            searchInputValue={searchInputValue}
            onChangeSearchInput={onChangeSearchInput}
            selectFilterOptions={selectFilterOptions}
            onChangeFilterDropdown={onChangeFilterDropdown}
            loadingSafetyPlanList={loadingSafetyPlanList}
          />
        </Box>
      </Box>
    </>
  );
};

export default TherapistSafetyPlanIndex;
