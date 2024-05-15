import React from "react";
import TableGlobal from "@/components/TableGlobal";
import HeaderToolTable from "@/components/HeaderToolTable";
import {InputSearchGlobal} from "@/components/InputSearchGlobal";
import {InputFilterGlobal} from "@/components/InputFilterGlobal";
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

export default function CategoryManagerComponent() {
  const handleOpenModalCategory = (id?: string) => {
    addModal({
      content: id ? (
        <ContentModalEditCategory idSelect={id} />
      ) : (
        <ContentModalCreateCategory />
      ),
      options: {title: id ? "Sửa danh mục" : "Tạo danh mục"},
    });
  };

  const dataSource = [
    {
      key: "1",
      id: 1,
      name: "Cơ sở y tế",
      slug: "co-so-y-te",
      parent_id: "",
    },
    {
      key: "2",
      id: 2,
      name: "Bệnh viện công",
      slug: "benh-vien-cong",
      parent_id: "Cơ sở y tế",
    },
  ];

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: 80,
      align: "center",
      render: (_: any, record: any, index: any) => <div>{index + 1}</div>,
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
                onClick={() => handleOpenModalCategory(record.id)}
              />
              <ActionButton
                type={EButtonAction.DELETE}
                onClick={() => undefined}
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
          <InputSearchGlobal key="search" />,
          <InputFilterGlobal
            key="filter"
            params={undefined}
            filterField={""}
            handleChange={function (value: any): void {
              throw new Error("Function not implemented.");
            }}
          />,
        ]}
        buttonBox={[
          <ButtonAdd
            title="Tạo danh mục"
            onClick={() => handleOpenModalCategory()}
          />,
        ]}
      />
      <TableGlobal dataSource={dataSource} columns={columns} />
    </>
  );
}
