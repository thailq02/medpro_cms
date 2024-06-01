"use client";
import React, {useMemo} from "react";
import TableGlobal from "@/components/TableGlobal";
import HeaderToolTable from "@/components/HeaderToolTable";
import {InputSearchGlobal} from "@/components/InputSearchGlobal";
import {
  ActionButton,
  ButtonAdd,
  EButtonAction,
} from "@/components/ButtonGlobal";
import {Row, Space} from "antd";
import {ColumnsType} from "antd/es/table";
import {addModal} from "@/components/ModalGlobal";
import ContentModalCreateCategory from "@/module/category-management/modal-create-category";
import ContentModalEditCategory from "@/module/category-management/modal-edit-category";
import {
  useDeleteCategory,
  useQueryGetListCategory,
} from "@/utils/hooks/category";
import {ICategoryBody} from "@/apiRequest/ApiCategory";
import useSearchParams, {
  paramsDefaultCommon,
} from "@/utils/hooks/searchParams/useSearchParams";

export default function CategoryManagement() {
  const {params, handleChangePagination, setSearchValue} =
    useSearchParams(paramsDefaultCommon);
  const {
    data: categories,
    isFetching,
    refetch,
  } = useQueryGetListCategory(params);

  const {mutate: DeleteCategoryMutation} = useDeleteCategory();

  const handleOpenModalCategory = (id?: string) => {
    addModal({
      content: id ? (
        <ContentModalEditCategory
          props={{idSelect: id, refetch: refetch}}
          listCategory={categories?.payload?.data ?? []}
        />
      ) : (
        <ContentModalCreateCategory
          listCategory={categories?.payload?.data ?? []}
          refetch={refetch}
        />
      ),
      options: {title: id ? "Sửa danh mục" : "Tạo danh mục"},
    });
  };

  const mappedCategories = useMemo(() => {
    return categories?.payload?.data
      .map((category) => {
        if (category.parent_id) {
          return categories!.payload.data.find(
            (parent) => parent._id === category.parent_id,
          );
        }
      })
      .filter((category) => category !== undefined);
  }, [categories]);

  const handleDeleteCategory = (id: string) => {
    DeleteCategoryMutation(id, {
      onSuccess: () => refetch(),
    });
  };

  const columns: ColumnsType<ICategoryBody> = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "_id",
      width: 80,
      align: "center",
      render: (_: any, record: any, index: any) => (
        <div>{index + (params.page - 1) * params.limit + 1}</div>
      ),
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      align: "center",
    },
    {
      title: "Danh mục cha",
      dataIndex: "parent_id",
      key: "parent_id",
      align: "center",
      render: (_, record) => {
        const parent = mappedCategories?.find(
          (category) => category!._id === record.parent_id,
        );
        return parent?.name;
      },
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      width: 150,
      align: "center",
      render: (_, record) => {
        return (
          <Row justify="center">
            <Space direction="horizontal" size={"middle"}>
              <ActionButton
                type={EButtonAction.EDIT}
                onClick={() => handleOpenModalCategory(record._id)}
              />
              <ActionButton
                type={EButtonAction.DELETE}
                onClick={() => handleDeleteCategory(record._id)}
              />
            </Space>
          </Row>
        );
      },
    },
  ];
  return (
    <>
      <HeaderToolTable
        searchFilterBox={[
          <InputSearchGlobal
            key="search"
            placeholder="Tìm kiếm danh mục"
            onSearch={(value) => setSearchValue(value)}
          />,
        ]}
        buttonBox={[
          <ButtonAdd
            title="Tạo danh mục"
            onClick={() => handleOpenModalCategory(undefined)}
          />,
        ]}
      />
      <TableGlobal
        dataSource={categories?.payload.data}
        columns={columns}
        loading={isFetching}
        onChange={handleChangePagination}
        pagination={{
          total: categories?.payload.meta.total_items,
          current: categories?.payload.meta.current_page,
          pageSize: categories?.payload.meta.limit,
        }}
      />
    </>
  );
}
