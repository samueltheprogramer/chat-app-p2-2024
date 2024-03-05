"use client";

import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const CharacterLimitedTextField = ({
  maxLength,
  setNewMessage,
  newMessage,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setNewMessage(e.target.value);
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setInputValue(newValue);
    }
  };

  return (
    <TextField
      autoFocus
      multiline
      value={newMessage}
      onChange={handleChange}
      label={`Type here (max ${maxLength} characters)`}
      variant="outlined"
      inputProps={{ maxLength }}
    />
  );
};

export default CharacterLimitedTextField;
