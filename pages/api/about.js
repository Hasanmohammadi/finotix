export default function handler(req, res) {
  const lang = req.query.lang || "en";

  if (lang === "fa") {
    return res.status(200).json({ message: "تست فنی" });
  } else if (lang === "tr") {
    return res.status(200).json({ message: " turkish" });
  } else if (lang === "ar") {
    return res.status(200).json({ message: " arabic" });
  } else {
    return res.status(200).json({ message: "I am Code Gino" });
  }
}
