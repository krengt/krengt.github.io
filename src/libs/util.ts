export const buildTitle = (pageTitle: string): string => {
  const { SITE_NAME } = import.meta.env

  return `${pageTitle} - ${SITE_NAME}`
}