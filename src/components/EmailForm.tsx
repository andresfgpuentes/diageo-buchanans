/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { EmailVariables, EmailBlock, ColumnContent, ButtonConfig } from '../types';
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
  FileCode
} from 'lucide-react';
import { DEFAULT_EMAIL_VARIABLES, OFFICIAL_TEXTURE_URL } from '../utils/htmlGenerator';

interface EmailFormProps {
  variables: EmailVariables;
  onChange: (vars: EmailVariables) => void;
}

export function EmailForm({ variables, onChange }: EmailFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [activeColDropdown, setActiveColDropdown] = useState<{ blockId: string; colIdx: number } | null>(null);

  // Helper to obtain columns for a block, dynamically fallback if not configured yet
  const getBlockColumns = (block: EmailBlock): ColumnContent[] => {
    if (block.columns && block.columns.length > 0) {
      return block.columns;
    }
    return [
      {
        id: `col-${block.id}-default`,
        type: block.type === 'columns' ? 'text' : block.type,
        textStyle: block.textStyle || 'paragraph',
        text: block.text || '',
        fontSize: block.fontSize,
        imageUrl: block.imageUrl,
        imageAlt: block.imageAlt,
        imageWidth: block.imageWidth,
        imageFullWidth: block.imageFullWidth,
        buttons: block.buttons || [],
        items: block.items || []
      }
    ];
  };

  // Helper to update a specific item within a column
  const handleUpdateColumnItem = (blockId: string, colIdx: number, itemIdx: number, updatedFields: Partial<ColumnContent>) => {
    const block = (variables.blocks || []).find(b => b.id === blockId);
    if (!block) return;

    const blockCols = [...getBlockColumns(block)];
    const colItem = blockCols[colIdx];
    if (!colItem) return;

    // Get current items
    const currentItems = colItem.items && colItem.items.length > 0
      ? [...colItem.items]
      : [{
          id: `item-${colItem.id || Date.now()}-0`,
          type: colItem.type || 'text',
          textStyle: colItem.textStyle || 'paragraph',
          text: colItem.text || '',
          fontSize: colItem.fontSize,
          imageUrl: colItem.imageUrl,
          imageAlt: colItem.imageAlt,
          imageWidth: colItem.imageWidth,
          imageFullWidth: colItem.imageFullWidth,
          buttons: colItem.buttons || []
        }];

    currentItems[itemIdx] = { ...currentItems[itemIdx], ...updatedFields };

    blockCols[colIdx] = {
      ...colItem,
      items: currentItems,
      // Sync first item for legacy backwards-compatibility 
      type: currentItems[0].type || 'text',
      text: currentItems[0].text,
      textStyle: currentItems[0].textStyle,
      fontSize: currentItems[0].fontSize,
      imageUrl: currentItems[0].imageUrl,
      imageAlt: currentItems[0].imageAlt,
      imageWidth: currentItems[0].imageWidth,
      imageFullWidth: currentItems[0].imageFullWidth,
      buttons: currentItems[0].buttons
    };

    const updatedBlockFields: Partial<EmailBlock> = {
      columns: blockCols,
      columnsCount: blockCols.length
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

  const handleAddColumnItem = (blockId: string, colIdx: number, type: 'text' | 'image' | 'button-group') => {
    const block = (variables.blocks || []).find(b => b.id === blockId);
    if (!block) return;

    const blockCols = [...getBlockColumns(block)];
    const colItem = blockCols[colIdx];
    if (!colItem) return;

    const currentItems = colItem.items && colItem.items.length > 0
      ? [...colItem.items]
      : [{
          id: `item-${colItem.id || Date.now()}-0`,
          type: colItem.type || 'text',
          textStyle: colItem.textStyle || 'paragraph',
          text: colItem.text || '',
          fontSize: colItem.fontSize,
          imageUrl: colItem.imageUrl,
          imageAlt: colItem.imageAlt,
          imageWidth: colItem.imageWidth,
          imageFullWidth: colItem.imageFullWidth,
          buttons: colItem.buttons || []
        }];

    let newItem: any;
    if (type === 'text') {
      newItem = {
        id: `item-${Date.now()}-${currentItems.length}`,
        type: 'text',
        textStyle: 'paragraph',
        text: 'Escribe más texto aquí...',
        fontSize: ''
      };
    } else if (type === 'image') {
      newItem = {
        id: `item-${Date.now()}-${currentItems.length}`,
        type: 'image',
        imageUrl: 'https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280',
        imageWidth: '200',
        imageAlt: 'Imagen'
      };
    } else {
      newItem = {
        id: `item-${Date.now()}-${currentItems.length}`,
        type: 'button-group',
        buttons: [{ id: `btn-${Date.now()}`, text: 'BOTÓN NUEVO', url: '%%URL%%', style: 'solid-yellow' }]
      };
    }

    currentItems.push(newItem);

    blockCols[colIdx] = {
      ...colItem,
      items: currentItems,
      type: currentItems[0].type || 'text',
      text: currentItems[0].text,
      textStyle: currentItems[0].textStyle,
      fontSize: currentItems[0].fontSize,
      imageUrl: currentItems[0].imageUrl,
      imageAlt: currentItems[0].imageAlt,
      imageWidth: currentItems[0].imageWidth,
      imageFullWidth: currentItems[0].imageFullWidth,
      buttons: currentItems[0].buttons
    };

    const updatedBlockFields: Partial<EmailBlock> = {
      columns: blockCols,
      columnsCount: blockCols.length
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
    setActiveColDropdown(null);
  };

  const handleDeleteColumnItem = (blockId: string, colIdx: number, itemIdx: number) => {
    const block = (variables.blocks || []).find(b => b.id === blockId);
    if (!block) return;

    const blockCols = [...getBlockColumns(block)];
    const colItem = blockCols[colIdx];
    if (!colItem) return;

    const currentItems = colItem.items && colItem.items.length > 0
      ? [...colItem.items]
      : [{
          id: `item-${colItem.id || Date.now()}-0`,
          type: colItem.type || 'text',
          textStyle: colItem.textStyle || 'paragraph',
          text: colItem.text || '',
          fontSize: colItem.fontSize,
          imageUrl: colItem.imageUrl,
          imageAlt: colItem.imageAlt,
          imageWidth: colItem.imageWidth,
          imageFullWidth: colItem.imageFullWidth,
          buttons: colItem.buttons || []
        }];

    if (currentItems.length <= 1) return; // Must have at least 1 element

    currentItems.splice(itemIdx, 1);

    blockCols[colIdx] = {
      ...colItem,
      items: currentItems,
      type: currentItems[0].type || 'text',
      text: currentItems[0].text,
      textStyle: currentItems[0].textStyle,
      fontSize: currentItems[0].fontSize,
      imageUrl: currentItems[0].imageUrl,
      imageAlt: currentItems[0].imageAlt,
      imageWidth: currentItems[0].imageWidth,
      imageFullWidth: currentItems[0].imageFullWidth,
      buttons: currentItems[0].buttons
    };

    const updatedBlockFields: Partial<EmailBlock> = {
      columns: blockCols,
      columnsCount: blockCols.length
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

  const handleMoveColumnItem = (blockId: string, colIdx: number, itemIdx: number, direction: 'up' | 'down') => {
    const block = (variables.blocks || []).find(b => b.id === blockId);
    if (!block) return;

    const blockCols = [...getBlockColumns(block)];
    const colItem = blockCols[colIdx];
    if (!colItem) return;

    const currentItems = colItem.items && colItem.items.length > 0
      ? [...colItem.items]
      : [{
          id: `item-${colItem.id || Date.now()}-0`,
          type: colItem.type || 'text',
          textStyle: colItem.textStyle || 'paragraph',
          text: colItem.text || '',
          fontSize: colItem.fontSize,
          imageUrl: colItem.imageUrl,
          imageAlt: colItem.imageAlt,
          imageWidth: colItem.imageWidth,
          imageFullWidth: colItem.imageFullWidth,
          buttons: colItem.buttons || []
        }];

    const targetIdx = direction === 'up' ? itemIdx - 1 : itemIdx + 1;
    if (targetIdx < 0 || targetIdx >= currentItems.length) return;

    const temp = currentItems[itemIdx];
    currentItems[itemIdx] = currentItems[targetIdx];
    currentItems[targetIdx] = temp;

    blockCols[colIdx] = {
      ...colItem,
      items: currentItems,
      type: currentItems[0].type || 'text',
      text: currentItems[0].text,
      textStyle: currentItems[0].textStyle,
      fontSize: currentItems[0].fontSize,
      imageUrl: currentItems[0].imageUrl,
      imageAlt: currentItems[0].imageAlt,
      imageWidth: currentItems[0].imageWidth,
      imageFullWidth: currentItems[0].imageFullWidth,
      buttons: currentItems[0].buttons
    };

    const updatedBlockFields: Partial<EmailBlock> = {
      columns: blockCols,
      columnsCount: blockCols.length
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

  const handleFieldChange = (key: keyof EmailVariables, value: any) => {
    onChange({
      ...variables,
      [key]: value
    });
  };

  const handleReset = () => {
    if (window.confirm("¿Estás seguro de que quieres restablecer los valores originales del correo de Buchanan's? El editor volverá a la estructura de bloques de ejemplo.")) {
      onChange({ ...DEFAULT_EMAIL_VARIABLES });
      setImportStatus(null);
    }
  };

  const handleRestoreTexture = () => {
    handleFieldChange('backgroundTextureUrl', OFFICIAL_TEXTURE_URL);
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
      const match = content.match(/<!-- BUCHANANS_EMAIL_DATA_START:(.*?):BUCHANANS_EMAIL_DATA_END -->/);
      if (match && match[1]) {
        try {
          // Decode Base64 safely supporting UTF-8 accents
          const jsonStr = decodeURIComponent(escape(atob(match[1].trim())));
          const importedVars = JSON.parse(jsonStr) as EmailVariables;
          
          onChange(importedVars);
          setImportStatus({
            success: true,
            message: `¡Correo "${importedVars.subject}" importado con éxito! Se restauraron ${importedVars.blocks?.length || 0} bloques reordenables.`
          });
        } catch (err) {
          setImportStatus({
            success: false,
            message: "Error al descodificar la firma digital de datos. El archivo podría estar dañado."
          });
        }
      } else {
        // Fallback: Check if it's a raw JSON backup
        try {
          const parsed = JSON.parse(content) as EmailVariables;
          if (parsed && typeof parsed === 'object' && parsed.subject && parsed.blocks) {
            onChange(parsed);
            setImportStatus({
              success: true,
              message: "¡Copia de respaldo JSON cargada correctamente!"
            });
            return;
          }
        } catch (_) {}

        setImportStatus({
          success: false,
          message: "No se encontró la firma digital de Buchanan's en este archivo. Asegúrate de importar un archivo .html exportado por este constructor."
        });
      }
    };
    reader.readAsText(file);
    // Reset file input value so same file can be selected again
    e.target.value = '';
  };

  // --- Dynamic Block Manager Helpers ---
  const handleAddBlock = (type: 'text' | 'image' | 'button-group' | 'columns') => {
    const newId = `block-${Date.now()}`;
    let newBlock: EmailBlock;
    
    if (type === 'text') {
      newBlock = {
        id: newId,
        type: 'text',
        textStyle: 'paragraph',
        text: 'Escribe tu nuevo texto corporativo aquí.'
      };
    } else if (type === 'image') {
      newBlock = {
        id: newId,
        type: 'image',
        imageUrl: 'https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280',
        imageAlt: 'Nueva Imagen de Campaña',
        imageWidth: '536'
      };
    } else if (type === 'button-group') {
      newBlock = {
        id: newId,
        type: 'button-group',
        buttons: [
          {
            id: `btn-${Date.now()}-1`,
            text: 'MÁS INFORMACIÓN',
            url: '%%URL_NUEVA%%',
            style: 'solid-yellow'
          }
        ]
      };
    } else {
      // 2 Columns default block
      newBlock = {
        id: newId,
        type: 'columns',
        columnsCount: 2,
        columns: [
          {
            id: `col-${Date.now()}-1`,
            type: 'text',
            textStyle: 'paragraph',
            text: '<strong>Columna Izquierda:</strong> Diseños de doble columna ideales para activaciones geográficas.'
          },
          {
            id: `col-${Date.now()}-2`,
            type: 'text',
            textStyle: 'paragraph',
            text: '<strong>Columna Derecha:</strong> Mueve tus composiciones y ajusta el contenido.'
          }
        ]
      };
    }
    
    handleFieldChange('blocks', [...(variables.blocks || []), newBlock]);
  };

  const handleDeleteBlock = (id: string) => {
    const newBlocks = (variables.blocks || []).filter(block => block.id !== id);
    handleFieldChange('blocks', newBlocks);
  };

  const handleMoveBlockUp = (index: number) => {
    if (index === 0) return;
    const newBlocks = [...(variables.blocks || [])];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[index - 1];
    newBlocks[index - 1] = temp;
    handleFieldChange('blocks', newBlocks);
  };

  const handleMoveBlockDown = (index: number) => {
    if (!variables.blocks || index === variables.blocks.length - 1) return;
    const newBlocks = [...variables.blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[index + 1];
    newBlocks[index + 1] = temp;
    handleFieldChange('blocks', newBlocks);
  };

  const handleUpdateBlock = (id: string, updatedFields: Partial<EmailBlock>) => {
    const newBlocks = (variables.blocks || []).map(b => {
      if (b.id === id) {
        return { ...b, ...updatedFields };
      }
      return b;
    });
    handleFieldChange('blocks', newBlocks);
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
          type: block.type === 'columns' ? 'text' : block.type,
          textStyle: block.textStyle || 'paragraph',
          text: block.text || 'Contenido inicial migrado.',
          imageUrl: block.imageUrl,
          imageAlt: block.imageAlt,
          imageWidth: block.imageWidth,
          buttons: block.buttons || []
        }
      ];
    }

    if (count > updatedCols.length) {
      // Add more default columns
      for (let i = updatedCols.length; i < count; i++) {
        updatedCols.push({
          id: `col-new-${Date.now()}-${i}`,
          type: 'text',
          textStyle: 'paragraph',
          text: `Contenido Columna ${i + 1}`,
          imageUrl: 'https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280',
          imageAlt: 'Imagen default',
          imageWidth: '200'
        });
      }
    } else if (count < updatedCols.length) {
      // Trim columns
      updatedCols = updatedCols.slice(0, count);
    }

    handleUpdateBlock(block.id, {
      type: 'columns',
      columnsCount: count,
      columns: updatedCols
    });
  };

  // Move individual columns left or right (Left-to-right alignment and ordering!)
  const handleMoveColumnInBlock = (blockId: string, colIndex: number, direction: 'left' | 'right') => {
    const block = (variables.blocks || []).find(b => b.id === blockId);
    if (!block || !block.columns) return;

    const newCols = [...block.columns];
    const targetIdx = direction === 'left' ? colIndex - 1 : colIndex + 1;
    
    if (targetIdx < 0 || targetIdx >= newCols.length) return;

    const temp = newCols[colIndex];
    newCols[colIndex] = newCols[targetIdx];
    newCols[targetIdx] = temp;

    handleUpdateBlock(blockId, { columns: newCols });
  };

  // --- Format inline text tailors ---
  const applyColumnTextFormat = (blockId: string, colIdx: number, tagStart: string, tagEnd: string) => {
    const element = document.getElementById(`editor-${blockId}-col-${colIdx}`) as HTMLTextAreaElement | null;
    if (!element) return;

    const start = element.selectionStart || 0;
    const end = element.selectionEnd || 0;

    const blockIndex = (variables.blocks || []).findIndex(b => b.id === blockId);
    if (blockIndex === -1) return;

    const currentBlock = variables.blocks[blockIndex];
    const columnList = currentBlock.columns || [];
    const currentCol = columnList[colIdx];
    if (!currentCol) return;

    const textVal = currentCol.text || '';
    const selectedText = textVal.substring(start, end);
    const defaultValue = currentCol.textStyle === 'eyebrow' ? 'TEXTO' : 'texto';
    const replacement = tagStart + (selectedText || defaultValue) + tagEnd;
    const newValue = textVal.substring(0, start) + replacement + textVal.substring(end);

    const updatedCols = [...columnList];
    updatedCols[colIdx] = { ...currentCol, text: newValue };
    
    handleUpdateBlock(blockId, { columns: updatedCols });

    setTimeout(() => {
      element.focus();
      const newCursorPos = start + tagStart.length;
      element.setSelectionRange(
        newCursorPos, 
        newCursorPos + (selectedText ? selectedText.length : defaultValue.length)
      );
    }, 50);
  };

  const applySingleBlockFormat = (blockId: string, tagStart: string, tagEnd: string) => {
    const element = document.getElementById(`editor-${blockId}`) as HTMLTextAreaElement | null;
    if (!element) return;

    const start = element.selectionStart || 0;
    const end = element.selectionEnd || 0;
    
    const blockIndex = (variables.blocks || []).findIndex(b => b.id === blockId);
    if (blockIndex === -1) return;

    const currentBlock = variables.blocks[blockIndex];
    const text = currentBlock.text || '';
    
    const selectedText = text.substring(start, end);
    const defaultValue = currentBlock.textStyle === 'eyebrow' ? 'TEXTO' : 'texto';
    const replacement = tagStart + (selectedText || defaultValue) + tagEnd;
    const newValue = text.substring(0, start) + replacement + text.substring(end);

    handleUpdateBlock(blockId, { text: newValue });

    setTimeout(() => {
      element.focus();
      const newCursorPos = start + tagStart.length;
      element.setSelectionRange(
        newCursorPos, 
        newCursorPos + (selectedText ? selectedText.length : defaultValue.length)
      );
    }, 50);
  };

  // Format Toolbar
  const TextFormatToolbar = ({ blockId, colIdx }: { blockId: string; colIdx?: number }) => (
    <div className="flex flex-wrap items-center gap-1.5 p-2 bg-neutral-950 border border-neutral-800 rounded-t-lg border-b-0">
      <button
        type="button"
        onClick={() => colIdx !== undefined ? applyColumnTextFormat(blockId, colIdx, '<strong>', '</strong>') : applySingleBlockFormat(blockId, '<strong>', '</strong>')}
        className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850 rounded text-xs font-bold font-mono text-neutral-300 hover:text-white transition-colors"
        title="Negrita (<strong>)"
      >
        N
      </button>
      <button
        type="button"
        onClick={() => colIdx !== undefined ? applyColumnTextFormat(blockId, colIdx, '<em>', '</em>') : applySingleBlockFormat(blockId, '<em>', '</em>')}
        className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850 rounded text-xs italic font-mono text-neutral-300 hover:text-white transition-colors"
        title="Cursiva (<em>)"
      >
        K
      </button>
      <div className="h-4 w-px bg-neutral-800 my-0.5 mx-0.5"></div>
      
      <span className="text-[10px] text-neutral-500 mr-1 uppercase tracking-wider font-semibold">Color:</span>
      <button
        type="button"
        onClick={() => colIdx !== undefined ? applyColumnTextFormat(blockId, colIdx, '<span style="color:#fffd48;">', '</span>') : applySingleBlockFormat(blockId, '<span style="color:#fffd48;">', '</span>')}
        className="w-3.5 h-3.5 rounded-full border border-neutral-700 bg-[#fffd48] hover:scale-110 transition-transform"
        title="Amarillo Brand (#fffd48)"
      />
      <button
        type="button"
        onClick={() => colIdx !== undefined ? applyColumnTextFormat(blockId, colIdx, '<span style="color:#015D2F;">', '</span>') : applySingleBlockFormat(blockId, '<span style="color:#015D2F;">', '</span>')}
        className="w-3.5 h-3.5 rounded-full border border-neutral-700 bg-[#015D2F] hover:scale-110 transition-transform"
        title="Verde Brand (#015D2F)"
      />
      <button
        type="button"
        onClick={() => colIdx !== undefined ? applyColumnTextFormat(blockId, colIdx, '<span style="color:#cc0000;">', '</span>') : applySingleBlockFormat(blockId, '<span style="color:#cc0000;">', '</span>')}
        className="w-3.5 h-3.5 rounded-full border border-neutral-700 bg-[#cc0000] hover:scale-110 transition-transform"
        title="Rojo Sello Seal (#cc0000)"
      />
      <button
        type="button"
        onClick={() => colIdx !== undefined ? applyColumnTextFormat(blockId, colIdx, '<span style="color:#FFFFFF;">', '</span>') : applySingleBlockFormat(blockId, '<span style="color:#FFFFFF;">', '</span>')}
        className="w-3.5 h-3.5 rounded-full border border-neutral-700 bg-[#FFFFFF] hover:scale-110 transition-transform"
        title="Blanco (#FFFFFF)"
      />
    </div>
  );

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-white space-y-6 animate-fadeIn" id="email-form">
      {/* Header with Import Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-4 gap-3">
        <div className="flex items-center space-x-3">
          <Edit3 className="text-yellow-400 w-6 h-6 shrink-0" />
          <div>
            <h2 className="text-lg font-black tracking-tight text-white uppercase">Constructor de Campañas</h2>
            <p className="text-xs text-neutral-450">Estructuras modulares, multi-columnas y restaurables</p>
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
        <div className={`p-4 rounded-xl text-xs flex items-start space-x-2 border animate-fadeIn ${
          importStatus.success 
            ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-300' 
            : 'bg-red-950/20 border-red-900/40 text-red-300'
        }`}>
          <FileCode className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold block mb-0.5">{importStatus.success ? 'Estado: Importación Exitosa' : 'Estado: Error al importar'}</span>
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
              Asunto del Email (Subject Line)
            </label>
            <input 
              type="text"
              value={variables.subject}
              onChange={(e) => handleFieldChange('subject', e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-yellow-400 transition-colors"
              placeholder="Asunto para el bucle de envío"
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
              onChange={(e) => handleFieldChange('backgroundTextureUrl', e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-yellow-400 transition-colors font-mono"
              placeholder="URL de la textura"
            />
          </div>
        </div>

        {/* Brand Header Logo Config */}
        <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-850">
          <div className="flex items-center space-x-2 text-yellow-400 border-b border-neutral-850 pb-2 mb-3">
            <Link2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wide text-neutral-200">Identidad de Cabecera</span>
          </div>
          <div className="grid grid-cols-1 gap-3 text-xs">
            <div>
              <label className="block text-neutral-400 mb-1">URL Logo Corporativo (Cabecera Verde Oficial)</label>
              <input 
                type="text"
                value={variables.logoUrl}
                onChange={(e) => handleFieldChange('logoUrl', e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-400 font-mono"
              />
            </div>
          </div>
        </div>

        {/* BLOCKS SECTION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">Bloques de Contenido Ordenables</span>
            </div>
            <span className="text-[10px] bg-yellow-950/40 border border-yellow-900 text-yellow-400 px-2 py-0.5 rounded-full font-mono">
              Fy26 Editor
            </span>
          </div>

          {/* List of Blocks */}
          <div className="space-y-4">
            {(!variables.blocks || variables.blocks.length === 0) ? (
              <div className="p-8 border border-dashed border-neutral-800 text-center rounded-xl bg-neutral-950/25">
                <p className="text-xs text-neutral-500">No hay bloques agregados. Utiliza los botones inferiores para comenzar.</p>
              </div>
            ) : (
              variables.blocks.map((block, index) => {
                const totalCols = block.columnsCount || 1;
                const isColumnsType = true; // Always enable deep column/nesting layouts for all blocks
                const isActiveBlock = activeColDropdown && activeColDropdown.blockId === block.id;

                return (
                  <div 
                    key={block.id} 
                    className={`bg-neutral-950 border border-neutral-800 rounded-xl shadow-md hover:border-neutral-700 transition-all flex flex-col pt-3 ${isActiveBlock ? 'z-30 relative' : 'relative z-10'}`}
                  >
                    {/* Block Toolbar */}
                    <div className="px-4 pb-2.5 border-b border-neutral-900 flex items-center justify-between flex-wrap gap-2 text-xs">
                      <div className="flex items-center space-x-2.5">
                        <span className="text-[10px] font-mono text-neutral-500 bg-neutral-900 px-1.5 py-0.5 rounded-md border border-neutral-800">
                          #{index + 1}
                        </span>
                        
                        <div className="flex items-center space-x-1.5">
                          {/* Columns switcher (1, 2, or 3 columns design!) */}
                          <span className="text-[10px] text-neutral-450 uppercase font-bold">Columnas:</span>
                          <div className="flex bg-neutral-900 border border-neutral-850 p-0.5 rounded-md">
                            {[1, 2, 3].map((colsCount) => (
                              <button
                                key={colsCount}
                                type="button"
                                onClick={() => handleUpdateBlockColumnsCount(block, colsCount)}
                                className={`px-1.5 py-0.5 text-[9px] font-mono rounded font-bold transition-all ${
                                  totalCols === colsCount
                                    ? 'bg-yellow-400 text-black'
                                    : 'text-neutral-500 hover:text-white'
                                }`}
                              >
                                {colsCount} Col
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Move block up/down and remove */}
                      <div className="flex items-center space-x-1">
                        <button
                          type="button"
                          onClick={() => handleMoveBlockUp(index)}
                          disabled={index === 0}
                          className={`p-1.5 rounded bg-neutral-900 border border-neutral-850 hover:bg-neutral-800 transition-colors ${index === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                          title="Subir bloque"
                        >
                          <ArrowUp className="w-3.5 h-3.5 text-neutral-300 hover:text-white" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveBlockDown(index)}
                          disabled={index === variables.blocks.length - 1}
                          className={`p-1.5 rounded bg-neutral-900 border border-neutral-850 hover:bg-neutral-800 transition-colors ${index === variables.blocks.length - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
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

                    {/* Block Editor Frame */}
                    <div className="p-4 space-y-4">
                      
                      {/* RENDER DYNAMIC GRID FOR MULTI-COLUMNS IF ENABLED */}
                      {isColumnsType && (
                        <div className={`grid grid-cols-1 md:grid-cols-${totalCols === 3 ? '3' : '2'} gap-4`}>
                          {Array.from({ length: totalCols }).map((_, colIdx) => {
                            const colsList = block.columns || [];
                            const colItem = (colsList && colsList[colIdx]) || { 
                              id: `col-${colIdx}`, 
                              type: block.type === 'columns' ? 'text' : block.type, 
                              textStyle: block.textStyle || 'paragraph', 
                              text: block.text || '',
                              fontSize: block.fontSize,
                              imageUrl: block.imageUrl,
                              imageAlt: block.imageAlt,
                              imageWidth: block.imageWidth,
                              imageFullWidth: block.imageFullWidth,
                              buttons: block.buttons || []
                            };

                            const items = colItem.items && colItem.items.length > 0
                              ? colItem.items
                              : [{
                                  id: `col-item-${colItem.id || Date.now()}-0`,
                                  type: colItem.type || 'text',
                                  textStyle: colItem.textStyle || 'paragraph',
                                  text: colItem.text || '',
                                  fontSize: colItem.fontSize,
                                  imageUrl: colItem.imageUrl,
                                  imageAlt: colItem.imageAlt,
                                  imageWidth: colItem.imageWidth,
                                  imageFullWidth: colItem.imageFullWidth,
                                  buttons: colItem.buttons || []
                                }];

                            return (
                              <div 
                                key={colItem.id || colIdx} 
                                className="bg-neutral-900/45 border border-neutral-850 p-4 rounded-xl space-y-4 relative"
                              >
                                {/* Column Header (Column # layout shift) */}
                                <div className="flex items-center justify-between border-b border-neutral-850 pb-2">
                                  <span className="text-xs font-black text-[#fffd48] uppercase tracking-wide">COLUMNA {colIdx + 1}</span>
                                  
                                  {/* Left and Right order movers! (Shifting elements in the columns grid) */}
                                  <div className="flex items-center space-x-1">
                                    <button
                                      type="button"
                                      disabled={colIdx === 0}
                                      onClick={() => handleMoveColumnInBlock(block.id, colIdx, 'left')}
                                      className={`p-1 bg-neutral-950 border border-neutral-800 hover:bg-neutral-800 rounded transition-colors ${colIdx === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                                      title="Desplazar a la izquierda"
                                    >
                                      <ArrowLeft className="w-3 h-3 text-neutral-300" />
                                    </button>
                                    <button
                                      type="button"
                                      disabled={colIdx === totalCols - 1}
                                      onClick={() => handleMoveColumnInBlock(block.id, colIdx, 'right')}
                                      className={`p-1 bg-neutral-950 border border-neutral-800 hover:bg-neutral-800 rounded transition-colors ${colIdx === totalCols - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
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
                                            <span className="font-bold text-neutral-500 uppercase">Recurso {itemIdx + 1}:</span>
                                            <select
                                              value={item.type}
                                              onChange={(e) => {
                                                handleUpdateColumnItem(block.id, colIdx, itemIdx, { 
                                                  type: e.target.value as any,
                                                  text: item.text || 'Escribe contenido...',
                                                  textStyle: item.textStyle || 'paragraph',
                                                  imageUrl: item.imageUrl || 'https://lh3.googleusercontent.com/sitesv/AA5AbUCUco53xUjt7tXUhMPGDCJABtGMgLaT8IoLiy3FP62g5RlEvjJJy3aefyycT4bcIH5qAfFxhdLvxUt9irK_ftuAZw1HOBuRVjYvJ9OORBRcDg634zL5gv7caFLNkQQmJ29X8POrF0y29F20P84mBH1Ots7LZlS6QT-SzcacSQ_OAqCIjF7mcw-MoqbApSvL3EpQHT5H3ekSvu0heyOxQsWLEkATE7m7e1nKiy5M0=w1280',
                                                  imageWidth: item.imageWidth || '200',
                                                  imageAlt: item.imageAlt || 'Imagen',
                                                  buttons: item.buttons || [{ id: `btn-${Date.now()}`, text: 'BOTÓN', url: '%%URL%%', style: 'solid-yellow' }]
                                                });
                                              }}
                                              className="bg-neutral-900 border border-neutral-800 rounded px-1.5 py-0.5 text-[9px] text-neutral-300 font-semibold"
                                            >
                                              <option value="text">Texto</option>
                                              <option value="image">Imagen</option>
                                              <option value="button-group">Botones</option>
                                            </select>
                                          </div>

                                          {/* Move Up, Down and Delete icons */}
                                          <div className="flex items-center space-x-1">
                                            <button
                                              type="button"
                                              disabled={itemIdx === 0}
                                              onClick={() => handleMoveColumnItem(block.id, colIdx, itemIdx, 'up')}
                                              className={`p-1 bg-neutral-900 border border-neutral-850 hover:bg-neutral-800 rounded transition-colors ${itemIdx === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                                              title="Subir recurso"
                                            >
                                              <ArrowUp className="w-2.5 h-2.5 text-neutral-400 hover:text-white" />
                                            </button>
                                            <button
                                              type="button"
                                              disabled={itemIdx === items.length - 1}
                                              onClick={() => handleMoveColumnItem(block.id, colIdx, itemIdx, 'down')}
                                              className={`p-1 bg-neutral-900 border border-neutral-850 hover:bg-neutral-800 rounded transition-colors ${itemIdx === items.length - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
                                              title="Bajar recurso"
                                            >
                                              <ArrowDown className="w-2.5 h-2.5 text-neutral-400 hover:text-white" />
                                            </button>
                                            <button
                                              type="button"
                                              disabled={items.length <= 1}
                                              onClick={() => handleDeleteColumnItem(block.id, colIdx, itemIdx)}
                                              className={`p-1 bg-red-950/20 border border-red-900/30 hover:bg-red-900/40 rounded transition-colors text-red-400 ${items.length <= 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
                                              title="Eliminar recurso"
                                            >
                                              <Trash2 className="w-2.5 h-2.5" />
                                            </button>
                                          </div>
                                        </div>

                                        {/* EDIT TYPE SPECIFIC SUB-ELEMENT COMPONENT FIELDS */}
                                        {item.type === 'text' && (
                                          <div className="space-y-1.5">
                                            <div className="flex items-center justify-between text-[9px]">
                                              <div className="flex items-center space-x-1">
                                                <span className="text-neutral-500 uppercase font-bold">Estilo:</span>
                                                <select
                                                  value={item.textStyle || 'paragraph'}
                                                  onChange={(e) => handleUpdateColumnItem(block.id, colIdx, itemIdx, { textStyle: e.target.value as any })}
                                                  className="bg-neutral-900 border border-neutral-800 rounded px-1.5 py-0.5 text-[9px] text-yellow-350"
                                                >
                                                  <option value="eyebrow">Caja Alta</option>
                                                  <option value="headline">Título</option>
                                                  <option value="paragraph">Párrafo</option>
                                                </select>
                                              </div>
                                              <div className="flex items-center space-x-1">
                                                <span className="text-neutral-500 uppercase font-bold">Tamaño:</span>
                                                <select
                                                  value={item.fontSize || ''}
                                                  onChange={(e) => handleUpdateColumnItem(block.id, colIdx, itemIdx, { fontSize: e.target.value || undefined })}
                                                  className="bg-neutral-900 border border-neutral-800 rounded px-1.5 py-0.5 text-[9px] text-white"
                                                >
                                                  <option value="">Default</option>
                                                  <option value="11px">11px</option>
                                                  <option value="13px">13px</option>
                                                  <option value="14px">14px</option>
                                                  <option value="16px">16px</option>
                                                  <option value="18px">18px</option>
                                                  <option value="20px">20px</option>
                                                  <option value="24px">24px</option>
                                                  <option value="28px">28px</option>
                                                  <option value="32px">32px</option>
                                                  <option value="36px">36px</option>
                                                </select>
                                              </div>
                                            </div>

                                            {/* Column nested text format toolbar */}
                                            <div className="flex flex-wrap items-center gap-1 p-1 bg-neutral-900 border border-neutral-850 rounded-t-md border-b-0">
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const element = document.getElementById(`editor-${block.id}-col-${colIdx}-item-${itemIdx}`) as HTMLTextAreaElement | null;
                                                  if (!element) return;
                                                  const start = element.selectionStart || 0;
                                                  const end = element.selectionEnd || 0;
                                                  const textVal = item.text || '';
                                                  const selectedText = textVal.substring(start, end);
                                                  const replacement = '<strong>' + (selectedText || 'texto') + '</strong>';
                                                  const newValue = textVal.substring(0, start) + replacement + textVal.substring(end);
                                                  handleUpdateColumnItem(block.id, colIdx, itemIdx, { text: newValue });
                                                }}
                                                className="px-1.5 py-0.5 bg-neutral-955 border border-neutral-800 rounded text-[9px] font-bold font-mono text-neutral-300 hover:text-white transition-colors"
                                              >
                                                N
                                              </button>
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const element = document.getElementById(`editor-${block.id}-col-${colIdx}-item-${itemIdx}`) as HTMLTextAreaElement | null;
                                                  if (!element) return;
                                                  const start = element.selectionStart || 0;
                                                  const end = element.selectionEnd || 0;
                                                  const textVal = item.text || '';
                                                  const selectedText = textVal.substring(start, end);
                                                  const replacement = '<em>' + (selectedText || 'texto') + '</em>';
                                                  const newValue = textVal.substring(0, start) + replacement + textVal.substring(end);
                                                  handleUpdateColumnItem(block.id, colIdx, itemIdx, { text: newValue });
                                                }}
                                                className="px-1.5 py-0.5 bg-neutral-955 border border-neutral-800 rounded text-[9px] italic font-mono text-neutral-300 hover:text-white transition-colors"
                                              >
                                                K
                                              </button>
                                              <span className="text-[8px] text-neutral-500 uppercase tracking-wider font-semibold ml-1">Color:</span>
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const element = document.getElementById(`editor-${block.id}-col-${colIdx}-item-${itemIdx}`) as HTMLTextAreaElement | null;
                                                  if (!element) return;
                                                  const start = element.selectionStart || 0;
                                                  const end = element.selectionEnd || 0;
                                                  const textVal = item.text || '';
                                                  const selectedText = textVal.substring(start, end);
                                                  const replacement = '<span style="color:#fffd48;">' + (selectedText || 'texto') + '</span>';
                                                  const newValue = textVal.substring(0, start) + replacement + textVal.substring(end);
                                                  handleUpdateColumnItem(block.id, colIdx, itemIdx, { text: newValue });
                                                }}
                                                className="w-2.5 h-2.5 rounded-full border border-neutral-700 bg-[#fffd48] hover:scale-110 transition-transform"
                                              />
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const element = document.getElementById(`editor-${block.id}-col-${colIdx}-item-${itemIdx}`) as HTMLTextAreaElement | null;
                                                  if (!element) return;
                                                  const start = element.selectionStart || 0;
                                                  const end = element.selectionEnd || 0;
                                                  const textVal = item.text || '';
                                                  const selectedText = textVal.substring(start, end);
                                                  const replacement = '<span style="color:#015D2F;">' + (selectedText || 'texto') + '</span>';
                                                  const newValue = textVal.substring(0, start) + replacement + textVal.substring(end);
                                                  handleUpdateColumnItem(block.id, colIdx, itemIdx, { text: newValue });
                                                }}
                                                className="w-2.5 h-2.5 rounded-full border border-neutral-700 bg-[#015D2F] hover:scale-110 transition-transform"
                                              />
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const element = document.getElementById(`editor-${block.id}-col-${colIdx}-item-${itemIdx}`) as HTMLTextAreaElement | null;
                                                  if (!element) return;
                                                  const start = element.selectionStart || 0;
                                                  const end = element.selectionEnd || 0;
                                                  const textVal = item.text || '';
                                                  const selectedText = textVal.substring(start, end);
                                                  const replacement = '<span style="color:#FFFFFF;">' + (selectedText || 'texto') + '</span>';
                                                  const newValue = textVal.substring(0, start) + replacement + textVal.substring(end);
                                                  handleUpdateColumnItem(block.id, colIdx, itemIdx, { text: newValue });
                                                }}
                                                className="w-2.5 h-2.5 rounded-full border border-neutral-700 bg-[#FFFFFF] hover:scale-110 transition-transform"
                                              />
                                            </div>

                                            <textarea
                                              id={`editor-${block.id}-col-${colIdx}-item-${itemIdx}`}
                                              value={item.text || ''}
                                              onChange={(e) => handleUpdateColumnItem(block.id, colIdx, itemIdx, { text: e.target.value })}
                                              rows={2}
                                              placeholder="Escribe contenido de columna..."
                                              className="w-full bg-neutral-900 border border-neutral-800 rounded-b-md px-2 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-400 font-sans"
                                            />
                                          </div>
                                        )}

                                        {item.type === 'image' && (
                                          <div className="space-y-2 text-xs">
                                            <div>
                                              <label className="block text-neutral-500 text-[8px] uppercase mb-0.5">Enlace de Imagen</label>
                                              <input 
                                                type="text"
                                                value={item.imageUrl || ''}
                                                onChange={(e) => handleUpdateColumnItem(block.id, colIdx, itemIdx, { imageUrl: e.target.value })}
                                                className="w-full bg-neutral-900 border border-neutral-800 px-2 py-1 text-xs rounded text-neutral-200 font-mono focus:outline-none focus:border-yellow-400"
                                              />
                                            </div>
                                            <div className="flex items-center justify-between text-[9px] bg-neutral-900 p-1 rounded border border-neutral-850">
                                              <span className="text-neutral-500 uppercase font-bold">Resizing:</span>
                                              <select
                                                value={item.imageFullWidth ? 'full' : 'custom'}
                                                onChange={(e) => handleUpdateColumnItem(block.id, colIdx, itemIdx, { imageFullWidth: e.target.value === 'full' })}
                                                className="bg-neutral-850 border border-neutral-800 rounded px-1 py-0.5 text-[9px] text-emerald-400 font-bold focus:outline-none"
                                              >
                                                <option value="custom">Ancho Fijo PX</option>
                                                <option value="full">Ancho Completo (100%)</option>
                                              </select>
                                            </div>
                                            <div className="flex gap-2">
                                              <div className="w-1/2">
                                                <label className={`block text-neutral-500 text-[8px] uppercase mb-0.5 ${item.imageFullWidth ? 'opacity-30' : ''}`}>Ancho</label>
                                                <input 
                                                  type="text"
                                                  value={item.imageWidth || '200'}
                                                  disabled={!!item.imageFullWidth}
                                                  onChange={(e) => handleUpdateColumnItem(block.id, colIdx, itemIdx, { imageWidth: e.target.value })}
                                                  className="w-full bg-neutral-900 border border-neutral-800 px-2 py-1 rounded text-xs text-neutral-200 disabled:opacity-30"
                                                />
                                              </div>
                                              <div className="w-1/2">
                                                <label className="block text-neutral-500 text-[8px] uppercase mb-0.5">Texto Alt</label>
                                                <input 
                                                  type="text"
                                                  value={item.imageAlt || ''}
                                                  onChange={(e) => handleUpdateColumnItem(block.id, colIdx, itemIdx, { imageAlt: e.target.value })}
                                                  className="w-full bg-neutral-900 border border-neutral-800 px-2 py-1 rounded text-xs text-neutral-200"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        )}

                                        {item.type === 'button-group' && (
                                          <div className="space-y-2">
                                            {(item.buttons || []).map((btn, btnIdx) => (
                                              <div key={btn.id} className="bg-neutral-900 p-2 rounded border border-neutral-855 space-y-1 text-[9px]">
                                                <div className="flex justify-between font-bold text-yellow-400">
                                                  <span>Botón #{btnIdx+1}</span>
                                                  <button
                                                    type="button"
                                                    onClick={() => {
                                                      const filteredBtn = (item.buttons || []).filter(b => b.id !== btn.id);
                                                      handleUpdateColumnItem(block.id, colIdx, itemIdx, { buttons: filteredBtn });
                                                    }}
                                                    className="text-red-400 hover:underline text-[9px] cursor-pointer"
                                                  >
                                                    Borrar
                                                  </button>
                                                </div>
                                                <div className="flex items-center justify-between text-[8px] text-neutral-400 my-1">
                                                  <span>Tamaño:</span>
                                                  <select
                                                    value={btn.size || 'medium'}
                                                    onChange={(e) => {
                                                      const updatedButtons = (item.buttons || []).map(b => b.id === btn.id ? { ...b, size: e.target.value as any } : b);
                                                      handleUpdateColumnItem(block.id, colIdx, itemIdx, { buttons: updatedButtons });
                                                    }}
                                                    className="bg-neutral-850 border border-neutral-800 rounded px-1 py-0.5 text-[8px] text-emerald-400 font-bold focus:outline-none"
                                                  >
                                                    <option value="small">Pequeño</option>
                                                    <option value="medium">Mediano</option>
                                                    <option value="large">Grande</option>
                                                  </select>
                                                </div>
                                                <input 
                                                  type="text"
                                                  value={btn.text}
                                                  placeholder="Texto"
                                                  onChange={(e) => {
                                                    const updatedButtons = (item.buttons || []).map(b => b.id === btn.id ? { ...b, text: e.target.value } : b);
                                                    handleUpdateColumnItem(block.id, colIdx, itemIdx, { buttons: updatedButtons });
                                                  }}
                                                  className="w-full bg-neutral-950 border border-neutral-800 px-1.5 py-0.5 text-[10px] rounded text-white"
                                                />
                                                <input 
                                                  type="text"
                                                  value={btn.url}
                                                  placeholder="URL/Variable"
                                                  onChange={(e) => {
                                                    const updatedButtons = (item.buttons || []).map(b => b.id === btn.id ? { ...b, url: e.target.value } : b);
                                                    handleUpdateColumnItem(block.id, colIdx, itemIdx, { buttons: updatedButtons });
                                                  }}
                                                  className="w-full bg-neutral-950 border border-neutral-800 px-1.5 py-0.5 text-[9px] rounded text-white font-mono"
                                                />
                                              </div>
                                            ))}

                                            {(item.buttons || []).length < 2 && (
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const newBtn: ButtonConfig = {
                                                    id: `btn-col-${Date.now()}-${colIdx}`,
                                                    text: 'Botón',
                                                    url: '%%URL%%',
                                                    style: 'solid-yellow'
                                                  };
                                                  handleUpdateColumnItem(block.id, colIdx, itemIdx, { buttons: [...(item.buttons || []), newBtn] });
                                                }}
                                                className="w-full py-1 bg-neutral-900 border border-dashed border-neutral-800 text-[9px] text-neutral-400 hover:text-white rounded transition-colors"
                                              >
                                                + Agregar Botón
                                              </button>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>

                                {/* ADD ELEMENT "+" DROPDOWN SELECTOR */}
                                <div className="relative flex justify-center mt-2 pt-2 border-t border-neutral-850">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const active = activeColDropdown && activeColDropdown.blockId === block.id && activeColDropdown.colIdx === colIdx;
                                      setActiveColDropdown(active ? null : { blockId: block.id, colIdx });
                                    }}
                                    className="flex items-center space-x-1 px-3 py-1.5 bg-neutral-950 border border-neutral-800 hover:border-yellow-400 hover:bg-neutral-900 rounded-lg text-xs font-bold text-neutral-300 hover:text-white transition-all cursor-pointer"
                                  >
                                    <Plus className="w-3.5 h-3.5 text-yellow-400" />
                                    <span>Añadir Elemento</span>
                                  </button>
                                  
                                  {activeColDropdown && activeColDropdown.blockId === block.id && activeColDropdown.colIdx === colIdx && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-44 bg-neutral-950 border border-neutral-800 rounded-lg shadow-2xl py-1 z-50">
                                      <button
                                        type="button"
                                        onClick={() => handleAddColumnItem(block.id, colIdx, 'text')}
                                        className="w-full text-left px-3 py-2 text-xs hover:bg-neutral-900 text-neutral-200 hover:text-white flex items-center space-x-2 transition-colors cursor-pointer"
                                      >
                                        <Type className="w-3.5 h-3.5 text-yellow-400" />
                                        <span>Añadir Texto</span>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleAddColumnItem(block.id, colIdx, 'image')}
                                        className="w-full text-left px-3 py-2 text-xs hover:bg-neutral-900 text-neutral-200 hover:text-white flex items-center space-x-2 transition-colors cursor-pointer"
                                      >
                                        <Image className="w-3.5 h-3.5 text-yellow-400" />
                                        <span>Añadir Imagen</span>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleAddColumnItem(block.id, colIdx, 'button-group')}
                                        className="w-full text-left px-3 py-2 text-xs hover:bg-neutral-900 text-neutral-200 hover:text-white flex items-center space-x-2 transition-colors cursor-pointer"
                                      >
                                        <ExternalLink className="w-3.5 h-3.5 text-yellow-400" />
                                        <span>Añadir Botones</span>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Creator buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => handleAddBlock('text')}
              className="flex items-center justify-center space-x-2 py-3 bg-neutral-950 border border-neutral-850 hover:border-neutral-700 hover:bg-neutral-900 rounded-xl transition-all font-bold text-xs hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <Type className="w-3.5 h-3.5 text-emerald-400" />
              <span>+ Texto</span>
            </button>
            <button
              type="button"
              onClick={() => handleAddBlock('image')}
              className="flex items-center justify-center space-x-2 py-3 bg-neutral-950 border border-neutral-850 hover:border-neutral-700 hover:bg-neutral-900 rounded-xl transition-all font-bold text-xs hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <Image className="w-3.5 h-3.5 text-emerald-400" />
              <span>+ Imagen</span>
            </button>
            <button
              type="button"
              onClick={() => handleAddBlock('button-group')}
              className="flex items-center justify-center space-x-2 py-3 bg-neutral-950 border border-neutral-850 hover:border-neutral-700 hover:bg-neutral-900 rounded-xl transition-all font-bold text-xs hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>+ Botones</span>
            </button>
            <button
              type="button"
              onClick={() => handleAddBlock('columns')}
              className="flex items-center justify-center space-x-2 py-3 bg-neutral-950 border border-neutral-850 hover:border-neutral-700 hover:bg-neutral-900 rounded-xl transition-all font-bold text-xs hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-[#fffd48]" />
              <span>+ Columnas</span>
            </button>
          </div>
        </div>

        {/* Legal regulatory disclaimer */}
        <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-850 space-y-3 text-xs">
          <div className="text-neutral-400 font-semibold border-b border-neutral-850 pb-1">
            <span>Nota de Cumplimiento Diageo</span>
          </div>
          <p className="text-neutral-500 text-[11px] leading-relaxed">
            El disclaimer legal exigido por el INVIMA se compila automáticamente al final del correo de forma garantizada y normativa.
          </p>
          <div className="text-neutral-500 font-mono text-[10px] bg-neutral-900 p-2.5 border border-neutral-800 rounded leading-relaxed">
            {variables.legalDisclaimer}
          </div>
        </div>

      </div>
    </div>
  );
}
