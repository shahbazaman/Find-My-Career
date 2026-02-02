import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BsBellFill, 
  BsCheckCircleFill, 
  BsExclamationTriangleFill, 
  BsInfoCircleFill, 
  BsTrash3,
  BsThreeDotsVertical 
} from "react-icons/bs";
import "../css/Notification.css";
import axios from "axios";
import { getUserId } from "../utils/auth";

export default function Notification() {
  const [items, setItems] = useState([]);
  const userId = getUserId();

  useEffect(() => {
    if (!userId) return;
    fetchNotifications();
  }, [userId]);

  const fetchNotifications = () => {
    axios
      .get(`http://localhost:5000/api/notifications/user/${userId}`)
      .then(res => setItems(res.data || []))
      .catch(err => console.error("Fetch error:", err));
  };

  const deleteNotification = (id) => {
    // Optional: Add backend delete call here
    setItems(items.filter(item => item._id !== id));
  };

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
      <div className="notif-container">
        <header className="notif-header">
          <div className="header-left">
            <div className="bell-icon-container">
              <BsBellFill />
              {items.length > 0 && <span className="notif-dot" />}
            </div>
            <h1>Notifications</h1>
          </div>
          <button className="mark-read-btn" onClick={() => setItems([])}>Clear All</button>
        </header>

        <div className="notif-list">
          <AnimatePresence mode="popLayout">
            {items.length > 0 ? (
              items.map((item) => {
                const config = getStatusConfig(item.title);
                return (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="notif-card"
                  >
                    <div className="notif-indicator" style={{ backgroundColor: config.color }} />
                    <div className="notif-icon-box" style={{ color: config.color, backgroundColor: config.bg }}>
                      {config.icon}
                    </div>
                    <div className="notif-content">
                      <div className="notif-title-row">
                        <h4>{item.title}</h4>
                        <span className="notif-time">{item.time || "2m ago"}</span>
                      </div>
                      <p>{item.message || item.label}</p>
                    </div>
                    <button className="delete-btn" onClick={() => deleteNotification(item._id)}>
                      <BsTrash3 />
                    </button>
                  </motion.div>
                );
              })
            ) : (
              <div className="empty-state">
                <BsBellFill className="empty-icon" />
                <p>All caught up! No new notifications.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}