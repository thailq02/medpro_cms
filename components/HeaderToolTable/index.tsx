import {Col, Row} from "antd";
import React from "react";

interface IHeaderTableToolProps {
  searchFilterBox?: JSX.Element[];
  buttonBox?: JSX.Element[];
}

export default function HeaderToolTable({
  buttonBox,
  searchFilterBox,
}: IHeaderTableToolProps): JSX.Element {
  return (
    <Row gutter={[16, 8]} className="mb-2" justify={"space-between"}>
      {searchFilterBox ? (
        <Col>
          <Row gutter={[8, 2]}>
            {searchFilterBox.map((renderBoxSearch, index) => (
              <Col key={index} className="max-md:w-full">
                {renderBoxSearch}
              </Col>
            ))}
          </Row>
        </Col>
      ) : (
        <div />
      )}
      {buttonBox ? (
        <Col>
          <Row gutter={[8, 2]}>
            {buttonBox.map((renderBoxSearch, index) => (
              <Col key={index} className="max-md:w-full">
                {renderBoxSearch}
              </Col>
            ))}
          </Row>
        </Col>
      ) : (
        <div />
      )}
    </Row>
  );
}
