import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import EditFormulationComponent from "../../../../../components/admin/formulation/edit/EditFormulation";
import { ConfirmElement } from "../../../../../components/common/ConfirmWrapper";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Loader from "../../../../../components/common/Loader";
import Layout from "../../../../../components/layout";
import {
  GET_FORMULATION_BY_ID,
  UPDATE_FORMULATION,
} from "../../../../../graphql/formulation/graphql";
import { GET_ORGANIZATION_LIST } from "../../../../../graphql/query/organization";
import {
  FormulationData,
  UpdateFormulationData,
} from "../../../../../graphql/formulation/types";
import { shareResourceAvailability } from "../../../../../lib/constants";

const EditFormulationPage: NextPage = () => {
  const router = useRouter();
  const { query: { id: formulation_id } = {} } = router;
  const confirmRef = useRef<ConfirmElement>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [updateFormulation] =
    useMutation<UpdateFormulationData>(UPDATE_FORMULATION);
  const { enqueueSnackbar } = useSnackbar();

  const [
    getOrgList,
    { data: { getOrganizationData: organizationList = [] } = {} },
  ] = useLazyQuery(GET_ORGANIZATION_LIST);

  const [
    getFormulation,
    {
      data: {
        getFormulationById: { data: formulationData = undefined } = {},
      } = {},
    },
  ] = useLazyQuery<FormulationData>(GET_FORMULATION_BY_ID, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      setLoader(false);
    },
  });

  const selectedOrgIds = (orgId) => {
    if (orgId === "all") {
      /* istanbul ignore next */
      return organizationList.map((item) => item._id).join(",");
    } else return orgId;
  };

  const submitForm = async (formFields, doneCallback) => {
    setLoader(true);
    const {
      orgId,
      description,
      templateData,
      template_id,
      name,
      instruction,
      all,
      onlyMe,
      formulation_type,
    } = formFields;
    const formulationAvailFor = [];
    if (all) formulationAvailFor.push(shareResourceAvailability.allTherapist);
    if (onlyMe) formulationAvailFor.push(shareResourceAvailability.onlyMe);

    const variables = {
      formulation_id,
      updateFormulation: {
        formulation_name: name,
        formulation_type,
        formulation_desc: description,
        formulation_instruction: instruction,
        formulation_avail_for: JSON.stringify(formulationAvailFor),
        org_id: selectedOrgIds(orgId),
        template_data: JSON.stringify(templateData),
        template_id,
      },
    };
    try {
      await updateFormulation({
        variables,
        onCompleted: (data) => {
          const {
            updateFormulationById: { result },
          } = data;
          if (result) {
            enqueueSnackbar("Formulation updated successfully.", {
              variant: "success",
            });
            router.push("/admin/resource/");
          }
        },
      });
    } catch (e) {
      enqueueSnackbar("Something is wrong", { variant: "error" });
    } finally {
      doneCallback();
      setLoader(false);
    }
  };

  useEffect(() => {
    getOrgList({
      onCompleted: () => {
        getFormulation({
          variables: { formulation_id },
        });
      },
    });
  }, []);

  const handleSavePress = (formFields, { setSubmitting }) => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => submitForm(formFields, callback),
      description: "Are you sure you want to update this formulation?",
      setSubmitting,
    });
  };

  const onPressCancel = () => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => cancelConfirm(callback),
      description:
        "Are you sure you want to cancel this formulation without saving?",
    });
  };

  const cancelConfirm = (callback) => {
    router.push("/admin/resource/");
    callback();
  };

  return (
    <>
      <Layout boxStyle={{ height: "100vh" }}>
        <Loader visible={loader} />
        <ContentHeader title="Edit Formulation" />
        {formulationData && (
          <EditFormulationComponent
            confirmRef={confirmRef}
            data={formulationData}
            organizationList={organizationList}
            submitForm={handleSavePress}
            onPressCancel={onPressCancel}
          />
        )}
      </Layout>
    </>
  );
};

export default EditFormulationPage;
