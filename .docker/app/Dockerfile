FROM node:22-bookworm-slim

ENV NODE_ENV=production
WORKDIR /app

RUN apt-get update \
	&& apt-get install -y --no-install-recommends python3 make g++ ca-certificates \
	&& rm -rf /var/lib/apt/lists/*

COPY bundle/ /app/

WORKDIR /app/programs/server
RUN npm install --omit=dev --no-audit --no-fund \
	&& npm cache clean --force

WORKDIR /app
EXPOSE 3000

CMD ["node", "main.js"]
