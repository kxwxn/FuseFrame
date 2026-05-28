const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#050608" rx="10" />
  <path d="M18 14h30v9H28v8h16v9H28v10H18V14Z" fill="#b8ff2c" />
  <rect x="45" y="45" width="9" height="9" fill="#ff5c35" />
</svg>`;

export function GET(): Response {
  return new Response(faviconSvg, {
    headers: {
      "content-type": "image/svg+xml",
      "cache-control": "public, max-age=86400",
    },
  });
}
