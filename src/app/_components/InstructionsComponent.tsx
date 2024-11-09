import "~/styles/globals.css";

import { useState } from "react";

interface Props {
  instructions: string[];
}

export const InstructionsComponent = ({ instructions }: Props) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(instructions.length).fill(false),
  );

  const handleToggle = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  return (
    <div className="instructions-container">
      <b>Instruksjoner</b>
      <ul className="instructions-list">
        {instructions?.map((instruction, index) => (
          <li
            key={index}
            className={checkedItems[index] ? "checked-instruction" : ""}
            style={{
              fontSize: checkedItems[index] ? "0.6em" : "",
            }}
          >
            <input
              type="checkbox"
              checked={checkedItems[index]}
              onChange={() => handleToggle(index)}
            />
            {instruction}
          </li>
        ))}
      </ul>
    </div>
  );
};
