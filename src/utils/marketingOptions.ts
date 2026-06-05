export interface MarketingOptions {
  headerOptions: string[];
  copyOptions: {
    long: string;
    short: string;
    label: string; // Tone name/theme
  }[];
  ctaOptions: string[];
}

export function getMarketingOptions(
  eventName: string, 
  date: string, 
  contentType: 'email' | 'landing' = 'email'
): MarketingOptions {
  const nameLower = eventName.toLowerCase();
  const isCooling = nameLower.includes('cooling') || nameLower.includes('break');
  const isRuta = nameLower.includes('ruta') || nameLower.includes('buchanita');
  const isSorteo = nameLower.includes('fest') || nameLower.includes('sorteo') || nameLower.includes('enrichment') || nameLower.includes('engagement');
  
  if (contentType === 'landing') {
    if (isCooling) {
      return {
        headerOptions: [
          "REGISTRA TU PARCHE DE COOLING BREAK Y RECLAMA TU CUPÓN RAPPI ⚡️🥃",
          "¡MINUTO 22: COORDINA TU PARADA DE SABOR DESDE LA CLOUDPAGE OFICIAL!",
          "DISFRUTA LA PASIÓN EN CASA CON BUCHANAN'S & GINGER HELADO"
        ],
        copyOptions: [
          {
            label: "Parrando En Casa 🏠",
            long: "¡No dejes que la pasión de la copa se enfríe en el entretiempo! Regístrate ahora en nuestro portal oficial de CloudPages para organizar tus Cooling Breaks. Ingresa tu ciudad, agenda tus partidos preferidos y te enviaremos cupones instantáneos de descuento para pedir tu botella directa a tu hogar.",
            short: "Completa tus datos en el formulario inferior para asegurar tu cupón exclusivo de descuento en licores."
          },
          {
            label: "Perfect Serve lem",
            long: "Descubre nuestra guía interactiva del Perfect Serve: combina el sabor de Buchanan's 12 Años con Ginger Ale helada y un twist cítrico de limón fresco de manera responsable. Regístrate en el formulario a continuación para unirte al club Diageo de coctelería mundialista.",
            short: "Únete al club exclusivo de Buchanan's Colombia y accede al recetario digital premium."
          },
          {
            label: "Rappi Prioritario 🛵",
            long: "Sincroniza tu cuenta de Rappi con nuestro portal de hinchas para recibir entregas prioritarias de alcohol en menos de 15 minutos en Bogotá, Medellín, Barranquilla y Cali. Activa tu suscripción completando tus detalles abajo y disfruta la copa mundial.",
            short: "Saca provecho de las promociones virtuales rellenando el formulario y pidiendo tu kit."
          }
        ],
        ctaOptions: [
          "UNIR PARCHE A LA COPA 🥃",
          "DESCARGAR MI CUPÓN RAPPI 🎟️",
          "VER COBERTURA GEOGRÁFICA RAPPI 📍"
        ]
      };
    } else if (isRuta) {
      return {
        headerOptions: [
          "PORTAL CLOUDPAGES: DESCUBRE LA RUTA BUCHANITA EN TU CIUDAD 🗺️",
          "RESERVA TU MESA Y RECLAMA UN SHOT OFICIAL EN LA RUTA COPERA 🥃🎙️",
          "AGENDA TU VISITA A LOS BARES DE LA FAMILIA ELEGIDA DIAGEO"
        ],
        copyOptions: [
          {
            label: "Exploración de Bares 🍻",
            long: "Nuestra Ruta de Bares Buchanita es el recorrido nocturno de mayor auge de la copa. A través de este portal, puedes geolocalizar los mejores bares de Bogotá, Medellín, Cali y Barranquilla que cuentan con activaciones de marca, música en vivo y promociones exclusivas. Regístrate en la sección inferior para recibir tu pasaporte digital de barra.",
            short: "Registra tus datos de contacto y obtén un shot preferencial gratis en tu bar preferido de la ruta."
          },
          {
            label: "Maridaje Campestre/Urbano 🍽️",
            long: "Disfruta de la mejor fusión gastronómica del mundial: combos familiares de hamburguesas artesanales, picadas para compartir y jarras heladas de Buchanitas a precios preferenciales. Al agendar tu reserva en el formulario inferior, aseguras tu mesa preferencial frente a las pantallas gigantes de alta definición.",
            short: "Reserva hoy mismo tu mesa mundialista y obtén un 15% de descuento en el menú de maridaje."
          },
          {
            label: "Regalos Diageo 🎁",
            long: "Queremos premiar tu preferencia. Al registrar tus datos de contacto hoy y asistir a cualquier bar de la Ruta oficial, podrás reclamar hieleras premium selladas con cuero, vasos cortos de colección y merch exclusivo de la marca. No te quedes fuera de esta increíble activación de Diageo.",
            short: "Completa tu registro de CloudPages, reclama tu código promocional y acumula sellos digitales."
          }
        ],
        ctaOptions: [
          "GEOLOCALIZAR BARES CERCANOS 🗺️",
          "ACTIVAR PASAPORTE DE BARRA 🥃",
          "RESERVAR COMBOS DE ALIMENTOS 🍽️"
        ]
      };
    } else if (isSorteo) {
      return {
        headerOptions: [
          "REGISTRO DE BOLETAS Y FACTURAS: ¡VIVE EL FIFA FAN FESTIVAL! 🎉🏆",
          "PARTICIPA POR PASES VIP DOBLES Y KITS COPEROS PREMIUM",
          "REGISTRA TUS COMPRAS DE BUCHANAN'S Y MULTIPLICA TUS OPCIONES"
        ],
        copyOptions: [
          {
            label: "Sorteo Fan Fest 🎟️",
            long: "El FIFA Fan Festival™ se vive en grande con pantallas gigantes de última generación, artistas internacionales y el mejor whisky del mundo. Registra tu información en el formulario para participar en nuestro sorteo semanal por pases VIP dobles para el sector exclusivo de la marca. El sorteo es vigilado por Diageo Colombia.",
            short: "Ingresa tus datos de registro y participa en el sorteo de boletería nacional."
          },
          {
            label: "Kit Hinchas Premium 🥃",
            long: "Llévate a casa el kit de hospitalidad definitivo para tus reuniones mundialistas. Estamos sorteando hieleras de cuero de edición especial Buchanan's, bar-tools profesionales y sets de vasos cortos grabados. Todo lo que necesitas para ser el anfitrión perfecto se encuentra a un formulario de distancia.",
            short: "Pon a punto tu hogar y participa por un kit de barra exclusivo para tu sala."
          },
          {
            label: "Boletas Diageo Store 🧾",
            long: "Sube tu factura de compra de cualquier botella de Buchanan's 12, 15, 18 o Master Edition para duplicar tus posibilidades en la tómbola digital interactiva. Al instante de registrar tus datos, recibirás un bono de descuento en la Diageo Store oficial de Colombia para tu próximo pedido de whisky.",
            short: "Ingresa tu número de factura y obtén un código de regalo inmediato para Diageo Store."
          }
        ],
        ctaOptions: [
          "REGISTRAR MI FACTURA DE COMPRA 🧾",
          "CONCURSAR POR PASES VIP 🎟️",
          "VER HISTORIAL DE GANADORES 🏆"
        ]
      };
    } else {
      return {
        headerOptions: [
          "GRACIAS POR LLENAR ESTA COPA DE CELEBRACIONES Y SABOR ❤️",
          "LA COPA MUNDIAL CONCLUYE, PERO LAS REUNIONES PERDURAN",
          "REGÍSTRATE EN EL CLUB BUCHANAN'S PARA EVENTOS EXCLUSIVOS FY27"
        ],
        copyOptions: [
          {
            label: "Gratitud Conmovedora 🙌",
            long: "Ha sido un mundial de fútbol lleno de emociones, goles gloriosos y abrazos inolvidables. Aunque el torneo llega a su final, el compromiso de Buchanan's de celebrar la generosidad y el compartir genuino sigue vigente en cada rincón de Colombia. Gracias por dejarnos ser el sabor de tus mejores historias en este 2026.",
            short: "¡Brindemos por cada momento de la copa y por los reencuentros del futuro!"
          },
          {
            label: "Evaluación & Feedback 📊",
            long: "Tu experiencia es lo más valioso para nosotros en Diageo Colombia S.A. Ayúdanos a evaluar nuestras actividades de Cooling Break, Ruta Buchanita y activaciones físicas completando la encuesta de satisfacción integrada en el formulario inferior. Al enviarla, recibirás un cupón exclusivo de agradecimiento en catálogo.",
            short: "Completa el formulario de retroalimentación y reclama un beneficio del 15%."
          },
          {
            label: "Club de Amigos Exclusivo 👑",
            long: "La copa mundial de la FIFA termina, pero los beneficios exclusivos para los amantes del buen whisky continúan. Únete gratis al Club de Amigos Buchanan's para acceder en exclusiva a catas privadas dirigidas por embajadores de marca, lanzamientos de ediciones especiales y preventas preferenciales.",
            short: "Suscríbete sin costo a nuestra comunidad de Diageo para futuros hitos de marca."
          }
        ],
        ctaOptions: [
          "UNIRME GRATIS AL CLUB EXCLUSIVO 👑",
          "COMPARTIR COMENTARIOS DE CAMPAÑA 💬",
          "EXPLORAR CATALOGO EN DIAGEO STORE 🛒"
        ]
      };
    }
  }

  // DEFAULT / EMAIL MODE
  if (isCooling) {
    return {
      headerOptions: [
        "¡EL PARTIDO ENTRÓ EN PAUSA, ES HORA DE TU BUCHANISTA! ⚽️⚡️",
        "¡MINUTO 22: EN EL MEDIO TIEMPO COMPARTIMOS CON NUESTRA GENTE!",
        "¿SABÍAS QUE UN BUEN PARTIDO SE DISFRUTA MÁS CON HIELO Y GINGER?"
      ],
      copyOptions: [
        {
          label: "Enérgica y Futbolera ⚽️",
          long: "La primera mitad nos dejó sin aliento, pero el verdadero juego en equipo empieza ahora en la mesa. No dejes que la pasión se enfríe: aprovecha los 15 minutos reglamentarios para refrescar las copas con nuestro Buchanan's 12 Años y Ginger Ale helado. ¡Es el entretiempo perfecto!",
          short: "¡El entretiempo es para celebrar cada juego con una Buchanita helada al lado de los tuyos!"
        },
        {
          label: "Familia Elegida & Reuniones 🥃",
          long: "Cada pase, cada gol y cada jugada se disfrutan el doble cuando estamos rodeados de nuestra gente. En este cooling break, tómate un momento para conversar y recordar que el mundial de fútbol es la excusa perfecta para celebrar que estamos juntos.",
          short: "Reúne a tu parche de siempre y celebra la grandeza del reencuentro frente a la copa."
        },
        {
          label: "Urgencia & Rappi Express 🛵",
          long: "¡No te muevas de la pantalla! Aprovecha los próximos minutos de receso y pide tu botella de Buchanan’s con entrega prioritaria por Rappi Colombia. Directo de la licorera a tu mesa en tiempo récord, bien frío y listo para acompañar el segundo tiempo del partido.",
          short: "Pide tu botella de Buchanan's con despacho prioritario por Rappi y goza el segundo tiempo."
        }
      ],
      ctaOptions: [
        "Pedir Buchanan's por Rappi Colombia 🛵",
        "Aprender a preparar el Perfect Serve con Ginger 📖",
        "Encontrar licorera con despacho exprés 📍"
      ]
    };
  } else if (isRuta) {
    return {
      headerOptions: [
        "¡LA RUTA BUCHANITA LLEGA A TU CIUDAD CON MÚSICA Y MARCA! 🗺️✨",
        "¿DÓNDE BRINDAMOS HOY? SIGUE EL MAPA DE LA CELEBRACIÓN 🥃🎙️",
        "EL SÁBADO SE VIVE MEJOR EN LOS BARES OFICIALES DE LA RUTA"
      ],
      copyOptions: [
        {
          label: "Celebración y Amistad 🍻",
          long: "La celebración de la copa se traslada a los barras y restaurantes más espectaculares del país. Junta a tu parche de amigos de siempre y embárcate en esta experiencia donde la buena música latina, la comida inigualable y la suavidad de Buchanan's crean un ambiente memorable.",
          short: "Sigue la señal, únete a las estaciones de la ruta de bares Buchanita y vive el mundial."
        },
        {
          label: "Experiencia Foodie y Maridaje 🍽️",
          long: "Nuestra mística combinación gastronómica: combos de picadas campestres, comida artesanal y Buchanitas para compartir a precios de campaña. Agenda hoy la salida perfecta con tu pareja o amigos y déjate deleitar.",
          short: "Descubre promociones exclusivas del menú mundialista Buchanan's en locales seleccionados."
        },
        {
          label: "Beneficios de Campaña/Premios 🎁",
          long: "Muestra este correo en cualquiera de las activaciones físicas de la Ruta Buchanita para obtener un descuento exclusivo en tu primer trago del día o una hielera de la marca. Prepárate para ganar sorpresas mundialistas mientras brindas con estilo.",
          short: "Presenta tu registro oficial y recibe un beneficio exclusivo en barra."
        }
      ],
      ctaOptions: [
        "Ver mapa interactivo de bares autorizados 🗺️",
        "Reservar mesa en el bar recomendado de la semana 📞",
        "Conocer regalos de marca por compra física 🎁"
      ]
    };
  } else if (isSorteo) {
    return {
      headerOptions: [
        "¡PREPÁRATE PARA VIVIR EL GRAN FESTIVAL DE LA COPA! 🎉🏆",
        "TU PASAPORTE CON DIAGEO: PARTICIPA POR ENTRADAS AL FAN FEST",
        "AVIVA EL SUEÑO DE LA FINAL CON EL SORTEO EXCLUSIVO BUCHANAN'S"
      ],
      copyOptions: [
        {
          label: "Expectación & Fan Fest 🏆",
          long: "Estamos sorteando pases dobles VIP para el FIFA Fan Festival™ oficial, donde podrás ver los juegos en pantallas colosales de última generación, vibrar con agrupaciones en vivo y festejar con heladas Buchanitas de cortesía. ¡Regístrate ya!",
          short: "Registra tus facturas de Buchanan's para ganar pases dobles al Fan Fest oficial."
        },
        {
          label: "Kit Bar en Casa Premium 🪵",
          long: "Queremos premiar tu hospitalidad nacional. Participa hoy mismo por uno de los 50 kits mundialistas exclusivos que incluyen hieleras de cuero con el escudo sellado, vasos oficiales grabados de Buchanan's, cucharas de coctelería y un set de ginger ale.",
          short: "¡Pon a punto tu hogar con el bar mundialista Buchanan's participando hoy mismo!"
        },
        {
          label: "Promocional & Multiplicador 🎫",
          long: "Multiplica tus opciones de ganar compartiendo este hito de marca. Cada factura que cargues de compras de Buchanan’s 12, 15 o Master en licoreras locales equivale a tres cupones digitales para los sorteos semanales de Diageo.",
          short: "Sube tu tiquete de compra y multiplica tus oportunidades de ir a la final."
        }
      ],
      ctaOptions: [
        "Ingresar mi código dinámico de Sorteo 🎟️",
        "Registrar factura de compra ahora mismo 🧾",
        "Preguntas frecuentes y términos del concurso 📂"
      ]
    };
  } else {
    return {
      headerOptions: [
        "¡ESTE MUNDIAL QUEDARÁ EN EL CORAZÓN DE TODOS! ❤️🥃",
        "CIERRE DE CAMPAÑA: GRACIAS POR CELEBRAR JUNTO A BUCHANAN'S",
        "EL COMPROMISO DE COMPARTIR Y REUNIR DE DIAGEO CONTINÚA"
      ],
      copyOptions: [
        {
          label: "Agradecimiento Genuino 🙌",
          long: "Termina un torneo inolvidable que nos unió en la fe y la adrenalina. Sin embargo, los reencuentros, las anécdotas compartidas y las copas alzadas quedan grabadas para siempre en la memoria de nuestra familia elegida. ¡Gracias por preferir la suavidad de Buchanan's!",
          short: "¡Brindemos por los goles gritados, las charlas interminables y la amistad en este 2026!"
        },
        {
          label: "Evaluación y Feedback ⚡️",
          long: "Tus opiniones nos guían como líder mundial de licores. Cuéntanos qué actividades de la Ruta Buchanita o de los Cooling Breaks viviste con mayor alegría, y ayúdanos a seguir elevando las reuniones y celebraciones que nos conectan.",
          short: "Responde nuestra encuesta express y recibe un código del 15% de descuento."
        },
        {
          label: "Club de Fidelización Diageo 👑",
          long: "La copa termina, pero la exclusividad perdura. Suscríbete al selecto Club Buchanan's Colombia de forma gratuita para participar de futuras catas sensoriales a puerta cerrada, preventas de ediciones master combinadas y lanzamientos sorpresa.",
          short: "Mantente en el círculo de Diageo y accede a experiencias con embajadores de whisky."
        }
      ],
      ctaOptions: [
        "Dejar mis comentarios sobre la campaña de marca 💬",
        "Unirme gratis al Club de Amigos de Buchanan's 👑",
        "Explorar el catálogo exclusivo en Diageo Store 🛒"
      ]
    };
  }
}
