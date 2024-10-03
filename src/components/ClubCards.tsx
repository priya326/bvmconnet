import React from "react";

const ClubCards = ({
  renderCard,
  data,
}: {
  renderCard: (item: any) => React.ReactNode;
  data: any[]; // Keep the type as an array
}) => {
  return (
    <div className="flex justify-center md:justify-center lg:justify-start gap-4 flex-wrap w-full">
      {Array.isArray(data) && data.length > 0 ? (
        data.map((item) => renderCard(item))
      ) : (
        <p>No clubs available.</p> // Message displayed when there are no clubs
      )}
    </div>
  );
};

export default ClubCards;
