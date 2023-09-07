import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import {
  ADD_ADMIN_CATEGORY,
  GET_ADMIN_CATEGORY_LIST,
  UPDATE_ADMIN_CATEGORY,
} from "../../../../graphql/category/graphql";
import { CategoryAdminData } from "../../../../graphql/category/types";
import {
  GET_ADMIN_DISORDER_LIST,
  GET_ADMIN_THERAPY_LIST,
} from "../../../../graphql/disorder/graphql";
import {
  AdminDisorderData,
  AdminTherapyData,
} from "../../../../graphql/disorder/types";
import { GET_ADMIN_MODEL_LIST } from "../../../../graphql/model/graphql";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import { ConfirmElement } from "../../../common/ConfirmWrapper";
import { ConfirmInfoElement } from "../../../common/CustomModal/InfoModal";
import Loader from "../../../common/Loader";
import CategoryComponent from "./Category";

const CategoryPage: NextPage = () => {
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const infoModalRef = useRef<ConfirmInfoElement>(null);
  const confirmRef = useRef<ConfirmElement>(null);
  const [addAdminCategory] = useMutation(ADD_ADMIN_CATEGORY);
  const { enqueueSnackbar } = useSnackbar();
  const [updateAdminCategory] = useMutation(UPDATE_ADMIN_CATEGORY);

  useEffect(() => {
    getOrgList();
    getAdminTherapyList();
    getModelList();
    getAdminDisorders();
  }, []);

  useEffect(() => {
    getAdminCategory({
      variables: {
        limit: rowsLimit,
        pageNo: page,
        searchText: searchInputValue,
        ...selectFilterOptions,
      },
    });
  }, [rowsLimit, selectFilterOptions, tableCurentPage, searchInputValue, page]);

  const [
    getModelList,
    { data: { getAdminModelList: modelListData = undefined } = {} },
  ] = useLazyQuery(GET_ADMIN_MODEL_LIST, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      setLoader(false);
    },
  });

  const [
    getOrgList,
    { data: { getOrganizationData: organizationList = [] } = {} },
  ] = useLazyQuery(GET_ORGANIZATION_LIST, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      setLoader(false);
    },
  });

  const [
    getAdminDisorders,
    { data: { getAdminDisorderList: disorderListData = undefined } = {} },
  ] = useLazyQuery<AdminDisorderData>(GET_ADMIN_DISORDER_LIST, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      setLoader(false);
    },
  });

  const [
    getAdminCategory,
    {
      loading: loadingCategoryList,
      data: { getAdminCategoryList: categoryListData = undefined } = {},
      refetch: refetchCategoryData,
    },
  ] = useLazyQuery<CategoryAdminData>(GET_ADMIN_CATEGORY_LIST, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      setLoader(false);
    },
  });

  const [
    getAdminTherapyList,
    { data: { adminTherapyList: { data: therapyListData = [] } = {} } = {} },
  ] = useLazyQuery<AdminTherapyData>(GET_ADMIN_THERAPY_LIST, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  /* istanbul ignore next */
  const onPageChange = (event?: any, newPage?: number) => {
    setPage(newPage + 1);
    setTableCurrentPage(newPage);
  };

  const onSelectPageDropdown = (event: React.ChangeEvent<HTMLInputElement>) => {
    /* istanbul ignore next */
    setRowsLimit(+event.target.value);
    /* istanbul ignore next */
    setTableCurrentPage(0);
  };

  const onChangeFilterDropdown = async (e) => {
    let temp = selectFilterOptions;
    const { disorderId, orgId, modelId, therapyId } = temp as any;
    if (e.target.name === "orgId") {
      temp = {};
    }
    if (e.target.name === "disorderId") {
      if (modelId) delete temp["modelId"];
      if (therapyId) delete temp["therapyId"];
      if (!orgId)
        return enqueueSnackbar("Please select organisation.", {
          variant: "error",
        });
    } else if (e.target.name === "modelId") {
      if (therapyId) delete temp["therapyId"];
      if (!disorderId)
        return enqueueSnackbar("Please select disorder.", {
          variant: "error",
        });
    } else if (e.target.name === "therapyId" && !orgId) {
      return enqueueSnackbar("Please select organisation.", {
        variant: "error",
      });
    }

    temp[e.target.name] = e.target.value !== "all" ? e.target.value : "";
    setSelectFilterOptions({ ...temp });
    setTableCurrentPage(0);
    setPage(1);
  };

  const onChangeSearchInput = (e) => {
    setSearchInputValue(e.target.value);
    setTableCurrentPage(0);
    setPage(1);
  };

  const onAddCategorySubmit = async (formFields, callback) => {
    setLoader(true);
    try {
      await addAdminCategory({
        variables: formFields,
        onCompleted: () => {
          refetchCategoryData();
          enqueueSnackbar("Category added successfully!", {
            variant: "success",
          });
          callback();
          setLoader(false);
        },
      });
    } catch (e) {
      setLoader(false);
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
      callback();
    }
  };

  const onPressSideButton = () => {
    infoModalRef.current.openConfirm({
      data: {
        therapyListData,
        onSubmit: submitAddCategoryForm,
        headerTitleText: "Add Category",
        organizationList,
        disorderListData,
        modelListData,
      },
    });
  };

  const submitCallback = () => {
    confirmRef.current.close();
    infoModalRef.current.close();
  };

  const submitAddCategoryForm = (v, { setSubmitting }) => {
    confirmRef.current.openConfirm({
      confirmFunction: () => onAddCategorySubmit(v, submitCallback),
      description: "Are you sure you want to add this category?",
      setSubmitting,
    });
  };

  const onUpdateCategorySubmit = async (
    formFields,
    callback,
    successMessage
  ) => {
    setLoader(true);
    try {
      await updateAdminCategory({
        variables: formFields,
        onCompleted: (data) => {
          if (data) {
            refetchCategoryData();
            enqueueSnackbar(
              successMessage || "Category deleted successfully!",
              {
                variant: "success",
              }
            );
            callback();
          }
          setLoader(false);
        },
      });
    } catch (e) {
      setLoader(false);
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
      callback();
    }
  };

  const submitUpdateCategoryForm = (v, { setSubmitting, category_id }) => {
    const { category_name, disorder_id, model_id } = v;

    confirmRef.current.openConfirm({
      confirmFunction: () =>
        onUpdateCategorySubmit(
          {
            category_id,
            update_category: { category_name, disorder_id, model_id },
          },
          submitCallback,
          "Category updated successfully!"
        ),
      description: "Are you sure you want to update this category?",
      setSubmitting,
    });
  };

  const handleTableActions = (value) => {
    const {
      pressedIconButton,
      _id: category_id,
      category_name,
      disorder_id,
      model_id,
      therapy_detail = [],
    } = value;
    const { org_id } = therapy_detail[0];
    if (pressedIconButton === "delete")
      return confirmRef.current.openConfirm({
        confirmFunction: () =>
          onUpdateCategorySubmit(
            { category_id, update_category: { category_status: 0 } },
            () => confirmRef.current.close(),
            undefined
          ),
        description: "Are you sure you want to delete this category?",
      });
    else if (pressedIconButton === "edit")
      infoModalRef.current.openConfirm({
        data: {
          value: { category_name, disorder_id, model_id, org_id },
          category_id,
          therapyListData,
          saveButtonText: "Update",
          onSubmit: (v, formikProps) =>
            submitUpdateCategoryForm(v, { ...formikProps, category_id }),
          headerTitleText: "Edit Category",
          organizationList,
          disorderListData,
          modelListData,
        },
      });
  };

  return (
    <>
      <Loader visible={loader} />
      <CategoryComponent
        categoryListData={categoryListData}
        disorderListData={disorderListData}
        modelListData={modelListData}
        onPageChange={onPageChange}
        onSelectPageDropdown={onSelectPageDropdown}
        tableCurentPage={tableCurentPage}
        rowsLimit={rowsLimit}
        searchInputValue={searchInputValue}
        onChangeSearchInput={onChangeSearchInput}
        selectFilterOptions={selectFilterOptions}
        onChangeFilterDropdown={onChangeFilterDropdown}
        loadingCategoryList={loadingCategoryList}
        pageActionButtonClick={handleTableActions}
        onPressSideButton={onPressSideButton}
        therapyListData={therapyListData}
        infoModalRef={infoModalRef}
        confirmRef={confirmRef}
        organizationList={organizationList}
      />
    </>
  );
};

export default CategoryPage;
