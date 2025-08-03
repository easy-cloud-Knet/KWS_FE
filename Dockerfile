# Step 1: Build the Vite app
FROM node:20 AS build

WORKDIR /app

# 패키지 파일 복사 및 설치
COPY package*.json ./
RUN npm install --legacy-peer-deps

# 애플리케이션 코드 복사
COPY . .

# 빌드 시 환경 변수 설정
ARG VITE_API_DOMAIN
ENV VITE_API_DOMAIN=${VITE_API_DOMAIN}

# 애플리케이션 빌드
RUN npm run build

# Step 2: Serve the built app with Nginx
FROM nginx:latest

# Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/nginx.conf  

# React/Vite 빌드된 정적 파일 복사
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx 실행
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
