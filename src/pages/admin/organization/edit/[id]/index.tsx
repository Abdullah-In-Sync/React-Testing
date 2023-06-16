import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Layout from "../../../../../components/layout";
import { addAndEditOrganizationFormFields } from "../../../../../utility/types/resource_types";
import { useSnackbar } from "notistack";
import Loader from "../../../../../components/common/Loader";
import AddEditOrganization from "../../../../../components/common/Organization/addEditOrganization";
import { UPDATE_ORG_BY_ID } from "../../../../../graphql/mutation/admin";
import { SuccessModal } from "../../../../../components/common/SuccessModal";
import { GET_ORGANIZATION_DETAIL_BY_ID } from "../../../../../graphql/query/organization";

const Index = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [updateOrganization] = useMutation(UPDATE_ORG_BY_ID);
  const router = useRouter();
  /* istanbul ignore next */
  const id = router?.query.id as string;

  const handleOk = () => {
    setSuccessModal(false);
    /* istanbul ignore next */
    router.push("/admin/organization/list");
  };
  const [getOrgData, { loading: orgLoading, data: orgData }] = useLazyQuery(
    GET_ORGANIZATION_DETAIL_BY_ID,
    {
      onCompleted: (data) => {
        console.log("Koca: data ", data);
      },
    }
  );

  useEffect(() => {
    /* istanbul ignore next */
    setLoader(true);
    getOrgData({
      variables: { orgId: id },
    });
    setLoader(false);
  }, []);

  useEffect(() => {
    /* istanbul ignore next */
    if (!orgLoading && orgData) {
      setLoader(false);
    }
  }, [orgData]);

  const submitFormHandler = async (
    formFields: addAndEditOrganizationFormFields
  ) => {
    try {
      updateOrganization({
        variables: {
          orgId: id,
          update: {
            name: formFields.name,
            panel_color: formFields.panel_color,
            side_menu_color: formFields.side_menu_color,
            therapist: formFields.therapist,
            patient: formFields.patient,
            patient_plural: formFields.patient_plural,
            therapy: formFields.therapy,
            contract: formFields.contract,
            patient_welcome_email: formFields.patient_welcome_email,
            logo: formFields.file_name,
            model_id: formFields.model_id,
            therapy_id: formFields.therapy_id,
            disorder_id: formFields.disorder_id,
          },
        },
        onCompleted: (data) => {
          if (data && data.updateOrgById) {
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

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Organisation Edit" />
        <AddEditOrganization
          onSubmit={submitFormHandler}
          setLoader={setLoader}
          orgData={orgData}
        />
      </Layout>

      {successModal && (
        <SuccessModal
          isOpen={successModal}
          title="ORGANISATION"
          description={"Organisation Updated Successfully"}
          onOk={handleOk}
        />
      )}
    </>
  );
};

export default Index;
