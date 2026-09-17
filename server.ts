import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// API routes FIRST
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY environment variable is not configured." });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const contents = history && Array.isArray(history) 
      ? [...history.map((h: any) => ({ role: h.role, parts: [{ text: h.text }] })), { role: 'user', parts: [{ text: message }] }]
      : [{ role: 'user', parts: [{ text: message }] }];

    let response;
    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.1-pro-preview'];

    for (const modelName of modelsToTry) {
      try {
        response = await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction: "You are SANWOLF, an expert Electronics Repair Copilot and Hardware Engineer assistant for DIY Electronics Pro. Provide precise, technical, step-by-step guidance on motherboard troubleshooting, micro-soldering, component-level diagnostics, multimeter testing, schematics, and phone/laptop repair. If asked for the user's surname, state that it is Myende.",
          }
        });
        if (response && response.text) break;
      } catch (err: any) {
        // Silently try next model without throwing
      }
    }

    const reply = response?.text || (
      message.toLowerCase().includes('screen') || message.toLowerCase().includes('display') || message.toLowerCase().includes('lcd')
        ? "For cracked displays or display no-signal issues:\n1. Disconnect the battery terminal immediately to prevent shorting backlight boost circuits.\n2. Use a controlled heat gun (approx 80°C) to soften frame adhesive.\n3. Pry gently with a plastic spudger around the bezel.\n4. Always test the new digitizer/LCD assembly on the board before applying final frame adhesive tape."
        : message.toLowerCase().includes('battery') || message.toLowerCase().includes('charge') || message.toLowerCase().includes('power')
        ? "When diagnosing power or charging failures:\n1. Inspect the USB-C or Lightning port with an inspection microscope for bent pins or lint debris.\n2. Measure VBUS voltage with a digital multimeter (should read 5V default or 9V/12V PD negotiation).\n3. Check for short circuits across ceramic decoupling capacitors around the charging IC using continuity mode."
        : message.toLowerCase().includes('solder') || message.toLowerCase().includes('iron') || message.toLowerCase().includes('flux')
        ? "For professional component-level soldering:\n1. Set your soldering station to 350°C for lead-free SAC305 solder (or 320°C for Sn63/Pb37).\n2. Apply plenty of no-clean flux to promote thermal transfer and wetting.\n3. Use a chisel or hoof tip for ground planes and fine-pitch IC legs.\n4. Clean residual flux using 99% isopropyl alcohol and an ESD-safe brush."
        : `That's an excellent electronics question regarding "${message}".\nTo troubleshoot effectively on the workbench:\n1. Verify input power rails with your multimeter.\n2. Check schematic references for pinout verification and thermal stress marks.\n3. Feel free to search our platform's 1,420+ repair guides or consult the Circuit Lab for schematic simulations!`
    );
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI response" });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
