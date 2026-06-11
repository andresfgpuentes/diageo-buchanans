/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from "react";
import {
  EmailVariables,
  EmailBlock,
  ColumnContent,
  ButtonConfig,
} from "../types";
import {
  Edit3,
  RotateCcw,
  Link2,
  Image,
  Sparkles,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Plus,
  Type,
  ExternalLink,
  Upload,
  Layers,
  HelpCircle,
  FileCode,
  ClipboardList,
} from "lucide-react";
import {
  DEFAULT_EMAIL_VARIABLES,
  OFFICIAL_TEXTURE_URL,
} from "../utils/htmlGenerator";

interface EmailFormProps {
  variables: EmailVariables;
  onChange: (vars: EmailVariables) => void;
  contentType?: 'email' | 'landing';
  brand?: 'buchanans' | 'smirnoff' | 'donjulio' | 'johnniewalker';
}

const BRAND_PRESET_COLORS = {
  buchanans: [
    { name: "Verde Exuberante", hex: "#015D2F" },
    { name: "Pistacho / Amarillo", hex: "#fffd48" },
    { name: "Verde Brillo", hex: "#119e20" },
    { name: "Negro", hex: "#000000" },
    { name: "Sello Rojo Seal", hex: "#cc0000" },
    { name: "Blanco", hex: "#FFFFFF" }
  ],
  smirnoff: [
    { name: "Rojo Smirnoff", hex: "#DA0022" },
    { name: "Amarillo Spicy", hex: "#FFED00" },
    { name: "Rojo Profundo", hex: "#8E0019" },
    { name: "Banda Legal", hex: "#B00020" },
    { name: "Blanco", hex: "#FFFFFF" },
    { name: "Negro", hex: "#000000" }
  ],
  donjulio: [
    { name: "Lienzo Stone", hex: "#E4E2DB" },
    { name: "Fondo Arena", hex: "#D6D3C9" },
    { name: "Talavera Blue", hex: "#0055C8" },
    { name: "Dorado Premium", hex: "#d4af37" },
    { name: "Jalisco Orange", hex: "#F47521" },
    { name: "Horno Black", hex: "#000000" },
    { name: "Blanco", hex: "#FFFFFF" }
  ],
  johnniewalker: [
    { name: "Azul Cobalto", hex: "#0033A0" },
    { name: "Dorado Líquido (Gold)", hex: "#C5A059" },
    { name: "Colección Lujo", hex: "#000040" },
    { name: "Azul Oscuro Absoluto", hex: "#000020" },
    { name: "Blanco", hex: "#FFFFFF" },
    { name: "Negro", hex: "#000000" }
  ]
};

