import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BsBellFill, 
  BsCheckCircleFill, 
  BsExclamationTriangleFill, 
  BsInfoCircleFill, 
  BsTrash3,
} from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/Notification.css";
import axios from "axios";
import { getUserId } from "../utils/auth";

export default function Notification() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all' or 'unread'
  const userId = getUserId();

  useEffect(() => {
    if (!userId) return;
    fetchNotifications();
  }, [userId]);

  const fetchNotifications = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/notifications/user/${userId}`)
      .then(res => setItems(res.data || []))
      .catch(err => {
        console.error("Fetch error:", err);
        toast.error("Failed to load notifications");
      });
  };

  const markAllAsRead = async () => {
    if (items.filter(i => !i.isRead).length === 0) {
      toast.info("No unread notifications to mark.");
      return;
    }

    try {
      // Sending POST to the "mark-all-read" endpoint
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/notifications/user/${userId}/mark-all-read`);
      
      // Update local state immediately so the filter updates
      setItems(prevItems => 
        prevItems.map(item => ({ ...item, isRead: true }))
      );
      
      toast.success("All notifications marked as read!");
    } catch (err) {
      console.error("Mark all error:", err);
      toast.error("Error updating notifications.");
    }
  };

  const markSingleAsRead = async (id, currentStatus) => {
    if (currentStatus) return; // Already read

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/notifications/${id}/read`);
      setItems(prevItems => 
        prevItems.map(item => item._id === id ? { ...item, isRead: true } : item)
      );
    } catch (err) {
      console.error("Error marking single notification:", err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      // Optional: Add backend delete call here
      // await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/notifications/${id}`);
      setItems(items.filter(item => item._id !== id));
      toast.info("Notification removed");
    } catch (err) {
      toast.error("Could not delete notification");
    }
  };

  // Logic to filter the list based on state
  const displayedItems = filter === "unread" 
    ? items.filter(item => item.isRead === false) 
    : items;

  const getStatusConfig = (title = "") => {
    const t = title.toLowerCase();
    if (t.includes("success") || t.includes("hired")) 
      return { icon: <BsCheckCircleFill />, color: "#10b981", bg: "#ecfdf5" };
    if (t.includes("warning") || t.includes("urgent")) 
      return { icon: <BsExclamationTriangleFill />, color: "#f59e0b", bg: "#fffbeb" };
    return { icon: <BsInfoCircleFill />, color: "#3b82f6", bg: "#eff6ff" };
  };

  return (
    <div className="notif-page">
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      
      <div className="notif-container">
        <header className="notif-header">
          <div className="header-left">
            <div className="bell-icon-container">
              <BsBellFill />
              {items.some(i => !i.isRead) && <span className="notif-dot" />}
            </div>
            <h1>Notifications</h1>
          </div>
          <div className="header-actions">
            <button 
              className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
              onClick={() => setFilter(filter === 'all' ? 'unread' : 'all')}
            >
              {filter === 'all' ? "Show Unread" : "Show All"}
            </button>
            <button className="mark-read-btn" onClick={markAllAsRead}>
              Mark all as read
            </button>
          </div>
        </header>

        <div className="notif-list">
          <AnimatePresence mode="popLayout">
            {displayedItems.length > 0 ? (
              displayedItems.map((item) => {
                const config = getStatusConfig(item.title);
                return (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`notif-card ${item.isRead ? 'read' : 'unread'}`}
                    onClick={() => markSingleAsRead(item._id, item.isRead)}
                  >
                    <div className="notif-indicator" style={{ backgroundColor: config.color }} />
                    <div className="notif-icon-box" style={{ color: config.color, backgroundColor: config.bg }}>
                      {config.icon}
                    </div>
                    <div className="notif-content">
                      <div className="notif-title-row">
                        <h4>
                          {item.title} 
                          {!item.isRead && <span className="unread-badge">•</span>}
                        </h4>
                        <span className="notif-time">{item.time || "Just now"}</span>
                      </div>
                      <p>{item.message || item.label}</p>
                    </div>
                    <button 
                      className="delete-btn" 
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent marking as read when deleting
                        deleteNotification(item._id);
                      }}
                    >
                      <BsTrash3 />
                    </button>
                  </motion.div>
                );
              })
            ) : (
              <div className="empty-state">
                <BsBellFill className="empty-icon" />
                <p>{filter === 'unread' ? "No unread notifications!" : "All caught up!"}</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}