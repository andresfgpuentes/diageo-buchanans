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
  contentType: 'email' | 'landing' = 'email',
  brand: 'buchanans' | 'smirnoff' | 'donjulio' | 'johnniewalker' = 'buchanans'
): MarketingOptions {
  const nameLower = eventName.toLowerCase();
  const isCooling = nameLower.includes('cooling') || nameLower.includes('break');
  const isRuta = nameLower.includes('ruta') || nameLower.includes('buchanita') || nameLower.includes('hotspot');
  const isSorteo = nameLower.includes('fest') || nameLower.includes('sorteo') || nameLower.includes('enrichment') || nameLower.includes('engagement') || nameLower.includes('polémica');
  
  let rawOpts: MarketingOptions;

  if (contentType === 'landing') {
    if (isCooling) {
      rawOpts = {
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
            long: "Descubre nuestra guía interactiva del Perfect Serve: combina el sabor de Buchanan's 12 Años con Ginger Ale helada y un twist cítrico de limón fresco de manera responsable. Regístrate en the formulario a continuación para unirte al club Diageo de coctelería mundialista.",
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
      rawOpts = {
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
      rawOpts = {
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
            label: "Promociones Rappi 🛵",
            long: "Al cargar tus compras digitales de establecimientos autorizados en Rappi, sumas canjes prioritarios para recibir copas de cristal labradas y botellas especiales autografiadas de la Copa Mundial. Introduce tus documentos en el formulario inferior.",
            short: "Valida tu código de ticket Rappi y recibe beneficios en tu próxima compra."
          }
        ],
        ctaOptions: [
          "SUBIR MI COMPROBANTE DE COMPRA 🧾",
          "RECLAMAR CÓDIGO TRANSACCIONAL 🎟️",
          "REGLAS E INSTRUCCIONES DEL SORTEO 📋"
        ]
      };
    } else {
      rawOpts = {
        headerOptions: [
          "¡SÉ PARTE DE LA FAMILIA ELEGIDA EN ESTA FASE FINAL! 🌟⚽️",
          "DIAGEO REGISTRO: ACCEDE A COCTELES ADAPTATIVOS DESDE TU HOGAR",
          "EL MEJOR SABOR MUNDIALISTA SE VIVE EN NUESTRAS CLOUDPAGES"
        ],
        copyOptions: [
          {
            label: "Bienvenida General 👋",
            long: "Bienvenido al ecosistema interactivo de Cloudpages. Aquí podrás previsualizar y sintonizar todas las comunicaciones del mundial con Buchanan's. Te invitamos a completar tu perfil para recibir menús de maridaje premium personalizados de acuerdo con tus selecciones.",
            short: "Regístrate hoy y obtén acceso total a las ventajas y beneficios de Diageo."
          },
          {
            label: "Sintonía Tarde o Temprano ⏱️",
            long: "Si prefieres el ambiente de los partidos de fin de semana o la intensidad de la semana, personaliza tus triggers automáticos en Salesforce completando el siguiente cuestionario. Así aseguramos enviarte promociones cuando más lo valoras.",
            short: "Alinea tu perfil y recibe notificaciones inteligentes en tiempo real."
          },
          {
            label: "Consumo Responsable 🛡️",
            long: "En Diageo creemos que la mejor celebración es la que se vive con responsabilidad. Al registrarte, te unes a nuestra iniciativa global para la promoción del consumo inteligente de alcohol. Agenda tus parches sabiendo balancear agua y buen trago.",
            short: "Disfruta el fútbol responsablemente guiado por la moderación inteligente."
          }
        ],
        ctaOptions: [
          "COMPLETAR MI REGISTRO DE CLIENTE  ✍️",
          "TÉRMINOS Y CONDICIONES GENERALES 📄",
          "LEER MÁS SOBRE CONSUMO RESPONSABLE 💚"
        ]
      };
    }
  } else {
    // email content type
    if (isCooling) {
      rawOpts = {
        headerOptions: [
          "¡MINUTO 22 / 67: PAUSA EL PARTIDO, ENCIENDE EL SABOR! ⚽️🔥",
          "EL REFRESCANTE DETALLE PARA EL ENTRETIEMPO EMPIEZA AQUÍ",
          "RECLAMA TU WHISKY HELADO Y COMPARTE LA INTENSIDAD EN FAMILIA"
        ],
        copyOptions: [
          {
            label: "Momentos Clave ⏱️",
            long: "Sabemos que cada minuto cuenta si el partido está igualado. En el entretiempo de 15 minutos, aprovecha para encender el sabor en familia con nuestro Perfect Serve. Refresca la pasión con un trago helado, charlen de la táctica y recarguen energías para la segunda mitad.",
            short: "¡Pausa momentáneamente las emociones del juego en vivo para preparar un delicioso Buchanan's Ginger!"
          },
          {
            label: "Detalles del Perfect Serve 📖",
            long: "Celebra cada anotación degustando la Buchanita perfecta: mezcla 2 onzas de Buchanan's 12 con abundante hielo, Ginger Ale premium helada y un toque cítrico con una rodaja de limón. Simple, delicioso y perfecto para los momentos más vibrantes.",
            short: "Prepara de manera ágil el trago oficial de la copa combinando whisky, ginger y limón."
          },
          {
            label: "Facilidad Delivery 🛵",
            long: "No te pierdas ni un tiro de esquina por salir a comprar. Pide tu Buchanan's 12 Años helado y refrescos adicionales de forma prioritaria en Rappi. Consigue combos especiales con licoreras aliadas y recíbelo directamente en tu puerta.",
            short: "Pide ahora tu botella de Buchanan’s por Rappi y recíbela helada en tu hogar."
          }
        ],
        ctaOptions: [
          "Pedir Buchanan's 12 Años en Rappi 🛵",
          "Aprender más mezclas en Diageo Bar 🥃",
          "Conseguir refrescos y vasos oficiales 🛒"
        ]
      };
    } else if (isRuta) {
      rawOpts = {
        headerOptions: [
          "¡DESCUBRE LA RUTA BUCHANITA EN LOS MEJORES BARES! 📍🍻",
          "LA SELECCIÓN OFICIAL DE BARES PARA DISFRUTAR DEL MUNDIAL",
          "RECONECTA CON LA COPA EN UN AMBIENTE SIN IGUAL DE MARCA"
        ],
        copyOptions: [
          {
            label: "Exploración & Geolocalización 🗺️",
            long: "Te invitamos a recorrer la Ruta de Bares Buchanita. Hemos seleccionado locales y terrazas en todo el territorio nacional con decoraciones exclusivas de la copa, pantallas de gran escala en alta definición y promociones especiales del Perfect Serve de la marca.",
            short: "Explora la ruta oficial en tu ciudad y únete al mejor ambiente para gritar los goles."
          },
          {
            label: "Beneficios de Barra 🍹",
            long: "Cada bar aliado de Diageo tiene un regalo para ti. Al mostrar este correo electrónico en las barras autorizadas del norte o la zona rosa, obtén de inmediato un trago o shot promocional para encender el sabor del juego en vivo con moderación.",
            short: "Accede a descuentos especiales del 15% en cocteles mundialistas mostrando tu correo."
          },
          {
            label: "Combos con Amigos 🤝",
            long: "Invita hoy a tu familia elegida y reserven mesa de manera anticipada. Disfruten de jarras heladas de Buchanitas combinadas con Ginger Ale, hielo y limón a precios promocionales exclusivas para los suscriptores activos de CRM.",
            short: "Arma tu parche en terrazas seleccionadas con combos diseñados para compartir."
          }
        ],
        ctaOptions: [
          "Ver mapa interactivo de bares autorizados 🗺️",
          "Reservar mesa en el bar recomendado de la semana 📞",
          "Conocer regalos de marca por compra física 🎁"
        ]
      };
    } else if (isSorteo) {
      rawOpts = {
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
      rawOpts = {
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

  // Handle Smirnoff Translation
  if (brand === 'smirnoff') {
    const serializeAndReplace = (obj: any): any => {
      let str = JSON.stringify(obj);
      str = str
        .replace(/BUCHANAN'S/g, "SMIRNOFF")
        .replace(/Buchanan's/g, "Smirnoff")
        .replace(/Buchanan’s/g, "Smirnoff")
        .replace(/Ruta Buchanita/g, "La Spicy Polémica")
        .replace(/Ruta de Bares Buchanita/g, "Hotspots Smirnoff")
        .replace(/Buchanitas/g, "Vuvushots de Smirnoff")
        .replace(/Buchanita/g, "Smirnoff Spicy Tamarind")
        .replace(/ginger ale/gi, "tónica y jugo de limón")
        .replace(/Ginger Ale/gi, "Tónica y Limón")
        .replace(/hieleras de cuero/gi, "vuvukits mundialistas")
        .replace(/hieleras premium/gi, "vasos rojos y coolers")
        .replace(/whisky/gi, "vodka")
        .replace(/Perfect Serve/gi, "Vuvushot Perfecto")
        .replace(/Perfect Serve lem/gi, "Vuvushot Rojo");
      return JSON.parse(str);
    };
    return serializeAndReplace(rawOpts);
  }

  // Handle Don Julio Translation
  if (brand === 'donjulio') {
    const serializeAndReplace = (obj: any): any => {
      let str = JSON.stringify(obj);
      str = str
        .replace(/BUCHANAN'S/g, "DON JULIO")
        .replace(/Buchanan's/g, "Don Julio")
        .replace(/Buchanan’s/g, "Don Julio")
        .replace(/Ruta Buchanita/g, "Ruta de la Devoción")
        .replace(/Ruta de Bares Buchanita/g, "Camino de la Tierra")
        .replace(/Buchanitas/g, "Margaritas Don Julio")
        .replace(/Buchanita/g, "Copa Don Julio Blanco")
        .replace(/ginger ale/gi, "soda y toronja fresca")
        .replace(/Ginger Ale/gi, "Soda y Toronja")
        .replace(/hieleras de cuero/gi, "maletines artesanales")
        .replace(/hieleras premium/gi, "licoreras de vidrio soplado")
        .replace(/whisky/gi, "tequila")
        .replace(/Perfect Serve/gi, "Ritual de Agave")
        .replace(/Como familia/gi, "Con devoción")
        .replace(/Estamos en familia/g, "Por Amor")
        .replace(/estamos en familia/gi, "por amor")
        .replace(/Cooling Break/gi, "Momento Por Amor");
      return JSON.parse(str);
    };
    return serializeAndReplace(rawOpts);
  }

  // Handle Johnnie Walker Blue Translation
  if (brand === 'johnniewalker') {
    const serializeAndReplace = (obj: any): any => {
      let str = JSON.stringify(obj);
      str = str
        .replace(/BUCHANAN'S/g, "JOHNNIE WALKER BLUE LABEL")
        .replace(/Buchanan's/g, "Johnnie Walker Blue Label")
        .replace(/Buchanan’s/g, "Johnnie Walker Blue Label")
        .replace(/Ruta Buchanita/g, "Blue Label Society")
        .replace(/Ruta de Bares Buchanita/g, "Salones Blue Label Society")
        .replace(/Buchanitas/g, "Servidos Blue Label")
        .replace(/Buchanita/g, "Johnnie Walker Blue Label")
        .replace(/ginger ale/gi, "agua helada al lado")
        .replace(/Ginger Ale/gi, "Agua Helada")
        .replace(/hieleras de cuero/gi, "estuches de cuero grabados")
        .replace(/hieleras premium/gi, "vasos de cristal de lujo")
        .replace(/Perfect Serve/gi, "Art of Gifting 365")
        .replace(/Perfect Serve lem/gi, "Un Regalo con Intención")
        .replace(/Como familia/gi, "Con intención")
        .replace(/Estamos en familia/g, "Blue Label Society")
        .replace(/estamos en familia/gi, "blue label society")
        .replace(/Cooling Break/gi, "Momento Blue Label Society");
      return JSON.parse(str);
    };
    return serializeAndReplace(rawOpts);
  }

  return rawOpts;
}
