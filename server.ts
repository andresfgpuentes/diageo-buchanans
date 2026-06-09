import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize the recommended Gemini Client on the server side lazily to prevent crashing if the key is missing
let aiInstance: any = null;
function getGeminiClient() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// Local dynamic copywriter algorithm as a robust fallback for Buchanan's in Colombia
function generateLocalFallback(type: string, campaignName: string, campaignDescription: string) {
  const normName = (campaignName || '').toLowerCase();
  const isCooling = normName.includes('cooling') || normName.includes('break');
  const isRuta = normName.includes('ruta') || normName.includes('buchanita');
  const isSorteo = normName.includes('fest') || normName.includes('sorteo') || normName.includes('concurso') || normName.includes('boleta');

  if (type === 'header') {
    if (isCooling) {
      return [
        "¡EL PARTIDO ESTÁ PICANTE, DISFRUTA LA PAUSA CON BUCHANAN'S! ⚽️⚡️",
        "MINUTO 22: COORDINA TU RECESO DE COMPARTIR Y SABOR EN EL PARCHE",
        "¿AFICIONADOS AL BUEN WHISKY? REFRÉSCATE HOY CON GINGER Y PIÑA"
      ];
    } else if (isRuta) {
      return [
        "🗺️ ¡VIVE LA SENSACIÓN DE LA RUTA BUCHANITA EN TU CIUDAD!",
        "UN DISCOVER SEGURO: BARES OFICIALES DE NUESTRA GRAN FAMILIA ELEGIDA",
        "RESERVA TU MESA PREFERENCIAL Y RECLAMA TU SHOT CON LOS DE SIEMPRE"
      ];
    } else if (isSorteo) {
      return [
        "🎉 ¡SÉ PARTE DE LA FIESTA! REGISTRA COMPRAS PARA EL FAN FEST",
        "CONCURSA POR PASES VIP DOBLES PARA ESTA FASE FINAL DEL MUNDIAL",
        "TIQUETES PREMIUM DE DIAGEO STORE PARA EL JUEGO QUE ESPERABAS"
      ];
    } else {
      return [
        "¡GRACIAS COLOMBIA POR LLENAR ESTE PARCHE DE HISTORIAS Y EMOCIÓN! ❤️",
        "EL MUNDIAL TERMINA, PERO LA GENEROSIDAD DE REUNIRSE QUEDA",
        "SÉ MIEMBRO VIP DE NUESTRO CLUB BUCHANAN'S PARA EVENTOS EXCLUSIVOS"
      ];
    }
  } else if (type === 'cta') {
    if (isCooling) {
      return [
        "Unir mi parche a la Copa 🥃",
        "Reclamar cupón Rappi ⚡️",
        "Ver cobertura express 🛵"
      ];
    } else if (isRuta) {
      return [
        "Geolocalizar Bares Hoy 🗺️",
        "Activar mi Pasaporte 🎟️",
        "Reservar mesa de amigos 📞"
      ];
    } else if (isSorteo) {
      return [
        "Ingresar mi Factura 🧾",
        "Participar por pases VIP 🏆",
        "Términos del Sorteo 📂"
      ];
    } else {
      return [
        "Unirme gratis al Club 👑",
        "Ver catálogo de Whiskies 🛒",
        "Enviar mi opinión 💬"
      ];
    }
  } else if (type === 'copy') {
    if (isCooling) {
      return [
        {
          label: "Pasión & Entretiempo ⚽️",
          long: `No permitas que el entusiasmo de los partidos decaiga durante el Cooling Break de ${campaignName}. Prepárate un refrescante Buchanan's con ginger y disfruta del entretiempo oficial de los hinchas.`,
          short: "El entretiempo perfecto para compartir un Buchanan's con los de siempre de manera responsable."
        },
        {
          label: "Familia Coordinada 🏠",
          long: "Cada jugada y cada gol se gozan más en casa cuando estás rodeado de tu familia elegida. Pon hielo en los vasos y deja que la generosidad sea el mejor serve del día.",
          short: "Pide por Rappi Colombia con envíos prioritarios y quédate en la jugada."
        },
        {
          label: "Perfect Serve Ginger 🍋",
          long: "Sabor duradero y suavidad inconfundible. Descubre el Perfect Serve ideal para este mundial: Buchanan's 12 Años, ginger ale bien fría, cubos de hielo y un twist saludable de piña.",
          short: "Consumo responsable. Prohíbase el expendio de bebidas embriagantes a menores de edad."
        }
      ];
    } else if (isRuta) {
      return [
        {
          label: "Ruta de Bares Oficial 🗺️",
          long: `La noche colombiana vibra al compás del mundial de fútbol. A través de este portal, planifica tu salida a los bares autorizados de Bogotá o Medellín de la Ruta Buchanita para festejar.`,
          short: "Presenta esta comunicación en barra y reclama un shot oficial para abrir la noche."
        },
        {
          label: "Menús Especiales 🍽️",
          long: "Disfruta de espectaculares combos de picadas campestres acompañados de jarras de cócteles a base de escocés. Agenda tu reserva online para tener pantallas gigantes garantizadas.",
          short: "Asegura la mesa del parche con un 15% de descuento exclusivo rellenando el formulario."
        },
        {
          label: "Regalos Diageo 🎁",
          long: "Queremos recompensar la lealtad de la familia elegida. Sube tu comprobante de visita a cualquier local de la Ruta para participar por hieleras de cuero premium y vasos cortos oficiales.",
          short: "Registra tus pases y reclama hieleras mundialistas premium."
        }
      ];
    } else if (isSorteo) {
      return [
        {
          label: "Sorteo VIP Fan Fest 🎟️",
          long: `Llega la gran final de ${campaignName} y queremos llevarte a la zona de hospitalidad VIP oficial. Inscríbete en el formulario inferior y participa en la tómbola regulada por Coljuegos.`,
          short: "La experiencia Fan Fest oficial te espera. Registra tus datos ya mismo."
        },
        {
          label: "Hospitalidad en Casa 🪵",
          long: "Sorteamos 100 espectaculares kits profesionales de coctelería para que seas el anfitrión estelar en tu sala de estar. Incluye copas de colección, cucharas trenzadas y Buchanan's 12.",
          short: "Transforma tu casa en un bar mundialista con el kit original Buchanan's."
        },
        {
          label: "Bono Diageo Store 🧾",
          long: "Al cargar tu factura de compra de cualquier botella original de Buchanan's en establecimientos afiliados, recibes automáticamente un código de 20% de descuento para Diageo Store.",
          short: "Sube tu tiquete hoy y obtén envío express garantizado para tu próximo pedido."
        }
      ];
    } else {
      return [
        {
          label: "Cierre & Gratitud Genuina 🙌",
          long: `Ha sido una copa mundial llena de abrazos y momentos memorables para Buchanan's Colombia. Aunque la emoción del campo termine, la alegría y generosidad de compartir sigue viva.`,
          short: "¡Brindemos por los reencuentros del futuro con la sofisticación de Buchanan's!"
        },
        {
          label: "Retroalimentación de Hinchas 📊",
          long: "Tu experiencia y opiniones nos ayudan a mejorar el servicio. Completa la encuesta rápida de satisfacción al final para contarnos cuál hito de campaña viviste con mayor pasión.",
          short: "Completa el feedback de marca y obtén un código obsequio del 15%."
        },
        {
          label: "Comunidad VIP FY27 👑",
          long: "Sé el primero en enterarte de catas sensoriales premium con sommeliers internacionales y preventas exclusivas de botellas numeradas. Regístrate gratis en el Club Buchanan's.",
          short: "Disfruta responsablemente. Diageo Colombia S.A. 18+"
        }
      ];
    }
  }
  return [];
}

// POST API route to generate new dynamic copy options using Gemini 3.5 Flash safely
app.post("/api/generate-options", async (req, res) => {
  try {
    const { type, campaignName, campaignDescription } = req.body;

    if (!type || !campaignName) {
      return res.status(400).json({ error: "Faltan parámetros requeridos 'type' o 'campaignName'." });
    }

    try {
      // Attempt to invoke the real server-side Gemini 3.5 Flash client
      const ai = getGeminiClient();
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

    } catch (apiError: any) {
      console.warn("Gemini content generation raised an error or API Key is missing. Falling back gracefully to premium local generator:", apiError.message);
      // Generate highly high-quality copy variants programmatically using our custom brand voice fallback
      const localOptions = generateLocalFallback(type, campaignName, campaignDescription);
      return res.json({ options: localOptions, isFallback: true });
    }

  } catch (err: any) {
    console.error("General option generation handler error:", err);
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
