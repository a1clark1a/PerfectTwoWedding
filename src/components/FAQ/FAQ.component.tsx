import React, { useState } from "react";

import "./FAQ.styles.scss";
const FAQ = (): React.JSX.Element => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const items = [
    {
      title: "What time should I arrive?",
      description: "- Description for Item 1",
    },
    {
      title: "Is smoking allowed on the premise?",
      description: "- Description for Item 2",
    },
    { title: "Can I bring a guest?", description: "- Description for Item 3" },
    {
      title: "Will there be an open bar?",
      description: "- Description for Item 4",
    },
    {
      title: "Will there be parking?",
      description: "- Description for Item 5",
    },
    { title: "Are children invited?", description: "- Description for Item 6" },
  ];

  return (
    <section id="FAQs" className="FAQSection">
      <div className="FAQContainer">
        <h2>Frequently Asked Question</h2>
        <div className="FAQListContainer">
          <ul className="FAQList">
            {items.map((item, index) => (
              <li key={index}>
                <div
                  onClick={() => toggleDropdown(index)}
                  className="itemTitle"
                >
                  {item.title}
                </div>
                <div
                  className={`dropdownContent ${
                    openDropdown === index ? "open" : ""
                  }`}
                >
                  {item.description}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
