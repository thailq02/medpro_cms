import * as Yup from "yup";

// String dùng cho name, address
const REGEX_STRING =
  /^[a-zA-ZàáảạãÀÁẢẠÃâầấẩậẫÂẦẤẨẬẪăằắẳặẵĂẰẮẲẶẴđĐèéẻẹẽÈÉẺẸẼêềếểệễÊỀẾỂỆỄìíỉịĩÌÍỈỊĨòóỏọõÒÓỎỌÕôồốổộỗÔỒỐỔỘỖơờớởợỡƠỜỚỞỢỠùúủụũÙÚỦỤŨưừứửựữƯỪỨỬỰỮỳýỷỵỹỲÝỶỴỸ ]+$/;
const REGEX_PHONE_VN = /^(-84|\+84|0)[3,5,7,8,9]\d{8,8}$/;
const REGEX_PHONE = /^\d+$/;
const REGEX_CCCD = /^(?:\d*)$/;
const REGEX_SYMBOL = /[!@#$%^&*(),.?":{}|<>]/;
const REGEX_DATE_IOS8601 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
const REGEX_USERNAME = /^[A-Za-z0-9_]+$/;
const REGEX_NO_SPACE = /\S/;
const REGEX_SLUG = /^\S+$/;

const REGEX_VALIDATION = {
  REGEX_STRING: Yup.string()
    .trim()
    .matches(REGEX_STRING, "Chỉ chấp nhận chữ cái và dấu cách")
    .required("Không được để trống")
    .max(255, "Không được vượt quá 255 kí tự"),
  REGEX_STRING_NO_SPACE: Yup.string()
    .trim()
    .matches(REGEX_NO_SPACE, "Không được chỉ chứa khoảng trắng")
    .required("Không được để trống")
    .max(255, "Không vượt quá 255 kí tự"),
  REGEX_NUMBER_PHONE_VN: Yup.string()
    .trim()
    .matches(REGEX_PHONE_VN, "Số điện thoại không hợp lệ")
    .min(8, " Số điện thoại có ít nhất 8 kí tự")
    .max(15, "Số điện thoại không được vượt quá 15 kí tự"),
  REGEX_NUMBER_PHONE: Yup.string()
    .required("Không được để trống")
    .matches(REGEX_PHONE, "Số điện thoại không đúng định dạng")
    .min(8, " Số điện thoại có ít nhất 8 kí tự")
    .max(15, "Số điện thoại không được vượt quá 15 kí tự"),
  REGEX_NUMBER: Yup.mixed<number>()
    .test("no-white-space", "Không được chỉ chứa khoảng trắng", (value) =>
      REGEX_NO_SPACE.test(value?.toString() ?? ""),
    )
    .test("number", "Giá trị không hợp lệ", (value) =>
      REGEX_NO_SPACE.test(value?.toString() ?? ""),
    )
    .required("Không được để trống"),
  REGEX_EMAIL: Yup.string()
    .email("Email phải đúng format")
    .required("Không được để trống"),
  REGEX_PASSWORD: Yup.string()
    .trim()
    .required("Không được để trống")
    .min(6, "Mật khẩu phải nhiều hơn 6 kí tự")
    .max(50, "Mật khẩu không được vượt quá 50 kí tự")
    .matches(/[a-z]/, "Mật khẩu phải chứa ít nhất 1 chữ thường")
    .matches(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ hoa")
    .matches(/[0-9]/, "Mật khẩu phải chứa ít nhất 1 số")
    .matches(REGEX_SYMBOL, "Mật khẩu phải chứa ít nhất 1 kí tự đặc biệt"),
  REGEX_DATE_OF_BIRTH: Yup.string()
    .matches(REGEX_DATE_IOS8601, "Ngày sinh không hợp lệ")
    .required("Không được để trống"),
  REGEX_GENDER: Yup.number().required("Không được để trống"),
  REGEX_USERNAME: Yup.string()
    .trim()
    .matches(REGEX_USERNAME, "Username không hợp lệ"),
  REGEX_SLUG: Yup.string().matches(REGEX_SLUG, "Slug không hợp lệ"),
};

export default REGEX_VALIDATION;
