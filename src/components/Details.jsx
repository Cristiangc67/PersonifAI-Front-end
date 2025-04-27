import React from "react";

const Details = ({ characterSection, characterSectionTitle }) => {
  return (
    <details className="text-start h-fit bg-neutral-800 rounded-xl">
      <summary className="text-xl cursor-pointer bg-neutral-600 px-4 py-3 rounded-xl nunito-500">
        {characterSectionTitle}
      </summary>
      <p className="px-5 py-3 nunito-400">{characterSection}</p>
    </details>
  );
};

export default Details;
