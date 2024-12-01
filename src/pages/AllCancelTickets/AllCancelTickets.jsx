import { useLoaderData } from "react-router-dom";

const AllCancelTickets = () => {
  const allCancelRequests = useLoaderData();
  return (
    <div className="container mx-auto min-h-[65vh]">
      <div className="grid grid-cols-2 gap-6">
        {allCancelRequests.map((data) => (
          <div
            key={data._id}
            className="border border-dotted rounded-xl bg-base-200 p-4"
          >
            <h1 className="text-xl font-bold text-theme-color">{data.email}</h1>
            <h1 className="text-xs font-semibold">TicketId:{data.ticketId}</h1>
            <hr className="border-dotted my-1" />
            <p className="text-gray-500 font-medium">{data.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCancelTickets;
