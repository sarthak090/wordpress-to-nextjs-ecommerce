import { useState } from "react";

const useFormInputs = (inital) => {
  const [fields, setFields] = useState(inital);

  return [
    fields,
    (evt) => {
      setFields({
        ...fields,
        [evt.target.name]: evt.target.value,
      });
    },
  ];
};
export default useFormInputs;
