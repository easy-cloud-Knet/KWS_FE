# Stage 1: Build the Vite app
FROM node:20 AS build

WORKDIR /app

# 패키지 파일 복사 및 설치
COPY package*.json ./

# 패키지 설치
RUN npm install --legacy-peer-deps

# Vite 애플리케이션 코드 복사
COPY . .

# 빌드 실행 전 환경 변수 설정 (타입 경로 인식)
ENV NODE_PATH=/app/node_modules

# Vite 빌드 실행
RUN npm run build

# Stage 2: Serve the Vite app with Nginx
FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
