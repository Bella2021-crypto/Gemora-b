export function optimizeImage(url, { width = 500, height, crop = "fill" } = {}) {
  if (!url) return "";
  return url.replace(
    "/upload/",
    `/upload/w_${width}${height ? `,h_${height}` : ""},c_${crop},f_auto,q_auto/`
  );
}
