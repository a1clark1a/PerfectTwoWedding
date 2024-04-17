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
      description:
        "- The ceremony starts at 3pm, please arrive at least 30 mins before the start.",
    },
    {
      title: "Is smoking allowed on the premise?",
      description:
        "- Smoking is prohibited in the Park.  A designated smoking area is located in the parking lot. Please respect the venue and the forest around you.'Only you can prevent forest fires.' - Winnie the Pooh",
    },
    {
      title: "Can I bring a guest?",
      description:
        "- If you are permitted a guest, it will be written on your invite. Otherwise, no, the guest will be turned away and not be able to stay.",
    },
    {
      title: "Will there be an open bar?",
      description:
        "-  We will have beer, wine, and other alcohol available. There is a set limit, once that limit is reached, you may still purchase alcoholic drinks for a price.",
    },
    {
      title: "Will there be parking?",
      description: "- Yes, free parking is available on the premise.",
    },
    {
      title: "Are children invited?",
      description:
        "- Although we love your children, we regretfully cannot accommodate them all. Thank you for your understanding.",
    },
    {
      title: "What color should I wear?",
      description:
        "- To ensure an elegant and cohesive atmosphere, we kindly request that guests refrain from wearing white or any off-white hues to the wedding. Additionally, we ask that the attire you wear to not closely resemble the cabernet or burgundy tones chosen for the bridal party. Your cooperation in adhering to these guidelines is greatly appreciated, as it contributes to the overall ambiance of our special day. Thank you for your understanding and consideration.",
    },
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
