import getConfig from "next/config";

export function buildUrl(path: string): string {
  const { publicRuntimeConfig = { root: '' } } = getConfig() || {};

  return publicRuntimeConfig.root + path;
}
