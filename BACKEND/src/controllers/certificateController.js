import { extractTextFromImage } from "../utils/ocr.js";

export const verifyCertificate = async (req, res) => {
  try {
    const filePath = req.file.path;
    const extractedText = await extractTextFromImage(filePath);

    // Example rule-based authenticity check
   const normalizedText = extractedText.toLowerCase().replace(/\s+/g, " "); // lowercase , our rules yaha add karne hai.
const isValid = normalizedText.includes("jayesh gorakh");
const verificationScore = isValid ? 98.5 : 40;

    res.json({
      status: isValid ? "AUTHENTIC" : "FAKE",
      verificationScore,
      extractedText
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
