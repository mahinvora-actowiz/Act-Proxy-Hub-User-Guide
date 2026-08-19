import { api } from "../utils/api";
import { create } from "zustand";

export const useDocsStore = create((set) => ({
  // Unified state
  docsData: [],
  loading: false,
  error: null,

  // Unified fetch action
  fetchDocs: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      // TODO: Update this endpoint to match your new unified backend route 
      // (e.g., "/api/docs" or "/api/docs/proxy")
      const res = await api.get("/api/docs");

      set({
        docsData: res.data || [],
        loading: false,
      });
    } catch (err) {
      set({
        docsData: [],
        loading: false,
        error: err.response?.data?.detail || "Failed to fetch documentation",
      });
    }
  },
}));