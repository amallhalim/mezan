import { colors } from './tokens';

/**
 * Unified Theme Configuration.
 * 
 * Instead of separate light and dark objects, we use semantic CSS variables
 * that automatically switch based on the user's system preferences.
 */
export const theme = {
    background: colors.theme.background,
    surface: colors.theme.surface,
    text: {
        primary: colors.theme.foreground,
        secondary: colors.theme.muted,
        muted: colors.theme.muted,
    },
    border: colors.theme.border,
    primary: colors.theme.primary,
};

export type Theme = typeof theme;
