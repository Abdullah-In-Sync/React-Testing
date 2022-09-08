import React, { useState } from "react";
import type { NextPage } from "next";
import Loader from "../../../components/common/Loader";


// MUI COMPONENTS
import Layout from "../../../components/layout";
import ContentHeader from "../../../components/common/ContentHeader";
import { IconButton, Box, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import CreateIcon from "@mui/icons-material/Create";
import ListAltIcon from '@mui/icons-material/ListAlt';
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { AddButton } from "../../../components/common/Buttons";
import CardGenerator from "../../../components/common/CardGenerator";

// COMPONENT STYLES
const crudButtons = {
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  marginBottom: 1,
  flexDirection: "row",
};

const IconButtonWrapper = styled(IconButton)(
  () => `
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  margin-right: 5px;
`
);

const Library: NextPage = () => {

  // COMPONENT STATE
  const [dataList] = useState<any>([{
    id: 1,
    text: "description 1",
    title: "title 1"
  },
  {
    id: 2,
    text: "description 2",
    title: "title 2"
  },
  {
    id: 3,
    text: "description 3",
    title: "title 3"
  }, {
    id: 4,
    text: "description 4",
    title: "title 4"
  }, {
    id: 5,
    text: "description 5",
    title: "title 5"
  }, {
    id: 6,
    text: "description 6",
    title: "title 6"
  },]);

  // TABLE PROPS
  const [loader, setLoader] = useState<boolean>(false);


  //**  TABLE DATA COLUMNS **//
  /* istanbul ignore next */


  const fields = [
    {
      key: "text",
      visible: true,

    },
    {
      key: "resource_details",
      visible: true,
      render: (_, value) => (
        <Button variant="contained" sx={{ width: "100%" }}>{value.title}</Button>
      ),
    },
    {
      key: "actions",
      visible: true,
      render: (_, value) => (
        <>
          <IconButtonWrapper aria-label="create" size="small">
            <CreateIcon />
          </IconButtonWrapper>

          <IconButtonWrapper aria-label="favorite" size="small">
            <FavoriteBorderIcon />
          </IconButtonWrapper>

          <IconButtonWrapper aria-label="delete" size="small">
            <DeleteIcon />
          </IconButtonWrapper>

          <IconButtonWrapper aria-label="download" size="small">
            <CloudDownloadIcon />
          </IconButtonWrapper>
        </>
      ),
    },
  ];


  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Library" />
        <Box sx={crudButtons}>
          <AddButton
            className="mr-3"
            label="Add Resource"
            startIcon={<ListAltIcon />}
          />
          <AddButton
            className="mr-3"
            label="Create Resource"
            startIcon={<ListAltIcon />}
          />
        </Box>
        <Box>

          <CardGenerator data={dataList} fields={fields} />

        </Box>
      </Layout>
    </>
  );
};

export default Library;




