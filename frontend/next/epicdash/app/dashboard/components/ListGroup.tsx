import { useState } from "react";

interface Props {
  items : string[];
  heading : string;
  onSelectItem: (item: string) =>void;
}

function ListGroup({items, heading}: Props) {
  //Hook
  const [selectedIndex,setSelectedIndex] = useState(-1);
  // arr[0] variable (selectedIndex)
  // arr[1] updater function


  // in the future this const will be populated by our backend
  // and the "key" for each patient will be their ID


  return (
    <>
      <h1>{heading}</h1>
      <ul className="list-group">
        {items.map((item,index) => (
          <li
            className={selectedIndex === index ? "list-group-item active" : "list-group-item"}
            key={item}
            onClick={() => setSelectedIndex(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
