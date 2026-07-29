# syntax=docker/dockerfile:1

# =============================================================================
#  Stage 1 — build the static site
# =============================================================================
# Node is only needed here. Nothing from this stage reaches the final image
# except the exported HTML/CSS/JS, so the running container carries no Node
# runtime, no node_modules and no source code.
FROM node:22-alpine AS builder

WORKDIR /app

# Copy manifests first. Docker caches this layer, so `npm ci` only re-runs when
# dependencies actually change — not on every source edit.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# BUILD_STATIC flips next.config.ts to `output: "export"`; with the default
# distDir the exported site lands in /app/out.
ENV BUILD_STATIC=1
ENV NEXT_TELEMETRY_DISABLED=1
RUN npx next build


# =============================================================================
#  Stage 2 — serve
# =============================================================================
FROM nginx:1.27-alpine AS runner

# Static files only.
COPY --from=builder /app/out /usr/share/nginx/html

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/security-headers.conf /etc/nginx/snippets/security-headers.conf

EXPOSE 80

# Fail the container's health check if nginx stops serving, so Docker (or
# Portainer) restarts it rather than leaving a dead site up.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
