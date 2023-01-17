import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../../../components/layout";
import TableGenerator from "../../../../components/common/TableGenerator";
import { useLazyQuery, useMutation } from "@apollo/client";
import ContentHeader from "../../../../components/common/ContentHeader";
import NextLink from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CreateIcon from "@mui/icons-material/Create";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import Loader from "../../../../components/common/Loader";
import SureModal from "../../../../components/admin/resource/SureModal";
import { DELETE_ORG_BY_ID } from "../../../../graphql/mutation/patient";
import { useSnackbar } from "notistack";
import { SuccessModal } from "../../../../components/common/SuccessModal";
import { useRouter } from "next/router";

const crudButtons = {
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  marginBottom: 1,
  flexDirection: "row",
};

const OrganizationList = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [loader, setLoader] = useState<boolean>(false);
  const [orgId, setOrgId] = useState(null);
  const [successModal, setSuccessModal] = useState<boolean>(false);

  const [getTemplateData, { data: resData, refetch }] = useLazyQuery(
    GET_ORGANIZATION_LIST,
    {
      onCompleted: () => {
        setLoader(false);
      },
    }
  );
  const [deleteOrg] = useMutation(DELETE_ORG_BY_ID);

  const handleOk = () => {
    setSuccessModal(false);
    /* istanbul ignore next */
    router?.reload();
  };

  const fields = [
    {
      key: "name",
      columnName: "Org Name",
      visible: true,
      render: (val) => val,
    },
    {
      key: "therapist",
      columnName: "Therapist",
      visible: true,
      render: (val) => val,
    },
    {
      key: "patient",
      columnName: "Patient",
      visible: true,
      render: (val) => val,
    },

    {
      key: "patient_plural",
      columnName: "Patient-Plural",
      visible: true,
      render: (val) => val,
    },
    {
      key: "therapy",
      columnName: "Therapy",
      visible: true,
      render: (val) => val,
    },

    {
      key: "actions",
      columnName: "Actions",
      visible: true,
      render: (_, value) => (
        <>
          <NextLink href={"/admin/organization/edit/" + value._id} passHref>
            <IconButton size="small" data-testid="edit-icon-button">
              <CreateIcon />
            </IconButton>
          </NextLink>

          <NextLink href={"/admin/organization/config/" + value._id} passHref>
            <IconButton size="small" data-testid={"viewIcon_" + value._id}>
              <SettingsIcon />
            </IconButton>
          </NextLink>

          <IconButton
            size="small"
            onClick={() => {
              setModalOpen(true);
              setOrgId(value._id);
            }}
          >
            <DeleteIcon data-testid="deleteIcon" />
          </IconButton>
        </>
      ),
    },
  ];

  const handleDeleteOrg = async () => {
    try {
      await deleteOrg({
        variables: {
          orgId: orgId,
        },
        onCompleted: () => {
          setSuccessModal(true);
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  const dataSource = useMemo(() => {
    const data = resData?.getOrganizationData?.map((ele, index) => {
      return { ...ele, index: index + 1 };
    });
    return data || [];
  }, [resData]);

  useEffect(() => {
    /* istanbul ignore next */
    setLoader(true);
    getTemplateData();
  }, []);

  useEffect(() => {
    /* istanbul ignore next */
    refetch();
  }, [resData]);
  return (
    <>
      <Loader visible={loader} />

      <Layout>
        <ContentHeader title="Organization" data-testid="organization" />
        <Grid item xs={9}>
          <Box sx={crudButtons}>
            <Button
              className={`text-white`}
              variant="contained"
              sx={{
                textTransform: "none",
                bottom: "4px",
                height: "35px",
                paddingLeft: " 40px",
                paddingRight: " 40px",
              }}
              data-testid="addResource"
              href="/v2/admin/organization/add"
            >
              <PersonAddIcon />
              Add Organization
            </Button>
          </Box>
        </Grid>

        <Box style={{ paddingBottom: 30 }}>
          <TableGenerator
            fields={fields}
            data={dataSource}
            currentPage={page}
            onPageChange={(page) => {
              /* istanbul ignore next */
              setPage(page);
              /* istanbul ignore next */
            }}
            loader={loader}
            backendPagination={false}
            selectedRecords={[]}
            rowOnePage={10}
            showPagination={true}
          />
        </Box>
      </Layout>
      <>
        <SureModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <Typography
            sx={{
              fontWeight: "600",
              textAlign: "center",
              fontSize: "27px",
            }}
          >
            Are you sure want to Delete This Organization
          </Typography>
          <Box marginTop="20px" display="flex" justifyContent="end">
            <Button
              variant="contained"
              color="inherit"
              size="small"
              data-testid="deleteOrgCancelButton"
              onClick={() => {
                /* istanbul ignore next */
                setModalOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              color="error"
              variant="contained"
              sx={{ marginLeft: "5px" }}
              size="small"
              data-testid="deleteOrgConfirmButton"
              onClick={() => {
                setModalOpen(false);
                handleDeleteOrg();
              }}
            >
              Confirm
            </Button>
          </Box>
        </SureModal>

        {successModal && (
          <SuccessModal
            isOpen={successModal}
            title="ORGANIZATION"
            description={"Organization Deleted Successfully"}
            onOk={handleOk}
          />
        )}
      </>
    </>
  );
};
export default OrganizationList;
