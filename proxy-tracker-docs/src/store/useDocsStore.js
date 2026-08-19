import { api } from "../utils/api";
import { create } from "zustand";

export const useDocsStore = create((set) => ({
  scrapedoDocs: [],
  scraperDocs: [],

  scrapedoLoading: false,
  scraperLoading: false,

  scrapedoError: null,
  scraperError: null,

  // SCRAPEDO
  fetchScrapedoDocs: async () => {
    try {
      set({
        scrapedoLoading: true,
        scrapedoError: null,
      });

      const res = await api.get("/api/docs/scrapedo");

      set({
        scrapedoDocs: res.data || [],
        scrapedoLoading: false,
      });
    } catch (err) {
      set({
        scrapedoDocs: [],
        scrapedoLoading: false,
        scrapedoError:
          err.response?.data?.detail || "Failed to fetch Scrapedo docs",
      });
    }
  },

  // SCRAPER
  fetchScraperDocs: async () => {
    try {
      set({
        scraperLoading: true,
        scraperError: null,
      });

      const res = await api.get("/api/docs/scraper");

      set({
        scraperDocs: res.data || [],
        scraperLoading: false,
      });
    } catch (err) {
      set({
        scraperDocs: [],
        scraperLoading: false,
        scraperError:
          err.response?.data?.detail || "Failed to fetch Scraper docs",
      });
    }
  },
}));