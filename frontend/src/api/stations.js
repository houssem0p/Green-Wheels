// src/api/stations.js

import axios from "axios";

const API = "http://localhost:5000/api";

// GET ALL
export const getStations = async () => {
  const res = await axios.get(`${API}/stations`);
  return res.data;
};

// CREATE
export const createStation = async (data) => {
  const res = await axios.post(`${API}/stations`, data);
  return res.data;
};

// UPDATE
export const updateStation = async (id, data) => {
  const res = await axios.put(`${API}/stations/${id}`, data);
  return res.data;
};

// DELETE
export const deleteStation = async (id) => {
  const res = await axios.delete(`${API}/stations/${id}`);
  return res.data;
};

export const toggleStationStatus = async (id) => {
  const res = await axios.patch(`${API}/stations/${id}/deactivate`);
  return res.data;
};