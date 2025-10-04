
import Tesseract from "tesseract.js";

export const extractTextFromImage = async (filePath) => {
  try {
    const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
    return text;
  } catch (err) {
    throw new Error("OCR failed: " + err.message);
  }
};
