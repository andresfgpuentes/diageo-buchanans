/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ColorDefinition {
  name: string;
  hex: string;
  description: string;
  category: 'Night Mode' | 'DeLuxe' | 'Piña' | 'Green Seal';
}

export interface ButtonConfig {
  id: string;
  text: string;
  url: string;
  style: 'solid-yellow' | 'outline-yellow' | 'solid-green' | 'dark-outline';
  size?: 'small' | 'medium' | 'large'; // Custom button size (small, medium, large)
}

export interface ColumnItem {
  id: string;
  type: 'text' | 'image' | 'button-group' | 'custom-code';
  textStyle?: 'eyebrow' | 'headline' | 'paragraph';
  text?: string;
  fontSize?: string; // e.g. "14px", "18px", "24px", "32px"
  imageUrl?: string;
  imageAlt?: string;
  imageWidth?: string;
  imageFullWidth?: boolean; // toggle full width
  buttons?: ButtonConfig[];
  customHtml?: string; // Raw user custom HTML
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
}

export interface ColumnContent {
  id: string;
  type: 'text' | 'image' | 'button-group' | 'custom-code';
  textStyle?: 'eyebrow' | 'headline' | 'paragraph';
  text?: string;
  fontSize?: string; // e.g. "14px", "18px", "24px", "32px"
  imageUrl?: string;
  imageAlt?: string;
  imageWidth?: string;
  imageFullWidth?: boolean; // toggle full width
  buttons?: ButtonConfig[];
  customHtml?: string; // Raw user custom HTML
  items?: ColumnItem[]; // nested sub-elements
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
}

export interface EmailBlock {
  id: string;
  type: 'text' | 'image' | 'button-group' | 'columns' | 'custom-code' | 'form';
  textStyle?: 'eyebrow' | 'headline' | 'paragraph';
  text?: string;
  fontSize?: string; // e.g. "14px", "18px", "24px", "32px"
  imageUrl?: string;
  imageAlt?: string;
  imageWidth?: string;
  imageFullWidth?: boolean; // toggle full width
  buttons?: ButtonConfig[];
  customHtml?: string; // Raw user custom HTML
  items?: ColumnItem[]; // nested sub-elements
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  
  // Custom multi-column attributes (up to 3 columns)
  columnsCount?: number; // 1, 2, or 3 columns
  columns?: ColumnContent[];
  backgroundTextureUrl?: string; // per-section background texture URL
}

export interface EmailVariables {
  subject: string;
  logoUrl: string;
  backgroundTextureUrl: string;
  blocks: EmailBlock[];
  
  eyebrow: string;
  welcomeHeadline: string;
  paragraph1: string;
  paragraph2: string;
  buttonCasaText: string;
  buttonCasaUrl: string;
  buttonBarText: string;
  buttonBarUrl: string;
  legalDisclaimer: string;
  unsubscribeText: string;
  
  // Custom embedded images by URL
  heroImageUrl: string;
  heroImageAlt: string;
  heroImageWidth: string;
  showHeroImage: boolean;
  
  secondaryImageUrl: string;
  secondaryImageAlt: string;
  secondaryImageWidth: string;
  showSecondaryImage: boolean;
  
  // Dynamic replacement values for live play testing
  testFirstName: string;
  testConsumptionPreference: string;
  testCity: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  category: 'technical' | 'regulatory' | 'brand';
  checked: boolean;
}
