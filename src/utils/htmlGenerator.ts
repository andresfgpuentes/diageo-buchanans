/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EmailVariables, EmailBlock, ColumnContent, ColumnItem } from '../types';

export const OFFICIAL_TEXTURE_URL = "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280";

export function transformImageUrl(url: string | undefined): string {
  if (!url) return '';
  const trimmed = url.trim();
  
  // 1. Google Drive Sharing Links
  const driveViewRegexp = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i;
  const driveOpenRegexp = /[?&]id=([a-zA-Z0-9_-]+)/i;
  
  if (trimmed.includes('drive.google.com') || trimmed.includes('docs.google.com')) {
    const viewMatch = trimmed.match(driveViewRegexp);
    if (viewMatch && viewMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${viewMatch[1]}=w1200`;
    }
    const openMatch = trimmed.match(driveOpenRegexp);
    if (openMatch && openMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${openMatch[1]}=w1200`;
    }
  }
  
  // 2. Dropbox Links
  if (trimmed.includes('dropbox.com')) {
    let replaced = trimmed;
    replaced = replaced.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
    replaced = replaced.replace('?dl=0', '');
    replaced = replaced.replace('?dl=1', '');
    replaced = replaced.replace('&dl=0', '');
    replaced = replaced.replace('&dl=1', '');
    return replaced;
  }

  return trimmed;
}

const diageoLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135 60" width="135" height="60">
  <text x="0" y="16" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-weight="bold" font-size="9" fill="#FFFFFF" letter-spacing="3.5">#CONMODERACIÓN</text>
  <text x="0" y="48" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-weight="950" font-size="32" fill="#FFFFFF" letter-spacing="1">DIAGEO</text>
</svg>`;

const eighteenLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="4 0 148 60" width="148" height="60">
  <circle cx="26" cy="30" r="22" stroke="#FFFFFF" stroke-width="4" fill="none" />
  <text x="26" y="37" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-weight="900" font-size="19" fill="#FFFFFF" text-anchor="middle">18+</text>
  <text x="64" y="22" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-weight="bold" font-size="11" fill="#FFFFFF" letter-spacing="1.2">PROHIBIDO</text>
  <text x="64" y="36" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-weight="bold" font-size="11" fill="#FFFFFF" letter-spacing="1.2">REENVIAR A</text>
  <text x="64" y="50" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-weight="bold" font-size="11" fill="#FFFFFF" letter-spacing="1.2">MENORES</text>
</svg>`;

const btoaSafely = (str: string) => {
  try {
    if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
      return window.btoa(unescape(encodeURIComponent(str)));
    } else {
      return Buffer.from(str, 'utf-8').toString('base64');
    }
  } catch (e) {
    return "";
  }
};

export const diageoBase64Url = `data:image/svg+xml;base64,${btoaSafely(diageoLogoSvg)}`;
export const eighteenBase64Url = `data:image/svg+xml;base64,${btoaSafely(eighteenLogoSvg)}`;

