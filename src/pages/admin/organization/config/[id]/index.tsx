import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Layout from "../../../../../components/layout";
import { useSnackbar } from "notistack";
import Loader from "../../../../../components/common/Loader";
import withAuthentication from "../../../../../hoc/auth";
import { UPDATE_ORG_CONFIG } from "../../../../../graphql/mutation/admin";
import { SuccessModal } from "../../../../../components/common/SuccessModal";
import {
  GET_ORGANIZATION_DETAIL_BY_ID,
  LIST_MODULE,
  LIST_MODULE_BY_ORG_ID,
} from "../../../../../graphql/query/organization";
import OrgConfigSetting from "../../../../../components/common/Organization/orgConfigSetting";

const Index = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [updateOrgConfig] = useMutation(UPDATE_ORG_CONFIG);
  const router = useRouter();
  /* istanbul ignore next */
  const id = router?.query.id as string;

  //To get the org name
  const [getOrgData, { loading: orgLoading, data: orgData }] = useLazyQuery(
    GET_ORGANIZATION_DETAIL_BY_ID,
    {
      onCompleted: (data) => {
        console.log("Koca: data ", data);
      },
    }
  );
  const orgName = orgData?.viewOrganizationById?.name;

  //To get org list without ID
  const [
    getOrgCongigList,
    { loading: orgConfigListLoading, data: orgConfigListData },
  ] = useLazyQuery(LIST_MODULE, {
    onCompleted: (data) => {
      console.log("Koca: data ", data);
    },
  });

  //To get org list with ID
  const [
    getOrgCongigListWithId,
    {
      loading: orgConfigListWithIdLoading,
      data: orgConfigListWithIdData,
      refetch,
    },
  ] = useLazyQuery(LIST_MODULE_BY_ORG_ID, {
    onCompleted: (data) => {
      console.log("Koca: data ", data);
    },
  });

  useEffect(() => {
    /* istanbul ignore next */
    setLoader(true);
    getOrgData({
      variables: { orgId: id },
    });

    //To get org list with id
    getOrgCongigListWithId({
      variables: { orgId: id },
    });

    //To get org list without id
    getOrgCongigList();
    setLoader(false);
  }, []);

  useEffect(() => {
    /* istanbul ignore next */
    if (
      !orgLoading &&
      orgData &&
      !orgConfigListWithIdLoading &&
      orgConfigListWithIdData &&
      !orgConfigListLoading &&
      orgConfigListData
    ) {
      setLoader(false);
    }
  }, [orgData, orgConfigListWithIdData, orgConfigListData]);

  const submitFormHandler = async (formFields) => {
    const names = formFields.map((a) => a.name).join(",");

    try {
      updateOrgConfig({
        variables: {
          orgId: id,
          moduleName: names,
        },
        onCompleted: (data) => {
          console.log("responsedata: data ", data);
          if (data && data.updateOrgConfig) {
            setSuccessModal(true);
          }
        },
      });

      setLoader(false);
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleOk = () => {
    setSuccessModal(false);
    refetch();
    /* istanbul ignore next */
    router?.push("/admin/organization/list");
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader
          data-testid="config-setting-header"
          title={`${orgName} Configurations - Settings`}
        />
        <OrgConfigSetting
          onSubmit={submitFormHandler}
          setLoader={setLoader}
          orgData={orgData}
          orgConfigListData={orgConfigListData}
          orgConfigListWithIdData={orgConfigListWithIdData}
        />
      </Layout>

      {successModal && (
        <SuccessModal
          isOpen={successModal}
          title="ORG CONFIGURATION SETTINGS"
          description={"Configuration Saved Successfully"}
          onOk={handleOk}
        />
      )}
    </>
  );
};

export default withAuthentication(Index, ["admin"]);
