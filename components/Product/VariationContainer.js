import React, { useState } from "react";

export default function VariationContainer({ variations, attributes }) {
  const [selectedAttrb, setSelectedAttrb] = useState("");
  const handleAttrbChange = (e) => {
    variations.forEach((attrb) => {
      const hasIndex = Object.values(attrb.attributes).indexOf(e.target.value);
      if (hasIndex > -1) {
        getOptionFromAtrrb2(attrb.attributes);
      }
    });
  };
  const getOptionFromAtrrb = (attributes) => {
    let options = [];
    Object.keys(attributes).map((key) =>
      options.push({
        key,
        availableOption: String(attributes[key]).split(" | "),
      })
    );
    return options;
  };
  const getOptionFromAtrrb2 = (attributes) => {
    let options = [];
    Object.keys(attributes).map((key) => {
      console.log(attributes[key].length > 0);
      options.push({
        key,
        availableOption: String(attributes[key]).split(" | "),
      });
    });
    return options;
  };
  return (
    <div>
      {getOptionFromAtrrb(attributes).map((option) => (
        <div>
          <select className="form-control my-3" onChange={handleAttrbChange}>
            //
            <option className="form-control" defaultValue={option.key}>
              {" "}
              Select {option.key}
            </option>
            {option.availableOption.map((avlOpt) => (
              <option className="form-control" value={avlOpt}>
                {" "}
                {avlOpt}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
