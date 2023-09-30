import React, { useEffect, useRef, useState } from "react";
import IconComp from "./IconComp";

interface GoalCompPropsTypes {
  goal: string | number;
  editable: boolean;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
  editableHandler: (idx: number) => void;
  idx: number;
  index: number;
}

const GoalComp = ({
  goal,
  editable,
  setEditable,
  editableHandler,
  idx,
  index,
}: GoalCompPropsTypes) => {
  const ref = useRef<HTMLTextAreaElement>(null!);

  const [textAreaValue, setTextAreaValue] = useState<string | number>("");

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    setTextAreaValue(value);
  };

  useEffect(() => {
    setTextAreaValue(goal);
    ref.current.focus();
  }, [editable]);

  return (
    <div className="p-4 my-2 bg-gray-600 flex justify-between h-[5rem]">
      <textarea
        className="text-[1.3rem] px-2 font-semibold bg-transparent outline-none border-none w-[80%] rounded-md resize-none"
        contentEditable={idx === index}
        suppressContentEditableWarning
        ref={ref}
        value={textAreaValue}
        onChange={(e) => handleTextArea(e)}
        style={{
          border: idx === index ? "1px solid white" : "none",
        }}
      />
      <div className="flex gap-8">
        <IconComp
          name="edit"
          onClick={() => editableHandler(idx)}
          className="text-green-500"
          size={18}
        />
        <IconComp
          name="delete"
          onClick={() => console.log("click")}
          className="text-red-500"
          size={18}
        />
      </div>
    </div>
  );
};

export default GoalComp;
