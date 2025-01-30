import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { setLanguage } from "../redux/GlobalSlice";

const LanguageSwitcher = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.global.language);

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setLanguage(event.target.value));
  };

  return (
    <select value={language} onChange={handleLanguageChange}>
      <option value="en">English</option>
      <option value="pt">Portuguese</option>
      <option value="jp">Japanese</option>
    </select>
  );
};

export default LanguageSwitcher;
