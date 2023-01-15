import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import ContentHeader from "../../../../components/common/ContentHeader";
import Layout from "../../../../components/layout";
import { addAndEditOrganizationFormFields } from "../../../../utility/types/resource_types";
import { useSnackbar } from "notistack";
import Loader from "../../../../components/common/Loader";
import withAuthentication from "../../../../hoc/auth";
import AddEditOrganization from "../../../../components/common/Organization/addEditOrganization";
import { ADD_ORGANIZATION_DATA } from "../../../../graphql/mutation/admin";
import { SuccessModal } from "../../../../components/common/SuccessModal";

const Index = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [addOrganisation] = useMutation(ADD_ORGANIZATION_DATA);
  const router = useRouter();

  const handleOk = () => {
    setSuccessModal(false);
    /* istanbul ignore next */
    router.push("/admin/organization/list");
  };

  const submitFormHandler = async (
    formFields: addAndEditOrganizationFormFields
  ) => {
    try {
      addOrganisation({
        variables: {
          orgName: formFields.name,
          panelColor: formFields.panel_color,
          sideMenuColor: formFields.side_menu_color,
          therapist: formFields.therapist,
          patient: formFields.patient,
          patientPlural: formFields.patient_plural,
          therapy: formFields.therapy,
          contract: formFields.contract,
          patientWelcomeEmail: formFields.patient_welcome_email,
          logo: formFields.file_name,
        },
        onCompleted: (data) => {
          if (data && data.createOrganization) {
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
        <ContentHeader title="Add Organization" />
        <AddEditOrganization
          onSubmit={submitFormHandler}
          setLoader={setLoader}
        />
      </Layout>

      {successModal && (
        <SuccessModal
          isOpen={successModal}
          title="ORGANIZATION"
          description={"Organization added Successfully"}
          onOk={handleOk}
        />
      )}
    </>
  );
};

export default withAuthentication(Index, ["admin"]);
