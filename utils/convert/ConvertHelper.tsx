/**
 * newKeys = {_id: "value", name: "label"}
 * obj = {_id: "123", name: "abc", age: 20, address: "xyz"}
 * Object.keys(obj) = ["_id", "name", "age", "address"]
 * newKeys[key] = newKeys["_id"] = "value"
 * newKeys[key] = newKeys["name"] = "label"
 * newKeys[key] = newKeys["age"] = undefined
 * if (!newKeys[key])
 *  => delete obj[key] => delete obj["age"] && delete obj["address"]
 * return {[newKey]: obj[key]}
 *  => {value: "123"} && return {label: "abc"}
 */
export function renameKeys(obj: any, newKeys: any) {
   const keyValues = Object.keys(obj).map((key) => {
      const newKey = newKeys[key] || key;
      if (!newKeys[key]) {
         delete obj[key];
      }
      return {[newKey]: obj[key]};
   });
   return Object.assign({}, ...keyValues);
}
