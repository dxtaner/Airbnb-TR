import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import socketio from "socket.io-client";
import api from "../../services/api";
import "./Dashboard.css";

export default function Dashboard({ history }) {
  const user_id = localStorage.getItem("user");
  if (!user_id) {
    history.push("/");
  }

  const [requests, setRequests] = useState([]);
  const [spots, setSpots] = useState([]);

  const socket = useMemo(
    () =>
      socketio("http://localhost:3033", {
        query: { user_id },
      }),
    [user_id]
  );

  useEffect(() => {
    socket.on("booking_request", (data) => {
      setRequests((prevRequests) => [...prevRequests, data]);
    });
  }, [socket]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem("user");
      const response = await api.get("/dashboard", {
        headers: { user_id },
      });

      setSpots(response.data);
    }
    loadSpots();
  }, []);

  async function handleAccept(id) {
    await api.post(`/bookings/${id}/approvals`);
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request._id !== id)
    );
  }

  async function handleReject(id) {
    await api.post(`/bookings/${id}/rejections`);
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request._id !== id)
    );
  }

  return (
    <div className="dashboard-container">
      <ul className="notifications">
        {requests.map((request) => (
          <li key={request._id} className="notification-item">
            <p className="notification-text">
              <strong>{request.user.email}</strong>,{" "}
              <strong>{request.date}</strong> tarihinde{" "}
              <strong>{request.spot.company}</strong> için rezervasyon talebi
              gönderdi.
            </p>

            <button
              onClick={() => {
                handleAccept(request._id);
              }}
              className="accept-button">
              KABUL ET
            </button>
            <button
              onClick={() => {
                handleReject(request._id);
              }}
              className="reject-button">
              REDDET
            </button>
          </li>
        ))}
      </ul>
      <ul className="spot-list">
        {spots.map((spot) => {
          return (
            <li key={spot._id} className="spot-item">
              <header
                style={{ backgroundImage: `url(${spot.thumbnail_url})` }}
                className="spot-image"
              />
              <strong
                style={{
                  color: "black",
                  float: "left",
                  fontWeight: "800",
                  fontSize: "18px",
                  margin: "10px",
                }}>
                {spot.company}
              </strong>

              <span className="spot-price">
                {spot.price ? `₺${spot.price}/gün` : `Ücretsiz`}
              </span>
            </li>
          );
        })}
      </ul>

      <Link to="/new" className="add-spot-link">
        <button className="add-spot-button">Yeni Mekan Ekle</button>
      </Link>
    </div>
  );
}
