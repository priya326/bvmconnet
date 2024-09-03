const ClubCards = ({
  renderCard,
  data,
}: {
  renderCard: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <div className="flex justify-center md:justify-center lg:justify-start gap-4  flex-wrap w-full">
      {data.map((item) => renderCard(item))}
    </div>
  );
};

export default ClubCards;
