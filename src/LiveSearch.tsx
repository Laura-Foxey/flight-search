import React, { useState } from "react";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";


interface Props {
  placeholder: string;
  data: { key: string; value: string }[];
  datavalue: string;
  setValue: (value: string | ((prevVar: string) => string)) => void;
}
function LiveSearch({ placeholder, data, datavalue, setValue }: Props) {
  const [focus, setFocus] = useState(false);

  const selectValue = (value: string) => {
    setValue(value);
    setFocus(false);
  };

  return (
    <div className="Searchbar-direction__section">
      <input
        className="Searchbar-direction__section__searchbox"
        type="text"
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        value={datavalue}
        onChange={(e) => setValue(e.target.value)}
      />
      {focus &&
        data
          .filter((d) => {
            if (
              datavalue === "" ||
              d.value.toLowerCase().includes(datavalue.toLowerCase())
            ) {
              return d;
            }
            return d;
          })
          .map((d) => {
            return (
              <div key={d.key} onClick={() => selectValue(d.value)}>
                {d.value}
              </div>
            );
          })}
    </div>
  );
}

export default LiveSearch;
