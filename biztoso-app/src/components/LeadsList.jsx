import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLeads, claimLead, setFilter } from "../redux/leadsSlice.js";

const mockLeads = [
  { id: 1, name: "Company A", status: "new", color: "bg-green-500" },
  { id: 2, name: "Company B", status: "contacted", color: "bg-gray-500" },
  { id: 3, name: "Company C", status: "new", color: "bg-green-500" },
];

const LeadsList = () => {
  const dispatch = useDispatch();
  const { leads, filter } = useSelector((state) => state.leads);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setLeads(mockLeads));
    }, 1000);
  }, [dispatch]);

  const filteredLeads = leads.filter(
    (lead) => filter === "all" || lead.status === filter
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Business Leads</h2>
      <div className="mb-4">
        <button
          className="px-3 py-1 mr-2 bg-blue-500 text-white rounded"
          onClick={() => dispatch(setFilter("all"))}
        >
          All
        </button>
        <button
          className="px-3 py-1 mr-2 bg-green-500 text-white rounded"
          onClick={() => dispatch(setFilter("new"))}
        >
          New
        </button>
        <button
          className="px-3 py-1 bg-gray-500 text-white rounded"
          onClick={() => dispatch(setFilter("contacted"))}
        >
          Contacted
        </button>
      </div>
      <ul className="border p-2 rounded">
        {filteredLeads.map((lead) => (
          <li
            key={lead.id}
            className={`flex justify-between items-center p-2 border-b ${lead.color}`}
          >
            <span className="text-white">
              {lead.name} ({lead.status})
            </span>
            {lead.status === "new" && (
              <button
                className="px-2 py-1 bg-yellow-500 text-white rounded"
                onClick={() => dispatch(claimLead(lead.id))}
              >
                Claim
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeadsList;