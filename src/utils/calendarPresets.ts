import { EmailVariables, EmailBlock } from '../types';
import { OFFICIAL_TEXTURE_URL } from './htmlGenerator';

export interface CalendarPreset {
  eventId: string;
  eventName: string;
  date: string;
  day: string;
  type: 'Matchday' | 'A/B Test' | 'Engagement' | 'Ruta' | 'Closing' | string;
  subject: string;
  channel: string;
  audience: string;
  objective: string;
  suggestedCopy: string;
  editorVariables: EmailVariables;
}

export const CALENDAR_PRESETS: CalendarPreset[] = [
  {
    eventId: 'cal-0',
    eventName: 'Cooling Break #1 A/B',
    date: 'Jun 8',
    day: 'Lunes',
    type: 'Matchday',
    subject: 'Minuto 22: ¡Pausa el partido, enciende el sabor! ⚽️⚡️',
    channel: 'Salesforce Journey Builder / Triggered Send',
    audience: 'Hinchas Registrados - Frecuencia de Selección (Consumo en Casa)',
    objective: 'Capturar la atención del hincha en el entretiempo del juego inaugural mediante el Perfect Serve.',
    suggestedCopy: 'El juego en vivo se toma un descanso de 15 minutos, pero las familias elegidas apenas comienzan a reunirse para avivar la pasión del fútbol. Mezcla 2 onzas de Buchanan\'s 12 Años con Ginger Ale muy helado, una rodaja de limón y hielo a discreción. ¡Es momento de charlar, refrescarse y disfrutar juntos!',
    editorVariables: {
      subject: 'Minuto 22: ¡Pausa el partido, enciende el sabor! ⚽️⚡️',
      logoUrl: "https://lh3.googleusercontent.com/d/1ZtNqBvS6qL-g9-7Lz1eZ_T0J3_TjW69i=w360",
      backgroundTextureUrl: OFFICIAL_TEXTURE_URL,
      eyebrow: "COPA MUNDIAL FIFA 2026™ — EL COOLING BREAK EN VIVO",
      welcomeHeadline: "¡ESTAMOS EN EL ENTRETIEMPO, ENCIENDE EL SABOR!",
      paragraph1: "El juego en vivo se toma un descanso de 15 minutos, pero las familias elegidas apenas comienzan a reunirse para avivar la pasión. Aprovecha el entretiempo para recargar copas.",
      paragraph2: "Prepara una refrescante Buchanita: 2 oz de Buchanan's, abundante hielo, Ginger Ale premium y una rodaja de limón fresco. Sencillo, helado y perfecto para calmar los nervios del juego.",
      buttonCasaText: "Pedir Buchanan's por Rappi",
      buttonCasaUrl: "https://www.rappi.com.co/restaurantes/19154-licorera-diageo",
      buttonBarText: "Ver Recetario Oficial",
      buttonBarUrl: "%%xt_recetario_url%%",
      legalDisclaimer: "DIAGEO te invita a disfrutar con responsabilidad. El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad. 40% Vol. Alc.",
      unsubscribeText: "Respetamos tu derecho a la privacidad. Este correo fue enviado por: Diageo Colombia S.A. Si no deseas recibir más comunicaciones de interés haz clic <a href=\"%%unsub_center_url%%\" style=\"color:#888888; text-decoration:underline;\">aquí</a>.",
      heroImageUrl: "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
      heroImageAlt: "Cooling Break Buchanitas",
      heroImageWidth: "500",
      showHeroImage: true,
      secondaryImageUrl: "https://lh3.googleusercontent.com/d/1ZtNqBvS6qL-g9-7Lz1eZ_T0J3_TjW69i=w360",
      secondaryImageAlt: "Logo Mundial",
      secondaryImageWidth: "150",
      showSecondaryImage: false,
      testFirstName: "Andrés",
      testConsumptionPreference: "En Casa",
      testCity: "Bogotá",
      blocks: [
        {
          id: "cb-eyebrow-0",
          type: "text",
          textStyle: "eyebrow",
          fontSize: "11px",
          text: "COPA MUNDIAL FIFA 2026™ — EL COOLING BREAK EN VIVO"
        },
        {
          id: "cb-head-0",
          type: "text",
          textStyle: "headline",
          fontSize: "24px",
          text: "¡ESTAMOS EN EL ENTRETIEMPO, ENCIENDE EL SABOR!"
        },
        {
          id: "cb-img-0",
          type: "image",
          imageUrl: OFFICIAL_TEXTURE_URL,
          imageAlt: "Cooling Break",
          imageWidth: "450",
          imageFullWidth: false
        },
        {
          id: "cb-cols-0",
          type: "columns",
          columnsCount: 2,
          columns: [
            {
              id: "cb-c0-l",
              type: "text",
              textStyle: "paragraph",
              fontSize: "13px",
              text: "<strong>Perfect Serve:</strong> Agrega 2 oz de Buchanan's, Ginger Ale y un toque cítrico con limón fresco en un vaso corto."
            },
            {
              id: "cb-c0-r",
              type: "text",
              textStyle: "paragraph",
              fontSize: "13px",
              text: "<strong>Rappi Prioritario:</strong> Recibe tu Buchanan's 12 Años helado en casa en menos de 15 minutos en las principales ciudades."
            }
          ]
        },
        {
          id: "cb-btns-0",
          type: "button-group",
          buttons: [
            {
              id: "cb-b0-1",
              text: "Pedir Buchanan's por Rappi",
              url: "https://www.rappi.com.co/restaurantes/19154-licorera-diageo",
              style: "solid-yellow",
              size: "medium"
            },
            {
              id: "cb-b0-2",
              text: "Ver Recetario Mundial",
              url: "%%xt_recetario_url%%",
              style: "outline-yellow",
              size: "medium"
            }
          ]
        }
      ]
    }
  },
  {
    eventId: 'cal-1',
    eventName: 'Cooling Break #1 A/B',
    date: 'Jun 10',
    day: 'Miércoles',
    type: 'Matchday',
    subject: 'Minuto 22: ¿Parche listo para el segundo tiempo? ⏰🥃',
    channel: 'Salesforce Journey A/B Test Triggers',
    audience: 'Hinchas que no abrieron el correo del Lunes',
    objective: 'Optimizar la tasa de apertura (A/B Test de Asunto) para dinamizar el pedido express de licoreras.',
    suggestedCopy: 'No dejes que los nervios o la pasión del gol te agarren con el vaso vacío. Es el entretiempo mundialista: la excusa perfecta para preparar una Buchanita con tus seres queridos.',
    editorVariables: {
      subject: 'Minuto 22: ¿Parche listo para el segundo tiempo? ⏰🥃',
      logoUrl: "https://lh3.googleusercontent.com/d/1ZtNqBvS6qL-g9-7Lz1eZ_T0J3_TjW69i=w360",
      backgroundTextureUrl: OFFICIAL_TEXTURE_URL,
      eyebrow: "MUNDIAL FIFA 2026™ — JÓVENES DEL TRULLO",
      welcomeHeadline: "MINUTO 22: ¡PAUSA EL JUEGO, DESTAPA EL REENCUENTRO!",
      paragraph1: "La emoción del mundial de fútbol nos une en torno a la pantalla. Pero lo más importante sucede fuera de ella: en las risas sinceras de tu familia elegida.",
      paragraph2: "Para refrescar el ambiente de este vibrante partido, te traemos la combinación ideal: Buchanan's con ginger y tu música latina preferida en el entretiempo.",
      buttonCasaText: "Pedir Pack Buchanan's",
      buttonCasaUrl: "https://www.rappi.com.co",
      buttonBarText: "Ver Recetas Rápidas",
      buttonBarUrl: "%%xt_recetario_url%%",
      legalDisclaimer: "DIAGEO te invita a disfrutar con responsabilidad. El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad. 40% Vol. Alc.",
      unsubscribeText: "Respetamos tu derecho a la privacidad. Diageo Colombia S.A. Si no deseas recibir más comunicaciones de interés haz clic <a href=\"%%unsub_center_url%%\">aquí</a>.",
      heroImageUrl: "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
      heroImageAlt: "Pack Buchanan's",
      heroImageWidth: "500",
      showHeroImage: true,
      secondaryImageUrl: "https://lh3.googleusercontent.com/d/1ZtNqBvS6qL-g9-7Lz1eZ_T0J3_TjW69i=w360",
      secondaryImageAlt: "Mundial Logo",
      secondaryImageWidth: "150",
      showSecondaryImage: false,
      testFirstName: "Andrés",
      testConsumptionPreference: "En Casa",
      testCity: "Bogotá",
      blocks: [
        {
          id: "cb-eyebrow-1",
          type: "text",
          textStyle: "eyebrow",
          fontSize: "11px",
          text: "MUNDIAL FIFA 2026™ — JÓVENES DEL TRULLO"
        },
        {
          id: "cb-head-1",
          type: "text",
          textStyle: "headline",
          fontSize: "24px",
          text: "MINUTO 22: ¡PAUSA EL JUEGO, DESTAPA EL REENCUENTRO!"
        },
        {
          id: "cb-img-1",
          type: "image",
          imageUrl: OFFICIAL_TEXTURE_URL,
          imageAlt: "Pack Buchanan's",
          imageWidth: "450",
          imageFullWidth: true
        },
        {
          id: "cb-cols-1",
          type: "columns",
          columnsCount: 2,
          columns: [
            {
              id: "cb-c1-l",
              type: "text",
              textStyle: "paragraph",
              fontSize: "14px",
              text: "<strong>Estamos Juntos:</strong> Sintoniza el canal Buchanan's Playlist para disfrutar de las mejores canciones de Rauw Alejandro durante el Cooling Break."
            },
            {
              id: "cb-c1-r",
              type: "text",
              textStyle: "paragraph",
              fontSize: "14px",
              text: "<strong>Perfect Serve:</strong> No arriesgues el sabor. Prepara con hielo, ginger natural y rodajas frescas de piña o limón."
            }
          ]
        },
        {
          id: "cb-btns-1",
          type: "button-group",
          buttons: [
            {
              id: "cb-b1-1",
              text: "Pedir Pack Buchanan's",
              url: "https://www.rappi.com.co",
              style: "solid-yellow",
              size: "large"
            },
            {
              id: "cb-b1-2",
              text: "Playlists de la Marca",
              url: "https://spotify.com",
              style: "outline-yellow",
              size: "medium"
            }
          ]
        }
      ]
    }
  },
  {
    eventId: 'cal-2',
    eventName: 'Cooling Break #2',
    date: 'Jun 17',
    day: 'Miércoles',
    type: 'Matchday',
    subject: 'Un partido intenso se merece un break con estilo ⚽️🧊',
    channel: 'Salesforce Journey - Email regular',
    audience: 'Hinchas de la base general de Colombia',
    objective: 'Recomendar la Buchanita con ginger ale como la bebida definitiva del entretiempo.',
    suggestedCopy: 'El fútbol despierta emociones, pero la tertulia en familia es lo que de verdad le da sentido al mundial. Haz una pausa refrescante en el medio tiempo junto a Buchanan\'s.',
    editorVariables: {
      subject: 'Un partido intenso se merece un break con estilo ⚽️🧊',
      logoUrl: "https://lh3.googleusercontent.com/d/1ZtNqBvS6qL-g9-7Lz1eZ_T0J3_TjW69i=w360",
      backgroundTextureUrl: OFFICIAL_TEXTURE_URL,
      eyebrow: "COPA FIFA MUNDIAL 26™ — J-2 ENTRETIEMPO EMOCIONAL",
      welcomeHeadline: "EL PARTIDO SE DETIENE, EL COMPARTIR SINO",
      paragraph1: "La emoción del segundo tiempo se vive mejor con un vaso fresco en la mano. Reúnete con los tuyos en la cocina para armar la siguiente ronda de Buchanita.",
      paragraph2: "Confortable, refrescante y hecha con toda la herencia de generosidad de Buchanan's. Asegúrate de tener suficientes cubos de hielo.",
      buttonCasaText: "Encuentra tu Tienda",
      buttonCasaUrl: "#",
      buttonBarText: "Ver Cócteles Creativos",
      buttonBarUrl: "%%xt_recetario_url%%",
      legalDisclaimer: "DIAGEO te invita a disfrutar con responsabilidad. El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad. 40% Vol. Alc.",
      unsubscribeText: "Respetamos tu derecho a la privacidad. Diageo Colombia S.A. Si no deseas recibir más comunicaciones de interés haz clic <a href=\"%%unsub_center_url%%\">aquí</a>.",
      heroImageUrl: "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
      heroImageAlt: "Entretiempo",
      heroImageWidth: "500",
      showHeroImage: true,
      secondaryImageUrl: "",
      secondaryImageAlt: "",
      secondaryImageWidth: "150",
      showSecondaryImage: false,
      testFirstName: "Andrés",
      testConsumptionPreference: "En Casa",
      testCity: "Bogotá",
      blocks: [
        {
          id: "cb-eyebrow-2",
          type: "text",
          textStyle: "eyebrow",
          fontSize: "11px",
          text: "COPA FIFA MUNDIAL 26™ — J-2 ENTRETIEMPO EMOCIONAL"
        },
        {
          id: "cb-head-2",
          type: "text",
          textStyle: "headline",
          fontSize: "24px",
          text: "EL PARTIDO SE DETIENE, EL COMPARTIR SINO"
        },
        {
          id: "cb-paragraph-2",
          type: "text",
          textStyle: "paragraph",
          fontSize: "14px",
          text: "La verdadera esencia de la Copa Mundial no son los penaltis ni las tarjetas, sino el abrazo de gol con ese amigo que consideras un hermano. Deja de lado la prisa, siéntate en la mesa con Buchanan's."
        },
        {
          id: "cb-btns-2",
          type: "button-group",
          buttons: [
            {
              id: "cb-b2-1",
              text: "Encuentra tu Tienda Aliada",
              url: "https://dislicores.com",
              style: "solid-yellow",
              size: "medium"
            },
            {
              id: "cb-b2-2",
              text: "Ver Cócteles Sorpresa",
              url: "%%xt_recetario_url%%",
              style: "outline-yellow",
              size: "medium"
            }
          ]
        }
      ]
    }
  },
  {
    eventId: 'cal-3',
    eventName: 'A/B Test Cooling vs Ruta',
    date: 'Jun 19',
    day: 'Viernes',
    type: 'A/B Test',
    subject: '¿Te quedas en la sala o sales de ruta? Tú eliges hoy 🥃⚽️',
    channel: 'Salesforce Journey - Test Random Split 50/50',
    audience: 'Hinchas activos con geolocalización en ciudades principales',
    objective: 'Medir el engagement del plan de consumo casero (Perfect Serve) frente al plan de salida exterior (Ruta Buchanita en Bares).',
    suggestedCopy: 'El fútbol y el viernes se juntan para armar el mejor fin de semana. ¿Celebras armando el cocktail en casa con los más cercanos, o sales a explorar los mejores spots de la ciudad para probar Buchanitas preparadas por profesionales?',
    editorVariables: {
      subject: '¿Te quedas en la sala o sales de ruta? Tú eliges hoy 🥃⚽️',
      logoUrl: "https://lh3.googleusercontent.com/d/1ZtNqBvS6qL-g9-7Lz1eZ_T0J3_TjW69i=w360",
      backgroundTextureUrl: OFFICIAL_TEXTURE_URL,
      eyebrow: "MUNDIAL DE LA FIFA 2026™ — TU FIN DE SEMANA",
      welcomeHeadline: "TU DECIDES CÓMO ENCIENDES EL SABOR HOY",
      paragraph1: "Este viernes el fútbol de primer nivel y la familia elegida se encuentran de nuevo. Tenemos dos formas imperdibles de disfrutar la fecha con Buchanan's.",
      paragraph2: "Ya sea que elijas el confort y las risas de tu sala preparando Perfect Serves icónicos, o la música y la vibra de nuestros Hero Outlets autorizados en el norte.",
      buttonCasaText: "Ver Plan Casa",
      buttonCasaUrl: "#plan-casa",
      buttonBarText: "Ver Bares en la Ruta",
      buttonBarUrl: "#ruta-bares",
      legalDisclaimer: "DIAGEO te invita a disfrutar con responsabilidad. El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad. 40% Vol. Alc.",
      unsubscribeText: "Respetamos tu derecho a la privacidad. Diageo Colombia S.A. Si no deseas recibir más o quieres cambiar de canal de clic <a href=\"%%unsub_center_url%%\">aquí</a>.",
      heroImageUrl: "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
      heroImageAlt: "Casa o fuera",
      heroImageWidth: "500",
      showHeroImage: true,
      secondaryImageUrl: "",
      secondaryImageAlt: "",
      secondaryImageWidth: "150",
      showSecondaryImage: false,
      testFirstName: "Andrés",
      testConsumptionPreference: "En Casa",
      testCity: "Bogotá",
      blocks: [
        {
          id: "ab-eyebrow-3",
          type: "text",
          textStyle: "eyebrow",
          fontSize: "11px",
          text: "MUNDIAL DE LA FIFA 2026™ — TU FIN DE SEMANA"
        },
        {
          id: "ab-head-3",
          type: "text",
          textStyle: "headline",
          fontSize: "24px",
          text: "TU DECIDES CÓMO ENCIENDES EL SABOR HOY"
        },
        {
          id: "ab-cols-3",
          type: "columns",
          columnsCount: 2,
          columns: [
            {
              id: "ab-col-l",
              type: "text",
              textStyle: "paragraph",
              fontSize: "13px",
              text: "<strong>🏠 Parche En Casa:</strong> Sorprende a tus invitados con el Serve de Piña y Miel: Buchanan\'s, jugo de piña clarificado y miel de maple o agave."
            },
            {
              id: "ab-col-r",
              type: "text",
              textStyle: "paragraph",
              fontSize: "13px",
              text: "<strong>📍 Ruta de Bares:</strong> Visita nuestros Hero Outlets autorizados para obtener un shot de bienvenida mostrando este correo digital."
            }
          ]
        },
        {
          id: "ab-btns-3",
          type: "button-group",
          buttons: [
            {
              id: "ab-btn-casa",
              text: "Ver Recetas de Sala",
              url: "https://diageobaracademy.com",
              style: "solid-yellow",
              size: "medium"
            },
            {
              id: "ab-btn-ruta",
              text: "Buscar un Bar Aliado",
              url: "#ruta-bares",
              style: "outline-yellow",
              size: "medium"
            }
          ]
        }
      ]
    }
  },
  {
    eventId: 'cal-4',
    eventName: 'Fan Fest / Enrichment Sorteo',
    date: 'Jun 22',
    day: 'Lunes',
    type: 'Engagement',
    subject: '¡Registra tu parche y participen por pases VIP de Buchanan’s! 🎟️✨',
    channel: 'Journey Builder - Interactive Enrichment Form Email',
    audience: 'Hinchas que han interactuado con los clicks de "En Casa vs Bares"',
    objective: 'Capturar preferencias de consumo en la CloudPage mediante un incentivo experiencial: entradas al Fan Fest oficial.',
    suggestedCopy: 'Queremos llevar a tu combo de amigos a vivir la Copa Mundial en el Fan Fest oficial de Buchanan\'s: pantallas gigantes al aire libre, comida increíble, presentaciones en vivo y el mejor sabor. Regístrate en el formulario interactivo para concursar por pasesVIP dobles.',
    editorVariables: {
      subject: '¡Registra tu parche y participen por pases VIP de Buchanan’s! 🎟️✨',
      logoUrl: "https://lh3.googleusercontent.com/d/1ZtNqBvS6qL-g9-7Lz1eZ_T0J3_TjW69i=w360",
      backgroundTextureUrl: OFFICIAL_TEXTURE_URL,
      eyebrow: "RECOMPENSA EXCLUSIVA — SE PARTE DEL CÍRCULO BUCHANAN'S",
      welcomeHeadline: "¡TE LLEVAMOS AL FAN FEST CON TU FAMILIA ELEGIDA!",
      paragraph1: "Ver cantar los goles de Colombia es un sentimiento que nos estremece el pecho. Pero cantarlos rodeado de tus verdaderos hermanos y con un vaso de Buchanan's en la mano es a otro nivel.",
      paragraph2: "Queremos premiar tu fidelidad. Registra los nombres de tus amigos favoritos en nuestra CloudPage interactiva de Salesforce y participen por uno de los 50 pases VIP dorados que tenemos para el Fan Fest principal.",
      buttonCasaText: "Registrar a mi Grupo",
      buttonCasaUrl: "https://example.cloudpage-sfmc.com/fanfest",
      buttonBarText: "Cronograma de Partidos",
      buttonBarUrl: "#calendar",
      legalDisclaimer: "DIAGEO te invita a disfrutar con responsabilidad. El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad. 40% Vol. Alc.",
      unsubscribeText: "Respetamos tu derecho a la privacidad. Diageo Colombia S.A. Si no deseas recibir más pases de clic <a href=\"%%unsub_center_url%%\">aquí</a>.",
      heroImageUrl: "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
      heroImageAlt: "Fan Fest Premios",
      heroImageWidth: "500",
      showHeroImage: true,
      secondaryImageUrl: "",
      secondaryImageAlt: "",
      secondaryImageWidth: "150",
      showSecondaryImage: false,
      testFirstName: "Andrés",
      testConsumptionPreference: "En Casa",
      testCity: "Bogotá",
      blocks: [
        {
          id: "en-eyebrow-4",
          type: "text",
          textStyle: "eyebrow",
          fontSize: "11px",
          text: "RECOMPENSA EXCLUSIVA — SE PARTE DEL CÍRCULO BUCHANAN'S"
        },
        {
          id: "en-head-4",
          type: "text",
          textStyle: "headline",
          fontSize: "24px",
          text: "¡TE LLEVAMOS AL FAN FEST CON TU FAMILIA ELEGIDA!"
        },
        {
          id: "en-img-4",
          type: "image",
          imageUrl: OFFICIAL_TEXTURE_URL,
          imageAlt: "Fan Fest Spot",
          imageWidth: "450",
          imageFullWidth: true
        },
        {
          id: "en-paragraph-4",
          type: "text",
          textStyle: "paragraph",
          fontSize: "14px",
          text: "Bases del Concurso: Válido para mayores de 18 años residentes en Bogotá y Barranquilla. El sorteo se realizará en vivo mediante nuestra CloudPage con certificación Diageo de Transparencia."
        },
        {
          id: "en-btns-4",
          type: "button-group",
          buttons: [
            {
              id: "en-btn-sorteo",
              text: "Registrar a mi Combo Ahora",
              url: "https://example.cloudpage-sfmc.com/fanfest",
              style: "solid-green",
              size: "large"
            },
            {
              id: "en-btn-info",
              text: "Ver Fechas del Sorteo",
              url: "#sorteo-fechas",
              style: "dark-outline",
              size: "medium"
            }
          ]
        }
      ]
    }
  },
  {
    eventId: 'cal-5',
    eventName: 'Cooling Break #3',
    date: 'Jun 24',
    day: 'Miércoles',
    type: 'Matchday',
    subject: 'Mitad de semana, mitades de partido para refrescarse 🥃⚽️',
    channel: 'Salesforce Journey - Email regular',
    audience: 'Base total nacional de registrados',
    objective: 'Retener el interés de la audiencia a mitad de la fase de grupos mostrando cócteles de piña de preparación rápida.',
    suggestedCopy: 'El mundial avanza a un ritmo emocionante. Este miércoles, baja la intensidad del calor bogotano o barranquillero disfrutando de un agradable break con limón, ginger ale y Buchanan\'s.',
    editorVariables: {
      subject: 'Mitad de semana, mitades de partido para refrescarse 🥃⚽️',
      logoUrl: "https://lh3.googleusercontent.com/d/1ZtNqBvS6qL-g9-7Lz1eZ_T0J3_TjW69i=w360",
      backgroundTextureUrl: OFFICIAL_TEXTURE_URL,
      eyebrow: "COPA MUNDIAL DE LA FIFA 2026™ — COOLING BREAK #3",
      welcomeHeadline: "¡REFRESCA LA SEMANA MUNDIALISTA CON TUS HERMANOS!",
      paragraph1: "Mitad de semana, pero la pasión por el fútbol de clase mundial no se detiene. Aprovecha la pausa del partido de hoy para preparar la siguiente jarra de Buchanitas.",
      paragraph2: "La receta perfecta de la temporada: mezcla hielo picado, 2.5 oz de Buchanan's, gaseosa sabor toronja o ginger y decora con piña fresca. Increíblemente balanceado, refrescante y ligero.",
      buttonCasaText: "Pedir Ingredientes",
      buttonCasaUrl: "#",
      buttonBarText: "Playlist Oficial Rauw",
      buttonBarUrl: "https://spotify.com",
      legalDisclaimer: "DIAGEO te invita a disfrutar con responsabilidad. El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad. 40% Vol. Alc.",
      unsubscribeText: "Respetamos tu derecho a la privacidad. Diageo Colombia S.A. Si no deseas recibir más de clic <a href=\"%%unsub_center_url%%\">aquí</a>.",
      heroImageUrl: "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
      heroImageAlt: "Cooling Break #3",
      heroImageWidth: "500",
      showHeroImage: true,
      secondaryImageUrl: "",
      secondaryImageAlt: "",
      secondaryImageWidth: "150",
      showSecondaryImage: false,
      testFirstName: "Andrés",
      testConsumptionPreference: "En Casa",
      testCity: "Bogotá",
      blocks: [
        {
          id: "m3-eyebrow",
          type: "text",
          textStyle: "eyebrow",
          fontSize: "11px",
          text: "COPA MUNDIAL DE LA FIFA 2026™ — COOLING BREAK #3"
        },
        {
          id: "m3-head",
          type: "text",
          textStyle: "headline",
          fontSize: "24px",
          text: "¡REFRESCA LA SEMANA MUNDIALISTA CON TUS HERMANOS!"
        },
        {
          id: "m3-image",
          type: "image",
          imageUrl: OFFICIAL_TEXTURE_URL,
          imageAlt: "Receta Piña",
          imageWidth: "450",
          imageFullWidth: false
        },
        {
          id: "m3-paragraph",
          type: "text",
          textStyle: "paragraph",
          fontSize: "14px",
          text: "Reúnete, sirve lento y disfruta el juego con responsabilidad. Buchanan's te acompaña en los momentos clave de la Copa Mundial™."
        },
        {
          id: "m3-btns",
          type: "button-group",
          buttons: [
            {
              id: "m3-btn-1",
              text: "Pedir por Rappi",
              url: "https://rappi.com",
              style: "solid-yellow",
              size: "medium"
            },
            {
              id: "m3-btn-2",
              text: "Tono & Playlist",
              url: "https://spotify.com",
              style: "outline-yellow",
              size: "medium"
            }
          ]
        }
      ]
    }
  },
  {
    eventId: 'cal-6',
    eventName: 'Ruta Buchanita #1',
    date: 'Jun 26',
    day: 'Viernes',
    type: 'Ruta',
    subject: '¡La Ruta Buchanita enciende la noche de Bogotá y Medellín! 🍹🗺️',
    channel: 'Salesforce Journey builder - Segmento Bogotá/Medellín',
    audience: 'Usuarios registrados que vivan en Bogotá o Medellín',
    objective: 'Generar tráfico físico hacia Hero Outlets de Bogotá y Medellín para incentivar consumo de cócteles autorizados.',
    suggestedCopy: 'El viernes ruge la ciudad. Reúne a tu parche de la universidad o del trabajo y vengan a disfrutar de un cóctel insignia "La Buchanita" en nuestros outlets recomendados de Bogotá y Medellín. Presenten este e-mail digital y reciban descuentos en sus jarras grupales.',
    editorVariables: {
      subject: '¡La Ruta Buchanita enciende la noche de Bogotá y Medellín! 🍹🗺️',
      logoUrl: "https://lh3.googleusercontent.com/d/1ZtNqBvS6qL-g9-7Lz1eZ_T0J3_TjW69i=w360",
      backgroundTextureUrl: OFFICIAL_TEXTURE_URL,
      eyebrow: "RUTA BUCHANITA — BOGOTÁ Y MEDELLÍN EN VIVO",
      welcomeHeadline: "¡RECORRE LOS HERO OUTLETS CON TU FAMILIA ELEGIDA!",
      paragraph1: "El viernes se vive con la alegría del fútbol mundialista. Por eso tu combo de siempre tiene una cita imperdible en los mejores spots recomendados por Buchanan's en Bogotá y Medellín.",
      paragraph2: "Presenta este e-mail exclusivo a tu mesero en cualquiera de nuestros bares aliados de Bogotá y Medellín para disfrutar de una cortesía especial o descuentos exclusivos en el Perfect Serve para el grupo.",
      buttonCasaText: "Zonas de Bogotá",
      buttonCasaUrl: "#bogota",
      buttonBarText: "Zonas de Medellín",
      buttonBarUrl: "#medellin",
      legalDisclaimer: "DIAGEO te invita a disfrutar con responsabilidad. El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad. 40% Vol. Alc.",
      unsubscribeText: "Respetamos tu derecho a la privacidad. Diageo Colombia S.A. Si no deseas recibir ofertas geolocalizadas haz clic <a href=\"%%unsub_center_url%%\">aquí</a>.",
      heroImageUrl: "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
      heroImageAlt: "Ruta Buchanita Bogotá",
      heroImageWidth: "500",
      showHeroImage: true,
      secondaryImageUrl: "",
      secondaryImageAlt: "",
      secondaryImageWidth: "150",
      showSecondaryImage: false,
      testFirstName: "Andrés",
      testConsumptionPreference: "En Bares",
      testCity: "Bogotá",
      blocks: [
        {
          id: "r1-eyebrow",
          type: "text",
          textStyle: "eyebrow",
          fontSize: "11px",
          text: "RUTA BUCHANITA — BOGOTÁ Y MEDELLÍN EN VIVO"
        },
        {
          id: "r1-head",
          type: "text",
          textStyle: "headline",
          fontSize: "24px",
          text: "¡RECORRE LOS HERO OUTLETS CON TU FAMILIA ELEGIDA!"
        },
        {
          id: "r1-cols",
          type: "columns",
          columnsCount: 2,
          columns: [
            {
              id: "r1-col-l",
              type: "text",
              textStyle: "paragraph",
              fontSize: "13px",
              text: "<strong>📍 Bogotá:</strong> Visita la Zona T, Usaquén o Parque de la 93. Outlets como Presea, El Chori o Armando Music Hall te esperan con Buchanan's."
            },
            {
              id: "r1-col-r",
              type: "text",
              textStyle: "paragraph",
              fontSize: "13px",
              text: "<strong>📍 Medellín:</strong> Recorre Parque Lleras y Provenza. Prueba las mezclas cítricas de jarra de Buchanitas exclusivas para grupos grandes."
            }
          ]
        },
        {
          id: "r1-btns",
          type: "button-group",
          buttons: [
            {
              id: "r1-btn-1",
              text: "Encuentra Zonas de Bogotá",
              url: "#bogota",
              style: "solid-yellow",
              size: "medium"
            },
            {
              id: "r1-btn-2",
              text: "Encuentra Zonas de Medellín",
              url: "#medellin",
              style: "outline-yellow",
              size: "medium"
            }
          ]
        }
      ]
    }
  },
  {
    eventId: 'cal-7',
    eventName: 'Cooling Break #4',
    date: 'Jul 1',
    day: 'Miércoles',
    type: 'Matchday',
    subject: '¡Octavos de Final! Cada pase, cada gol en familia elegida ⚽️🏆',
    channel: 'Salesforce Journey - Email regular de alta prioridad',
    audience: 'Hinchas que abrieron correos de Matchday anteriores',
    objective: 'Capitalizar las fases eliminatorias del torneo (Octavos de final) para maximizar la conversión en despachos premium.',
    suggestedCopy: 'Se acabaron las excusas y se eliminan las segundas oportunidades. Cada gol de esta fase elimina a un gigante o enciende una copa. Vive los Octavos de final al estilo Buchanan\'s.',
    editorVariables: {
      subject: '¡Octavos de Final! Cada pase, cada gol en familia elegida ⚽️🏆',
      logoUrl: "https://lh3.googleusercontent.com/d/1ZtNqBvS6qL-g9-7Lz1eZ_T0J3_TjW69i=w360",
      backgroundTextureUrl: OFFICIAL_TEXTURE_URL,
      eyebrow: "FASE DE MUERTE SÚBITA — COPA MUNDIAL DE LA FIFA 26™",
      welcomeHeadline: "¡LLEGARON LOS OCTAVOS DE FINAL CON TU CÍRCULO!",
      paragraph1: "Cada jugada define la historia. Los nervios están a flor de piel y es ahora cuando los verdaderos amigos se sientan codo a codo en el sofá de la sala a compartir la pasión.",
      paragraph2: "Prepara rápido tu Cooling Break: 2 oz de Buchanan's, Ginger Ale, limón y un toque de sal marina en el borde para los que disfrutan los sabores atrevidos de Colombia.",
      buttonCasaText: "Pedir Combo Eliminatorio",
      buttonCasaUrl: "#rappi",
      buttonBarText: "Descargar Recetario SFMC",
      buttonBarUrl: "%%xt_recetario_url%%",
      legalDisclaimer: "DIAGEO te invita a disfrutar con responsabilidad. El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad. 40% Vol. Alc.",
      unsubscribeText: "Respetamos tu derecho a la privacidad. Diageo Colombia S.A. Si no deseas recibir más comunicaciones de interés haz clic <a href=\"%%unsub_center_url%%\">aquí</a>.",
      heroImageUrl: "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
      heroImageAlt: "Octavos de Final",
      heroImageWidth: "500",
      showHeroImage: true,
      secondaryImageUrl: "",
      secondaryImageAlt: "",
      secondaryImageWidth: "150",
      showSecondaryImage: false,
      testFirstName: "Andrés",
      testConsumptionPreference: "En Casa",
      testCity: "Bogotá",
      blocks: [
        {
          id: "oct-eyebrow",
          type: "text",
          textStyle: "eyebrow",
          fontSize: "11px",
          text: "FASE DE MUERTE SÚBITA — COPA MUNDIAL DE LA FIFA 26™"
        },
        {
          id: "oct-head",
          type: "text",
          textStyle: "headline",
          fontSize: "24px",
          text: "¡LLEGARON LOS OCTAVOS DE FINAL CON TU CÍRCULO!"
        },
        {
          id: "oct-img",
          type: "image",
          imageUrl: OFFICIAL_TEXTURE_URL,
          imageAlt: "Grito de gol",
          imageWidth: "450",
          imageFullWidth: false
        },
        {
          id: "oct-paragraph",
          type: "text",
          textStyle: "paragraph",
          fontSize: "14px",
          text: "No es solo fútbol, son emociones compartidas. La calidez del reencuentro de hoy cuenta más que cualquier marcador de estadio."
        },
        {
          id: "oct-btns",
          type: "button-group",
          buttons: [
            {
              id: "oct-btn-casa",
              text: "Pedir Combo Express 18+",
              url: "https://rappi.com",
              style: "solid-yellow",
              size: "medium"
            },
            {
              id: "oct-btn-rules",
              text: "Descargar Recetario",
              url: "%%xt_recetario_url%%",
              style: "outline-yellow",
              size: "medium"
            }
          ]
        }
      ]
    }
  },
  {
    eventId: 'cal-8',
    eventName: 'Ruta Buchanita #2',
    date: 'Jul 3',
    day: 'Viernes',
    type: 'Ruta',
    subject: 'Barranquilla y Cali se encienden con La Ruta Buchanita 🍹🌞',
    channel: 'Salesforce Journey builder - Segmento Costa/Valle',
    audience: 'Usuarios registrados en Barranquilla, Cali y Cartagena',
    objective: 'Impulsar el tráfico de fin de semana hacia Hero Outlets de Barranquilla y Cali aprovechando el clima tropical.',
    suggestedCopy: 'El Caribe y el Valle del Cauca se visten de fiesta futbolera este viernes. Invita a tu parche predilecto a refrescarse con un delicioso cóctel Buchanita en los restaurantes y outlets aliados de la marca en curramba y la sucursal del cielo.',
    editorVariables: {
      subject: 'Barranquilla y Cali se encienden con La Ruta Buchanita 🍹🌞',
      logoUrl: "https://lh3.googleusercontent.com/d/1ZtNqBvS6qL-g9-7Lz1eZ_T0J3_TjW69i=w360",
      backgroundTextureUrl: OFFICIAL_TEXTURE_URL,
      eyebrow: "RUTA BUCHANITA — BARRANQUILLA Y CALI",
      welcomeHeadline: "¡ENCIENDE EL RITMO EN EL VALLE Y LA COSTA COLOMBIANA!",
      paragraph1: "El calor de nuestra gente se siente más fuerte los días de partido. Por eso, tu familia elegida en Barranquilla y Cali tiene las mejores locaciones recomendadas para refrescar la pasión.",
      paragraph2: "Disfruta de la combinación perfecta: Buchanan's con ginger y extracto de piña fresca o coco en restaurantes aliados de la Costa y el Valle de manera responsable.",
      buttonCasaText: "Outlets Barranquilla",
      buttonCasaUrl: "#barranquilla",
      buttonBarText: "Outlets Cali",
      buttonBarUrl: "#cali",
      legalDisclaimer: "DIAGEO te invita a disfrutar con responsabilidad. El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad. 40% Vol. Alc.",
      unsubscribeText: "Respetamos tu derecho a la privacidad. Diageo Colombia S.A. Si no deseas recibir mas de clic <a href=\"%%unsub_center_url%%\">aquí</a>.",
      heroImageUrl: "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
      heroImageAlt: "Ruta Buchanita Costa y Valle",
      heroImageWidth: "500",
      showHeroImage: true,
      secondaryImageUrl: "",
      secondaryImageAlt: "",
      secondaryImageWidth: "150",
      showSecondaryImage: false,
      testFirstName: "Andrés",
      testConsumptionPreference: "En Bares",
      testCity: "Barranquilla",
      blocks: [
        {
          id: "r2-eyebrow",
          type: "text",
          textStyle: "eyebrow",
          fontSize: "11px",
          text: "RUTA BUCHANITA — BARRANQUILLA Y CALI"
        },
        {
          id: "r2-head",
          type: "text",
          textStyle: "headline",
          fontSize: "24px",
          text: "¡ENCIENDE EL RITMO EN EL VALLE Y LA COSTA COLOMBIANA!"
        },
        {
          id: "r2-cols",
          type: "columns",
          columnsCount: 2,
          columns: [
            {
              id: "r2-col-b",
              type: "text",
              textStyle: "paragraph",
              fontSize: "13px",
              text: "<strong>📍 Barranquilla:</strong> Pide tus Buchanitas en los bares de la Calle 84 o la Carrera 51B. Cócteles helados presentados por bartenders del patio."
            },
            {
              id: "r2-col-c",
              type: "text",
              textStyle: "paragraph",
              fontSize: "13px",
              text: "<strong>📍 Cali:</strong> Disfruta de la brisa caleña en Granada, San Antonio o el Peñón. Puntos aliados Diageo con promociones en botellas de 12 Años."
            }
          ]
        },
        {
          id: "r2-btns",
          type: "button-group",
          buttons: [
            {
              id: "r2-btn-baq",
              text: "Geo-Bares Barranquilla",
              url: "#barranquilla",
              style: "solid-yellow",
              size: "medium"
            },
            {
              id: "r2-btn-clo",
              text: "Geo-Bares Cali",
              url: "#cali",
              style: "outline-yellow",
              size: "medium"
            }
          ]
        }
      ]
    }
  },
  {
    eventId: 'cal-9',
    eventName: 'Cooling Break #5',
    date: 'Jul 8',
    day: 'Miércoles',
    type: 'Matchday',
    subject: '¡Cuartos de Final! Solo los grandes se quedan en el círculo 🏆🔥',
    channel: 'Salesforce Journey - Email regular',
    audience: 'Base total de registrados de alta tracción',
    objective: 'Vincular el sentido de pertenencia de la campaña ("Estamos en familia") con el ambiente competitivo de cuartos de final.',
    suggestedCopy: 'Cuatro llaves decisivas, ocho equipos de talla mundial y el círculo de amigos reunido en la sala para ser testigos. Prepara una Buchanita con miel y piña y celebra cada pase inolvidable.',
    editorVariables: {
      subject: '¡Cuartos de Final! Solo los grandes se quedan en el círculo 🏆🔥',
      logoUrl: "https://lh3.googleusercontent.com/d/1ZtNqBvS6qL-g9-7Lz1eZ_T0J3_TjW69i=w360",
      backgroundTextureUrl: OFFICIAL_TEXTURE_URL,
      eyebrow: "OCTAVOS COMPLETOS — LLEGAN LOS CUARTOS DE FINAL",
      welcomeHeadline: "¡EL CÍRCULO SE REÚNE PARA EL GRAN RETO!",
      paragraph1: "Solo quedan los mejores en la fase más vibrante del torneo. Sintoniza el partido de este miércoles de la mano de Buchanan's, el destilado de la generosidad y el compartir real.",
      paragraph2: "Prepara la receta favorita de Rauw Alejandro: Buchanan's Deluxe con dos toques de jugo de piña fresca, una hoja de menta y gaseosa de jengibre ligera para refrescar la gran batalla de hoy.",
      buttonCasaText: "Comprar Botella 12 Años",
      buttonCasaUrl: "#",
      buttonBarText: "Descubre Cocteles",
      buttonBarUrl: "%%xt_recetario_url%%",
      legalDisclaimer: "DIAGEO te invita a disfrutar con responsabilidad. El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad. 40% Vol. Alc.",
      unsubscribeText: "Respetamos tu derecho a la privacidad. Diageo Colombia S.A. Si no deseas recibir mas de clic <a href=\"%%unsub_center_url%%\">aquí</a>.",
      heroImageUrl: "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
      heroImageAlt: "Cuartos",
      heroImageWidth: "500",
      showHeroImage: true,
      secondaryImageUrl: "",
      secondaryImageAlt: "",
      secondaryImageWidth: "150",
      showSecondaryImage: false,
      testFirstName: "Andrés",
      testConsumptionPreference: "En Casa",
      testCity: "Bogotá",
      blocks: [
        {
          id: "cuartos-eyebrow",
          type: "text",
          textStyle: "eyebrow",
          fontSize: "11px",
          text: "OCTAVOS COMPLETOS — LLEGAN LOS CUARTOS DE FINAL"
        },
        {
          id: "cuartos-head",
          type: "text",
          textStyle: "headline",
          fontSize: "24px",
          text: "¡EL CÍRCULO SE REÚNE PARA EL GRAN RETO!"
        },
        {
          id: "cuartos-img",
          type: "image",
          imageUrl: OFFICIAL_TEXTURE_URL,
          imageAlt: "Cuartos de Final",
          imageWidth: "450",
          imageFullWidth: true
        },
        {
          id: "cuartos-paragraph",
          type: "text",
          textStyle: "paragraph",
          fontSize: "14px",
          text: "Porque en esta familia elegida, la emoción de la victoria y la nostalgia del gol fallado se viven siempre juntos. Enciende el sabor de Buchanan's."
        },
        {
          id: "cuartos-btns",
          type: "button-group",
          buttons: [
            {
              id: "cuartos-btn-1",
              text: "Comprar Buchanan's Premium",
              url: "https://dislicores.com",
              style: "solid-yellow",
              size: "medium"
            },
            {
              id: "cuartos-btn-2",
              text: "Ver Más Combinaciones",
              url: "%%xt_recetario_url%%",
              style: "outline-yellow",
              size: "medium"
            }
          ]
        }
      ]
    }
  },
  {
    eventId: 'cal-10',
    eventName: 'Cooling Break #6',
    date: 'Jul 15',
    day: 'Miércoles',
    type: 'Matchday',
    subject: '¡La Gran Semifinal! A un paso del sueño mundialista ⚽️✨🏆',
    channel: 'Salesforce Journey - Email regular',
    audience: 'Toda la base de datos nacional activa',
    objective: 'Dinamizar la recta final del mundial generando un reencuentro de alta cercanía emocional.',
    suggestedCopy: 'El pitazo inicial está a punto de sonar en el partido definitivo de la semifinal. Solo dos héroes llegarán a la gran final. Prepara las jarras de Buchanita y vive el clímax con tu combo predilecto.',
    editorVariables: {
      subject: '¡La Gran Semifinal! A un paso del sueño mundialista ⚽️✨🏆',
      logoUrl: "https://lh3.googleusercontent.com/d/1ZtNqBvS6qL-g9-7Lz1eZ_T0J3_TjW69i=w360",
      backgroundTextureUrl: OFFICIAL_TEXTURE_URL,
      eyebrow: "PENÚLTIMA RONDA — LA EMOCIÓN DE LA SEMIFINAL EN VIVO",
      welcomeHeadline: "¡EL SUEÑO MUNDIALISTA SE CELEBRA JUNTOS!",
      paragraph1: "Llegó ese partido que no permite margen de error. Sintoniza hoy la semifinal mundialista y prepárate para los 90 minutos de tensión más intensos del año de la mano de Buchanan's.",
      paragraph2: "Preparen Perfect Serves con Buchanan's y Ginger Ale, decores con limón verde y compartan las anécdotas de este viaje mundialista que empezamos juntos.",
      buttonCasaText: "Hacer mi Pedido Express",
      buttonCasaUrl: "#",
      buttonBarText: "Redimir Cupones SFMC",
      buttonBarUrl: "#cupones",
      legalDisclaimer: "DIAGEO te invita a disfrutar con responsabilidad. El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad. 40% Vol. Alc.",
      unsubscribeText: "Respetamos tu derecho a la privacidad. Diageo Colombia S.A. Si no deseas recibir mas de clic <a href=\"%%unsub_center_url%%\">aquí</a>.",
      heroImageUrl: "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
      heroImageAlt: "Semifinal",
      heroImageWidth: "500",
      showHeroImage: true,
      secondaryImageUrl: "",
      secondaryImageAlt: "",
      secondaryImageWidth: "150",
      showSecondaryImage: false,
      testFirstName: "Andrés",
      testConsumptionPreference: "En Casa",
      testCity: "Bogotá",
      blocks: [
        {
          id: "semi-eyebrow",
          type: "text",
          textStyle: "eyebrow",
          fontSize: "11px",
          text: "PENÚLTIMA RONDA — LA EMOCIÓN DE LA SEMIFINAL EN VIVO"
        },
        {
          id: "semi-head",
          type: "text",
          textStyle: "headline",
          fontSize: "24px",
          text: "¡EL SUEÑO MUNDIALISTA SE CELEBRA JUNTOS!"
        },
        {
          id: "semi-img",
          type: "image",
          imageUrl: OFFICIAL_TEXTURE_URL,
          imageAlt: "Risas Semifinal",
          imageWidth: "450",
          imageFullWidth: false
        },
        {
          id: "semi-paragraph",
          type: "text",
          textStyle: "paragraph",
          fontSize: "14px",
          text: "Porque sea cual sea el resultado en la cancha, en nuestra cocina siempre habrá un vaso lleno, una risa sincera y una familia para celebrar."
        },
        {
          id: "semi-btns",
          type: "button-group",
          buttons: [
            {
              id: "semi-btn-rappi",
              text: "Pedido de Semifinal 18+",
              url: "https://rappi.com",
              style: "solid-yellow",
              size: "medium"
            },
            {
              id: "semi-btn-music",
              text: "Ver Bares para ver el Partido",
              url: "#bares",
              style: "outline-yellow",
              size: "medium"
            }
          ]
        }
      ]
    }
  },
  {
    eventId: 'cal-11',
    eventName: 'Ruta Buchanita Final #3',
    date: 'Jul 17',
    day: 'Viernes',
    type: 'Ruta',
    subject: 'Fin de Semana de Clausura: ¡Última parada de La Ruta Buchanita! 🍹🎒',
    channel: 'Salesforce Journey builder - Segmento Nacional Geolocalizado',
    audience: 'Hinchas activos de todas las ciudades con geolocalización',
    objective: 'Cerrar la activación física en bares consolidando la Ruta Buchanita antes de la gran final dominical.',
    suggestedCopy: 'El fin de semana más esperado del año de fútbol está aquí: la clausura del mundial de fútbol. Visita junto a tu combo los Hero Outlets autorizados para probar los últimos perfect serves mundialistas.',
    editorVariables: {
      subject: 'Fin de Semana de Clausura: ¡Última parada de La Ruta Buchanita! 🍹🎒',
      logoUrl: "https://lh3.googleusercontent.com/d/1ZtNqBvS6qL-g9-7Lz1eZ_T0J3_TjW69i=w360",
      backgroundTextureUrl: OFFICIAL_TEXTURE_URL,
      eyebrow: "FIN DE SEMANA DE CLAUSURA — ÚLTIMA FECHA EN LOCALES",
      welcomeHeadline: "¡EL ÚLTIMO PARCHE EN NUESTRAS BARRAS ALIADAS!",
      paragraph1: "Rumbo a la gran final dominical de la Copa del Mundo, celebramos el cierre de nuestra Ruta de Bares y Outlets aliados a nivel nacional, donde el sabor se sintió real.",
      paragraph2: "Vístete con los colores de tu selección preferida, reúne a tus hermanos elegidos y salgan a redimir las últimas Buchanitas cortesía de la casa con Diageo en toda Colombia.",
      buttonCasaText: "Ver Ruta de Bares Nacional",
      buttonCasaUrl: "#ruta-bares",
      buttonBarText: "Descargar Cupones Final",
      buttonBarUrl: "#cupon-final",
      legalDisclaimer: "DIAGEO te invita a disfrutar con responsabilidad. El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad. 40% Vol. Alc.",
      unsubscribeText: "Respetamos tu derecho a la privacidad. Diageo Colombia S.A. Si no deseas recibir mas de clic <a href=\"%%unsub_center_url%%\">aquí</a>.",
      heroImageUrl: "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
      heroImageAlt: "Ruta Final",
      heroImageWidth: "500",
      showHeroImage: true,
      secondaryImageUrl: "",
      secondaryImageAlt: "",
      secondaryImageWidth: "150",
      showSecondaryImage: false,
      testFirstName: "Andrés",
      testConsumptionPreference: "En Bares",
      testCity: "Bogotá",
      blocks: [
        {
          id: "r3-eyebrow",
          type: "text",
          textStyle: "eyebrow",
          fontSize: "11px",
          text: "FIN DE SEMANA DE CLAUSURA — ÚLTIMA FECHA EN LOCALES"
        },
        {
          id: "r3-head",
          type: "text",
          textStyle: "headline",
          fontSize: "24px",
          text: "¡EL ÚLTIMO PARCHE EN NUESTRAS BARRAS ALIADAS!"
        },
        {
          id: "r3-paragraph-3",
          type: "text",
          textStyle: "paragraph",
          fontSize: "14px",
          text: "Gracias por recorrer la Ruta Buchanita con paciencia, sabor y responsabilidad. El trago está servido para la final."
        },
        {
          id: "r3-btns",
          type: "button-group",
          buttons: [
            {
              id: "r3-btn-l",
              text: "Ruta de Bares Nacional 🧭",
              url: "#ruta-bares",
              style: "solid-yellow",
              size: "medium"
            },
            {
              id: "r3-btn-r",
              text: "Cupón para Copa Consumo 🥤",
              url: "#cupon-final",
              style: "outline-yellow",
              size: "medium"
            }
          ]
        }
      ]
    }
  },
  {
    eventId: 'cal-12',
    eventName: 'Email de Cierre de Campaña',
    date: 'Jul 23',
    day: 'Jueves',
    type: 'Closing',
    subject: '¡Gracias por vivir el mundial en el círculo de Buchanan’s! 🏆🌍💚',
    channel: 'Salesforce Journey - Email de Agradecimiento e Inbound Cierre',
    audience: 'Hinchas que recibieron al menos 1 email del journey mundialista',
    objective: 'Cerrar la campaña con un mensaje cálido y emocional bajo el concepto "El mundial termina, el sabor sigue", recomendando recetas permanentes.',
    suggestedCopy: 'Se apagaron los reflectores de los estadios y se entregó la copa de campeones. Pero las risas compartidas, las anécdotas de cada fecha y la unión de la familia elegida duran para siempre. Gracias por encender el sabor junto a Buchanan’s. Recuerda que no necesitas un partido de fútbol para reencontrarte.',
    editorVariables: {
      subject: '¡Gracias por vivir el mundial en el círculo de Buchanan’s! 🏆🌍💚',
      logoUrl: "https://lh3.googleusercontent.com/d/1ZtNqBvS6qL-g9-7Lz1eZ_T0J3_TjW69i=w360",
      backgroundTextureUrl: OFFICIAL_TEXTURE_URL,
      eyebrow: "GRACIAS POR ENCENDER EL SABOR — COPA MUNDIAL 2026",
      welcomeHeadline: "EL PARTIDO ACABA, NUESTRO CÍRCULO CONTINÚA",
      paragraph1: "Se apagaron las pantallas y la final es historia. Pero en el corazón de nuestra familia elegida vibran para siempre los gritos de gol compartidos y las tertulias eternas al calor de un Buchanan's.",
      paragraph2: "Queremos agradecerte por haber vivido rincón a rincón este viaje con nosotros. Para que celebres el fin de ciclo, te obsequiamos nuestro recetario Perfect Serve definitivo para ocasiones especiales.",
      buttonCasaText: "Descargar Recetario Final",
      buttonCasaUrl: "#recetario-final",
      buttonBarText: "Síguenos en Instagram",
      buttonBarUrl: "https://instagram.com",
      legalDisclaimer: "DIAGEO te invita a disfrutar con responsabilidad. El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad. 40% Vol. Alc.",
      unsubscribeText: "Respetamos tu derecho a la privacidad. Diageo Colombia S.A. Si no deseas recibir mas de clic <a href=\"%%unsub_center_url%%\">aquí</a>.",
      heroImageUrl: "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
      heroImageAlt: "Gracias Buchanan's",
      heroImageWidth: "500",
      showHeroImage: true,
      secondaryImageUrl: "",
      secondaryImageAlt: "",
      secondaryImageWidth: "150",
      showSecondaryImage: false,
      testFirstName: "Andrés",
      testConsumptionPreference: "En Casa",
      testCity: "Bogotá",
      blocks: [
        {
          id: "cl-eyebrow-12",
          type: "text",
          textStyle: "eyebrow",
          fontSize: "11px",
          text: "GRACIAS POR ENCENDER EL SABOR — COPA MUNDIAL 2026"
        },
        {
          id: "cl-head-12",
          type: "text",
          textStyle: "headline",
          fontSize: "24px",
          text: "EL PARTIDO ACABA, NUESTRO CÍRCULO CONTINÚA"
        },
        {
          id: "cl-paragraph-12",
          type: "text",
          textStyle: "paragraph",
          fontSize: "14px",
          text: "Porque no necesitas un silbato ni una cancha de juego para convocar a esos hermanos de vida y celebrar que estamos juntos. Enciende el sabor todos los días junto a Buchanan's."
        },
        {
          id: "cl-btns-12",
          type: "button-group",
          buttons: [
            {
              id: "cl-btn-recetario",
              text: "Descargar Recetario Final PDF 📖",
              url: "#recetario-final",
              style: "solid-yellow",
              size: "large"
            },
            {
              id: "cl-btn-insta",
              text: "Unirse a la Comunidad 📸",
              url: "https://instagram.com",
              style: "dark-outline",
              size: "medium"
            }
          ]
        }
      ]
    }
  }
];

