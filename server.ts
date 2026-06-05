import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize the recommended Gemini Client on the server side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// POST API route to generate new dynamic copy options using Gemini 3.5 Flash
app.post("/api/generate-options", async (req, res) => {
  try {
    const { type, campaignName, campaignDescription } = req.body;

    if (!type || !campaignName) {
      return res.status(400).json({ error: "Faltan parámetros requeridos 'type' o 'campaignName'." });
    }

    let prompt = "";
    let responseSchema: any = null;

    if (type === 'header') {
      prompt = `Genera exactamente 3 opciones diferentes, creativas y llamativas para el título/encabezado de una campaña de correo o landing page de Buchanan's Whisky en Colombia. 
Campaña: "${campaignName}".
Descripción/Hito: "${campaignDescription || ''}".

Pautas de redacción:
- Estilo: Cercano, conversacional, con alma y pasión colombiana, celebrando la generosidad y la "familia elegda".
- Longitud: Máximo 60 caracteres por opción.
- Evita: Signos de exclamación excesivos o frases genéricas predecibles de IA.`;

      responseSchema = {
        type: Type.ARRAY,
        items: {
          type: Type.STRING
        }
      };
    } else if (type === 'cta') {
      prompt = `Genera exactamente 3 llamados a la acción (CTAs) cortos y de alta conversión para los botones principales de la campaña de Buchanan's Whisky de Diageo en Colombia.
Campaña: "${campaignName}".
Descripción/Hito: "${campaignDescription || ''}".

Pautas de redacción:
- Estilo: Corto, directo y que incite a la acción (ej: "Zonas de Bogotá", "Pedir Perfect Serve", "Hacer mi Plan Casa").
- Longitud: Máximo 25 caracteres por opción.`;

      responseSchema = {
        type: Type.ARRAY,
        items: {
          type: Type.STRING
        }
      };
    } else if (type === 'copy') {
      prompt = `Genera exactamente 3 tipos alternativos de enfoques de copys (borrador largo de párrafo y bajada/copy corto de 1 línea) para la campaña de Buchanan's Whisky en Colombia.
Campaña: "${campaignName}".
Descripción/Hito: "${campaignDescription || ''}".

Los tres enfoques a generar son:
1. "Futbolero/Inmersivo" (vívelo al ritmo de nuestra selección y pasión)
2. "Social/Reencuentro" (brindis con amigos, recetas de Perfect Serve y piña fresca)
3. "Digital/Corporativo" (enfoque directo de conversión, rápido y directo)

Para cada uno de estos 3 enfoques, define:
- label: Nombre corto del enfoque (ej: "Fútbol y Hermandad", "Recetas Piña", "Compra Express")
- long: El cuerpo del copy sugerido, de 130 a 180 caracteres.
- short: El copy corto sugerido para subcabezote o cierre, de 70 a 110 caracteres.`;

      responseSchema = {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            label: { type: Type.STRING, description: "Nombre descriptivo de la alineación de tono" },
            long: { type: Type.STRING, description: "Copy descriptivo largo de 2-3 líneas para cuerpo de texto" },
            short: { type: Type.STRING, description: "Copy de bajada corto de 1 línea de cierre o subcabezol" }
          },
          required: ["label", "long", "short"]
        }
      };
    } else {
      return res.status(400).json({ error: "Tipo de opción inválido." });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: "Eres el copywriter creativo senior líder para Diageo Colombia. Redactas copys y encabezados excepcionales para la marca icónica Buchanan's Blended Scotch Whisky de 12 y 18 años. Tus textos son sofisticados pero alegres de espíritu colombiano (parche, reunir a amigos de verdad, 'familia elegida'), siempre fomentando la generosidad y el consumo responsable (Diageo 18+). No uses jerga de IA estereotipada ni adornos innecesarios."
      }
    });

    const responseText = response.text || "[]";
    const parsed = JSON.parse(responseText.trim());
    return res.json({ options: parsed });

  } catch (err: any) {
    console.error("Gemini content generation error:", err);
    return res.status(500).json({ error: err.message || "Error al procesar la sugerencia con Gemini." });
  }
});

// Configure Vite middleware or production static asset folder
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
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Full-Stack Server] running on http://localhost:${PORT}`);
  });
}

startServer();
