import {Col, Row} from "antd";
import React from "react";

interface IHeaderTableToolProps {
  searchFilterBox?: JSX.Element[];
  buttonBox?: JSX.Element[];
  dateFilterBox?: JSX.Element[];
}

export default function HeaderToolTable({
  buttonBox,
  searchFilterBox,
  dateFilterBox,
}: IHeaderTableToolProps): JSX.Element {
  return (
    <Row gutter={[16, 8]} className="mb-5" justify={"space-between"}>
      <div className="flex items-center">
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
          <></>
        )}
        {dateFilterBox ? (
          <Col>
            <Row gutter={[8, 2]}>
              <Col className="max-md:w-full">{dateFilterBox}</Col>
            </Row>
          </Col>
        ) : (
          <></>
        )}
      </div>
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
