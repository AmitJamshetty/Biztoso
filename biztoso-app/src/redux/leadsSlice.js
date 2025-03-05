import { createSlice } from "@reduxjs/toolkit";

const leadsSlice = createSlice({
  name: "leads",
  initialState: { leads: [], filter: "all" },
  reducers: {
    setLeads: (state, action) => {
      state.leads = action.payload;
    },
    claimLead: (state, action) => {
      const lead = state.leads.find((lead) => lead.id === action.payload);
      if (lead) {
        lead.status = "contacted";
        lead.color = "bg-gray-500";
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setLeads, claimLead, setFilter } = leadsSlice.actions;
export default leadsSlice.reducer;