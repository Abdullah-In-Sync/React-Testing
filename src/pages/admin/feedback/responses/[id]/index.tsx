import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Layout from "../../../../../components/layout";
import Loader from "../../../../../components/common/Loader";
import FeedbackResponses from "../../../../../components/common/AdminFeedback/Responses/Responses";
import { GET_ADMIN_FEEDBACK_RESPONSE_LIST } from "../../../../../graphql/query";

const AdminFeedbackResponses = () => {
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  const [selectedPage, setSelectedPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState(10);

  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();
  /* istanbul ignore next */
  const id = router?.query.id as string;
  console.log("Koca: id ", id);

  const [getTemplateData, { data: resData }] = useLazyQuery(
    GET_ADMIN_FEEDBACK_RESPONSE_LIST,
    {
      onCompleted: (data) => {
        console.debug("Koca: data ", data);
        setLoader(false);
      },
    }
  );

  useEffect(() => {
    /* istanbul ignore next */
    setLoader(true);
    getTemplateData({
      variables: {
        feedbackId: id,
        endDate: selectedStartDate,
        limit: selectedRows,
        pageNo: selectedPage + 1,
        startDate: selectedEndDate,
      },
    });

    setLoader(false);
  }, [id, selectedStartDate, selectedEndDate, selectedPage, selectedRows]);

  /* istanbul ignore next */
  const handleDateChange = (value, prop) => {
    /* istanbul ignore next */
    if (prop === "startDate") {
      setSelectedStartDate(value.format("YYYY-MM-DD"));
    }
    /* istanbul ignore next */
    if (prop === "endDate") {
      setSelectedEndDate(value.format("YYYY-MM-DD"));
    }
  };

  /* istanbul ignore next */
  const handlePageChange = (value, prop) => {
    /* istanbul ignore next */
    if (prop === "page") {
      setSelectedPage(value);
    }
    /* istanbul ignore next */
    if (prop === "rows") {
      setSelectedRows(value);
    }
  };

  const userType =
    resData?.adminViewResponseByFeedbackId?.feedbackdata[0]?.feedback_type;

  return (
    <>
      <Layout>
        <Loader visible={loader} />

        <ContentHeader
          data-testid="config-setting-header"
          title={`${
            userType?.charAt(0).toUpperCase() + userType?.slice(1)
          } Response`}
        />

        <FeedbackResponses
          setLoader={setLoader}
          orgData={resData}
          handleDateChange={handleDateChange}
          handlePageChange={handlePageChange}
        />
      </Layout>
    </>
  );
};

export default AdminFeedbackResponses;
