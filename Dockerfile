# Build: static pages + Node server for the contact form.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Read at build time (canonical URLs, sitemap, e-mail images, noindex, Umami).
ARG SITE_URL
ARG PUBLIC_PREVIEW=false
ARG PUBLIC_UMAMI_SRC
ARG PUBLIC_UMAMI_WEBSITE_ID
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4321
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist
USER node
EXPOSE 4321
CMD ["node", "dist/server/entry.mjs"]
