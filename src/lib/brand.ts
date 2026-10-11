/** Single place for public contact details. Override the support address at build time with VITE_SUPPORT_EMAIL. */
export const SUPPORT_EMAIL: string =
  (import.meta.env.VITE_SUPPORT_EMAIL as string | undefined)?.trim() || 'diy.electronicsa@gmail.com';