// Enforce the requested default logoUrl for all calendar presets
CALENDAR_PRESETS.forEach(preset => {
  if (preset.editorVariables) {
    preset.editorVariables.logoUrl = "https://lh3.googleusercontent.com/d/1ZtNqBvS6qL-g9-7Lz1eZ_T0J3_TjW69i=w360";
  }
});

export const SMIRNOFF_CALENDAR_PRESETS: CalendarPreset[] = [
  {
    eventId: 'smf-0',
    eventName: 'Awareness Spicy Polémica',
    date: 'Jun 10',
    day: 'Miércoles',
    type: 'Spicy Polémica',
    subject: '¿Listo para lo que viene? El drama y el chisme son nuestros 🌶️👀',
    channel: 'Salesforce Journey Builder / Email',
    audience: 'Hinchas Registrados - Hombres y Mujeres Gen Z 18+',
    objective: 'Generar expectativa sobre el programa "La Spicy Polémica" con Cami Triana y Cami Pulgarín en ESPN / E! / F90.',
    suggestedCopy: 'No nos interesa lo que pasa en la cancha, sino todo lo que pasa afuera: la previa, el parche, el tercer tiempo, la polémica y el chismecito. ¡Conéctate con nosotros en el debut copero!',
    editorVariables: {
      subject: '¿Listo para lo que viene? El drama y el chisme son nuestros 🌶️👀',
      logoUrl: "https://lh3.googleusercontent.com/d/1BfVjUoX9xX_8e_X5XgXs6f7g_x8g_y5z=w360",
      backgroundTextureUrl: "", // No mandatory texture in Red Mode, background color dominates
      eyebrow: "LA COPA ES NUESTRA — EL CHISMECITO EN VIVO",
      welcomeHeadline: "LA SPICY POLÉMICA: SE PRENDE EL PARCHE COPERO",
      paragraph1: "A Smirnoff no le interesa lo que pasa dentro de la cancha, sino lo que pasa afuera. Prepárate para el estreno de 'La Spicy Polémica', presentado por Cami Triana y Cami Pulgarín en ESPN y E!",
      paragraph2: "Sintoniza el primer programa donde no importa el partido sino lo que pasa en la fiesta. Únete de manera responsable con un buen Vuvushot de Smirnoff Spicy Tamarind.",
      buttonCasaText: "Ver Teaser del Programa",
      buttonCasaUrl: "https://www.espn.com.co",
      buttonBarText: "Pedir Smirnoff Spicy Tamarind",
      buttonBarUrl: "https://www.rappi.com.co/restaurantes/19154-licorera-diageo",
      legalDisclaimer: "DIAGEO te invita a disfrutar con responsabilidad. El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad. 25% Vol. Alc. — #ConModeración · 18+ · Prohibido reenviar a menores.",
      unsubscribeText: "Respetamos tu derecho a la privacidad. Conoce nuestras Políticas de Datos Personales. Este correo fue enviado por: Diageo Colombia S.A. Si no deseas recibir más comunicaciones de interés haz clic <a href=\"%%unsub_center_url%%\" style=\"color:#FFFFFF; text-decoration:underline; opacity:0.75;\">aquí</a>.",
      heroImageUrl: "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
      heroImageAlt: "La Spicy Polémica con Cami Pulgarín",
      heroImageWidth: "500",
      showHeroImage: true,
      secondaryImageUrl: "",
      secondaryImageAlt: "",
      secondaryImageWidth: "150",
      showSecondaryImage: false,
      testFirstName: "Andrés",
      testConsumptionPreference: "En Casa",
      testCity: "Bogotá",
      blocks: [
        {
          id: "smf-0-eb-0",
          type: "text",
          textStyle: "eyebrow",
          fontSize: "11px",
          text: "LA COPA ES NUESTRA — EL CHISMECITO EN VIVO"
        },
        {
          id: "smf-0-eb-1",
          type: "text",
          textStyle: "headline",
          fontSize: "24px",
          text: "LA SPICY POLÉMICA: SE PRENDE EL PARCHE"
        },
        {
          id: "smf-0-col-0",
          type: "columns",
          columnsCount: 2,
          columns: [
            {
              id: "smf-0-c0-l",
              type: "text",
              textStyle: "paragraph",
              fontSize: "13px",
              text: "<strong>La Previa Coctelera:</strong> ¿Cómo te preparas? Es hora del Vuvushot. 1/3 de Smirnoff Spicy Tamarind helado y escarchado con chile en polvo de manera responsable."
            },
            {
              id: "smf-0-c0-r",
              type: "text",
              textStyle: "paragraph",
              fontSize: "13px",
              text: "<strong>Trasmisión en Vivo:</strong> Sigue lo mejor del fútbol, las risas y la previa con Reykon Modo Spicy en ESPN y plataformas de Diageo."
            }
          ]
        },
        {
          id: "smf-0-btns-0",
          type: "button-group",
          buttons: [
            {
              id: "smf-0-b0-1",
              text: "Ver Teaser Programa",
              url: "https://www.youtube.com",
              style: "solid-yellow",
              size: "medium"
            },
            {
              id: "smf-0-b0-2",
              text: "Pedir Smirnoff en Rappi",
              url: "https://www.rappi.com.co",
              style: "outline-yellow",
              size: "medium"
            }
          ]
        }
      ]
    }
  },
  {
    eventId: 'smf-1',
    eventName: 'Email de Bienvenida',
    date: 'Jun 11',
    day: 'Jueves',
    type: 'Bienvenida',
    subject: '¡Bienvenido al parche de Smirnoff! La copa es nuestra 🌶️🍻',
    channel: 'Salesforce Journey Builder / Email 1',
    audience: 'Nuevos registrados en CloudPages',
    objective: 'Confirmación de registro + generar expectativa Mundial + perfilamiento de preferencias individuales: ¿Qué tipo de Spicy eres?',
    suggestedCopy: 'Confirma tu registro en nuestro Spicy Ecosystem. Cuéntanos qué tipo de Spicy eres: Armo el plan (previa/decisión), Prendo la fiesta (experiencia activa) o Busco dónde seguirla (after).',
    editorVariables: {
      subject: '¡Bienvenido al parche de Smirnoff! La copa es nuestra 🌶️🍻',
      logoUrl: "https://lh3.googleusercontent.com/d/1BfVjUoX9xX_8e_X5XgXs6f7g_x8g_y5z=w360",
      backgroundTextureUrl: "",
      eyebrow: "BIENVENIDA AL PARCHE — SMIRNOFF COPA FY26",
      welcomeHeadline: "¿CONFIRMAS REGISTRO? ¿QUÉ TAN SPICY ERES?",
      paragraph1: "Te damos la bienvenida al grupo más inclusivo, atrevido e inesperado de la Copa Mundial. En este parche, todos hacen parte de la fiesta. ¡Aquí aceptamos a todos!",
      paragraph2: "Queremos perfilarte para darte lo mejor de la temporada. Cuéntanos qué tipo de Spicy eres haciendo clic en tu opción preferida para activar tu perfil en Salesforce.",
      buttonCasaText: "Armo el Plan (La Previa)",
      buttonCasaUrl: "%%URL_ARMO_EL_PLAN%%",
      buttonBarText: "Prendo la Fiesta",
      buttonBarUrl: "%%URL_PRENDO_LA_FIESTA%%",
      legalDisclaimer: "DIAGEO te invita a disfrutar con responsabilidad. El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad. 25% Vol. Alc. — #ConModeración · 18+ · Prohibido reenviar a menores.",
      unsubscribeText: "Respetamos tu derecho a la privacidad. Conoce nuestras Políticas de Datos Personales. Este correo fue enviado por: Diageo Colombia S.A. Si no deseas recibir más comunicaciones de interés haz clic <a href=\"%%unsub_center_url%%\" style=\"color:#FFFFFF; text-decoration:underline; opacity:0.75;\">aquí</a>.",
      heroImageUrl: "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
      heroImageAlt: "Smirnoff Welcome Spicy",
      heroImageWidth: "500",
      showHeroImage: true,
      secondaryImageUrl: "",
      secondaryImageAlt: "",
      secondaryImageWidth: "150",
      showSecondaryImage: false,
      testFirstName: "Andrés",
      testConsumptionPreference: "En Casa",
      testCity: "Bogotá",
      blocks: [
        {
          id: "smf-1-eb-0",
          type: "text",
          textStyle: "eyebrow",
          text: "BIENVENIDA AL PARCHE — SMIRNOFF COPA FY26"
        },
        {
          id: "smf-1-eb-1",
          type: "text",
          textStyle: "headline",
          text: "¿QUÉ TAN SPICY ERES? CONFIÉSALO AQUÍ"
        },
        {
          id: "smf-1-eb-2",
          type: "text",
          textStyle: "paragraph",
          text: "Elige la categoría con la que más te identificas para recibir pases de la Fan Zone, promociones directas en Rappi o recetas exclusivas del Vuvushot master:"
        },
        {
          id: "smf-1-btns-0",
          type: "button-group",
          buttons: [
            {
              id: "smf-1-b0-1",
              text: "Armo el Plan (La Previa)",
              url: "%%URL_ARMO_EL_PLAN%%",
              style: "solid-yellow",
              size: "medium"
            },
            {
              id: "smf-1-b0-2",
              text: "Prendo la Fiesta",
              url: "%%URL_PRENDO_LA_FIESTA%%",
              style: "solid-green",
              size: "medium"
            },
            {
              id: "smf-1-b0-3",
              text: "Busco Dónde Seguirla",
              url: "%%URL_BUSCO_DONDE_SEGUIRLA%%",
              style: "dark-outline",
              size: "medium"
            }
          ]
        }
      ]
    }
  },
  {
    eventId: 'smf-2',
    eventName: 'Programa Spicy Polémica',
    date: 'Jun 16',
    day: 'Martes',
    type: 'Spicy Polémica',
    subject: 'Se picó la noche: El fútbol es un parche y una joda con Reykon 🔥🎙',
    channel: 'Salesforce Journey Builder / Email 2',
    audience: 'Hinchas que abrieron el correo de Bienvenida',
    objective: 'Fidelización y dinamización de audiencia. Invitar a seguir la transmisión en ESPN y F90 y participar del chisme.',
    suggestedCopy: 'Cami Triana y Cami Pulgarín debaten sobre quién se llevó el premio de la noche en el offside. Invita a tu parche a prender la fiesta con Reykon en offside.',
    editorVariables: {
      subject: 'Se picó la noche: El fútbol es un parche y una joda con Reykon 🔥🎙',
      logoUrl: "https://lh3.googleusercontent.com/d/1BfVjUoX9xX_8e_X5XgXs6f7g_x8g_y5z=w360",
      backgroundTextureUrl: "",
      eyebrow: "REYKON EN OFF-SIDE — LA COPA ES NUESTRA",
      welcomeHeadline: "NO SE HABLA DE FÚTBOL, SE HABLA DE FIESTA",
      paragraph1: "Reykon, nuestro comentarista aliado de la Copa, no habla del fuera de lugar del árbitro; habla de la pinta de las tribunas, del drama de los banquillos y de los mejores momentos de la previa en Colombia.",
      paragraph2: "Conéctate hoy mismo desde nuestro canal de stream. El drama ya es nuestro. PrePARA la neverita con tu combo preferido de Smirnoff Spicy Tamarind.",
      buttonCasaText: "Sintonizar Stream en Vivo",
      buttonCasaUrl: "https://www.youtube.com",
      buttonBarText: "Pedir Combo en Rappi",
      buttonBarUrl: "https://www.rappi.com.co",
      legalDisclaimer: "DIAGEO te invita a disfrutar con responsabilidad. El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad. 25% Vol. Alc. — #ConModeración · 18+ · Prohibido reenviar a menores.",
      unsubscribeText: "Respetamos tu derecho a la privacidad. Conoce nuestras Políticas de Datos Personales. Este correo fue enviado por: Diageo Colombia S.A. Si no deseas recibir más comunicaciones de interés haz clic <a href=\"%%unsub_center_url%%\" style=\"color:#FFFFFF; text-decoration:underline; opacity:0.75;\">aquí</a>.",
      heroImageUrl: "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
      heroImageAlt: "Reykon Spicy",
      heroImageWidth: "500",
      showHeroImage: true,
      secondaryImageUrl: "",
      secondaryImageAlt: "",
      secondaryImageWidth: "150",
      showSecondaryImage: false,
      testFirstName: "Andrés",
      testConsumptionPreference: "En Casa",
      testCity: "Bogotá",
      blocks: [
        {
          id: "smf-2-eb-0",
          type: "text",
          textStyle: "eyebrow",
          text: "REYKON EN OFF-SIDE — LA COPA ES NUESTRA"
        },
        {
          id: "smf-2-eb-1",
          type: "text",
          textStyle: "headline",
          text: "SE PICÓ LA FIESTA EN LA SPICY POLÉMICA"
        },
        {
          id: "smf-2-eb-2",
          type: "text",
          textStyle: "paragraph",
          text: "El primer programa deportivo en Colombia donde lo que pase en el juego no nos importa. Lo verdaderamente importante es que el parche se reúna de forma responsable."
        },
        {
          id: "smf-2-btns-0",
          type: "button-group",
          buttons: [
            {
              id: "smf-2-b0-1",
              text: "Seguir Transmisión",
              url: "https://www.youtube.com",
              style: "solid-yellow",
              size: "medium"
            }
          ]
        }
      ]
    }
  },
  {
    eventId: 'smf-3',
    eventName: 'Email Hero Outlets',
    date: 'Jun 19',
    day: 'Viernes',
    type: 'Hero Outlets',
    subject: '¿Dónde se vive el Mundial con Smirnoff? Conoce los 20 spots oficiales 📍🌶️',
    channel: 'Salesforce Journey Builder',
    audience: 'Usuarios activos geolocalizados en el país',
    objective: 'Recomendar los puntos donde se vive la previa y el tercer tiempo de Smirnoff. Tránsito a la CloudPage.',
    suggestedCopy: 'El viernes tiene cara de parche. Sigue la ruta de los 20 hotspots oficiales y descubre promociones del Vuvu Kit y música con DJs locales de Diageo.',
    editorVariables: {
      subject: '¿Dónde se vive el Mundial con Smirnoff? Conoce los 20 spots oficiales 📍🌶️',
      logoUrl: "https://lh3.googleusercontent.com/d/1BfVjUoX9xX_8e_X5XgXs6f7g_x8g_y5z=w360",
      backgroundTextureUrl: "",
      eyebrow: "SOCIOS DE LA FIESTA — ENCUENTRA TU OUTLET",
      welcomeHeadline: "VIVE EL MUNDIAL AFUERA DE LA CANCHA",
      paragraph1: "La emoción del tercer tiempo te espera. Hemos mapeado los 20 locales recomendados por Smirnoff a nivel nacional donde el ambiente calienta más que el sol. ¡Cerca de tu oficina o universidad!",
      paragraph2: "Accede a nuestra CloudPage de Puntos haciendo clic abajo, selecciona tu ciudad y descarga tu código QR para redimir un Vuvushot de cortesía con tu grupo.",
      buttonCasaText: "Buscar Outlets en CloudPage",
      buttonCasaUrl: "%%URL_CLOUDPAGE_PUNTOS%%",
      buttonBarText: "Ver Recetario del Vuvushot",
      buttonBarUrl: "#recetario",
      legalDisclaimer: "DIAGEO te invita a disfrutar con responsabilidad. El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad. 25% Vol. Alc. — #ConModeración · 18+ · Prohibido reenviar a menores.",
      unsubscribeText: "Respetamos tu derecho a la privacidad. Conoce nuestras Políticas de Datos Personales. Este correo fue enviado por: Diageo Colombia S.A. Si no deseas recibir más comunicaciones de interés haz clic <a href=\"%%unsub_center_url%%\" style=\"color:#FFFFFF; text-decoration:underline; opacity:0.75;\">aquí</a>.",
      heroImageUrl: "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
      heroImageAlt: "Hero Outlets",
      heroImageWidth: "500",
      showHeroImage: true,
      secondaryImageUrl: "",
      secondaryImageAlt: "",
      secondaryImageWidth: "150",
      showSecondaryImage: false,
      testFirstName: "Andrés",
      testConsumptionPreference: "En Bares",
      testCity: "Bogotá",
      blocks: [
        {
          id: "smf-3-eb-0",
          type: "text",
          textStyle: "eyebrow",
          text: "SOCIOS DE LA FIESTA — ENCUENTRA TU OUTLET"
        },
        {
          id: "smf-3-eb-1",
          type: "text",
          textStyle: "headline",
          text: "VIVE EL MUNDIAL AFUERA DE LA CANCHA"
        },
        {
          id: "smf-3-cols",
          type: "columns",
          columnsCount: 2,
          columns: [
            {
              id: "smf-3-c0",
              type: "text",
              textStyle: "paragraph",
              fontSize: "13px",
              text: "<strong>📍 Bogotá:</strong> Parches imperdibles en pubs seleccionados de Chapinero y Zona Rosa con DJ sets en vivo en la previa."
            },
            {
              id: "smf-3-c1",
              type: "text",
              textStyle: "paragraph",
              fontSize: "13px",
              text: "<strong>📍 Medellín:</strong> Provenza y El Poblado concentran las mejores terrazas Smirnoff para disfrutar del tercer tiempo con un shot."
            }
          ]
        },
        {
          id: "smf-3-btns-0",
          type: "button-group",
          buttons: [
            {
              id: "smf-3-b0-1",
              text: "Ver Outlets Cercanos",
              url: "%%URL_CLOUDPAGE_PUNTOS%%",
              style: "solid-yellow",
              size: "medium"
            }
          ]
        }
      ]
    }
  },
  {
    eventId: 'smf-4',
    eventName: 'Email Enrichment (Sorteo)',
    date: 'Jun 22',
    day: 'Lunes',
    type: 'Engagement',
    subject: '¡Participa por un Vuvu Kit y entradas al Fan Fest! de Smirnoff 🎁🎟️',
    channel: 'Salesforce Journey Builder',
    audience: 'Todos los usuarios de la base',
    objective: 'Captura de datos demográficos (ciudad y cumpleaños) + ocasiones de consumo en una CloudPage premium.',
    suggestedCopy: 'Dinos en qué ocasiones de consumo nos prefieres (previa, durante o después del partido) y concursa por un Vuvu Kit oficial (Vuvu Kit + Vuvu Parties). Ganan los registros 50, 100, 150, 200 y 250.',
    editorVariables: {
      subject: '¡Participa por un Vuvu Kit y entradas al Fan Fest! de Smirnoff 🎁🎟️',
      logoUrl: "https://lh3.googleusercontent.com/d/1BfVjUoX9xX_8e_X5XgXs6f7g_x8g_y5z=w360",
      backgroundTextureUrl: "",
      eyebrow: "SORTEO EXCLUSIVO — KITS MUNDIALISTAS SMIRNOFF",
      welcomeHeadline: "¡GÁNATE EL VUVU KIT DEFINITIVO DE LA COPA!",
      paragraph1: "Queremos premiar tu irreverencia. Completa el formulario de nuestra CloudPage interactiva indicando tu ciudad, fecha de nacimiento y tu ocasión favorita de consumo (previa, juego o tercer tiempo).",
      paragraph2: "Los registros número 50, 100, 150, 200 y 250 de nuestra base de datos ganarán un Vuvu Kit completo y pases VIP dobles de Smirnoff para celebrar el torneo.",
      buttonCasaText: "Registrarse y Concursar",
      buttonCasaUrl: "%%URL_CLOUDPAGE_ENRICHMENT%%",
      buttonBarText: "Ver Más Premios de la Marca",
      buttonBarUrl: "#premios",
      legalDisclaimer: "DIAGEO te invita a disfrutar con responsibility. El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad. 25% Vol. Alc. — #ConModeración · 18+ · Prohibido reenviar a menores.",
      unsubscribeText: "Respetamos tu derecho a la privacidad. Conoce nuestras Políticas de Datos Personales. Este correo fue enviado por: Diageo Colombia S.A. Si no deseas recibir más o quieres cambiar de canal haz clic <a href=\"%%unsub_center_url%%\">aquí</a>.",
      heroImageUrl: "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
      heroImageAlt: "Vuvu Kit",
      heroImageWidth: "500",
      showHeroImage: true,
      secondaryImageUrl: "",
      secondaryImageAlt: "",
      secondaryImageWidth: "150",
      showSecondaryImage: false,
      testFirstName: "Andrés",
      testConsumptionPreference: "En Casa",
      testCity: "Bogotá",
      blocks: [
        {
          id: "smf-4-eb-0",
          type: "text",
          textStyle: "eyebrow",
          text: "SORTEO EXCLUSIVO — KITS MUNDIALISTAS SMIRNOFF"
        },
        {
          id: "smf-4-eb-1",
          type: "text",
          textStyle: "headline",
          text: "COMPLETA TUS DATOS Y GANA EL COMPLETO VUVUKIT"
        },
        {
          id: "smf-4-cols",
          type: "columns",
          columnsCount: 2,
          columns: [
            {
              id: "smf-4-c0",
              type: "text",
              textStyle: "paragraph",
              fontSize: "13px",
              text: "<strong>🎁 El Premio:</strong> 1 Vuvu Kit de coctelería (hielera, copas rojas, chile tajín de tamarindo) y 2 entradas VIP para nuestro Fan Fest."
            },
            {
              id: "smf-4-c1",
              type: "text",
              textStyle: "paragraph",
              fontSize: "13px",
              text: "<strong>📊 Sistema Ganador:</strong> Premiaremos a los registros cerrados número 50, 100, 150, 200 y 250 ingresados en nuestra CloudPage de CRM."
            }
          ]
        },
        {
          id: "smf-4-btns-0",
          type: "button-group",
          buttons: [
            {
              id: "smf-4-b0-1",
              text: "Participar del Sorteo VIP",
              url: "%%URL_CLOUDPAGE_ENRICHMENT%%",
              style: "solid-yellow",
              size: "medium"
            }
          ]
        }
      ]
    }
  },
  {
    eventId: 'smf-5',
    eventName: 'Email de Abastecimiento',
    date: 'Jun 25',
    day: 'Jueves',
    type: 'Bienvenida',
    subject: 'El sabor picante que cambia las reglas del partido 🌶️🔥',
    channel: 'Salesforce Journey Builder / Email 2',
    audience: 'Base total de usuarios interesados',
    objective: 'Promover la compra directa de Smirnoff Spicy Tamarind por canales digitales (Rappi, Diageo Store).',
    suggestedCopy: 'No dejes que el partido termine antes de probar el sabor único del tamarindo picante. Pide tu kit responsablemente por Rappi con entrega en 15 minutos.',
    editorVariables: {
      subject: 'El sabor picante que cambia las reglas del partido 🌶️🔥',
      logoUrl: "https://lh3.googleusercontent.com/d/1BfVjUoX9xX_8e_X5XgXs6f7g_x8g_y5z=w360",
      backgroundTextureUrl: "",
      eyebrow: "ABASTECIMIENTO COPERO — SMIRNOFF SPICY TAMARIND",
      welcomeHeadline: "TU VUVUSHOT LISTO EN MENOS DE 15 MINUTOS",
      paragraph1: "Que no se te caliente la cerveza o te falte trago en la previa. Smirnoff Spicy Tamarind es el sabor picante de la fiesta del Mundial que todos están pidiendo en Colombia.",
      paragraph2: "Aprovecha nuestro botón de integración exprés con Rappi para recibir tu botella helada directamente en tu puerta. Evita contratiempos de última hora y rinde el parche.",
      buttonCasaText: "Comprar Smirnoff Spicy en Rappi",
      buttonCasaUrl: "%%URL_RAPPI%%",
      buttonBarText: "Ver Recetario de Cócteles",
      buttonBarUrl: "#recetas",
      legalDisclaimer: "DIAGEO te invita a disfrutar con responsabilidad. El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad. 25% Vol. Alc. — #ConModeración · 18+ · Prohibido reenviar a menores.",
      unsubscribeText: "Respetamos tu derecho a la privacidad. Conoce nuestras Políticas de Datos Personales. Este correo fue enviado por: Diageo Colombia S.A. Si no deseas recibir más de clic <a href=\"%%unsub_center_url%%\">aquí</a>.",
      heroImageUrl: "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
      heroImageAlt: "Spicy Tamarind Bottle",
      heroImageWidth: "500",
      showHeroImage: true,
      secondaryImageUrl: "",
      secondaryImageAlt: "",
      secondaryImageWidth: "150",
      showSecondaryImage: false,
      testFirstName: "Andrés",
      testConsumptionPreference: "En Casa",
      testCity: "Bogotá",
      blocks: [
        {
          id: "smf-5-eb-0",
          type: "text",
          textStyle: "eyebrow",
          text: "ABASTECIMIENTO COPERO — SMIRNOFF SPICY TAMARIND"
        },
        {
          id: "smf-5-eb-1",
          type: "text",
          textStyle: "headline",
          text: "QUE NO FALTE EL SABOR EN TU PREVIA MUNDIALISTA"
        },
        {
          id: "smf-5-eb-2",
          type: "text",
          textStyle: "paragraph",
          text: "Disfruta de la mejor combinación de picante y frescura. Smirnoff Spicy Tamarind helado es el alma del tercer tiempo. Haz tu pedido prioritario de licores en Rappi."
        },
        {
          id: "smf-5-btns-0",
          type: "button-group",
          buttons: [
            {
              id: "smf-5-b0-1",
              text: "Pedir por Rappi Ahora",
              url: "%%URL_RAPPI%%",
              style: "solid-yellow",
              size: "large"
            }
          ]
        }
      ]
    }
  },
  {
    eventId: 'smf-6',
    eventName: 'Email Fan Zone 1',
    date: 'Jul 3',
    day: 'Viernes',
    type: 'Fan Zone',
    subject: 'Vive la fiesta afuera de la cancha en la Fan Zone oficial ⚽️🎉',
    channel: 'Salesforce Journey Builder / Email 1',
    audience: 'Usuarios registrados de Bogotá, Medellín y Bucaramanga',
    objective: 'Promover la asistencia a las locaciones físicas de la Fan Zone Smirnoff durante los cuartos de final.',
    suggestedCopy: 'Te esperamos en la Fan Zone oficial para vivir el parche de verdad. DJ sets, comida increíble y el sabor picante de Smirnoff.',
    editorVariables: {
      subject: 'Vive la fiesta afuera de la cancha en la Fan Zone oficial ⚽️🎉',
      logoUrl: "https://lh3.googleusercontent.com/d/1BfVjUoX9xX_8e_X5XgXs6f7g_x8g_y5z=w360",
      backgroundTextureUrl: "",
      eyebrow: "FAN FESTIVAL OFICIAL — SMIRNOFF SE ENCIENDE",
      welcomeHeadline: "LA COPA ES NUESTRA, EL PARCHE TAMBIÉN",
      paragraph1: "Te esperamos el fin de semana para presenciar lo mejor de la Copa Mundial en screens gigantes con tu combo preferido. Vivamos el fútbol como un verdadero pretexto para bailar y celebrar.",
      paragraph2: "Ingresa tus datos demográficos en nuestra CloudPage oficial para reclamar pases preferenciales y kits de bienvenida para los primeros 300 en llegar de forma responsable.",
      buttonCasaText: "Ver Puntos Fan Zone",
      buttonCasaUrl: "%%URL_CLOUDPAGE_PUNTOS%%",
      buttonBarText: "Registrar Facturas de Compra",
      buttonBarUrl: "#boletas",
      legalDisclaimer: "DIAGEO te invita a disfrutar con responsabilidad. El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad. 25% Vol. Alc. — #ConModeración · 18+ · Prohibido reenviar a menores.",
      unsubscribeText: "Respetamos tu derecho a la privacidad. Conoce nuestras Políticas de Datos Personales. Este correo fue enviado por: Diageo Colombia S.A. Si no deseas recibir más de clic <a href=\"%%unsub_center_url%%\">aquí</a>.",
      heroImageUrl: "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
      heroImageAlt: "Fan Zone Smirnoff",
      heroImageWidth: "500",
      showHeroImage: true,
      secondaryImageUrl: "",
      secondaryImageAlt: "",
      secondaryImageWidth: "150",
      showSecondaryImage: false,
      testFirstName: "Andrés",
      testConsumptionPreference: "En Bares",
      testCity: "Bogotá",
      blocks: [
        {
          id: "smf-6-eb-0",
          type: "text",
          textStyle: "eyebrow",
          text: "FAN FESTIVAL OFICIAL — SMIRNOFF SE ENCIENDE"
        },
        {
          id: "smf-6-eb-1",
          type: "text",
          textStyle: "headline",
          text: "LA COPA ES NUESTRA, EL PARCHE TAMBIÉN"
        },
        {
          id: "smf-6-eb-2",
          type: "text",
          textStyle: "paragraph",
          text: "Vuelve y juega la emoción del fútbol. Nos vemos en los parches oficiales con la mejor vibra y el sabor de Smirnoff. Conoce todos los puntos autorizados."
        },
        {
          id: "smf-6-btns-0",
          type: "button-group",
          buttons: [
            {
              id: "smf-6-b0-1",
              text: "Hotspots de la Fan Zone",
              url: "%%URL_CLOUDPAGE_PUNTOS%%",
              style: "solid-yellow",
              size: "medium"
            }
          ]
        }
      ]
    }
  }
];


