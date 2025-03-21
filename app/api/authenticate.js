import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.post("https://api.overdrivehub.xyz/v1/whitelist?i=" + req.query.i);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Proxy API Error:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}