export function EmailForm({ variables, onChange, contentType = 'email', brand = 'buchanans' }: EmailFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);
  const [activeColDropdown, setActiveColDropdown] = useState<{
    blockId: string;
    colIdx: number;
  } | null>(null);

  // Helper to obtain columns for a block, dynamically fallback if not configured yet
  const getBlockColumns = (block: EmailBlock): ColumnContent[] => {
    if (block.columns && block.columns.length > 0) {
      return block.columns;
    }
    return [
      {
        id: `col-${block.id}-default`,
        type: (block.type === "columns" || block.type === "form") ? "text" : block.type,
        textStyle: block.textStyle || "paragraph",
        text: block.text || "",
        fontSize: block.fontSize,
        imageUrl: block.imageUrl,
        imageAlt: block.imageAlt,
        imageWidth: block.imageWidth,
        imageFullWidth: block.imageFullWidth,
        buttons: block.buttons || [],
        items: block.items || [],
      },
    ];
  };

  // Helper to update a specific item within a column
  const handleUpdateColumnItem = (
    blockId: string,
    colIdx: number,
    itemIdx: number,
    updatedFields: Partial<ColumnContent>,
  ) => {
    const block = (variables.blocks || []).find((b) => b.id === blockId);
    if (!block) return;

    const blockCols = [...getBlockColumns(block)];
    const colItem = blockCols[colIdx];
    if (!colItem) return;

    // Get current items
    const currentItems =
      colItem.items && colItem.items.length > 0
        ? [...colItem.items]
        : [
            {
              id: `col-item-${colItem.id || 'default'}-0`,
              type: colItem.type || "text",
              textStyle: colItem.textStyle || "paragraph",
              text: colItem.text || "",
              fontSize: colItem.fontSize,
              imageUrl: colItem.imageUrl,
              imageAlt: colItem.imageAlt,
              imageWidth: colItem.imageWidth,
              imageFullWidth: colItem.imageFullWidth,
              buttons: colItem.buttons || [],
            },
          ];

    currentItems[itemIdx] = { ...currentItems[itemIdx], ...updatedFields };

    blockCols[colIdx] = {
      ...colItem,
      items: currentItems,
      // Sync first item for legacy backwards-compatibility
      type: currentItems[0].type || "text",
      text: currentItems[0].text,
      textStyle: currentItems[0].textStyle,
      fontSize: currentItems[0].fontSize,
      imageUrl: currentItems[0].imageUrl,
      imageAlt: currentItems[0].imageAlt,
      imageWidth: currentItems[0].imageWidth,
      imageFullWidth: currentItems[0].imageFullWidth,
      buttons: currentItems[0].buttons,
    };

    const updatedBlockFields: Partial<EmailBlock> = {
      columns: blockCols,
      columnsCount: blockCols.length,
    };

    if (blockCols.length === 1 && currentItems.length > 0) {
      updatedBlockFields.text = currentItems[0].text;
      updatedBlockFields.textStyle = currentItems[0].textStyle;
      updatedBlockFields.fontSize = currentItems[0].fontSize;
      updatedBlockFields.imageUrl = currentItems[0].imageUrl;
      updatedBlockFields.imageAlt = currentItems[0].imageAlt;
      updatedBlockFields.imageWidth = currentItems[0].imageWidth;
      updatedBlockFields.imageFullWidth = currentItems[0].imageFullWidth;
      updatedBlockFields.buttons = currentItems[0].buttons;
    }

    handleUpdateBlock(blockId, updatedBlockFields);
  };

  const handleAddColumnItem = (
    blockId: string,
    colIdx: number,
    type: "text" | "image" | "button-group" | "custom-code",
  ) => {
    const block = (variables.blocks || []).find((b) => b.id === blockId);
    if (!block) return;

    const blockCols = [...getBlockColumns(block)];
    const colItem = blockCols[colIdx];
    if (!colItem) return;

    const currentItems =
      colItem.items && colItem.items.length > 0
        ? [...colItem.items]
        : [
            {
              id: `col-item-${colItem.id || 'default'}-0`,
              type: colItem.type || "text",
              textStyle: colItem.textStyle || "paragraph",
              text: colItem.text || "",
              fontSize: colItem.fontSize,
              imageUrl: colItem.imageUrl,
              imageAlt: colItem.imageAlt,
              imageWidth: colItem.imageWidth,
              imageFullWidth: colItem.imageFullWidth,
              buttons: colItem.buttons || [],
              customHtml: colItem.customHtml,
            },
          ];

    let newItem: any;
    if (type === "text") {
      newItem = {
        id: `item-${Date.now()}-${currentItems.length}`,
        type: "text",
        textStyle: "paragraph",
        text: "Escribe más texto aquí...",
        fontSize: "",
      };
    } else if (type === "image") {
      newItem = {
        id: `item-${Date.now()}-${currentItems.length}`,
        type: "image",
        imageUrl:
          "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
        imageWidth: "200",
        imageAlt: "Imagen",
      };
    } else if (type === "custom-code") {
      newItem = {
        id: `item-${Date.now()}-${currentItems.length}`,
        type: "custom-code",
        customHtml: `<div class="p-4 bg-lime-950/20 border border-yellow-400/20 text-center text-white rounded">
  Componente Personalizado
</div>`,
      };
    } else {
      newItem = {
        id: `item-${Date.now()}-${currentItems.length}`,
        type: "button-group",
        buttons: [
          {
            id: `btn-${Date.now()}`,
            text: "BOTÓN NUEVO",
            url: "%%URL%%",
            style: "solid-yellow",
          },
        ],
      };
    }

    currentItems.push(newItem);

    blockCols[colIdx] = {
      ...colItem,
      items: currentItems,
      type: currentItems[0].type || "text",
      text: currentItems[0].text,
      textStyle: currentItems[0].textStyle,
      fontSize: currentItems[0].fontSize,
      imageUrl: currentItems[0].imageUrl,
      imageAlt: currentItems[0].imageAlt,
      imageWidth: currentItems[0].imageWidth,
      imageFullWidth: currentItems[0].imageFullWidth,
      buttons: currentItems[0].buttons,
      customHtml: currentItems[0].customHtml,
    };

    const updatedBlockFields: Partial<EmailBlock> = {
      columns: blockCols,
      columnsCount: blockCols.length,
    };

    if (blockCols.length === 1 && currentItems.length > 0) {
      updatedBlockFields.text = currentItems[0].text;
      updatedBlockFields.textStyle = currentItems[0].textStyle;
      updatedBlockFields.fontSize = currentItems[0].fontSize;
      updatedBlockFields.imageUrl = currentItems[0].imageUrl;
      updatedBlockFields.imageAlt = currentItems[0].imageAlt;
      updatedBlockFields.imageWidth = currentItems[0].imageWidth;
      updatedBlockFields.imageFullWidth = currentItems[0].imageFullWidth;
      updatedBlockFields.buttons = currentItems[0].buttons;
      updatedBlockFields.customHtml = currentItems[0].customHtml;
    }

    handleUpdateBlock(blockId, updatedBlockFields);
    setActiveColDropdown(null);
  };

  const handleDeleteColumnItem = (
    blockId: string,
    colIdx: number,
    itemIdx: number,
  ) => {
    const block = (variables.blocks || []).find((b) => b.id === blockId);
    if (!block) return;

    const blockCols = [...getBlockColumns(block)];
    const colItem = blockCols[colIdx];
    if (!colItem) return;

    const currentItems =
      colItem.items && colItem.items.length > 0
        ? [...colItem.items]
        : [
            {
              id: `col-item-${colItem.id || 'default'}-0`,
              type: colItem.type || "text",
              textStyle: colItem.textStyle || "paragraph",
              text: colItem.text || "",
              fontSize: colItem.fontSize,
              imageUrl: colItem.imageUrl,
              imageAlt: colItem.imageAlt,
              imageWidth: colItem.imageWidth,
              imageFullWidth: colItem.imageFullWidth,
              buttons: colItem.buttons || [],
            },
          ];

    if (currentItems.length <= 1) return; // Must have at least 1 element

    currentItems.splice(itemIdx, 1);

    blockCols[colIdx] = {
      ...colItem,
      items: currentItems,
      type: currentItems[0].type || "text",
      text: currentItems[0].text,
      textStyle: currentItems[0].textStyle,
      fontSize: currentItems[0].fontSize,
      imageUrl: currentItems[0].imageUrl,
      imageAlt: currentItems[0].imageAlt,
      imageWidth: currentItems[0].imageWidth,
      imageFullWidth: currentItems[0].imageFullWidth,
      buttons: currentItems[0].buttons,
    };

    const updatedBlockFields: Partial<EmailBlock> = {
      columns: blockCols,
      columnsCount: blockCols.length,
    };

    if (blockCols.length === 1 && currentItems.length > 0) {
      updatedBlockFields.text = currentItems[0].text;
      updatedBlockFields.textStyle = currentItems[0].textStyle;
      updatedBlockFields.fontSize = currentItems[0].fontSize;
      updatedBlockFields.imageUrl = currentItems[0].imageUrl;
      updatedBlockFields.imageAlt = currentItems[0].imageAlt;
      updatedBlockFields.imageWidth = currentItems[0].imageWidth;
      updatedBlockFields.imageFullWidth = currentItems[0].imageFullWidth;
      updatedBlockFields.buttons = currentItems[0].buttons;
    }

    handleUpdateBlock(blockId, updatedBlockFields);
  };

  const handleMoveColumnItem = (
    blockId: string,
    colIdx: number,
    itemIdx: number,
    direction: "up" | "down",
  ) => {
    const block = (variables.blocks || []).find((b) => b.id === blockId);
    if (!block) return;

    const blockCols = [...getBlockColumns(block)];
    const colItem = blockCols[colIdx];
    if (!colItem) return;

    const currentItems =
      colItem.items && colItem.items.length > 0
        ? [...colItem.items]
        : [
            {
              id: `col-item-${colItem.id || 'default'}-0`,
              type: colItem.type || "text",
              textStyle: colItem.textStyle || "paragraph",
              text: colItem.text || "",
              fontSize: colItem.fontSize,
              imageUrl: colItem.imageUrl,
              imageAlt: colItem.imageAlt,
              imageWidth: colItem.imageWidth,
              imageFullWidth: colItem.imageFullWidth,
              buttons: colItem.buttons || [],
            },
          ];

    const targetIdx = direction === "up" ? itemIdx - 1 : itemIdx + 1;
    if (targetIdx < 0 || targetIdx >= currentItems.length) return;

    const temp = currentItems[itemIdx];
    currentItems[itemIdx] = currentItems[targetIdx];
    currentItems[targetIdx] = temp;

    blockCols[colIdx] = {
      ...colItem,
      items: currentItems,
      type: currentItems[0].type || "text",
      text: currentItems[0].text,
      textStyle: currentItems[0].textStyle,
      fontSize: currentItems[0].fontSize,
      imageUrl: currentItems[0].imageUrl,
      imageAlt: currentItems[0].imageAlt,
      imageWidth: currentItems[0].imageWidth,
      imageFullWidth: currentItems[0].imageFullWidth,
      buttons: currentItems[0].buttons,
    };

    const updatedBlockFields: Partial<EmailBlock> = {
      columns: blockCols,
      columnsCount: blockCols.length,
    };

    if (blockCols.length === 1 && currentItems.length > 0) {
      updatedBlockFields.text = currentItems[0].text;
      updatedBlockFields.textStyle = currentItems[0].textStyle;
      updatedBlockFields.fontSize = currentItems[0].fontSize;
      updatedBlockFields.imageUrl = currentItems[0].imageUrl;
      updatedBlockFields.imageAlt = currentItems[0].imageAlt;
      updatedBlockFields.imageWidth = currentItems[0].imageWidth;
      updatedBlockFields.imageFullWidth = currentItems[0].imageFullWidth;
      updatedBlockFields.buttons = currentItems[0].buttons;
    }

    handleUpdateBlock(blockId, updatedBlockFields);
  };

  const handleAdjustPadding = (
    blockId: string,
    colIdx: number,
    itemIdx: number,
    dir: "up" | "down" | "left" | "right" | "reset",
  ) => {
    const block = (variables.blocks || []).find((b) => b.id === blockId);
    if (!block) return;
    const blockCols = [...getBlockColumns(block)];
    const colItem = blockCols[colIdx];
    if (!colItem) return;
    const currentItems =
      colItem.items && colItem.items.length > 0 ? [...colItem.items] : [];
    const item = currentItems[itemIdx];
    if (!item) return;

    let pTop = item.paddingTop !== undefined ? item.paddingTop : 0;
    let pBottom = item.paddingBottom !== undefined ? item.paddingBottom : 16;
    let pLeft = item.paddingLeft !== undefined ? item.paddingLeft : 0;
    let pRight = item.paddingRight !== undefined ? item.paddingRight : 0;

    if (dir === "up") {
      pTop = Math.max(0, pTop + 4);
    } else if (dir === "down") {
      pBottom = Math.max(0, pBottom + 4);
    } else if (dir === "left") {
      pLeft = Math.max(0, pLeft + 4);
    } else if (dir === "right") {
      pRight = Math.max(0, pRight + 4);
    } else if (dir === "reset") {
      pTop = 0;
      pBottom = 16;
      pLeft = 0;
      pRight = 0;
    }

    handleUpdateColumnItem(blockId, colIdx, itemIdx, {
      paddingTop: pTop,
      paddingBottom: pBottom,
      paddingLeft: pLeft,
      paddingRight: pRight,
    });
  };

  const handleFieldChange = (key: keyof EmailVariables, value: any) => {
    onChange({
      ...variables,
      [key]: value,
    });
  };

  const handleReset = () => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres restablecer los valores originales del correo de Buchanan's? El editor volverá a la estructura de bloques de ejemplo.",
      )
    ) {
      onChange({ ...DEFAULT_EMAIL_VARIABLES });
      setImportStatus(null);
    }
  };

  const handleRestoreTexture = () => {
    handleFieldChange("backgroundTextureUrl", OFFICIAL_TEXTURE_URL);
  };

  // --- HTML Import and Reconstruction system ---
  const handleImportHtmlClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) return;

      // Extract metadata tag
      const match = content.match(
        /<!-- BUCHANANS_EMAIL_DATA_START:(.*?):BUCHANANS_EMAIL_DATA_END -->/,
      );
      if (match && match[1]) {
        try {
          // Decode Base64 safely supporting UTF-8 accents
          const jsonStr = decodeURIComponent(escape(atob(match[1].trim())));
          const importedVars = JSON.parse(jsonStr) as EmailVariables;

          onChange(importedVars);
          setImportStatus({
            success: true,
            message: `¡Correo "${importedVars.subject}" importado con éxito! Se restauraron ${importedVars.blocks?.length || 0} bloques reordenables.`,
          });
        } catch (err) {
          setImportStatus({
            success: false,
            message:
              "Error al descodificar la firma digital de datos. El archivo podría estar dañado.",
          });
        }
      } else {
        // Fallback: Check if it's a raw JSON backup
        try {
          const parsed = JSON.parse(content) as EmailVariables;
          if (
            parsed &&
            typeof parsed === "object" &&
            parsed.subject &&
            parsed.blocks
          ) {
            onChange(parsed);
            setImportStatus({
              success: true,
              message: "¡Copia de respaldo JSON cargada correctamente!",
            });
            return;
          }
        } catch (_) {}

        setImportStatus({
          success: false,
          message:
            "No se encontró la firma digital de Buchanan's en este archivo. Asegúrate de importar un archivo .html exportado por este constructor.",
        });
      }
    };
    reader.readAsText(file);
    // Reset file input value so same file can be selected again
    e.target.value = "";
  };

  // --- Dynamic Block Manager Helpers ---
  const handleAddBlock = (
    type: "text" | "image" | "button-group" | "columns" | "custom-code" | "form",
  ) => {
    const newId = `block-${Date.now()}`;
    let newBlock: EmailBlock;

    if (type === "text") {
      newBlock = {
        id: newId,
        type: "text",
        textStyle: "paragraph",
        text: "Escribe tu nuevo texto corporativo aquí.",
      };
    } else if (type === "image") {
      newBlock = {
        id: newId,
        type: "image",
        imageUrl:
          "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
        imageAlt: "Nueva Imagen de Campaña",
        imageWidth: "536",
      };
    } else if (type === "button-group") {
      newBlock = {
        id: newId,
        type: "button-group",
        buttons: [
          {
            id: `btn-${Date.now()}-1`,
            text: "MÁS INFORMACIÓN",
            url: "%%URL_NUEVA%%",
            style: "solid-yellow",
          },
        ],
      };
    } else if (type === "custom-code") {
      newBlock = {
        id: newId,
        type: "custom-code",
        customHtml: `<!-- Sección Personalizada Full Width por el usuario -->
<section class="w-full py-16 px-4 md:px-8 mt-12 bg-zinc-950/40 border border-emerald-500/10 rounded-3xl" style="width: 100%; box-sizing: border-box;">
  <div class="max-w-4xl mx-auto text-center">
    <p class="text-xs font-bold tracking-[3px] text-yellow-400 uppercase mb-3">MÁS ACTIVACIONES</p>
    <h2 class="text-2xl md:text-4xl font-bold text-white uppercase mb-4">ESPACIO EXPERIMENTAL</h2>
    <p class="text-neutral-300 font-light text-sm md:text-base max-w-xl mx-auto mb-8">
      Este es un componente personalizado insertado de forma completamente elástica en la landing page.
    </p>
    <a href="#" class="inline-block px-8 py-3 bg-yellow-400 hover:bg-yellow-350 text-black font-bold rounded-full transition-transform hover:scale-105 uppercase text-xs tracking-wider font-sans">
      EXPLORALAS AQUÍ
    </a>
  </div>
</section>`,
      };
    } else if (type === "form") {
      newBlock = {
        id: newId,
        type: "form",
      };
    } else {
      // 2 Columns default block
      newBlock = {
        id: newId,
        type: "columns",
        columnsCount: 2,
        columns: [
          {
            id: `col-${Date.now()}-1`,
            type: "text",
            textStyle: "paragraph",
            text: "<strong>Columna Izquierda:</strong> Diseños de doble columna ideales para activaciones geográficas.",
          },
          {
            id: `col-${Date.now()}-2`,
            type: "text",
            textStyle: "paragraph",
            text: "<strong>Columna Derecha:</strong> Mueve tus composiciones y ajusta el contenido.",
          },
        ],
      };
    }

    handleFieldChange("blocks", [...(variables.blocks || []), newBlock]);
  };

  const handleDeleteBlock = (id: string) => {
    const newBlocks = (variables.blocks || []).filter(
      (block) => block.id !== id,
    );
    handleFieldChange("blocks", newBlocks);
  };

  const handleMoveBlockUp = (index: number) => {
    if (index === 0) return;
    const newBlocks = [...(variables.blocks || [])];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[index - 1];
    newBlocks[index - 1] = temp;
    handleFieldChange("blocks", newBlocks);
  };

  const handleMoveBlockDown = (index: number) => {
    if (!variables.blocks || index === variables.blocks.length - 1) return;
    const newBlocks = [...variables.blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[index + 1];
    newBlocks[index + 1] = temp;
    handleFieldChange("blocks", newBlocks);
  };

  const handleUpdateBlock = (
    id: string,
    updatedFields: Partial<EmailBlock>,
  ) => {
    const newBlocks = (variables.blocks || []).map((b) => {
      if (b.id === id) {
        return { ...b, ...updatedFields };
      }
      return b;
    });
    handleFieldChange("blocks", newBlocks);
  };

  // Switch column layouts and keep old values when possible
  const handleUpdateBlockColumnsCount = (block: EmailBlock, count: number) => {
    const currentCols = block.columns || [];
    let updatedCols: ColumnContent[] = [...currentCols];

    if (updatedCols.length === 0) {
      // Preserve single-column standard data as Column 1 instead of deleting user edits!
      updatedCols = [
        {
          id: `col-orig-${Date.now()}`,
          type: (block.type === "columns" || block.type === "form") ? "text" : block.type,
          textStyle: block.textStyle || "paragraph",
          text: block.text || "Contenido inicial migrado.",
          imageUrl: block.imageUrl,
          imageAlt: block.imageAlt,
          imageWidth: block.imageWidth,
          buttons: block.buttons || [],
        },
      ];
    }

    if (count > updatedCols.length) {
      // Add more default columns
      for (let i = updatedCols.length; i < count; i++) {
        updatedCols.push({
          id: `col-new-${Date.now()}-${i}`,
          type: "text",
          textStyle: "paragraph",
          text: `Contenido Columna ${i + 1}`,
          imageUrl:
            "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
          imageAlt: "Imagen default",
          imageWidth: "200",
        });
      }
    } else if (count < updatedCols.length) {
      // Trim columns
      updatedCols = updatedCols.slice(0, count);
    }

    handleUpdateBlock(block.id, {
      type: "columns",
      columnsCount: count,
      columns: updatedCols,
    });
  };

  // Move individual columns left or right (Left-to-right alignment and ordering!)
  const handleMoveColumnInBlock = (
    blockId: string,
    colIndex: number,
    direction: "left" | "right",
  ) => {
    const block = (variables.blocks || []).find((b) => b.id === blockId);
    if (!block || !block.columns) return;

    const newCols = [...block.columns];
    const targetIdx = direction === "left" ? colIndex - 1 : colIndex + 1;

    if (targetIdx < 0 || targetIdx >= newCols.length) return;

    const temp = newCols[colIndex];
    newCols[colIndex] = newCols[targetIdx];
    newCols[targetIdx] = temp;

    handleUpdateBlock(blockId, { columns: newCols });
  };

  // --- Format inline text tailors ---
  const applyColumnTextFormat = (
    blockId: string,
    colIdx: number,
    tagStart: string,
    tagEnd: string,
  ) => {
    const element = document.getElementById(
      `editor-${blockId}-col-${colIdx}`,
    ) as HTMLTextAreaElement | null;
    if (!element) return;

    const start = element.selectionStart || 0;
    const end = element.selectionEnd || 0;

    const blockIndex = (variables.blocks || []).findIndex(
      (b) => b.id === blockId,
    );
    if (blockIndex === -1) return;

    const currentBlock = variables.blocks[blockIndex];
    const columnList = currentBlock.columns || [];
    const currentCol = columnList[colIdx];
    if (!currentCol) return;

    const textVal = currentCol.text || "";
    const selectedText = textVal.substring(start, end);
    const defaultValue = currentCol.textStyle === "eyebrow" ? "TEXTO" : "texto";
    const replacement = tagStart + (selectedText || defaultValue) + tagEnd;
    const newValue =
      textVal.substring(0, start) + replacement + textVal.substring(end);

    const updatedCols = [...columnList];
    updatedCols[colIdx] = { ...currentCol, text: newValue };

    handleUpdateBlock(blockId, { columns: updatedCols });

    setTimeout(() => {
      element.focus();
      const newCursorPos = start + tagStart.length;
      element.setSelectionRange(
        newCursorPos,
        newCursorPos +
          (selectedText ? selectedText.length : defaultValue.length),
      );
    }, 50);
  };

  const applySingleBlockFormat = (
    blockId: string,
    tagStart: string,
    tagEnd: string,
  ) => {
    const element = document.getElementById(
      `editor-${blockId}`,
    ) as HTMLTextAreaElement | null;
    if (!element) return;

    const start = element.selectionStart || 0;
    const end = element.selectionEnd || 0;

    const blockIndex = (variables.blocks || []).findIndex(
      (b) => b.id === blockId,
    );
    if (blockIndex === -1) return;

    const currentBlock = variables.blocks[blockIndex];
    const text = currentBlock.text || "";

    const selectedText = text.substring(start, end);
    const defaultValue =
      currentBlock.textStyle === "eyebrow" ? "TEXTO" : "texto";
    const replacement = tagStart + (selectedText || defaultValue) + tagEnd;
    const newValue =
      text.substring(0, start) + replacement + text.substring(end);

    handleUpdateBlock(blockId, { text: newValue });

    setTimeout(() => {
      element.focus();
      const newCursorPos = start + tagStart.length;
      element.setSelectionRange(
        newCursorPos,
        newCursorPos +
          (selectedText ? selectedText.length : defaultValue.length),
      );
    }, 50);
  };

  // Format Toolbar
  const TextFormatToolbar = ({
    blockId,
    colIdx,
  }: {
    blockId: string;
    colIdx?: number;
  }) => (
    <div className="flex flex-wrap items-center gap-1.5 p-2 bg-neutral-950 border border-neutral-800 rounded-t-lg border-b-0">
      <button
        type="button"
        onClick={() =>
          colIdx !== undefined
            ? applyColumnTextFormat(blockId, colIdx, "<strong>", "</strong>")
            : applySingleBlockFormat(blockId, "<strong>", "</strong>")
        }
        className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850 rounded text-xs font-bold font-mono text-neutral-300 hover:text-white transition-colors"
        title="Negrita (<strong>)"
      >
        N
      </button>
      <button
        type="button"
        onClick={() =>
          colIdx !== undefined
            ? applyColumnTextFormat(blockId, colIdx, "<em>", "</em>")
            : applySingleBlockFormat(blockId, "<em>", "</em>")
        }
        className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850 rounded text-xs italic font-mono text-neutral-300 hover:text-white transition-colors"
        title="Cursiva (<em>)"
      >
        K
      </button>
      <div className="h-4 w-px bg-neutral-800 my-0.5 mx-0.5"></div>

      <span className="text-[10px] text-neutral-500 mr-1 uppercase tracking-wider font-semibold">
        Color:
      </span>
      {(BRAND_PRESET_COLORS[brand] || BRAND_PRESET_COLORS.buchanans).map((c) => (
        <button
          key={c.hex}
          type="button"
          onClick={() =>
            colIdx !== undefined
              ? applyColumnTextFormat(
                  blockId,
                  colIdx,
                  `<span style="color:${c.hex};">`,
                  "</span>",
                )
              : applySingleBlockFormat(
                  blockId,
                  `<span style="color:${c.hex};">`,
                  "</span>",
                )
          }
          className="w-3.5 h-3.5 rounded-full border border-neutral-700 hover:scale-110 transition-transform"
          style={{ backgroundColor: c.hex }}
          title={`${c.name} (${c.hex})`}
        />
      ))}
    </div>
  );

  const isLanding = contentType === 'landing';

  return (
    <div
      className={`border rounded-2xl p-6 text-white space-y-6 transition-all duration-300 animate-fadeIn ${
        isLanding 
          ? "bg-gradient-to-br from-neutral-900 to-neutral-950 border-[#015D2F]/40 shadow-[0_4px_35px_rgba(1,93,47,0.15)]"
          : "bg-neutral-900 border-neutral-800 shadow-2xl"
      }`}
      id="email-form"
    >
      {/* Header with Import Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-4 gap-3">
        <div className="flex items-center space-x-3">
          <Edit3 className={`w-6 h-6 shrink-0 ${isLanding ? 'text-[#fffd48]' : 'text-emerald-400'}`} />
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-black tracking-tight text-white uppercase">
                {isLanding ? "Constructor de Landings" : "Constructor de Mails"}
              </h2>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono ${
                isLanding 
                  ? "bg-yellow-950/70 border border-yellow-900/30 text-yellow-400"
                  : "bg-emerald-950/70 border border-emerald-900/30 text-[#fffd48]"
              }`}>
                {isLanding ? "Web Mode" : "CRM Safe Mode"}
              </span>
            </div>
            <p className="text-xs text-neutral-450 mt-0.5">
              {isLanding 
                ? "Diseño web flexible, grillas adaptativas y componentes personalizados de código" 
                : "Estructuras de tablas HTML 100% compatibles con Salesforce CRM"}
            </p>
          </div>
        </div>

        {/* Quick Utilities Header */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* File Input for HTML restoration */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".html,.json"
            className="hidden"
          />
          <button
            type="button"
            onClick={handleImportHtmlClick}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-950/40 hover:bg-emerald-900/50 text-xs font-bold rounded-lg text-emerald-400 transition-colors border border-emerald-900/40 cursor-pointer"
            title="Importar un correo previamente descargado para continuar editándolo"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Modificar Descargado</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center space-x-1 px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold rounded-lg text-neutral-400 hover:text-white transition-colors border border-neutral-700 cursor-pointer"
            title="Restablecer maqueta de ejemplo"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {importStatus && (
        <div
          className={`p-4 rounded-xl text-xs flex items-start space-x-2 border animate-fadeIn ${
            importStatus.success
              ? "bg-emerald-950/20 border-emerald-900/40 text-emerald-300"
              : "bg-red-950/20 border-red-900/40 text-red-300"
          }`}
        >
          <FileCode className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold block mb-0.5">
              {importStatus.success
                ? "Estado: Importación Exitosa"
                : "Estado: Error al importar"}
            </span>
            <p className="leading-relaxed opacity-90">{importStatus.message}</p>
          </div>
          <button
            onClick={() => setImportStatus(null)}
            className="text-[10px] font-bold underline text-neutral-400 hover:text-white"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Primary fields form */}
      <div className="space-y-5">
        {/* Subject Line & Texture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-yellow-400 uppercase tracking-wider mb-1.5">
              {isLanding ? "Título de la Landing Page (Page Title)" : "Asunto del Email (Subject Line)"}
            </label>
            <input
              type="text"
              value={variables.subject}
              onChange={(e) => handleFieldChange("subject", e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-yellow-400 transition-colors"
              placeholder={isLanding ? "Ej. Ruta Buchanita - Copa Mundial FIFA 26™ | Buchanan's" : "Asunto para el bucle de envío"}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-yellow-400 uppercase tracking-wider">
                Fondo de Contenedor (Official Texture)
              </label>
              <button
                onClick={handleRestoreTexture}
                className="text-[10px] text-emerald-400 hover:underline"
              >
                Textura Palma Oficial
              </button>
            </div>
            <input
              type="text"
              value={variables.backgroundTextureUrl}
              onChange={(e) =>
                handleFieldChange("backgroundTextureUrl", e.target.value)
              }
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-yellow-400 transition-colors font-mono"
              placeholder="URL de la textura"
            />
          </div>
        </div>

        {/* Brand Header Logo Config */}
        <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-850">
          <div className="flex items-center space-x-2 text-yellow-400 border-b border-neutral-850 pb-2 mb-3">
            <Link2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wide text-neutral-200">
              Identidad de Cabecera
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 text-xs">
            <div>
              <label className="block text-neutral-400 mb-1">
                URL Logo Corporativo (Cabecera Verde Oficial)
              </label>
              <input
                type="text"
                value={variables.logoUrl}
                onChange={(e) => handleFieldChange("logoUrl", e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-400 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Color override controllers section */}
        <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-850 space-y-4">
          <div className="flex items-center space-x-2 text-yellow-400 border-b border-neutral-850 pb-2 mb-1">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wide text-neutral-200">
              Personalización de Estructura (Colores)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Header/Logo Bar Background Color Option */}
            <div className="space-y-2">
              <label className="block font-semibold text-neutral-400">
                Fondo de la Barra de Logo (Cabezote)
              </label>
              
              {/* Presets */}
              <div className="flex flex-wrap gap-1.5">
                {(BRAND_PRESET_COLORS[brand] || BRAND_PRESET_COLORS.buchanans).map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    title={c.name}
                    onClick={() => handleFieldChange("headerBgColor", c.hex)}
                    className={`w-6 h-6 rounded-md border ${variables.headerBgColor === c.hex ? 'border-yellow-450 ring-1 ring-yellow-450' : 'border-neutral-800'} transition-all`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => handleFieldChange("headerBgColor", undefined)}
                  className={`text-[9px] px-2 py-1 rounded bg-neutral-900 border ${!variables.headerBgColor ? 'border-yellow-400 text-yellow-400' : 'border-neutral-800 text-neutral-400'} hover:text-white transition-colors cursor-pointer`}
                >
                  Restaurar Original
                </button>
              </div>

              {/* Custom Hex Selector */}
              <div className="relative">
                <input
                  type="text"
                  value={variables.headerBgColor || ""}
                  onChange={(e) => handleFieldChange("headerBgColor", e.target.value || undefined)}
                  className="w-full bg-neutral-900 border border-neutral-850 rounded-lg px-2.5 py-1.5 pl-8 text-xs text-white focus:outline-none focus:border-yellow-400 font-mono"
                  placeholder={`Ej: ${(BRAND_PRESET_COLORS[brand]?.[0]?.hex) || "#015D2F"}`}
                />
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded border border-neutral-700 overflow-hidden flex items-center justify-center">
                  <input
                    type="color"
                    value={variables.headerBgColor && variables.headerBgColor.startsWith("#") && variables.headerBgColor.length === 7 ? variables.headerBgColor : ((BRAND_PRESET_COLORS[brand]?.[0]?.hex) || "#015D2F")}
                    onChange={(e) => handleFieldChange("headerBgColor", e.target.value)}
                    className="aspect-square scale-150 cursor-pointer p-0 border-0 bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Email/Landing General Background Color Option */}
            <div className="space-y-2">
              <label className="block font-semibold text-neutral-400">
                Fondo General del Mail / Detrás de Bloques
              </label>

              {/* Presets */}
              <div className="flex flex-wrap gap-1.5">
                {(BRAND_PRESET_COLORS[brand] || BRAND_PRESET_COLORS.buchanans).map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    title={c.name}
                    onClick={() => handleFieldChange("generalBgColor", c.hex)}
                    className={`w-6 h-6 rounded-md border ${variables.generalBgColor === c.hex ? 'border-yellow-450 ring-1 ring-yellow-450' : 'border-neutral-800'} transition-all`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => handleFieldChange("generalBgColor", undefined)}
                  className={`text-[9px] px-2 py-1 rounded bg-neutral-900 border ${!variables.generalBgColor ? 'border-yellow-400 text-yellow-400' : 'border-neutral-800 text-neutral-400'} hover:text-white transition-colors cursor-pointer`}
                >
                  Restaurar Original
                </button>
              </div>

              {/* Custom Hex Selector */}
              <div className="relative">
                <input
                  type="text"
                  value={variables.generalBgColor || ""}
                  onChange={(e) => handleFieldChange("generalBgColor", e.target.value || undefined)}
                  className="w-full bg-neutral-900 border border-neutral-850 rounded-lg px-2.5 py-1.5 pl-8 text-xs text-white focus:outline-none focus:border-yellow-400 font-mono"
                  placeholder={`Ej: ${(BRAND_PRESET_COLORS[brand]?.[2]?.hex || BRAND_PRESET_COLORS[brand]?.[0]?.hex) || "#000000"}`}
                />
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded border border-neutral-700 overflow-hidden flex items-center justify-center">
                  <input
                    type="color"
                    value={variables.generalBgColor && variables.generalBgColor.startsWith("#") && variables.generalBgColor.length === 7 ? variables.generalBgColor : ((BRAND_PRESET_COLORS[brand]?.[2]?.hex || BRAND_PRESET_COLORS[brand]?.[0]?.hex) || "#000000")}
                    onChange={(e) => handleFieldChange("generalBgColor", e.target.value)}
                    className="aspect-square scale-150 cursor-pointer p-0 border-0 bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BLOCKS SECTION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Bloques de Contenido Ordenables
              </span>
            </div>
            <span className="text-[10px] bg-yellow-950/40 border border-yellow-900 text-yellow-400 px-2 py-0.5 rounded-full font-mono">
              Fy26 Editor
            </span>
          </div>

          {/* List of Blocks */}
          <div className="space-y-4">
            {!variables.blocks || variables.blocks.length === 0 ? (
              <div className="p-8 border border-dashed border-neutral-800 text-center rounded-xl bg-neutral-950/25">
                <p className="text-xs text-neutral-500">
                  No hay bloques agregados. Utiliza los botones inferiores para
                  comenzar.
                </p>
              </div>
            ) : (
              variables.blocks.map((block, index) => {
                const totalCols = block.columnsCount || 1;
                const isColumnsType = true; // Always enable deep column/nesting layouts for all blocks
                const isActiveBlock =
                  activeColDropdown && activeColDropdown.blockId === block.id;

                return (
                  <div
                    key={block.id}
                    className={`bg-neutral-950 border border-neutral-800 rounded-xl shadow-md hover:border-neutral-700 transition-all flex flex-col pt-3 ${isActiveBlock ? "z-30 relative" : "relative z-10"}`}
                  >
                    {/* Block Toolbar */}
                    <div className="px-4 pb-2.5 border-b border-neutral-900 flex items-center justify-between flex-wrap gap-2 text-xs">
                      <div className="flex items-center space-x-2.5">
                        <span className="text-[10px] font-mono text-neutral-500 bg-neutral-900 px-1.5 py-0.5 rounded-md border border-neutral-800">
                          #{index + 1}
                        </span>

                        {block.type !== "form" ? (
                          <div className="flex items-center space-x-1.5">
                            {/* Columns switcher (1, 2, or 3 columns design!) */}
                            <span className="text-[10px] text-neutral-450 uppercase font-bold">
                              Columnas:
                            </span>
                            <div className="flex bg-neutral-900 border border-neutral-850 p-0.5 rounded-md">
                              {[1, 2, 3].map((colsCount) => (
                                <button
                                  key={colsCount}
                                  type="button"
                                  onClick={() =>
                                    handleUpdateBlockColumnsCount(
                                      block,
                                      colsCount,
                                    )
                                  }
                                  className={`px-1.5 py-0.5 text-[9px] font-mono rounded font-bold transition-all ${
                                    totalCols === colsCount
                                      ? "bg-yellow-400 text-black"
                                      : "text-neutral-500 hover:text-white"
                                  }`}
                                >
                                  {colsCount} Col
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <span className="text-[9px] font-bold text-yellow-400 uppercase tracking-widest bg-[#015D2F]/40 border border-emerald-900/50 py-0.5 px-2.5 rounded-lg font-mono">
                            Espacio Formulario
                          </span>
                        )}
                      </div>

                      {/* Move block up/down and remove */}
                      <div className="flex items-center space-x-1">
                        <button
                          type="button"
                          onClick={() => handleMoveBlockUp(index)}
                          disabled={index === 0}
                          className={`p-1.5 rounded bg-neutral-900 border border-neutral-850 hover:bg-neutral-800 transition-colors ${index === 0 ? "opacity-30 cursor-not-allowed" : ""}`}
                          title="Subir bloque"
                        >
                          <ArrowUp className="w-3.5 h-3.5 text-neutral-300 hover:text-white" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveBlockDown(index)}
                          disabled={index === variables.blocks.length - 1}
                          className={`p-1.5 rounded bg-neutral-900 border border-neutral-850 hover:bg-neutral-800 transition-colors ${index === variables.blocks.length - 1 ? "opacity-30 cursor-not-allowed" : ""}`}
                          title="Bajar bloque"
                        >
                          <ArrowDown className="w-3.5 h-3.5 text-neutral-300 hover:text-white" />
                        </button>
                        <div className="w-px h-5 bg-neutral-900 mx-1"></div>
                        <button
                          type="button"
                          onClick={() => handleDeleteBlock(block.id)}
                          className="p-1.5 rounded bg-red-950/20 border border-red-900/30 hover:bg-red-900/40 hover:border-red-800/50 transition-colors text-red-400"
                          title="Eliminar bloque"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Optional Section Background Texture Option */}
                    {isLanding && (
                      <div className="px-4 py-2.5 border-b border-neutral-900 bg-neutral-900/10 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center space-x-1.5 text-neutral-400">
                          <Image className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="font-bold uppercase tracking-wider text-[10px]">Textura de fondo de la sección:</span>
                        </div>
                        <div className="flex items-center space-x-2 flex-grow sm:max-w-md">
                          <input
                            type="text"
                            value={block.backgroundTextureUrl || ""}
                            onChange={(e) => handleUpdateBlock(block.id, { backgroundTextureUrl: e.target.value })}
                            className="w-full bg-neutral-950 border border-neutral-850 rounded px-2.5 py-1 text-[11px] text-white focus:outline-none focus:border-yellow-400 transition-colors font-mono"
                            placeholder="Ej. URL de textura o patrón de fondo"
                          />
                          {block.backgroundTextureUrl && (
                            <button
                              type="button"
                              onClick={() => handleUpdateBlock(block.id, { backgroundTextureUrl: "" })}
                              className="text-[9.5px] text-red-400 hover:text-red-300 font-bold whitespace-nowrap"
                            >
                              Limpiar
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleUpdateBlock(block.id, { backgroundTextureUrl: OFFICIAL_TEXTURE_URL })}
                            className="text-[9.5px] text-[#fffd48] hover:underline whitespace-nowrap"
                          >
                            Palma Oficial
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Block Editor Frame */}
                    <div className="p-4 space-y-4">
                      {block.type === "form" ? (
                        <div className="p-8 bg-[#015D2F]/20 rounded-xl border border-emerald-800/40 flex flex-col items-center justify-center my-2 select-none">
                          <span className="text-sm font-black text-[#fffd48] uppercase tracking-widest font-mono">
                            Espacio para form
                          </span>
                        </div>
                      ) : (
                        /* RENDER DYNAMIC GRID FOR MULTI-COLUMNS IF ENABLED */
                        isColumnsType && (
                          <div
                            className={`grid grid-cols-${totalCols === 3 ? "3" : "2"} max-[480px]:grid-cols-1 gap-4`}
                          >
                          {Array.from({ length: totalCols }).map(
                            (_, colIdx) => {
                              const colsList = block.columns || [];
                              const colItem: ColumnContent = (colsList &&
                                colsList[colIdx]) || {
                                id: `col-${colIdx}`,
                                type:
                                  (block.type === "columns" || block.type === "form")
                                    ? "text"
                                    : block.type,
                                textStyle: block.textStyle || "paragraph",
                                text: block.text || "",
                                fontSize: block.fontSize,
                                imageUrl: block.imageUrl,
                                imageAlt: block.imageAlt,
                                imageWidth: block.imageWidth,
                                imageFullWidth: block.imageFullWidth,
                                buttons: block.buttons || [],
                                customHtml: block.customHtml,
                              };

                              const items =
                                colItem.items && colItem.items.length > 0
                                  ? colItem.items
                                  : [
                                      {
                                        id: `col-item-${colItem.id || 'default'}-0`,
                                        type: colItem.type || "text",
                                        textStyle:
                                          colItem.textStyle || "paragraph",
                                        text: colItem.text || "",
                                        fontSize: colItem.fontSize,
                                        imageUrl: colItem.imageUrl,
                                        imageAlt: colItem.imageAlt,
                                        imageWidth: colItem.imageWidth,
                                        imageFullWidth: colItem.imageFullWidth,
                                        buttons: colItem.buttons || [],
                                        customHtml: colItem.customHtml,
                                      },
                                    ];

                              return (
                                <div
                                  key={colItem.id || colIdx}
                                  className="bg-neutral-900/45 border border-neutral-850 p-4 rounded-xl space-y-4 relative"
                                >
                                  {/* Column Header (Column # layout shift) */}
                                  <div className="flex items-center justify-between border-b border-neutral-850 pb-2">
                                    <span className="text-xs font-black text-[#fffd48] uppercase tracking-wide">
                                      COLUMNA {colIdx + 1}
                                    </span>

                                    {/* Left and Right order movers! (Shifting elements in the columns grid) */}
                                    <div className="flex items-center space-x-1">
                                      <button
                                        type="button"
                                        disabled={colIdx === 0}
                                        onClick={() =>
                                          handleMoveColumnInBlock(
                                            block.id,
                                            colIdx,
                                            "left",
                                          )
                                        }
                                        className={`p-1 bg-neutral-950 border border-neutral-800 hover:bg-neutral-800 rounded transition-colors ${colIdx === 0 ? "opacity-30 cursor-not-allowed" : ""}`}
                                        title="Desplazar a la izquierda"
                                      >
                                        <ArrowLeft className="w-3 h-3 text-neutral-300" />
                                      </button>
                                      <button
                                        type="button"
                                        disabled={colIdx === totalCols - 1}
                                        onClick={() =>
                                          handleMoveColumnInBlock(
                                            block.id,
                                            colIdx,
                                            "right",
                                          )
                                        }
                                        className={`p-1 bg-neutral-950 border border-neutral-800 hover:bg-neutral-800 rounded transition-colors ${colIdx === totalCols - 1 ? "opacity-30 cursor-not-allowed" : ""}`}
                                        title="Desplazar a la derecha"
                                      >
                                        <ArrowRight className="w-3 h-3 text-neutral-300" />
                                      </button>
                                    </div>
                                  </div>

                                  {/* List of nested child resources inside this column */}
                                  <div className="space-y-4">
                                    {items.map((item, itemIdx) => {
                                      return (
                                        <div
                                          key={item.id || itemIdx}
                                          className="bg-neutral-950/60 border border-neutral-800 p-3 rounded-lg space-y-3 relative group/item"
                                        >
                                          {/* Item Toolbar */}
                                          <div className="flex items-center justify-between border-b border-neutral-900 pb-2 text-[10px]">
                                            <div className="flex items-center space-x-1.5">
                                              <span className="font-bold text-neutral-500 uppercase">
                                                Recurso {itemIdx + 1}:
                                              </span>
                                              <select
                                                value={item.type}
                                                onChange={(e) => {
                                                  handleUpdateColumnItem(
                                                    block.id,
                                                    colIdx,
                                                    itemIdx,
                                                    {
                                                      type: e.target
                                                        .value as any,
                                                      text:
                                                        item.text ||
                                                        "Escribe contenido...",
                                                      textStyle:
                                                        item.textStyle ||
                                                        "paragraph",
                                                      imageUrl:
                                                        item.imageUrl ||
                                                        "https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280",
                                                      imageWidth:
                                                        item.imageWidth ||
                                                        "200",
                                                      imageAlt:
                                                        item.imageAlt ||
                                                        "Imagen",
                                                      customHtml:
                                                        item.customHtml ||
                                                        "<!-- Código HTML de Componente Personalizado -->\n<div class=\"p-4 bg-zinc-950/20 border border-yellow-400/15 rounded text-center text-white\">\n  Componente Personalizado\n</div>",
                                                      buttons: item.buttons || [
                                                        {
                                                          id: `btn-${Date.now()}`,
                                                          text: "BOTÓN",
                                                          url: "%%URL%%",
                                                          style: "solid-yellow",
                                                        },
                                                      ],
                                                    },
                                                  );
                                                }}
                                                className="bg-neutral-900 border border-neutral-800 rounded px-1.5 py-0.5 text-[9px] text-neutral-300 font-semibold"
                                              >
                                                <option value="text">
                                                  Texto
                                                </option>
                                                <option value="image">
                                                  Imagen
                                                </option>
                                                <option value="button-group">
                                                  Botones
                                                </option>
                                                {isLanding && (
                                                  <option value="custom-code">
                                                    Comp. Personalizado
                                                  </option>
                                                )}
                                              </select>
                                            </div>

                                            {/* Move Up, Down and Delete icons */}
                                            <div className="flex items-center space-x-1">
                                              <button
                                                type="button"
                                                disabled={itemIdx === 0}
                                                onClick={() =>
                                                  handleMoveColumnItem(
                                                    block.id,
                                                    colIdx,
                                                    itemIdx,
                                                    "up",
                                                  )
                                                }
                                                className={`p-1 bg-neutral-900 border border-neutral-850 hover:bg-neutral-800 rounded transition-colors ${itemIdx === 0 ? "opacity-30 cursor-not-allowed" : ""}`}
                                                title="Subir recurso"
                                              >
                                                <ArrowUp className="w-2.5 h-2.5 text-neutral-400 hover:text-white" />
                                              </button>
                                              <button
                                                type="button"
                                                disabled={
                                                  itemIdx === items.length - 1
                                                }
                                                onClick={() =>
                                                  handleMoveColumnItem(
                                                    block.id,
                                                    colIdx,
                                                    itemIdx,
                                                    "down",
                                                  )
                                                }
                                                className={`p-1 bg-neutral-900 border border-neutral-850 hover:bg-neutral-800 rounded transition-colors ${itemIdx === items.length - 1 ? "opacity-30 cursor-not-allowed" : ""}`}
                                                title="Bajar recurso"
                                              >
                                                <ArrowDown className="w-2.5 h-2.5 text-neutral-400 hover:text-white" />
                                              </button>
                                              <button
                                                type="button"
                                                disabled={items.length <= 1}
                                                onClick={() =>
                                                  handleDeleteColumnItem(
                                                    block.id,
                                                    colIdx,
                                                    itemIdx,
                                                  )
                                                }
                                                className={`p-1 bg-red-950/20 border border-red-900/30 hover:bg-red-900/40 rounded transition-colors text-red-400 ${items.length <= 1 ? "opacity-30 cursor-not-allowed" : ""}`}
                                                title="Eliminar recurso"
                                              >
                                                <Trash2 className="w-2.5 h-2.5" />
                                              </button>
                                            </div>
                                          </div>

                                          {/* EDIT TYPE SPECIFIC SUB-ELEMENT COMPONENT FIELDS */}
                                          {item.type === "custom-code" && (
                                            <div className="space-y-1.5 text-xs">
                                              <label className="block text-neutral-400 font-bold text-[8px] uppercase mb-0.5">
                                                Pegar código HTML de Componente Personalizado (Full Width en Landing)
                                              </label>
                                              <textarea
                                                value={item.customHtml || ""}
                                                onChange={(e) =>
                                                  handleUpdateColumnItem(
                                                    block.id,
                                                    colIdx,
                                                    itemIdx,
                                                    { customHtml: e.target.value },
                                                  )
                                                }
                                                rows={6}
                                                placeholder="<div>Código HTML del componente aquí...</div>"
                                                className="w-full bg-neutral-900 border border-neutral-800 text-yellow-350 p-2 text-xs font-mono rounded focus:outline-none focus:border-yellow-400"
                                              />
                                            </div>
                                          )}

                                          {item.type === "text" && (
                                            <div className="space-y-1.5">
                                              <div className="flex items-center justify-between text-[9px]">
                                                <div className="flex items-center space-x-1">
                                                  <span className="text-neutral-500 uppercase font-bold">
                                                    Estilo:
                                                  </span>
                                                  <select
                                                    value={
                                                      item.textStyle ||
                                                      "paragraph"
                                                    }
                                                    onChange={(e) =>
                                                      handleUpdateColumnItem(
                                                        block.id,
                                                        colIdx,
                                                        itemIdx,
                                                        {
                                                          textStyle: e.target
                                                            .value as any,
                                                        },
                                                      )
                                                    }
                                                    className="bg-neutral-900 border border-neutral-800 rounded px-1.5 py-0.5 text-[9px] text-yellow-350"
                                                  >
                                                    <option value="eyebrow">
                                                      Caja Alta
                                                    </option>
                                                    <option value="headline">
                                                      Título
                                                    </option>
                                                    <option value="paragraph">
                                                      Párrafo
                                                    </option>
                                                  </select>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                  <span className="text-neutral-500 uppercase font-bold">
                                                    Tamaño:
                                                  </span>
                                                  <select
                                                    value={item.fontSize || ""}
                                                    onChange={(e) =>
                                                      handleUpdateColumnItem(
                                                        block.id,
                                                        colIdx,
                                                        itemIdx,
                                                        {
                                                          fontSize:
                                                            e.target.value ||
                                                            undefined,
                                                        },
                                                      )
                                                    }
                                                    className="bg-neutral-900 border border-neutral-800 rounded px-1.5 py-0.5 text-[9px] text-white"
                                                  >
                                                    <option value="">
                                                      Default
                                                    </option>
                                                    <option value="11px">
                                                      11px
                                                    </option>
                                                    <option value="13px">
                                                      13px
                                                    </option>
                                                    <option value="14px">
                                                      14px
                                                    </option>
                                                    <option value="16px">
                                                      16px
                                                    </option>
                                                    <option value="18px">
                                                      18px
                                                    </option>
                                                    <option value="20px">
                                                      20px
                                                    </option>
                                                    <option value="24px">
                                                      24px
                                                    </option>
                                                    <option value="28px">
                                                      28px
                                                    </option>
                                                    <option value="32px">
                                                      32px
                                                    </option>
                                                    <option value="36px">
                                                      36px
                                                    </option>
                                                  </select>
                                                </div>
                                              </div>

                                              {/* Column nested text format toolbar */}
                                              <div className="flex flex-wrap items-center gap-1 p-1 bg-neutral-900 border border-neutral-850 rounded-t-md border-b-0">
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    const element =
                                                      document.getElementById(
                                                        `editor-${block.id}-col-${colIdx}-item-${itemIdx}`,
                                                      ) as HTMLTextAreaElement | null;
                                                    if (!element) return;
                                                    const start =
                                                      element.selectionStart ||
                                                      0;
                                                    const end =
                                                      element.selectionEnd || 0;
                                                    const textVal =
                                                      item.text || "";
                                                    const selectedText =
                                                      textVal.substring(
                                                        start,
                                                        end,
                                                      );
                                                    const replacement =
                                                      "<strong>" +
                                                      (selectedText ||
                                                        "texto") +
                                                      "</strong>";
                                                    const newValue =
                                                      textVal.substring(
                                                        0,
                                                        start,
                                                      ) +
                                                      replacement +
                                                      textVal.substring(end);
                                                    handleUpdateColumnItem(
                                                      block.id,
                                                      colIdx,
                                                      itemIdx,
                                                      { text: newValue },
                                                    );
                                                  }}
                                                  className="px-1.5 py-0.5 bg-neutral-955 border border-neutral-800 rounded text-[9px] font-bold font-mono text-neutral-300 hover:text-white transition-colors"
                                                >
                                                  N
                                                </button>
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    const element =
                                                      document.getElementById(
                                                        `editor-${block.id}-col-${colIdx}-item-${itemIdx}`,
                                                      ) as HTMLTextAreaElement | null;
                                                    if (!element) return;
                                                    const start =
                                                      element.selectionStart ||
                                                      0;
                                                    const end =
                                                      element.selectionEnd || 0;
                                                    const textVal =
                                                      item.text || "";
                                                    const selectedText =
                                                      textVal.substring(
                                                        start,
                                                        end,
                                                      );
                                                    const replacement =
                                                      "<em>" +
                                                      (selectedText ||
                                                        "texto") +
                                                      "</em>";
                                                    const newValue =
                                                      textVal.substring(
                                                        0,
                                                        start,
                                                      ) +
                                                      replacement +
                                                      textVal.substring(end);
                                                    handleUpdateColumnItem(
                                                      block.id,
                                                      colIdx,
                                                      itemIdx,
                                                      { text: newValue },
                                                    );
                                                  }}
                                                  className="px-1.5 py-0.5 bg-neutral-955 border border-neutral-800 rounded text-[9px] italic font-mono text-neutral-300 hover:text-white transition-colors"
                                                >
                                                  K
                                                </button>
                                                <span className="text-[8px] text-neutral-500 uppercase tracking-wider font-semibold ml-1">
                                                  Color:
                                                </span>
                                                {(BRAND_PRESET_COLORS[brand] || BRAND_PRESET_COLORS.buchanans).map((c) => (
                                                  <button
                                                    key={c.hex}
                                                    type="button"
                                                    onClick={() => {
                                                      const element =
                                                        document.getElementById(
                                                          `editor-${block.id}-col-${colIdx}-item-${itemIdx}`,
                                                        ) as HTMLTextAreaElement | null;
                                                      if (!element) return;
                                                      const start =
                                                        element.selectionStart ||
                                                        0;
                                                      const end =
                                                        element.selectionEnd || 0;
                                                      const textVal =
                                                        item.text || "";
                                                      const selectedText =
                                                        textVal.substring(
                                                          start,
                                                          end,
                                                        );
                                                      const replacement =
                                                        `<span style="color:${c.hex};">` +
                                                        (selectedText ||
                                                          "texto") +
                                                        "</span>";
                                                      const newValue =
                                                        textVal.substring(
                                                          0,
                                                          start,
                                                        ) +
                                                        replacement +
                                                        textVal.substring(end);
                                                      handleUpdateColumnItem(
                                                        block.id,
                                                        colIdx,
                                                        itemIdx,
                                                        { text: newValue },
                                                      );
                                                    }}
                                                    className="w-2.5 h-2.5 rounded-full border border-neutral-700 hover:scale-110 transition-transform"
                                                    style={{ backgroundColor: c.hex }}
                                                    title={`${c.name} (${c.hex})`}
                                                  />
                                                ))}
                                              </div>

                                              <textarea
                                                id={`editor-${block.id}-col-${colIdx}-item-${itemIdx}`}
                                                value={item.text || ""}
                                                onChange={(e) =>
                                                  handleUpdateColumnItem(
                                                    block.id,
                                                    colIdx,
                                                    itemIdx,
                                                    { text: e.target.value },
                                                  )
                                                }
                                                rows={2}
                                                placeholder="Escribe contenido de columna..."
                                                className="w-full bg-neutral-900 border border-neutral-800 rounded-b-md px-2 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-400 font-sans"
                                              />
                                            </div>
                                          )}

                                          {item.type === "image" && (
                                            <div className="space-y-2 text-xs">
                                              <div>
                                                <label className="block text-neutral-500 text-[8px] uppercase mb-0.5">
                                                  Enlace de Imagen
                                                </label>
                                                <input
                                                  type="text"
                                                  value={item.imageUrl || ""}
                                                  onChange={(e) =>
                                                    handleUpdateColumnItem(
                                                      block.id,
                                                      colIdx,
                                                      itemIdx,
                                                      {
                                                        imageUrl:
                                                          e.target.value,
                                                      },
                                                    )
                                                  }
                                                  className="w-full bg-neutral-900 border border-neutral-800 px-2 py-1 text-xs rounded text-neutral-200 font-mono focus:outline-none focus:border-yellow-400"
                                                />
                                              </div>
                                              <div className="flex items-center justify-between text-[9px] bg-neutral-900 p-1 rounded border border-neutral-850">
                                                <span className="text-neutral-500 uppercase font-bold">
                                                  Resizing:
                                                </span>
                                                <select
                                                  value={
                                                    item.imageFullWidth
                                                      ? "full"
                                                      : "custom"
                                                  }
                                                  onChange={(e) =>
                                                    handleUpdateColumnItem(
                                                      block.id,
                                                      colIdx,
                                                      itemIdx,
                                                      {
                                                        imageFullWidth:
                                                          e.target.value ===
                                                          "full",
                                                      },
                                                    )
                                                  }
                                                  className="bg-neutral-850 border border-neutral-800 rounded px-1 py-0.5 text-[9px] text-emerald-400 font-bold focus:outline-none"
                                                >
                                                  <option value="custom">
                                                    Ancho Fijo PX
                                                  </option>
                                                  <option value="full">
                                                    Ancho Completo (100%)
                                                  </option>
                                                </select>
                                              </div>
                                              <div className="flex gap-2">
                                                <div className="w-1/2">
                                                  <label
                                                    className={`block text-neutral-500 text-[8px] uppercase mb-0.5 ${item.imageFullWidth ? "opacity-30" : ""}`}
                                                  >
                                                    Ancho
                                                  </label>
                                                  <input
                                                    type="text"
                                                    value={
                                                      item.imageWidth || "200"
                                                    }
                                                    disabled={
                                                      !!item.imageFullWidth
                                                    }
                                                    onChange={(e) =>
                                                      handleUpdateColumnItem(
                                                        block.id,
                                                        colIdx,
                                                        itemIdx,
                                                        {
                                                          imageWidth:
                                                            e.target.value,
                                                        },
                                                      )
                                                    }
                                                    className="w-full bg-neutral-900 border border-neutral-800 px-2 py-1 rounded text-xs text-neutral-200 disabled:opacity-30"
                                                  />
                                                </div>
                                                <div className="w-1/2">
                                                  <label className="block text-neutral-500 text-[8px] uppercase mb-0.5">
                                                    Texto Alt
                                                  </label>
                                                  <input
                                                    type="text"
                                                    value={item.imageAlt || ""}
                                                    onChange={(e) =>
                                                      handleUpdateColumnItem(
                                                        block.id,
                                                        colIdx,
                                                        itemIdx,
                                                        {
                                                          imageAlt:
                                                            e.target.value,
                                                        },
                                                      )
                                                    }
                                                    className="w-full bg-neutral-900 border border-neutral-800 px-2 py-1 rounded text-xs text-neutral-200"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          )}

                                          {item.type === "button-group" && (
                                            <div className="space-y-2">
                                              {(item.buttons || []).map(
                                                (btn, btnIdx) => (
                                                  <div
                                                    key={btn.id}
                                                    className="bg-neutral-900 p-2 rounded border border-neutral-855 space-y-1 text-[9px]"
                                                  >
                                                    <div className="flex justify-between font-bold text-yellow-400">
                                                      <span>
                                                        Botón #{btnIdx + 1}
                                                      </span>
                                                      <button
                                                        type="button"
                                                        onClick={() => {
                                                          const filteredBtn = (
                                                            item.buttons || []
                                                          ).filter(
                                                            (b) =>
                                                              b.id !== btn.id,
                                                          );
                                                          handleUpdateColumnItem(
                                                            block.id,
                                                            colIdx,
                                                            itemIdx,
                                                            {
                                                              buttons:
                                                                filteredBtn,
                                                            },
                                                          );
                                                        }}
                                                        className="text-red-400 hover:underline text-[9px] cursor-pointer"
                                                      >
                                                        Borrar
                                                      </button>
                                                    </div>
                                                    <div className="flex items-center justify-between text-[8px] text-neutral-400 my-1">
                                                      <span>Tamaño:</span>
                                                      <select
                                                        value={
                                                          btn.size || "medium"
                                                        }
                                                        onChange={(e) => {
                                                          const updatedButtons =
                                                            (
                                                              item.buttons || []
                                                            ).map((b) =>
                                                              b.id === btn.id
                                                                ? {
                                                                    ...b,
                                                                    size: e
                                                                      .target
                                                                      .value as any,
                                                                  }
                                                                : b,
                                                            );
                                                          handleUpdateColumnItem(
                                                            block.id,
                                                            colIdx,
                                                            itemIdx,
                                                            {
                                                              buttons:
                                                                updatedButtons,
                                                            },
                                                          );
                                                        }}
                                                        className="bg-neutral-850 border border-neutral-800 rounded px-1 py-0.5 text-[8px] text-emerald-400 font-bold focus:outline-none"
                                                      >
                                                        <option value="small">
                                                          Pequeño
                                                        </option>
                                                        <option value="medium">
                                                          Mediano
                                                        </option>
                                                        <option value="large">
                                                          Grande
                                                        </option>
                                                      </select>
                                                    </div>
                                                    <input
                                                      type="text"
                                                      value={btn.text}
                                                      placeholder="Texto"
                                                      onChange={(e) => {
                                                        const updatedButtons = (
                                                          item.buttons || []
                                                        ).map((b) =>
                                                          b.id === btn.id
                                                            ? {
                                                                ...b,
                                                                text: e.target
                                                                  .value,
                                                              }
                                                            : b,
                                                        );
                                                        handleUpdateColumnItem(
                                                          block.id,
                                                          colIdx,
                                                          itemIdx,
                                                          {
                                                            buttons:
                                                              updatedButtons,
                                                          },
                                                        );
                                                      }}
                                                      className="w-full bg-neutral-950 border border-neutral-800 px-1.5 py-0.5 text-[10px] rounded text-white"
                                                    />
                                                    <input
                                                      type="text"
                                                      value={btn.url}
                                                      placeholder="URL/Variable"
                                                      onChange={(e) => {
                                                        const updatedButtons = (
                                                          item.buttons || []
                                                        ).map((b) =>
                                                          b.id === btn.id
                                                            ? {
                                                                ...b,
                                                                url: e.target
                                                                  .value,
                                                              }
                                                            : b,
                                                        );
                                                        handleUpdateColumnItem(
                                                          block.id,
                                                          colIdx,
                                                          itemIdx,
                                                          {
                                                            buttons:
                                                              updatedButtons,
                                                          },
                                                        );
                                                      }}
                                                      className="w-full bg-neutral-950 border border-neutral-800 px-1.5 py-0.5 text-[9px] rounded text-white font-mono"
                                                    />
                                                  </div>
                                                ),
                                              )}

                                              {(item.buttons || []).length <
                                                2 && (
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    const newBtn: ButtonConfig =
                                                      {
                                                        id: `btn-col-${Date.now()}-${colIdx}`,
                                                        text: "Botón",
                                                        url: "%%URL%%",
                                                        style: "solid-yellow",
                                                      };
                                                    handleUpdateColumnItem(
                                                      block.id,
                                                      colIdx,
                                                      itemIdx,
                                                      {
                                                        buttons: [
                                                          ...(item.buttons ||
                                                            []),
                                                          newBtn,
                                                        ],
                                                      },
                                                    );
                                                  }}
                                                  className="w-full py-1 bg-neutral-900 border border-dashed border-neutral-800 text-[9px] text-neutral-400 hover:text-white rounded transition-colors"
                                                >
                                                  + Agregar Botón
                                                </button>
                                              )}
                                            </div>
                                          )}

                                          {/* Spacing layout padding controls (+ / -) */}
                                          <div className="bg-neutral-900/80 p-2.5 rounded-lg border border-neutral-800 space-y-2.5 mt-4">
                                            <div className="flex items-center justify-between text-[9px] font-bold text-yellow-500">
                                              <span>Controles de Espaciado (Padding px)</span>
                                              <span className="font-mono text-neutral-400">
                                                T:{item.paddingTop ?? 0} B:{item.paddingBottom ?? 16} L:{item.paddingLeft ?? 0} R:{item.paddingRight ?? 0}
                                              </span>
                                            </div>
                                            
                                            {/* Grid Tuning */}
                                            <div className="grid grid-cols-2 gap-1.5 text-[8px] w-full">
                                              <div className="bg-neutral-950/80 p-1.5 rounded flex justify-between items-center border border-neutral-900">
                                                <span className="text-neutral-500 font-semibold font-mono">TOP:</span>
                                                <div className="flex items-center space-x-1">
                                                  <button 
                                                    type="button"
                                                    onClick={() => {
                                                      const val = Math.max(-120, (item.paddingTop ?? 0) - 4);
                                                      handleUpdateColumnItem(block.id, colIdx, itemIdx, { paddingTop: val });
                                                    }}
                                                    className="px-1.5 bg-neutral-800 hover:bg-neutral-750 hover:text-yellow-400 text-white font-bold rounded cursor-pointer transition-colors"
                                                  >-</button>
                                                  <span className="font-mono text-white min-w-[14px] text-center">{item.paddingTop ?? 0}</span>
                                                  <button 
                                                    type="button"
                                                    onClick={() => {
                                                      const val = (item.paddingTop ?? 0) + 4;
                                                      handleUpdateColumnItem(block.id, colIdx, itemIdx, { paddingTop: val });
                                                    }}
                                                    className="px-1.5 bg-neutral-800 hover:bg-neutral-750 hover:text-yellow-400 text-white font-bold rounded cursor-pointer transition-colors"
                                                  >+</button>
                                                </div>
                                              </div>

                                              <div className="bg-neutral-950/80 p-1.5 rounded flex justify-between items-center border border-neutral-900">
                                                <span className="text-neutral-500 font-semibold font-mono">BOT:</span>
                                                <div className="flex items-center space-x-1">
                                                  <button 
                                                    type="button"
                                                    onClick={() => {
                                                      const val = Math.max(-120, (item.paddingBottom ?? 16) - 4);
                                                      handleUpdateColumnItem(block.id, colIdx, itemIdx, { paddingBottom: val });
                                                    }}
                                                    className="px-1.5 bg-neutral-800 hover:bg-neutral-750 hover:text-yellow-400 text-white font-bold rounded cursor-pointer transition-colors"
                                                  >-</button>
                                                  <span className="font-mono text-white min-w-[14px] text-center">{item.paddingBottom ?? 16}</span>
                                                  <button 
                                                    type="button"
                                                    onClick={() => {
                                                      const val = (item.paddingBottom ?? 16) + 4;
                                                      handleUpdateColumnItem(block.id, colIdx, itemIdx, { paddingBottom: val });
                                                    }}
                                                    className="px-1.5 bg-neutral-800 hover:bg-neutral-750 hover:text-yellow-400 text-white font-bold rounded cursor-pointer transition-colors"
                                                  >+</button>
                                                </div>
                                              </div>

                                              <div className="bg-neutral-950/80 p-1.5 rounded flex justify-between items-center border border-neutral-900">
                                                <span className="text-neutral-500 font-semibold font-mono">LEFT:</span>
                                                <div className="flex items-center space-x-1">
                                                  <button 
                                                    type="button"
                                                    onClick={() => {
                                                      const val = Math.max(-120, (item.paddingLeft ?? 0) - 2);
                                                      handleUpdateColumnItem(block.id, colIdx, itemIdx, { paddingLeft: val });
                                                    }}
                                                    className="px-1.5 bg-neutral-800 hover:bg-neutral-750 hover:text-yellow-400 text-white font-bold rounded cursor-pointer transition-colors"
                                                  >-</button>
                                                  <span className="font-mono text-white min-w-[14px] text-center">{item.paddingLeft ?? 0}</span>
                                                  <button 
                                                    type="button"
                                                    onClick={() => {
                                                      const val = (item.paddingLeft ?? 0) + 2;
                                                      handleUpdateColumnItem(block.id, colIdx, itemIdx, { paddingLeft: val });
                                                    }}
                                                    className="px-1.5 bg-neutral-800 hover:bg-neutral-750 hover:text-yellow-400 text-white font-bold rounded cursor-pointer transition-colors"
                                                  >+</button>
                                                </div>
                                              </div>

                                              <div className="bg-neutral-950/80 p-1.5 rounded flex justify-between items-center border border-neutral-900">
                                                <span className="text-neutral-500 font-semibold font-mono">RGHT:</span>
                                                <div className="flex items-center space-x-1">
                                                  <button 
                                                    type="button"
                                                    onClick={() => {
                                                      const val = Math.max(-120, (item.paddingRight ?? 0) - 2);
                                                      handleUpdateColumnItem(block.id, colIdx, itemIdx, { paddingRight: val });
                                                    }}
                                                    className="px-1.5 bg-neutral-800 hover:bg-neutral-750 hover:text-yellow-400 text-white font-bold rounded cursor-pointer transition-colors"
                                                  >-</button>
                                                  <span className="font-mono text-white min-w-[14px] text-center">{item.paddingRight ?? 0}</span>
                                                  <button 
                                                    type="button"
                                                    onClick={() => {
                                                      const val = (item.paddingRight ?? 0) + 2;
                                                      handleUpdateColumnItem(block.id, colIdx, itemIdx, { paddingRight: val });
                                                    }}
                                                    className="px-1.5 bg-neutral-800 hover:bg-neutral-750 hover:text-yellow-400 text-white font-bold rounded cursor-pointer transition-colors"
                                                  >+</button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>

                                  {/* ADD ELEMENT "+" DROPDOWN SELECTOR */}
                                  <div className="relative flex justify-center mt-2 pt-2 border-t border-neutral-850">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const active =
                                          activeColDropdown &&
                                          activeColDropdown.blockId ===
                                            block.id &&
                                          activeColDropdown.colIdx === colIdx;
                                        setActiveColDropdown(
                                          active
                                            ? null
                                            : { blockId: block.id, colIdx },
                                        );
                                      }}
                                      className="flex items-center space-x-1 px-3 py-1.5 bg-neutral-950 border border-neutral-800 hover:border-yellow-400 hover:bg-neutral-900 rounded-lg text-xs font-bold text-neutral-300 hover:text-white transition-all cursor-pointer"
                                    >
                                      <Plus className="w-3.5 h-3.5 text-yellow-400" />
                                      <span>Añadir Elemento</span>
                                    </button>

                                    {activeColDropdown &&
                                      activeColDropdown.blockId === block.id &&
                                      activeColDropdown.colIdx === colIdx && (
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-44 bg-neutral-950 border border-neutral-800 rounded-lg shadow-2xl py-1 z-50">
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleAddColumnItem(
                                                block.id,
                                                colIdx,
                                                "text",
                                              )
                                            }
                                            className="w-full text-left px-3 py-2 text-xs hover:bg-neutral-900 text-neutral-200 hover:text-white flex items-center space-x-2 transition-colors cursor-pointer"
                                          >
                                            <Type className="w-3.5 h-3.5 text-yellow-400" />
                                            <span>Añadir Texto</span>
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleAddColumnItem(
                                                block.id,
                                                colIdx,
                                                "image",
                                              )
                                            }
                                            className="w-full text-left px-3 py-2 text-xs hover:bg-neutral-900 text-neutral-200 hover:text-white flex items-center space-x-2 transition-colors cursor-pointer"
                                          >
                                            <Image className="w-3.5 h-3.5 text-yellow-400" />
                                            <span>Añadir Imagen</span>
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleAddColumnItem(
                                                block.id,
                                                colIdx,
                                                "button-group",
                                              )
                                            }
                                            className="w-full text-left px-3 py-2 text-xs hover:bg-neutral-900 text-neutral-200 hover:text-white flex items-center space-x-2 transition-colors cursor-pointer"
                                          >
                                            <ExternalLink className="w-3.5 h-3.5 text-yellow-400" />
                                            <span>Añadir Botones</span>
                                          </button>
                                          {isLanding && (
                                            <button
                                              type="button"
                                              onClick={() =>
                                                handleAddColumnItem(
                                                  block.id,
                                                  colIdx,
                                                  "custom-code",
                                                )
                                              }
                                              className="w-full text-left px-3 py-2 text-xs hover:bg-neutral-900 text-neutral-200 hover:text-white flex items-center space-x-2 transition-colors cursor-pointer"
                                            >
                                              <FileCode className="w-3.5 h-3.5 text-yellow-400" />
                                              <span>Comp. Personalizado</span>
                                            </button>
                                          )}
                                        </div>
                                      )}
                                  </div>
                                </div>
                              );
                            },
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Creator buttons */}
          <div className={`grid grid-cols-2 ${isLanding ? 'sm:grid-cols-3' : 'sm:grid-cols-4'} gap-2.5 pt-2`}>
            <button
              type="button"
              onClick={() => handleAddBlock("text")}
              className="flex items-center justify-center space-x-2 py-3 bg-neutral-950 border border-neutral-850 hover:border-neutral-700 hover:bg-neutral-900 rounded-xl transition-all font-bold text-xs hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <Type className="w-3.5 h-3.5 text-emerald-400" />
              <span>+ Texto</span>
            </button>
            <button
              type="button"
              onClick={() => handleAddBlock("image")}
              className="flex items-center justify-center space-x-2 py-3 bg-neutral-950 border border-neutral-850 hover:border-neutral-700 hover:bg-neutral-900 rounded-xl transition-all font-bold text-xs hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <Image className="w-3.5 h-3.5 text-emerald-400" />
              <span>+ Imagen</span>
            </button>
            <button
              type="button"
              onClick={() => handleAddBlock("button-group")}
              className="flex items-center justify-center space-x-2 py-3 bg-neutral-950 border border-neutral-850 hover:border-neutral-700 hover:bg-neutral-900 rounded-xl transition-all font-bold text-xs hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>+ Botones</span>
            </button>
            <button
              type="button"
              onClick={() => handleAddBlock("columns")}
              className="flex items-center justify-center space-x-2 py-3 bg-neutral-950 border border-neutral-850 hover:border-neutral-700 hover:bg-neutral-900 rounded-xl transition-all font-bold text-xs hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>+ Columnas</span>
            </button>
            {isLanding && (
              <>
                <button
                  type="button"
                  onClick={() => handleAddBlock("custom-code")}
                  className="flex items-center justify-center space-x-2 py-3 bg-neutral-950 border border-neutral-850 hover:border-[#fffd48] hover:bg-neutral-900 rounded-xl transition-all font-bold text-xs hover:shadow-lg active:scale-95 cursor-pointer"
                >
                  <FileCode className="w-3.5 h-3.5 text-yellow-400" />
                  <span>+ Comp. Pers.</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAddBlock("form")}
                  className="flex items-center justify-center space-x-2 py-3 bg-[#015D2F]/20 border border-emerald-600 hover:border-[#fffd48] hover:bg-[#015D2F]/40 rounded-xl transition-all font-bold text-xs hover:shadow-lg active:scale-95 cursor-pointer text-yellow-400"
                >
                  <ClipboardList className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                  <span>+ Espacio Form</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Legal Regulatory & Customizable Footer */}
        <div className={`bg-neutral-950 p-4 border border-neutral-850 space-y-4 text-xs ${contentType === 'landing' ? 'rounded-none' : 'rounded-xl'}`}>
          <div className="text-neutral-400 font-bold border-b border-neutral-850 pb-2 flex items-center justify-between">
            <span>Configuración del Footer & Nota Diageo</span>
            <span className="text-[9px] bg-[#015D2F] text-[#fffd48] px-2 py-0.5 rounded font-mono font-bold uppercase">Editable</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-neutral-400 block font-bold text-[10px] uppercase tracking-wide">Disclaimer legal (Diageo / INVIMA):</label>
            <textarea
              className="w-full bg-neutral-900 border border-neutral-800 p-2.5 text-white font-sans text-xs focus:ring-1 focus:ring-yellow-400 focus:outline-none transition-all leading-normal"
              rows={3}
              value={variables.legalDisclaimer || ""}
              onChange={(e) => onChange({ ...variables, legalDisclaimer: e.target.value })}
              placeholder="Escribe el disclaimer legal exigido..."
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-neutral-400 block font-bold text-[10px] uppercase tracking-wide">Texto de Desuscripción y Privacidad (Soporta HTML):</label>
              <div className="flex space-x-1.5">
                <button
                  type="button"
                  onClick={() => {
                    const current = variables.unsubscribeText || "";
                    const linkMarkup = ' <a href="%%unsub_center_url%%" style="color:#fffd48; text-decoration:underline;">clic aquí Center</a>';
                    onChange({ ...variables, unsubscribeText: current + linkMarkup });
                  }}
                  className="px-2 py-0.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-yellow-400 hover:text-white rounded text-[10px] font-mono cursor-pointer transition-colors"
                  title="Enlace para Salesforce Marketing Cloud"
                >
                  + MC Unsub Link
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const url = prompt("Escribe la URL del enlace:", "https://www.diageo.com");
                    if (url) {
                      const text = prompt("Escribe el texto visible del enlace:", "Ver Política de Privacidad");
                      if (text) {
                        const current = variables.unsubscribeText || "";
                        const customLink = ` <a href="${url}" style="color:#fffd48; text-decoration:underline;" target="_blank">${text}</a>`;
                        onChange({ ...variables, unsubscribeText: current + customLink });
                      }
                    }
                  }}
                  className="px-2 py-0.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-emerald-400 hover:text-white rounded text-[10px] font-mono cursor-pointer transition-colors"
                >
                  + Enlace Web
                </button>
              </div>
            </div>
            <textarea
              className="w-full bg-neutral-900 border border-neutral-800 p-2.5 text-white font-sans text-xs focus:ring-1 focus:ring-yellow-400 focus:outline-none transition-all leading-normal font-mono text-[11px]"
              rows={4}
              value={variables.unsubscribeText || ""}
              onChange={(e) => onChange({ ...variables, unsubscribeText: e.target.value })}
              placeholder="Puedes escribir texto HTML libre aquí..."
            />
            <p className="text-[10px] text-neutral-500 leading-normal">
              Inserta tus propios enlaces interactivos de Salesforce o corporativos utilizando marcas HTML estándar o tags <code className="text-[#fffd48] bg-neutral-900 px-1 py-0.5 rounded font-mono">%%unsub_center_url%%</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
