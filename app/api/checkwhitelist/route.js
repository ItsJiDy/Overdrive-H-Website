import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get("https://api.overdrivehub.xyz/v1/whitelist?d=" + req.query.d);
    res.status(200).json(response.data || {
      status: 400,
      message: "Something went wrong on our end."
    });
  } catch (error) {
    console.error("Proxy API Error:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}