import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSheetData } from "../store";

const FindReplace = () => {
  const dispatch = useDispatch();
  const sheetData = useSelector((state) => state.sheet.data);
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");

  const handleReplace = () => {
    const newData = sheetData.map(row =>
      row.map(cell => (cell === findText ? replaceText : cell))
    );
    dispatch(setSheetData(newData));
  };

  return (
    <div className="find-replace-container">
      <input type="text" placeholder="Find" value={findText} onChange={(e) => setFindText(e.target.value)} />
      <input type="text" placeholder="Replace With" value={replaceText} onChange={(e) => setReplaceText(e.target.value)} />
      <button onClick={handleReplace}>Replace</button>
    </div>
  );
};

export default FindReplace;
