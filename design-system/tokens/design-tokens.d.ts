/**
 * Chill Cầu Design System — Token Types
 * Automatically generated from design-tokens.json
 */

export interface DesignTokens {
  _meta: {
    project: string;
    version: string;
    iteration: number;
    created: string;
    updated: string;
    description: string;
    changelog: string;
  };
  color: {
    primary: Record<"50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900", string>;
    accent: Record<"400" | "500" | "600" | "700", string>;
    danger: Record<"400" | "500" | "600", string>;
    warning: Record<"400" | "500" | "600", string>;
    neutral: Record<"50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900", string>;
    semantic: {
      "bg-page": string;
      "bg-surface": string;
      "bg-overlay": string;
      "text-primary": string;
      "text-secondary": string;
      "text-muted": string;
      "text-inverse": string;
      "text-link": string;
      "border-default": string;
      "border-focus": string;
      "color-accent": string;
      "color-success": string;
      "color-error": string;
      "color-warning": string;
    };
  };
  "level-badge": Record<string, { bg: string; text: string; border: string }>;
  typography: {
    "font-family": string;
    "font-size": Record<"xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl", string>;
    "font-weight": Record<"normal" | "medium" | "semibold" | "bold", number>;
    "line-height": Record<"tight" | "snug" | "normal" | "relaxed", number>;
  };
  spacing: Record<"space-xs" | "space-sm" | "space-md" | "space-lg" | "space-xl" | "space-2xl" | "space-3xl" | "space-4xl", string>;
  shadow: Record<"shadow-sm" | "shadow-md" | "shadow-lg" | "shadow-drag", string>;
  border: {
    radius: Record<"sm" | "md" | "lg" | "xl" | "full", string>;
  };
  breakpoint: Record<"xs" | "sm" | "md" | "lg" | "xl", string>;
  transition: Record<"fast" | "base" | "slow", string>;
  "z-index": Record<"dropdown" | "sticky" | "fixed" | "modal" | "toast" | "popover" | "tooltip", number>;
}

declare const tokens: DesignTokens;
export default tokens;
