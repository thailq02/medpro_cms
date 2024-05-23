import slugify from "slugify";

export const CUSTOM_REPLACEMENTS = [
  ["đ", "d"],
  ["Đ", "d"],
  ["đ", "d"],
  ["Đ", "d"],
  ["á", "a"],
  ["à", "a"],
  ["ả", "a"],
  ["ã", "a"],
  ["ạ", "a"],
  ["ă", "a"],
  ["ắ", "a"],
  ["ằ", "a"],
  ["ẳ", "a"],
  ["ẵ", "a"],
  ["ặ", "a"],
  ["â", "a"],
  ["ấ", "a"],
  ["ầ", "a"],
  ["ẩ", "a"],
  ["ẫ", "a"],
  ["ậ", "a"],
  ["é", "e"],
  ["è", "e"],
  ["ẻ", "e"],
  ["ẽ", "e"],
  ["ẹ", "e"],
  ["ê", "e"],
  ["ế", "e"],
  ["ề", "e"],
  ["ể", "e"],
  ["ễ", "e"],
  ["ệ", "e"],
  ["í", "i"],
  ["ì", "i"],
  ["ỉ", "i"],
  ["ĩ", "i"],
  ["ị", "i"],
  ["ó", "o"],
  ["ò", "o"],
  ["ỏ", "o"],
  ["õ", "o"],
  ["ọ", "o"],
  ["ô", "o"],
  ["ố", "o"],
  ["ồ", "o"],
  ["ổ", "o"],
  ["ỗ", "o"],
  ["ộ", "o"],
  ["ơ", "o"],
  ["ớ", "o"],
  ["ờ", "o"],
  ["ở", "o"],
  ["ỡ", "o"],
  ["ợ", "o"],
  ["ú", "u"],
  ["ù", "u"],
  ["ủ", "u"],
  ["ũ", "u"],
  ["ụ", "u"],
  ["ư", "u"],
  ["ứ", "u"],
  ["ừ", "u"],
  ["ử", "u"],
  ["ữ", "u"],
  ["ự", "u"],
  ["ý", "y"],
  ["ỳ", "y"],
  ["ỷ", "y"],
  ["ỹ", "y"],
  ["ỵ", "y"],
  ["Á", "a"],
  ["À", "a"],
  ["Ả", "a"],
  ["Ã", "a"],
  ["Ạ", "a"],
  ["Ă", "a"],
  ["Ắ", "a"],
  ["Ằ", "a"],
  ["Ẳ", "a"],
  ["Ẵ", "a"],
  ["Ặ", "a"],
  ["Â", "a"],
  ["Ấ", "a"],
  ["Ầ", "a"],
  ["Ẩ", "a"],
  ["Ẫ", "a"],
  ["Ậ", "a"],
  ["É", "e"],
  ["È", "e"],
  ["Ẻ", "e"],
  ["Ẽ", "e"],
  ["Ẹ", "e"],
  ["Ê", "e"],
  ["Ế", "e"],
  ["Ề", "e"],
  ["Ể", "e"],
  ["Ễ", "e"],
  ["Ệ", "e"],
  ["Í", "i"],
  ["Ì", "i"],
  ["Ỉ", "i"],
  ["Ĩ", "i"],
  ["Ị", "i"],
  ["Ó", "o"],
  ["Ò", "o"],
  ["Ỏ", "o"],
  ["Õ", "o"],
  ["Ọ", "o"],
  ["Ô", "o"],
  ["Ố", "o"],
  ["Ồ", "o"],
  ["Ổ", "o"],
  ["Ỗ", "o"],
  ["Ộ", "o"],
  ["Ơ", "o"],
  ["Ớ", "o"],
  ["Ờ", "o"],
  ["Ở", "o"],
  ["Ỡ", "o"],
  ["Ợ", "o"],
  ["Ú", "u"],
  ["Ù", "u"],
  ["Ủ", "u"],
  ["Ũ", "u"],
  ["Ụ", "u"],
  ["Ư", "u"],
  ["Ứ", "u"],
  ["Ừ", "u"],
  ["Ử", "u"],
  ["Ữ", "u"],
  ["Ự", "u"],
  ["Ý", "y"],
  ["Ỳ", "y"],
  ["Ỷ", "y"],
  ["Ỹ", "y"],
  ["Ỵ", "y"],
];

function replaceVietnameseChars(str: string) {
  for (const [char, replacement] of CUSTOM_REPLACEMENTS) {
    str = str.replace(new RegExp(char, "g"), replacement);
  }
  return str;
}

export const autoSlugify = (name: string) => {
  const slug = slugify(replaceVietnameseChars(name), {
    lower: true,
    trim: true,
  });
  return slug;
};
