import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import FeedbackResponses from "../../../../../components/common/AdminFeedback/Responses/Responses";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Loader from "../../../../../components/common/Loader";
import Layout from "../../../../../components/layout";
import { VIEW_RESPONSE_DOWNLOAD_CSV } from "../../../../../graphql/Feedback/graphql";
import { ViewResponseDownload } from "../../../../../graphql/Feedback/types";
import { GET_ADMIN_FEEDBACK_RESPONSE_LIST } from "../../../../../graphql/query";
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

  const [viewResponseDownload] = useLazyQuery<ViewResponseDownload>(
    VIEW_RESPONSE_DOWNLOAD_CSV
  );
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

  /* istanbul ignore next */
  const downloadCsvApi = (callback) => {
    try {
      viewResponseDownload({
        variables: {
          feedbackId: id,
        },
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          const { viewResponseDownloadCSV: csvResData = [] } = data || {};
          if (csvResData) {
            callback(csvResData);
          }
        },
      });
    } catch (e) {
      setLoader(false);
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
    } finally {
      setLoader(false);
    }
  };

  /* istanbul ignore next */
  const handleCsvDownload = () => {
    setLoader(true);
    downloadCsvApi((csvResData) => {
      if (csvResData.length > 0) {
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
    });
  };

  useEffect(() => {
    /* istanbul ignore next */
    setLoader(true);
    getTemplateData({
      variables: {
        feedbackId: id,
        endDate: selectedEndDate,
        limit: selectedRows,
        pageNo: selectedPage + 1,
        startDate: selectedStartDate,
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
