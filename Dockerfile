# Stage 1: Build the Vite app
FROM node:20 AS build

WORKDIR /app

# 패키지 파일 복사 및 설치
COPY package*.json ./

# 기존 node_modules 제거 후 패키지 설치
RUN rm -rf node_modules package-lock.json && npm install --legacy-peer-deps

# Vite 애플리케이션 코드 복사 및 빌드
COPY . .
RUN rm -rf node_modules package-lock.json && npm install --legacy-peer-deps
RUN npm run build

# Stage 2: Serve the Vite app with Nginx
FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
