# Stage 1: Build the Vite app
FROM node:20 AS build

WORKDIR /app

# 패키지 파일 복사 및 설치
COPY package*.json ./

# @types/axios 제거 후 패키지 설치
RUN npm uninstall @types/axios && npm install --legacy-peer-deps

# 타입 경로를 명시적으로 추가 (tsconfig.app.json 수정)
RUN echo '{ "extends": "./tsconfig.json", "compilerOptions": { "typeRoots": ["./node_modules/@types"] }, "include": ["src/**/*"] }' > tsconfig.app.json

# Vite 애플리케이션 코드 복사 및 빌드
COPY . .
RUN npm run build

# Stage 2: Serve the Vite app with Nginx
FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
