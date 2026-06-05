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

export const DEFAULT_EMAIL_VARIABLES: EmailVariables = {
  subject: "Bienvenido a la Familia — Buchanan's",
  logoUrl: "https://lh3.googleusercontent.com/sitesv/AA5AbUDAMWKl4CQDj3m1YdX1HotdzforjPuQW28TyPrLlQaVBk7WiLdvcFlghgpmSnpFlNJDWWvFM7a8aPBi1hFbgLjcYISEBuw8Cx2HGnFKD0aI64cETjxyEpZm1_S5ooXQmnNPpBh_5KVoma96Lbk_pEquomgWEhSLm9xoJ_63phSXbJKDijJzsukz1PNZ3Dt1pdx63PuvrXdO8mmRWE87MMinJ6wDk040uD14DLZ0vWg=w1280", // High-quality white logo placeholder
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

  const type = col.type;
  if (type === 'text') {
    const blockText = col.text || '';
    const processed = blockText.replace('%%FirstName%%', firstName);
    if (col.textStyle === 'eyebrow') {
      const fSize = col.fontSize || '11px';
      return `
      <p style="color:#fffd48; font-size:${fSize}; font-weight:700; letter-spacing:2px; margin:0 0 10px 0; font-family:'Poppins', Arial, sans-serif; text-transform:uppercase; text-align:center;">
        ${processed}
      </p>`;
    } else if (col.textStyle === 'headline') {
      const fSize = col.fontSize || '24px';
      return `
      <h1 style="color:#fffd48; font-size:${fSize}; font-weight:700; margin:0 0 16px 0; font-family:'Poppins', Arial, sans-serif; text-align:center; line-height:1.2;">
        ${processed}
      </h1>`;
    } else {
      const fSize = col.fontSize || '14px';
      return `
      <p style="color:#FFFFFF; font-size:${fSize}; line-height:1.6; margin:0 0 16px 0; font-family:'Poppins', Arial, sans-serif; text-align:center; font-weight:300;">
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
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 16px 0; border-collapse: collapse;">
      <tr>
        <td align="center">
          <img src="${transformImageUrl(col.imageUrl)}" alt="${col.imageAlt || 'Imagen'}" width="${imgWidthAttr}" style="${imgStyle}" />
        </td>
      </tr>
    </table>`;
  } else if (type === 'button-group') {
    return `
    <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 16px auto; border-collapse:collapse;">
      <tr>
        ${(col.buttons || []).map(btn => {
          const btnUrl = mode === 'preview' ? '#button-click-simulation' : btn.url;
          let bgColor = '#fffd48';
          let textColor = '#015D2F';
          let borderStyle = 'none';
          
          if (btn.style === 'outline-yellow') {
            bgColor = '#000000';
            textColor = '#fffd48';
            borderStyle = '1px solid #fffd48';
          } else if (btn.style === 'solid-green') {
            bgColor = '#015D2F';
            textColor = '#FFFFFF';
            borderStyle = 'none';
          } else if (btn.style === 'dark-outline') {
            bgColor = '#000000';
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
  
  let urlLogo = transformImageUrl(vars.logoUrl || "https://lh3.googleusercontent.com/sitesv/AA5AbUDAMWKl4CQDj3m1YdX1HotdzforjPuQW28TyPrLlQaVBk7WiLdvcFlghgpmSnpFlNJDWWvFM7a8aPBi1hFbgLjcYISEBuw8Cx2HGnFKD0aI64cETjxyEpZm1_S5ooXQmnNPpBh_5KVoma96Lbk_pEquomgWEhSLm9xoJ_63phSXbJKDijJzsukz1PNZ3Dt1pdx63PuvrXdO8mmRWE87MMinJ6wDk040uD14DLZ0vWg=w1280");
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
          <td align="center" style="background-color:#000000; padding:32px; border-top:1px solid #222222;" bgcolor="#000000">
            <!-- Disclaimer de marca obligatorio -->
            <p style="color:#888888; font-size:11px; line-height:1.5; margin:0 0 12px 0; font-family:'Poppins', Arial, sans-serif; text-align:center; font-weight:300;">
              ${vars.legalDisclaimer}
            </p>
            <!-- Políticas de Privacidad y desuscripción obligatorias -->
            <p style="color:#888888; font-size:11px; line-height:1.5; margin:0; font-family:'Poppins', Arial, sans-serif; text-align:center; font-weight:300;">
              ${textUnsubscribe}
            </p>
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
 * Generates individual column/block contents cleanly for responsive Web Landings
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

  const type = col.type;
  if (type === 'text') {
    const blockText = col.text || '';
    const processed = blockText.replace('%%FirstName%%', firstName);
    if (col.textStyle === 'eyebrow') {
      const fSize = col.fontSize || '11px';
      return `
      <p style="color:#fffd48; font-size:${fSize}; font-weight:700; letter-spacing:2px; margin:0 0 10px 0; font-family:'Poppins', sans-serif; text-transform:uppercase; text-align:center;">
        ${processed}
      </p>`;
    } else if (col.textStyle === 'headline') {
      const fSize = col.fontSize || '26px';
      return `
      <h2 style="color:#fffd48; font-size:${fSize}; font-weight:800; margin:0 0 16px 0; font-family:'Poppins', sans-serif; text-align:center; line-height:1.2; text-shadow: 0 0 15px rgba(255,253,72,0.15);">
        ${processed}
      </h2>`;
    } else {
      const fSize = col.fontSize || '14px';
      return `
      <p style="color:#E5E5E5; font-size:${fSize}; line-height:1.65; margin:0 0 16px 0; font-family:'Poppins', sans-serif; text-align:center; font-weight:300;">
        ${processed}
      </p>`;
    }
  } else if (type === 'image') {
    if (!col.imageUrl) return '';
    const isFull = col.imageFullWidth;
    const imgWidthAttr = isFull ? '100%' : (col.imageWidth || '450');
    const imgStyle = isFull 
      ? 'display: block; width: 100%; max-width: 100%; height: auto; border: 0; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 10px 25px rgba(0,0,0,0.5);'
      : `display: block; max-width: 100%; width: ${col.imageWidth || '450'}px; height: auto; border: 0; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 10px 25px rgba(0,0,0,0.5);`;
    return `
    <div style="display: flex; justify-content: center; margin: 0 0 16px 0; width: 100%;">
      <img src="${transformImageUrl(col.imageUrl)}" alt="${col.imageAlt || 'Imagen'}" width="${imgWidthAttr}" style="${imgStyle}" />
    </div>`;
  } else if (type === 'button-group') {
    return `
    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin: 0 auto 16px auto; max-width: 100%;">
      ${(col.buttons || []).map(btn => {
        const btnUrl = mode === 'preview' ? '#button-click-simulation' : btn.url;
        let bgColor = '#fffd48';
        let textColor = '#015D2F';
        let borderStyle = 'none';
        
        if (btn.style === 'outline-yellow') {
          bgColor = 'transparent';
          textColor = '#fffd48';
          borderStyle = '1px solid #fffd48';
        } else if (btn.style === 'solid-green') {
          bgColor = '#015D2F';
          textColor = '#FFFFFF';
          borderStyle = '1px solid rgba(255,255,255,0.15)';
        } else if (btn.style === 'dark-outline') {
          bgColor = 'transparent';
          textColor = '#FFFFFF';
          borderStyle = '1px solid #ffffff';
        }
        
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
        <a href="${btnUrl}" 
           class="landing-btn"
           style="display: inline-block; font-family:'Poppins', sans-serif; font-size:${btnFontSize}; font-weight:700; color:${textColor}; text-decoration:none; padding:${btnPadding}; border-radius:50px; text-transform:uppercase; letter-spacing:1px; text-align:center; white-space:nowrap; background-color:${bgColor}; border:${borderStyle}; cursor:pointer; transition: all 0.2s ease-in-out; box-shadow: 0 2px 8px rgba(0,0,0,0.15);"
           onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(255,253,72,0.3)';"
           onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.15)';">
          ${btn.text}
        </a>`;
      }).join('')}
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
  
  let urlLogo = transformImageUrl(vars.logoUrl || "https://lh3.googleusercontent.com/sitesv/AA5AbUDAMWKl4CQDj3m1YdX1HotdzforjPuQW28TyPrLlQaVBk7WiLdvcFlghgpmSnpFlNJDWWvFM7a8aPBi1hFbgLjcYISEBuw8Cx2HGnFKD0aI64cETjxyEpZm1_S5ooXQmnNPpBh_5KVoma96Lbk_pEquomgWEhSLm9xoJ_63phSXbJKDijJzsukz1PNZ3Dt1pdx63PuvrXdO8mmRWE87MMinJ6wDk040uD14DLZ0vWg=w1280");
  let urlTexture = transformImageUrl(vars.backgroundTextureUrl || OFFICIAL_TEXTURE_URL);

  // Compile layout blocks for modern HTML structures
  const compiledBlocksHtml = (vars.blocks || []).map(block => {
    const totalCols = block.columnsCount || (block.columns ? block.columns.length : 1);
    const hasColumns = block.columns && block.columns.length > 0;

    if (block.type === 'columns' || totalCols > 1 || hasColumns) {
      const columnsList = block.columns || [];
      return `
      <!-- Row Section (Columns Count: ${totalCols}) -->
      <div class="landing-grid-${totalCols}" style="margin-bottom: 20px;">
        ${Array.from({ length: totalCols }).map((_, index) => {
          const colItem = columnsList[index] || { id: `col-${index}`, type: 'text', textStyle: 'paragraph', text: 'Escribe contenido aquí...' };
          const renderedContent = renderLandingColumnContent(colItem, mode, firstName);
          return `
          <div class="landing-grid-col">
            ${renderedContent}
          </div>
          `;
        }).join('')}
      </div>
      `;
    } else {
      return renderLandingColumnContent(block, mode, firstName);
    }
  }).join('\n');

  const metadataElement = encodeStateMetadata(vars);

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${vars.subject} — Landing Page Oficial</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap" rel="stylesheet" />
${mode === 'preview' ? `
<script>
  window.onerror = function(message, source, lineno, colno, error) {
    console.warn("[Iframe error caught] message:", message);
    return true;
  };
</script>
` : ''}
<style>
  html, body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background-color: #050505;
    font-family: 'Poppins', sans-serif;
    color: #FFFFFF;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  
  .landing-wrapper {
    background-color: #011d0f;
    background-image: radial-gradient(circle at 50% 15%, rgba(1, 93, 47, 0.45) 0%, rgba(5, 5, 5, 0.98) 75%), url('${urlTexture}');
    background-position: center top;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    min-height: 100vh;
    padding: 40px 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  .nav-header {
    width: 100%;
    max-width: 680px;
    background-color: #015D2F;
    border-radius: 20px;
    padding: 16px 24px;
    box-sizing: border-box;
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 25px -5px rgba(0,0,0,0.4);
  }

  .nav-logo {
    display: block;
    height: 48px;
    width: auto;
  }

  .landing-card {
    max-width: 680px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 28px;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7), 0 0 30px rgba(1, 93, 47, 0.15);
    padding: 44px 32px;
    box-sizing: border-box;
    margin-bottom: 24px;
    backdrop-filter: blur(12px);
  }

  /* CSS Grids for Responsive Columns */
  .landing-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .landing-grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
  }
  .landing-grid-col {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  @media (max-width: 580px) {
    .landing-grid-2, .landing-grid-3 {
      grid-template-columns: 1fr !important;
      gap: 12px;
    }
    .landing-card {
      padding: 30px 16px;
    }
  }

  /* Interactive Registration Form styling */
  .registration-panel {
    width: 100%;
    max-width: 680px;
    background-color: #01140a;
    border: 1px solid rgba(255, 253, 72, 0.15);
    border-radius: 24px;
    padding: 32px 28px;
    box-sizing: border-box;
    margin-bottom: 24px;
    background-image: linear-gradient(135deg, rgba(1, 93, 47, 0.2) 0%, rgba(0, 0, 0, 0.8) 100%);
    box-shadow: 0 15px 35px rgba(0,0,0,0.5);
  }

  .form-title {
    color: #fffd48;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 1.5px;
    margin: 0 0 8px 0;
    text-align: center;
    text-transform: uppercase;
  }
  
  .form-desc {
    color: #cbcbcb;
    font-size: 11.5px;
    line-height: 1.5;
    margin: 0 0 20px 0;
    text-align: center;
  }

  .input-group {
    margin-bottom: 14px;
    display: flex;
    flex-direction: column;
  }

  .input-label {
    font-size: 10px;
    font-weight: 700;
    color: #888888;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 5px;
  }

  .text-input, .select-input {
    background-color: #000000;
    border: 1px solid #1f3a2b;
    border-radius: 10px;
    padding: 10px 12px;
    box-sizing: border-box;
    color: #ffffff;
    font-family: inherit;
    font-size: 12.5px;
    outline: none;
    transition: all 0.2s ease;
  }

  .text-input:focus, .select-input:focus {
    border-color: #fffd48;
    box-shadow: 0 0 8px rgba(255,253,72,0.1);
  }

  .input-row {
    display: flex;
    gap: 12px;
  }

  @media (max-width: 480px) {
    .input-row {
      flex-direction: column;
      gap: 0;
    }
  }

  .checkbox-row {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin: 16px 0;
  }

  .checkbox-row input {
    margin-top: 3px;
    cursor: pointer;
  }

  .checkbox-row label {
    font-size: 10px;
    line-height: 1.4;
    color: #888888;
    cursor: pointer;
  }

  .submit-button {
    width: 100%;
    background-color: #fffd48;
    color: #015D2F;
    border: none;
    border-radius: 50px;
    padding: 13px;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(255,253,72,0.15);
  }

  .submit-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(255,253,72,0.3);
  }

  .submit-button:active {
    transform: translateY(1px);
  }

  /* Confetti checkmark animation */
  .checkmark-circle {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #015D2F;
    display: inline-block;
    position: relative;
    margin-bottom: 12px;
  }
  .checkmark {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    stroke: #fffd48;
    stroke-width: 4;
    stroke-miterlimit: 10;
    box-shadow: inset 0px 0px 0px #015D2F;
    animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out 0s unique;
  }
  .checkmark__check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke .3s cubic-bezier(0.65, 0, 0.45, 1) .6s forwards;
  }
  @keyframes stroke { 100% { stroke-dashoffset: 0; } }

  .success-headline {
    color: #fffd48;
    font-size: 16px;
    font-weight: 800;
    margin: 8px 0;
  }

  .success-subtext {
    font-size: 12px;
    color: #eeeeee;
    line-height: 1.5;
    margin: 0 0 16px 0;
    padding: 0 10px;
  }

  .success-data-box {
    background-color: #000000;
    border: 1px dashed rgba(1, 93, 47, 0.4);
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 8px 16px;
    border-radius: 12px;
    margin-bottom: 20px;
  }

  .data-label {
    font-size: 9px;
    font-weight: 700;
    color: #666666;
  }

  .data-status {
    font-size: 9px;
    font-weight: 800;
    color: #4ade80;
  }

  .back-button {
    background-color: transparent;
    border: 1px solid #1f3a2b;
    color: #cccccc;
    padding: 6px 14px;
    border-radius: 30px;
    font-size: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .back-button:hover {
    color: #ffffff;
    border-color: #fffd48;
  }

  /* Brand Footer warning banner */
  .landing-footer {
    width: 100%;
    max-width: 680px;
    text-align: center;
    background-color: #000000;
    border: 1px solid #111111;
    border-radius: 20px;
    padding: 24px 20px;
    box-sizing: border-box;
  }

  .legal-banner {
    color: #fffd48;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 8px;
    text-transform: uppercase;
  }

  .legal-text {
    color: #888888;
    font-size: 10.5px;
    line-height: 1.5;
    margin: 0 0 12px 0;
  }

  .footer-links {
    font-size: 10px;
    color: #666666;
  }

  .footer-links a {
    color: #888888;
    text-decoration: underline;
    margin: 0 4px;
  }

  .footer-links a:hover {
    color: #ffffff;
  }
</style>
</head>
<body>

<div class="landing-wrapper">

  <!-- BRAND HEADER COMPONENT (Clean Navbar) -->
  <header class="nav-header">
    <img src="${urlLogo}" alt="BUCHANAN'S" class="nav-logo" />
  </header>

  <!-- MAIN LANDING CONTAINER -->
  <main class="landing-card">
    
    <!-- DYNAMIC BLOCKS OF WORKSPACE -->
    ${compiledBlocksHtml}
    
  </main>

  <!-- EXCLUSIVE LEAD REGISTRATION CARD (CloudPages lead capture simulation) -->
  <section class="registration-panel">
    <div id="form-container">
      <h3 class="form-title">REGÍSTRATE EN EL PARRANDÓN Y VIVE LA COPA</h3>
      <p class="form-desc">Completa tus datos para agendar tu parche de celebración y participar por espectaculares pases VIP y botellas oficiales de Buchanan's.</p>
      
      <form id="landing-main-form" action="#" method="${mode === 'preview' ? 'GET' : 'POST'}" onsubmit="handleFormSubmission(event)">
        <div class="input-group">
          <label class="input-label" for="reg-name">Tu nombre completo</label>
          <input type="text" id="reg-name" required value="${firstName}" placeholder="Ej. Andrés González" class="text-input" />
        </div>
        
        <div class="input-group">
          <label class="input-label" for="reg-email">Correo electrónico</label>
          <input type="email" id="reg-email" required value="${mode === 'preview' ? 'andres.gonzalez@ejemplo.com' : '%%emailaddr%%'}" placeholder="nombre@correo.com" class="text-input" />
        </div>

        <div class="input-row">
          <div class="input-group" style="flex: 1;">
            <label class="input-label" for="reg-pref">Preferencia de consumo</label>
            <select id="reg-pref" class="select-input">
              <option value="En Casa" ${vars.testConsumptionPreference === 'En casa' ? 'selected' : ''}>En mi casa (Parrando Buchanita)</option>
              <option value="Bar" ${vars.testConsumptionPreference === 'En bares y locales' ? 'selected' : ''}>En bares y locales (Celebración con amigos)</option>
              <option value="Eventos" ${vars.testConsumptionPreference === 'Eventos VIP' ? 'selected' : ''}>Eventos Especiales y Fan Festivals</option>
            </select>
          </div>
          
          <div class="input-group" style="width: 140px;">
            <label class="input-label" for="reg-city">Ciudad</label>
            <input type="text" id="reg-city" required value="${vars.testCity || 'Bogotá'}" class="text-input" />
          </div>
        </div>

        <div class="checkbox-row">
          <input type="checkbox" id="reg-terms" required checked />
          <label for="reg-terms">Acepto los Términos y Condiciones de uso y Políticas de Privacidad de Diageo Colombia S.A.</label>
        </div>

        <button type="submit" class="submit-button" id="submit-btn-element">
          <span>UNIRME AL PARCHE</span>
        </button>
      </form>
    </div>

    <!-- Success overlay loaded interactively during sandbox simulation -->
    <div id="success-container" style="display:none; text-align: center; padding: 15px 0;">
      <div class="checkmark-circle">
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle cx="26" cy="26" r="25" fill="none" style="stroke:#015D2F; stroke-width:4;" />
          <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" style="stroke:#fffd48; stroke-width:4;" />
        </svg>
      </div>
      <h4 class="success-headline">¡SABOR REGISTRADO EXITOSAMENTE!</h4>
      <p class="success-subtext" id="success-message-text">Tu parche ha sido confirmado.</p>
      <div class="success-data-box">
        <span class="data-label">DATA EXTENSION LINKED</span>
        <span class="data-status">✓ SYNCED SFMC</span>
      </div>
      <div>
        <button type="button" class="back-button" onclick="resetSimulatedForm()">Registrar otra preferencia</button>
      </div>
    </div>
  </section>

  <!-- MANDATORY CAMPAIGN DRINK WITH RESPONSIBILITY LEGAL FOOTER (Colombia Specific rules) -->
  <footer class="landing-footer">
    <p class="legal-banner">DIAGEO TE INVITA A DISFRUTAR CON RESPONSABILIDAD</p>
    <p class="legal-text">${vars.legalDisclaimer}</p>
    <div class="footer-links">
      <a href="https://www.diageo.com" target="_blank">Políticas de Diageo</a> • 
      <a href="https://www.drinkiq.com" target="_blank">DrinkiQ.com</a> • 
      <a href="#terminos">Términos y Condiciones</a>
    </div>
  </footer>

</div>

<!-- Interactive simulation handlers for live plays -->
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