export const DEFAULT_EMAIL_VARIABLES: EmailVariables = {
  subject: "Bienvenido a la Familia — Buchanan's",
  logoUrl: "https://lh3.googleusercontent.com/d/1ZtNqBvS6qL-g9-7Lz1eZ_T0J3_TjW69i=w360", // High-quality Buchanan's Red Seal logo
  backgroundTextureUrl: OFFICIAL_TEXTURE_URL,
  blocks: [
    {
      id: "block-eyebrow-1",
      type: "text",
      textStyle: "eyebrow",
      text: "COPA MUNDIAL FIFA 26™ ft. RAUW ALEJANDRO"
    },
    {
      id: "block-headline-1",
      type: "text",
      textStyle: "headline",
      text: "¡BIENVENIDO AL CÍRCULO, %%FirstName%%!"
    },
    {
      id: "block-hero-image",
      type: "image",
      imageUrl: "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
      imageAlt: "Rauw Alejandro Copa Mundial",
      imageWidth: "536"
    },
    {
      id: "block-columns-highlight",
      type: "columns",
      columnsCount: 2,
      columns: [
        {
          id: "col-left",
          type: "text",
          textStyle: "paragraph",
          text: "<strong>Sabor Auténtico:</strong> Mezclado con pasión para brindar momentos inolvidables a los hinchas."
        },
        {
          id: "col-right",
          type: "text",
          textStyle: "paragraph",
          text: "<strong>Pasión Latina:</strong> Buchanan's reúne lo mejor de nuestro ritmo y nuestra gente."
        }
      ]
    },
    {
      id: "block-paragraph-1",
      type: "text",
      textStyle: "paragraph",
      text: "Nos hace muy felices que te unas a nosotros. En esta familia elegida, cada reencuentro es un motivo para celebrar y cada momento juntos enciende nuestro sabor."
    },
    {
      id: "block-buttons-1",
      type: "button-group",
      buttons: [
        {
          id: "btn-casa",
          text: "En mi casa",
          url: "%%URL_OPCION_EN_CASA%%",
          style: "solid-yellow"
        },
        {
          id: "btn-bar",
          text: "En bares y locales",
          url: "%%URL_OPCION_EN_BAR%%",
          style: "outline-yellow"
        }
      ]
    }
  ],
  eyebrow: "COPA MUNDIAL FIFA 26™ ft. RAUW ALEJANDRO",
  welcomeHeadline: "¡BIENVENIDO AL CÍRCULO, %%FirstName%%!",
  paragraph1: "Nos hace muy felices que te unas a nosotros. En esta familia elegida, cada reencuentro es un motivo para celebrar y cada momento juntos enciende nuestro sabor.",
  paragraph2: "Se viene la Copa Mundial de la FIFA 26™ y la viviremos al ritmo de LATAM. Cuéntanos, ¿cómo te vas a preparar para el próximo partido?",
  buttonCasaText: "En mi casa",
  buttonCasaUrl: "%%URL_OPCION_EN_CASA%%",
  buttonBarText: "En bares y locales",
  buttonBarUrl: "%%URL_OPCION_EN_BAR%%",
  legalDisclaimer: "DIAGEO te invita a disfrutar con responsabilidad. El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad. 40% Vol. Alc.",
  unsubscribeText: "Respetamos tu derecho a la privacidad - Conoce nuestras Políticas de Datos Personales. Este correo fue enviado por: Diageo Colombia S.A. Si no deseas recibir más comunicaciones de interés haz clic <a href=\"%%unsub_center_url%%\" style=\"color:#888888; text-decoration:underline;\">aquí</a>.",
  
  // Embedded images configuration
  heroImageUrl: "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
  heroImageAlt: "Rauw Alejandro Copa Mundial",
  heroImageWidth: "536",
  showHeroImage: true,
  
  secondaryImageUrl: "https://lh3.googleusercontent.com/d/1ZtNqBvS6qL-g9-7Lz1eZ_T0J3_TjW69i=w360",
  secondaryImageAlt: "Copa Mundial Buchanan's",
  secondaryImageWidth: "200",
  showSecondaryImage: false,
 
  // Test simulation values
  testFirstName: "Andrés",
  testConsumptionPreference: "En casa",
  testCity: "Bogotá"
};

/**
 * Encodes application state to raw string, robustly handling accents and JSON issues
 */
function encodeStateMetadata(vars: EmailVariables): string {
  try {
    const jsonStr = JSON.stringify(vars);
    // Safe base64 conversion for unicode characters (accents like Bogotá, Andrés, etc.)
    return btoa(unescape(encodeURIComponent(jsonStr)));
  } catch (e) {
    console.error("Failed to serialize state", e);
    return "";
  }
}

/**
 * Generates individual column/block contents cleanly
 */
