import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Layout from "../../../../../components/layout";
import Loader from "../../../../../components/common/Loader";
import FeedbackResponses from "../../../../../components/common/AdminFeedback/Responses/Responses";
import { GET_ADMIN_FEEDBACK_RESPONSE_LIST } from "../../../../../graphql/query";
import { VIEW_RESPONSE_DOWNLOAD_CSV } from "../../../../../graphql/Feedback/graphql";
//
import { useSnackbar } from "notistack";
const csvHeader = ["Therapist Name", "Assigned Paitent Name", "Therapy Name"];
const AdminFeedbackResponses = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  const [selectedPage, setSelectedPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState(10);
  const [totalCount, setTotalCount] = useState();

  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();
  /* istanbul ignore next */
  const id = router?.query.id as string;

  const [getTemplateData, { data: resData }] = useLazyQuery(
    GET_ADMIN_FEEDBACK_RESPONSE_LIST,
    {
      onCompleted: (data) => {
        /* istanbul ignore next */
        const {
          adminViewResponseByFeedbackId: { totalcount },
        } = data || {};
        if (totalcount && !totalCount) setTotalCount(totalcount);
        setLoader(false);
      },
    }
  );

  const [
    viewResponseDownload,
    { data: { viewResponseDownloadCSV: csvResData = [] } = {} },
  ] = useLazyQuery(VIEW_RESPONSE_DOWNLOAD_CSV);

  const [getAllFeedbackResponse, { data: allFeedbackResponse }] = useLazyQuery(
    GET_ADMIN_FEEDBACK_RESPONSE_LIST,
    {
      onCompleted: () => {
        /* istanbul ignore next */
        setLoader(false);
      },
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    viewResponseDownload({
      variables: {
        feedbackId: id,
      },
    });
  }, []);

  useEffect(() => {
    if (totalCount) {
      setLoader(true);
      getAllFeedbackResponse({
        variables: {
          feedbackId: id,
          endDate: "",
          limit: totalCount,
          pageNo: 1,
          startDate: "",
        },
      });
    }
  }, [totalCount]);

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

  /* istanbul ignore next */
  const csvString = (item): string => {
    const { data = {}, header } = item || {};
    const replacer = (_, value) => (value === null ? "" : value);
    const csv = data.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(",")
    );
    csv.unshift(header.join(","));
    const uCsv = csv.join("\r\n");
    return uCsv;
  };

  /* istanbul ignore next */
  const csvDataFormat = (item) => {
    const {
      therapist_name = "",
      question,
      answer,
      therapy_name = "",
      patient_name = "",
    } = item || {};

    return {
      [csvHeader[0]]: therapist_name,
      [csvHeader[1]]: `${patient_name}`,
      [csvHeader[2]]: therapy_name,
      [question]: answer,
    };
  };

  /* istanbul ignore next */
  const handleCsvDownload = () => {
    if (allFeedbackResponse) {
      const modifyCsvData = [];
      csvResData.forEach((uitem) => {
        uitem.responses.map((ditem) => {
          const question = uitem.question.trim();
          if (!csvHeader.includes(question)) csvHeader.push(question);

          modifyCsvData.push(csvDataFormat({ question, ...ditem }));
        });
      });

      window.location.href = `data:text/csv;charset=utf-8,${encodeURI(
        csvString({ header: csvHeader, data: modifyCsvData })
      )}`;
    } else {
      enqueueSnackbar("No data found.", {
        variant: "info",
      });
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
          handleCsvDownload={handleCsvDownload}
          feedbackId={id}
        />
      </Layout>
    </>
  );
};

export default AdminFeedbackResponses;
