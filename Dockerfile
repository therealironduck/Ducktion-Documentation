FROM oven/bun:1 AS bun
WORKDIR /usr/src/app

USER bun
EXPOSE 5173/tcp

CMD ["bun", "run", "docs:dev", "--host 0.0.0.0"]