function renderColumnContent(
  col: ColumnContent | EmailBlock | ColumnItem, 
  mode: 'ampscript' | 'preview', 
  firstName: string
): string {
  // If this column/block has nested items, render them sequentially
  if ('items' in col && col.items && col.items.length > 0) {
    return col.items.map(item => renderColumnContent(item, mode, firstName)).join('\n');
  }

  const pTop = col.paddingTop !== undefined ? `${col.paddingTop}px` : '0px';
  const pBottom = col.paddingBottom !== undefined ? `${col.paddingBottom}px` : (col.textStyle === 'eyebrow' ? '10px' : '16px');
  const pLeft = col.paddingLeft !== undefined ? `${col.paddingLeft}px` : '0px';
  const pRight = col.paddingRight !== undefined ? `${col.paddingRight}px` : '0px';
  const spacingStyle = `padding-top:${pTop}; padding-bottom:${pBottom}; padding-left:${pLeft}; padding-right:${pRight};`;

  const type = col.type;
  if (type === 'text') {
    const blockText = col.text || '';
    const processed = blockText.replace('%%FirstName%%', firstName);
    if (col.textStyle === 'eyebrow') {
      const fSize = col.fontSize || '11px';
      return `
      <p style="color:#fffd48; font-size:${fSize}; font-weight:700; letter-spacing:2px; margin:0; ${spacingStyle} font-family:'Poppins', Arial, sans-serif; text-transform:uppercase; text-align:center;">
        ${processed}
      </p>`;
    } else if (col.textStyle === 'headline') {
      const fSize = col.fontSize || '24px';
      return `
      <h1 style="color:#fffd48; font-size:${fSize}; font-weight:700; margin:0; ${spacingStyle} font-family:'Poppins', Arial, sans-serif; text-align:center; line-height:1.2;">
        ${processed}
      </h1>`;
    } else {
      const fSize = col.fontSize || '14px';
      return `
      <p style="color:#FFFFFF; font-size:${fSize}; line-height:1.6; margin:0; ${spacingStyle} font-family:'Poppins', Arial, sans-serif; text-align:center; font-weight:300;">
        ${processed}
      </p>`;
    }
  } else if (type === 'image') {
    if (!col.imageUrl) return '';
    const isFull = col.imageFullWidth;
    const imgWidthAttr = isFull ? '100%' : (col.imageWidth || '450');
    const imgStyle = isFull 
      ? 'display: block; width: 100%; max-width: 100%; height: auto; border: 0; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);'
      : `display: block; max-width: 100%; width: ${col.imageWidth || '450'}px; height: auto; border: 0; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);`;
    return `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0; ${spacingStyle} border-collapse: collapse;">
      <tr>
        <td align="center">
          <img src="${transformImageUrl(col.imageUrl)}" alt="${col.imageAlt || 'Imagen'}" width="${imgWidthAttr}" style="${imgStyle}" />
        </td>
      </tr>
    </table>`;
  } else if (type === 'button-group') {
    return `
    <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto; ${spacingStyle} border-collapse:collapse;">
      <tr>
        ${(col.buttons || []).map(btn => {
          const btnUrl = mode === 'preview' ? '#button-click-simulation' : btn.url;
          let bgColor = '#fffd48';
          let textColor = '#015D2F';
          let borderStyle = 'none';
          
          if (btn.style === 'outline-yellow') {
            bgColor = '#000005';
            textColor = '#fffd48';
            borderStyle = '1px solid #fffd48';
          } else if (btn.style === 'solid-green') {
            bgColor = '#015D2F';
            textColor = '#FFFFFF';
            borderStyle = 'none';
          } else if (btn.style === 'dark-outline') {
            bgColor = '#000005';
            textColor = '#FFFFFF';
            borderStyle = '1px solid #ffffff';
          }
          
          // Button padding and size options
          let btnPadding = '10px 22px';
          let btnFontSize = '11px';
          if (btn.size === 'small') {
            btnPadding = '6px 14px';
            btnFontSize = '10px';
          } else if (btn.size === 'large') {
            btnPadding = '14px 30px';
            btnFontSize = '14px';
          }
          
          return `
          <td class="stack-mobile" style="padding:0 6px 10px 6px;" align="center">
            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;">
              <tr>
                <td align="center" style="background-color:${bgColor}; border:${borderStyle}; border-radius:50px;">
                  <a href="${btnUrl}" style="display:inline-block; font-family:'Poppins', Arial, sans-serif; font-size:${btnFontSize}; font-weight:700; color:${textColor}; text-decoration:none; padding:${btnPadding}; border-radius:50px; text-transform:uppercase; letter-spacing:1px; text-align:center; white-space:nowrap;">
                    ${btn.text}
                  </a>
                </td>
              </tr>
            </table>
          </td>`;
        }).join('')}
      </tr>
    </table>`;
  }
  return '';
}

/**
 * Generates the complete, Salesforce Marketing Cloud ready, inline-styled HTML
 * for Buchanan's Designer.
 */
