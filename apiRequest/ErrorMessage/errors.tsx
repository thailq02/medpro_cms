import {IDataError} from "@/apiRequest/http";
import {notification} from "antd";
import {toString} from "lodash";

const ListErrorMessage = [
  {
    error_code: "unique.ValidatorInvalid",
    description: "Lỗi validate",
  },
];

export default function displayError(dataError: IDataError): void {
  const {errorCode} = dataError;

  const error = ListErrorMessage.find((item) => item.error_code === errorCode);
  let errorMessage;
  if (error) {
    errorMessage = error.description;
  } else {
    errorMessage = dataError.errorMessage ?? "Somethings Wrong";
  }
  notification.error({
    message: "Something is wrong. Please try again",
    description:
      typeof errorMessage === "string"
        ? errorMessage
        : Object.values(errorMessage).map((val, index) => {
            return <div key={index}>{toString(val)}</div>;
          }),
    duration: 3,
  });
}
