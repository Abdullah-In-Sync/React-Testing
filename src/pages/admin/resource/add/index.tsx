import React, { useEffect, useState } from "react";
import AddForm from "../../../../components/admin/resource/addForm";
import SureModal from "../../../../components/admin/resource/SureModal";
import ContentHeader from "../../../../components/common/ContentHeader";
import Layout from "../../../../components/layout";
import { buildAdminTokenValidationQuery } from "../../../../lib/helpers/auth";

export default function index() {
  const [adminId, setadminId] = useState<any>();
  const [gettokenData, tokenLoading] = buildAdminTokenValidationQuery(
    (adminData) => {
      setadminId(adminData._id);
    }
  );

  useEffect(() => {
    gettokenData();
  }, []);

  /* istanbul ignore next */
  if (gettokenData && !tokenLoading && adminId) {
    // can use it for later
    console.debug(adminId);
  }

  return (
    <>
      <Layout>
        <ContentHeader title="Add Resource" data-testid="headerTitle" />
        <AddForm />
        <SureModal />
      </Layout>
    </>
  );
}
