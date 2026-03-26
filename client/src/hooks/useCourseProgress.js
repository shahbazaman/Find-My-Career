// src/hooks/useCourseProgress.js
import { useState, useEffect } from "react";
import axios from "axios";

export default function useCourseProgress(courseKey, totalPages) {
  const [completedPages, setCompletedPages] = useState(new Set());

  // Load existing progress on mount
  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/course-progress`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const record = res.data.find(r => r.courseKey === courseKey);
        if (record) setCompletedPages(new Set(record.completedPages));
      } catch (err) {
        console.error("Failed to load progress", err);
      }
    };
    load();
  }, [courseKey]);

  // Call this when user moves to next page
  const markPageComplete = async (pageNumber) => {
    if (completedPages.has(pageNumber)) return; // already saved

    setCompletedPages(prev => new Set([...prev, pageNumber]));

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/course-progress/${courseKey}`,
        { pageNumber, totalPages },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Failed to save progress", err);
    }
  };

  const progressPercent = totalPages === 0 ? 0 :
    Math.round((completedPages.size / totalPages) * 100);

  return { completedPages, markPageComplete, progressPercent };
}