import { useLazyQuery } from "@apollo/client";
import { Box } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentHeader from "../../../../../../components/common/ContentHeader";
import Loader from "../../../../../../components/common/Loader";
import { GET_RELAPSE_LIST_FOR_THERAPIST } from "../../../../../../graphql/SafetyPlan/graphql";
import TherapistRelapsePlanComponent from "../../../../../../components/therapist/patient/therapistRelapse";

const TherapistRelapsePlanIndex: NextPage = () => {
  const router = useRouter();

  /* istanbul ignore next */
  const patId = router?.query?.id as string;

  const [searchInputValue, setSearchInputValue] = useState();
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    getRelapsePlanList({
      variables: { patientId: patId },
    });
  }, []);

  const [
    getRelapsePlanList,
    { loading: loadingRelapsePlanList, data: listData },
  ] = useLazyQuery(GET_RELAPSE_LIST_FOR_THERAPIST, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  /* istanbul ignore next */
  const onChangeSearchInput = (e) => {
    /* istanbul ignore next */
    setSearchInputValue(() => {
      getRelapsePlanList({
        variables: {
          patientId: patId,
          searchText: e.target.value,
        },
      });

      return e.target.value;
    });
  };

  /* istanbul ignore next */
  const onChangeFilterDropdown = (e) => {
    const temp = selectFilterOptions;
    /* istanbul ignore next */
    const searchText =
      searchInputValue && searchInputValue !== ""
        ? { searchText: searchInputValue }
        : {};

    /* istanbul ignore next */
    temp[e.target.name] = e.target.value !== "all" ? e.target.value : "";
    getRelapsePlanList({
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
        <ContentHeader title="Relapse" />
        <Box style={{ paddingTop: "10px" }}>
          <TherapistRelapsePlanComponent
            safetyPlanList={listData}
            searchInputValue={searchInputValue}
            onChangeSearchInput={onChangeSearchInput}
            selectFilterOptions={selectFilterOptions}
            onChangeFilterDropdown={onChangeFilterDropdown}
            loadingSafetyPlanList={loadingRelapsePlanList}
            // onPressCreatePlan={handleOpenCreatePlanModal}
            // onPressSharePlan={onPressSharePlan}
            // onPressAddPlan={handleOpenAddPlanModal}
            // submitQustionForm={handleSubmitQustionForm}
            // fetchPlanData={fetchPlanData}
            // planData={planData}
            // handleDeleteQuestion={handleDeleteQuestion}
            // onPressDeletePlan={onPressDeletePlan}
          />
        </Box>
      </Box>
    </>
  );
};

export default TherapistRelapsePlanIndex;
