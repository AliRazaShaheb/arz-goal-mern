import React, { useState } from "react";
import GoalComp from "./GoalComp";
import IconComp from "./IconComp";

const HomeComp = () => {
  const [editable, setEditable] = useState(false);
  const [index, setIndex] = useState(0);

  const editableHandler = (idx: number) => {
    setEditable(true);
    setIndex(idx);
  };

  return (
    <div className="flex items-start justify-center mt-[5rem] h-[calc(100vh-5rem)]">
      <div className="w-[100%] md:w-[65%] lg:w-[60%] flex flex-col justify-center items-center">
        <div className="bg-gray-900 w-full flex flex-col justify-center items-center py-8 text-[2rem] font-bold">
          Welcome Name
          <p className="text-xl mt-[1rem] font-semibold text-gray-500">
            Your Goals
          </p>
        </div>
        <div className=" w-full">
          {[1, 2, 3, 4].map((goal, idx) => {
            return (
              <React.Fragment key={idx}>
                <GoalComp
                  goal={goal}
                  editable={editable}
                  setEditable={setEditable}
                  editableHandler={editableHandler}
                  idx={idx}
                  index={index}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeComp;
