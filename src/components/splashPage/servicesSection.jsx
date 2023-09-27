import { useState } from "react";
// SECTION FOR ICONS FOR SERVICES SECTION //

import binoculars from "./__assets__/icons/binoculars.png";
import notification from "./__assets__/icons/notification.png";
import barChart from "./__assets__/icons/bar-chart.png";
import magnifying from "./__assets__/icons/magnifying.png";
import group from "./__assets__/icons/group.png";
// CONSIDER MODULARIZING //

export default function Services() {
  

  const [expandedIndex, setExpandedIndex] = useState();

  const messages = {
    0: "Keep an eye on how your clients interact with your server, understanding traffic flows and usage patterns.",
    1: "Ciphyr keeps an eye out and alerts you when your queries start acting out of the ordinary, ensuring you're always in the loop.",
    2: "See the heartbeat of your GraphQL API! Our intuitive frontend displays useful metrics across a breath of charts and graphics",
    3: "Ciphyr lets you sift through and analyze your queries, allowing you to identify patterns and streamline them for peak efficiency.",
    4: "Manage multiple GraphQL projects using Ciphyr. All you need is one account!"
  }
  const [isExpanded, setIsExpanded] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleToggle = (index) => {
    const updatedExpandedState = isExpanded.map((value, i) =>
      i === index ? !value : false
    );
    setIsExpanded(updatedExpandedState);
    setExpandedIndex(index);
  };

  return (
    <section
      id="services"
      className="flex flex-col items-center mx-12 mt-28 mb-32"
    >
      <div className="text-2xl font-semibold py-4">Services</div>
      <div className="text-4xl font-thin py-2 pb-12 mb-2">
        Bolster your GraphQL application's security
      </div>
      <div className="text-primary text-2xl  mb-4 ">
        Ciphyr works by capturing all outbound queries and storing it for your review
      </div>
      <div className="text-2xl mb-2">
        Through that process, we can provide the following services: 
      </div>
      <div className="text-lg italic text-slate-600 pb-12 mb-12">
        psst...click on them to see more!
      </div>
      <div className="flex flex-row space-x-10 w-full justify-around items-center mb-12">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`flex flex-col items-center w-1/3 rounded-lg ${
              isExpanded[index] ? "border-2 shadow-md" : ""
            }`}
            onClick={() => handleToggle(index)}
          >
            {index === 0 && <img src={binoculars} className="w-20 py-2" />}
            {index === 1 && <img src={notification} className="w-20 py-2" />}
            {index === 2 && <img src={barChart} className="w-20 py-2" />}

            <div className="py-2 hover:text-sky-800  font-medium cursor-pointer text-lg ">
              {index === 0 && "Monitor your client's traffic"}
              {index === 1 && "Get alerts for your queries"}
              {index === 2 && "Visualize your performance"}
            </div>

            {isExpanded[index] && (
              <div className="p-4 mt-2 border-t text-center">
                 {messages[expandedIndex] || 'Message not found for this index'}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-row space-x-10 w-full items-start justify-around mt-14 mb-10">
        {[3, 4].map((index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center w-1/3 rounded-lg ${
              isExpanded[index] ? "border-2 shadow-md" : ""
            }`}
            onClick={() => handleToggle(index)}
          >
            {index === 3 && <img src={magnifying} className="w-20 py-2" />}
            {index === 4 && <img src={group} className="w-20 py-2" />}

            <div className="py-4 hover:text-sky-800 font-medium cursor-pointer text-lg  ">
              {index === 3 && "Inspect and filter your queries"}
              {index === 4 && "Install for all your instances"}
            </div>

            {isExpanded[index] && (
              <div className="p-4 mt-2 border-t text-center">
                 {messages[expandedIndex] || 'Message not found for this index'}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
