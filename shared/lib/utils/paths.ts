/**
 * Utility function to get the base path for assets
 * This ensures images and other assets work correctly with GitHub Pages subdirectory deployment
 */
export const getAssetPath = (path: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Add basePath prefix
  return `/EmbassyWebsite/${cleanPath}`;
};

