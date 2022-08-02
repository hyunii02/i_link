import React from "react";
import { useState } from "react";
import CreateMemo from "./creatememo";

const CreateMemoForm = () => {
  const [memoTitle, setMemoTitle] = useState("");
  const [memoContent, setmemoContent] = useState("");

  <input
    type="text"
    placeholder="제목"
    onChange={(e) => setMemoTitle(e.target.value)}
  ></input>;

  return (
    <div>
      <CreateMemo />
    </div>
  );
};

export default CreateMemoForm;