export function generateWelcomeEmailHtml(vars: EmailVariables, mode: 'ampscript' | 'preview'): string {
  let firstName = mode === 'preview' ? vars.testFirstName : '%%FirstName%%';
  let unsubUrl = mode === 'preview' ? '#unsubscribe-simulation' : '%%unsub_center_url%%';
  
  let urlLogo = transformImageUrl(vars.logoUrl || "https://lh3.googleusercontent.com/d/1ZtNqBvS6qL-g9-7Lz1eZ_T0J3_TjW69i=w360");
  let urlTexture = transformImageUrl(vars.backgroundTextureUrl || OFFICIAL_TEXTURE_URL);
  
  let textUnsubscribe = vars.unsubscribeText;
  if (mode === 'preview') {
    textUnsubscribe = textUnsubscribe.replace('%%unsub_center_url%%', unsubUrl);
  }

  // Compile layout blocks
  const compiledBlocksHtml = (vars.blocks || []).map(block => {
    // Check if block has multi-column enabled or custom nested columns/items configured
    const totalCols = block.columnsCount || (block.columns ? block.columns.length : 1);
    const hasColumns = block.columns && block.columns.length > 0;

    if (block.type === 'columns' || totalCols > 1 || hasColumns) {
      const columnsList = block.columns || [];
      
      // Calculate widths representing 536 max width content
      let columnWidth = 536;
      let padding = "10px";
      if (totalCols === 2) {
        columnWidth = 250;
        padding = "0 8px 10px 8px";
      } else if (totalCols === 3) {
        columnWidth = 160;
        padding = "0 6px 10px 6px";
      }

      return `
      <!-- Multi-Column Layout (Columns Count: ${totalCols}) -->
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 auto 16px auto; border-collapse:collapse; table-layout:fixed;">
        <tr>
          ${Array.from({ length: totalCols }).map((_, index) => {
            const colItem = columnsList[index] || { id: `col-${index}`, type: 'text', textStyle: 'paragraph', text: 'Escribe contenido aquí...' };
            const renderedContent = renderColumnContent(colItem, mode, firstName);
            return `
            <td width="${columnWidth}" align="center" valign="top" class="stack-mobile" style="width:${columnWidth}px; padding:${padding};">
              ${renderedContent}
            </td>
            `;
          }).join('')}
        </tr>
      </table>
      `;
    } else {
      // Classic single-column block
      return renderColumnContent(block, mode, firstName);
    }
  }).join('\n');

  const metadataElement = encodeStateMetadata(vars);

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${vars.subject}</title>
${mode === 'preview' ? `
<script>
  window.onerror = function(message, source, lineno, colno, error) {
    console.warn("[Iframe error caught] message:", message);
    return true; // Silence and prevent bubble
  };
  window.addEventListener('unhandledrejection', function(event) {
    console.warn("[Iframe promise rejection caught] reason:", event.reason);
    event.preventDefault(); // Silence propagation
  }, true);
</script>
` : ''}
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;700&display=swap');
  
  /* Outlook fallback rule */
  body, table, td, p, h1, h2, a {
    font-family: 'Poppins', Arial, sans-serif !important;
  }
  
  /* Responsive states stack */
  @media screen and (max-width: 480px) {
    .stack-mobile {
      display: block !important;
      width: 100% !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
      margin-bottom: 12px !important;
    }
  }
</style>
</head>
<body style="margin:0; padding:0; background-color:#000000; font-family:'Poppins', Arial, sans-serif; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;">

<!-- Wrapper exterior negro -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#000000" style="background-color:#000000; table-layout:fixed; width:100%;">
  <tr>
    <td align="center" style="padding:20px 0;">
      
      <!-- Contenedor 600px con bordes redondeados (Sección 4) -->
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; border-collapse:separate; border-radius:24px; overflow:hidden;" bgcolor="#000000">
        
        <!-- HEADER: Franja verde sólida + logo centrado (Sección 4: 24px padding) -->
        <tr>
          <td align="center" style="background-color:#015D2F; padding:24px 32px;">
            <img src="${urlLogo}" alt="BUCHANAN'S" width="180" style="display:block; border:0; width:180px; max-width:100%; height:auto;" />
          </td>
        </tr>
        
        <!-- CUERPO PRINCIPAL CON IMAGEN DE FONDO TOTALMENTE INTEGRADA (Sección 4: modo nocturno, con la textura oficial de fondo) -->
        <tr>
          <td align="center" style="background-color:#012a15; background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${urlTexture}'); background-position: center top; background-repeat: no-repeat; background-size: cover; padding:40px 32px;" background="${urlTexture}">
            
            <!-- CONTENIDO GENERADO DINÁMICAMENTE POR EL EDITOR DE BLOQUES -->
            ${compiledBlocksHtml}
            
          </td>
        </tr>
        
        <!-- FOOTER LEGAL (Sección 4 - Inmutable y sin modificaciones) -->
        <tr>
          <td align="center" style="background-color:#000000; padding:24px 15px; border-top:1px solid #222222;" bgcolor="#000000">
            <!-- Fila horizontal única con Diageo a la izquierda, Texto en el medio, y +18 a la derecha -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; border-collapse:collapse;">
              <tr>
                <!-- Logo Diageo a la izquierda -->
                <td align="left" valign="middle" style="padding:0; width:100px;" width="100">
                  <img src="${diageoBase64Url}" alt="Diageo" width="100" style="display:block; border:0; width:100px; height:auto;" />
                </td>
                
                <!-- Texto legal y desuscripción en el medio con distancia de exactamente 15px y alineado a la izquierda -->
                <td align="left" valign="middle" style="padding:0 15px; color:#888888; font-size:8px; line-height:1.2; font-family:'Poppins', Arial, sans-serif; font-weight:300; text-align:left; text-transform:uppercase;">
                  <span style="display:block; margin-bottom:4px;">${vars.legalDisclaimer}</span>
                  <span style="display:block;">${textUnsubscribe}</span>
                </td>
                
                <!-- Logo +18 a la derecha -->
                <td align="right" valign="middle" style="padding:0; width:120px;" width="120">
                  <img src="${eighteenBase64Url}" alt="Disfruta responsablemente" width="120" style="display:block; border:0; width:120px; height:auto;" />
                </td>
              </tr>
            </table>
          </td>
        </tr>
        
      </table>
      
    </td>
  </tr>
</table>

<!-- BUCHANANS_EMAIL_DATA_START:${metadataElement}:BUCHANANS_EMAIL_DATA_END -->
</body>
</html>`;
}

/**
 * Generates individual column/block contents cleanly for responsive Web Landings with brand-aligned Tailwind styles
 */
function renderLandingColumnContent(
  col: ColumnContent | EmailBlock | ColumnItem, 
  mode: 'ampscript' | 'preview', 
  firstName: string
): string {
  // If this column/block has nested items, render them sequentially
  if ('items' in col && col.items && col.items.length > 0) {
    return col.items.map(item => renderLandingColumnContent(item, mode, firstName)).join('\n');
  }

  const pTop = col.paddingTop !== undefined ? `${col.paddingTop}px` : '0px';
  const pBottom = col.paddingBottom !== undefined ? `${col.paddingBottom}px` : (col.textStyle === 'eyebrow' ? '8px' : '16px');
  const pLeft = col.paddingLeft !== undefined ? `${col.paddingLeft}px` : '0px';
  const pRight = col.paddingRight !== undefined ? `${col.paddingRight}px` : '0px';
  const spacingStyle = `padding-top:${pTop}; padding-bottom:${pBottom}; padding-left:${pLeft}; padding-right:${pRight};`;

  const type = col.type;
  if (type === 'text') {
    const blockText = col.text || '';
    const processed = blockText.replace('%%FirstName%%', firstName);
    if (col.textStyle === 'eyebrow') {
      const fSize = col.fontSize || '14px';
      return `
      <p style="font-size:${fSize}; ${spacingStyle}" class="text-buchanan-yellow text-xs md:text-sm font-bold tracking-[3px] uppercase mb-2 text-center font-sans">
        ${processed}
      </p>`;
    } else if (col.textStyle === 'headline') {
      const fSize = col.fontSize || '36px';
      return `
      <h2 style="font-size:${fSize}; ${spacingStyle}" class="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight text-center font-sans tracking-tight">
        ${processed}
      </h2>`;
    } else {
      const fSize = col.fontSize || '16px';
      return `
      <p style="font-size:${fSize}; ${spacingStyle}" class="text-white font-light text-sm md:text-lg max-w-3xl mx-auto text-center font-sans leading-relaxed">
        ${processed}
      </p>`;
    }
  } else if (type === 'image') {
    if (!col.imageUrl) return '';
    const isFull = col.imageFullWidth;
    const imgWidthAttr = isFull ? '100%' : (col.imageWidth || '450');
    return `
    <div style="${spacingStyle}" class="flex justify-center w-full my-6">
      <img src="${transformImageUrl(col.imageUrl)}" alt="${col.imageAlt || 'Imagen'}" width="${imgWidthAttr}" class="${isFull ? 'w-full rounded-2xl border border-white/5' : 'max-w-full rounded-xl border border-white/10'} h-auto object-cover shadow-2xl" id="img-${col.id || 'image'}" />
    </div>`;
  } else if (type === 'button-group') {
    return `
    <div style="${spacingStyle}" class="flex flex-wrap justify-center gap-3 md:gap-4 my-6 w-full">
      ${(col.buttons || []).map(btn => {
        const btnUrl = mode === 'preview' ? '#button-click-simulation' : btn.url;
        let btnClasses = "px-8 py-3.5 font-bold text-xs md:text-sm rounded-full transition-transform hover:scale-105 active:scale-95 inline-block text-center uppercase tracking-wider font-sans cursor-pointer";
        if (btn.style === 'outline-yellow') {
          btnClasses += " bg-black text-buchanan-yellow border border-buchanan-yellow hover:bg-buchanan-yellow/10";
        } else if (btn.style === 'solid-green') {
          btnClasses += " bg-buchanan-green text-white border border-transparent hover:bg-buchanan-green/80";
        } else if (btn.style === 'dark-outline') {
          btnClasses += " bg-black hover:bg-neutral-900 text-white border border-white/25";
        } else { // default solid-yellow style
          btnClasses += " bg-buchanan-yellow text-black shadow-[0_0_15px_rgba(255,253,72,0.3)] hover:bg-yellow-350";
        }
        return `
        <a href="${btnUrl}" class="${btnClasses}">
          ${btn.text}
        </a>`;
      }).join('')}
    </div>`;
  } else if (type === 'custom-code') {
    return `
    <div style="${spacingStyle}" class="w-full">
      ${col.customHtml || ''}
    </div>`;
  }
  return '';
}

/**
 * Generates the complete responsive, high-fidelity Web Landing Page (CloudPage) HTML
 * styled with the official night mode and an interactive Preference Capture Form.
 */
export function generateWelcomeLandingHtml(vars: EmailVariables, mode: 'ampscript' | 'preview'): string {
  let firstName = mode === 'preview' ? vars.testFirstName : '%%FirstName%%';
  
  let urlLogo = transformImageUrl(vars.logoUrl || "https://lh3.googleusercontent.com/sitesv/AA5AbUDwk966jImNHZ4ytbPRrJX9LHB8TTj4yYaqebWmi0zz047ddL4sUWRZqUBG4zYi6NQN0hVxtBjiy5EyH-iaW20W46_OvUBN9KE7CrL6F-bvkLBf5ANgBsYkJT2ap6x8ApORoihuk7UINvVeNXRdzfuQVH3LZzegfe8LwI3zp6_wauMLIbrMIg1ka1ViNQTW0zH0plBIuazngEJXqBXUcFZuzBZB3xXXwUA7-d4jNbk=w1280");
  let urlTexture = transformImageUrl(vars.backgroundTextureUrl || "https://lh3.googleusercontent.com/sitesv/AA5AbUCgfFs_B7I_dVgXFVGE_WiyBNfw1AF2O8-8SQ368x16gqHTN50xM22Tm5WMu0EBrb4__JRg140-zUBbFEfC9hltUnV1IT4Lp7ZLiithPG3iedipjkY7nCH6Upvi4lLVJnN-6QMtEip81r_kKxCePYpZ0TMcGNFlL9-BH0u4U5FGZdhzt4oC0xVQMYUyRPfMT1kpKuY-4NuVmZNnXkKkuk-zQsNT1iR7eddehjeuExk=w1280");

  // Compile layout blocks for modern HTML structures
  const compiledBlocksHtml = (vars.blocks || []).map(block => {
    const totalCols = block.columnsCount || (block.columns ? block.columns.length : 1);
    const hasColumns = block.columns && block.columns.length > 0;
    
    const hasBgTexture = typeof block.backgroundTextureUrl === 'string' && block.backgroundTextureUrl.trim().length > 0;
    const bgTextureHtml = hasBgTexture
      ? `<div class="absolute inset-0 bg-cover bg-center pointer-events-none opacity-60 z-0" style="background-image: url('${transformImageUrl(block.backgroundTextureUrl)}');"></div>`
      : '';

    if (block.type === 'form') {
      return `
      <!-- EXCLUSIVE LEAD REGISTRATION CARD (CloudPages lead capture placeholder) -->
      <section class="w-full relative py-12 text-center overflow-hidden" id="form-container-section-${block.id}">
          ${bgTextureHtml}
          <div class="relative z-10 max-w-5xl mx-auto px-4 w-full">
              <div class="bg-buchanan-darkgreen/80 backdrop-blur-md rounded-[20px] p-8 border border-buchanan-green/30 w-full text-center shadow-xl">
                  <span class="text-xl md:text-2xl font-bold text-buchanan-yellow uppercase tracking-widest font-sans" style="letter-spacing: 0.1em;">Espacio para form</span>
              </div>
          </div>
      </section>
      `;
    } else if (block.type === 'custom-code') {
      // Custom Code block gets rendered exactly, full-width, zero wrapper constraints so it is infinitely customizable
      return `
      <!-- Dynamic Custom Code Section -->
      <section class="w-full relative py-6 flex flex-col items-center overflow-hidden">
        ${bgTextureHtml}
        <div class="relative z-10 w-full">
          ${renderLandingColumnContent(block, mode, firstName)}
        </div>
      </section>
      `;
    } else if (block.type === 'columns' || totalCols > 1 || hasColumns) {
      const columnsList = block.columns || [];
      return `
      <!-- Row Section (Columns Count: ${totalCols}) -->
      <section class="w-full relative py-8 overflow-hidden">
        ${bgTextureHtml}
        <div class="relative z-10 max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-${totalCols} gap-6 md:gap-8 w-full">
          ${Array.from({ length: totalCols }).map((_, index) => {
            const colItem = columnsList[index] || { id: `col-${index}`, type: 'text', textStyle: 'paragraph', text: 'Escribe contenido aquí...' };
            const renderedContent = renderLandingColumnContent(colItem, mode, firstName);
            return `
            <div class="flex flex-col justify-start w-full">
              ${renderedContent}
            </div>
            `;
          }).join('')}
        </div>
      </section>
      `;
    } else {
      // Standard blocks wrapped inside centered padding-safe margins
      return `
      <section class="w-full relative py-6 text-center overflow-hidden">
        ${bgTextureHtml}
        <div class="relative z-10 max-w-5xl mx-auto px-4">
          ${renderLandingColumnContent(block, mode, firstName)}
        </div>
      </section>
      `;
    }
  }).join('\n');

  const metadataElement = encodeStateMetadata(vars);

  return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${vars.subject} — Landing Page Oficial | Buchanan's</title>
    
    <!-- Google Fonts: Poppins (Mandatorio según Brand World 5.0) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;700&display=swap" rel="stylesheet">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        buchanan: {
                            black: '#000000',
                            green: '#015D2F',
                            darkgreen: '#012a15',
                            yellow: '#fffd48',
                            gray: '#888888',
                            white: '#FFFFFF'
                        }
                    },
                    fontFamily: {
                        sans: ['Poppins', 'Arial', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    
    <style>
        /* Custom Scrollbar for elegant Night Mode feel */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #000000; }
        ::-webkit-scrollbar-thumb { background: #015D2F; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #119e20; }
        
        body { 
            background-color: #000000; 
            color: #FFFFFF; 
            font-family: 'Poppins', Arial, sans-serif; 
        }
        
        /* Textura Oficial Buchanan's al 60% */
        .bg-texture {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background-image: url('${urlTexture}');
            background-size: cover;
            background-position: center;
            opacity: 0.6;
            z-index: -1;
            pointer-events: none;
        }
    </style>
</head>
<body class="relative min-h-screen flex flex-col">

    <div class="bg-texture"></div>

    <!-- HEADER DELGADO (Fondo verde oscuro corporativo) -->
    <header class="bg-buchanan-darkgreen py-4 md:py-5 px-4 flex items-center justify-center sticky top-0 z-50 shadow-md">
        <img src="${urlLogo}" alt="Buchanan's Logo" class="h-8 md:h-10 object-contain">
    </header>

    <main class="flex-grow flex flex-col items-center w-full pb-16 z-10">
        
        <!-- DYNAMIC BLOCKS OF WORKSPACE -->
        ${compiledBlocksHtml}
    </main>

    <!-- FOOTER LEGAL (Estructura de Tabla Compatible) -->
    <footer class="bg-black w-full z-10 border-t border-[#222222] mt-auto" style="padding: 20px;">
        <table width="100%" style="max-width: 1160px; margin: 0 auto;" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <!-- Columna Izquierda -->
                <td width="14%" align="left" valign="middle" style="padding-right: 20px;">
                    <img src="${diageoBase64Url}" alt="Diageo" style="max-width: 100px; width: 100%; display: block; border: none;">
                </td>
                
                <!-- Columna Central -->
                <td width="72%" align="center" valign="middle">
                    <p style="margin: 0 0 4px 0; font-family:'Poppins', sans-serif; font-size: 8px; line-height: 1.25; color: #888888; text-align: center; text-transform: uppercase;">
                        ${vars.legalDisclaimer}
                    </p>
                    <p style="margin: 0; font-family:'Poppins', sans-serif; font-size: 8px; line-height: 1.25; color: #888888; text-align: center; text-transform: uppercase;">
                        ${vars.unsubscribeText || 'Recibiste este contenido de un socio oficial de Diageo Colombia. Todos los derechos reservados.'}
                    </p>
                </td>
                
                <!-- Columna Derecha -->
                <td width="14%" align="right" valign="middle" style="padding-left: 20px;">
                    <img src="${eighteenBase64Url}" alt="18+ Prohibido Reenviar" style="max-width: 144px; width: 100%; display: block; border: none;">
                </td>
            </tr>
        </table>
        <div style="text-align: center; font-family:'Poppins', sans-serif; font-size: 10px; color: #666666; margin-top: 16px;">
            <a href="https://www.diageo.com" target="_blank" style="color: #888888; text-decoration: underline; margin: 0 4px;">Políticas de Diageo</a> • 
            <a href="https://www.drinkiq.com" target="_blank" style="color: #888888; text-decoration: underline; margin: 0 4px;">DrinkiQ.com</a> • 
            <a href="#terminos" style="color: #888888; text-decoration: underline; margin: 0 4px;">Términos y Condiciones</a>
        </div>
    </footer>

    <!-- INTERACTION LOGIC / SCRIPTS -->
    <script>
      function handleFormSubmission(event) {
        event.preventDefault();
        const submitBtn = document.getElementById('submit-btn-element');
        const formContainer = document.getElementById('form-container');
        const successContainer = document.getElementById('success-container');
        const msgText = document.getElementById('success-message-text');
        
        const nameVal = document.getElementById('reg-name').value;
        const emailVal = document.getElementById('reg-email').value;
        const prefSelect = document.getElementById('reg-pref');
        const prefVal = prefSelect.options[prefSelect.selectedIndex].text;
        const cityVal = document.getElementById('reg-city').value;
        
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.innerHTML = '<span>CONECTANDO CON SALESFORCE...</span>';
        
        setTimeout(() => {
          formContainer.style.display = 'none';
          successContainer.style.display = 'block';
          msgText.innerHTML = "¡Hola, <strong>" + nameVal + "</strong>! Tu preferencia por <strong>" + prefVal + "</strong> en la ciudad de <strong>" + cityVal + "</strong> ha sido agendada con éxito en Salesforce con tu correo <em>" + emailVal + "</em>.";
        }, 1100);
      }

      function resetSimulatedForm() {
        document.getElementById('form-container').style.display = 'block';
        document.getElementById('success-container').style.display = 'none';
        const submitBtn = document.getElementById('submit-btn-element');
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.innerHTML = '<span>UNIRME AL PARCHE</span>';
      }
    </script>
    
    <!-- BUCHANANS_EMAIL_DATA_START:${metadataElement}:BUCHANANS_EMAIL_DATA_END -->
</body>
</html>`;
}

