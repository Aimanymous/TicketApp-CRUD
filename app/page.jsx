import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  try {
    const res = await fetch("https://vercel.live/api/event/tick", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get the Tickets", error);
    return null; // Return a default value or handle the error appropriately
  }
};

const Dashboard = async () => {
  const result = await getTickets();

  if (!result) {
    // Handle the case where getTickets failed
    return <div>Error loading tickets</div>;
  }

  const { tickets } = result;

  if (!tickets) {
    // Handle the case where tickets is undefined or null
    return <div>No tickets available</div>;
  }

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
