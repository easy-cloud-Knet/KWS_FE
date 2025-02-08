# Stage 1: Setup the Vite development server
FROM node:20 AS dev

WORKDIR /app

# 패키지 파일 복사 및 설치
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Vite 애플리케이션 코드 복사
COPY . .

# Vite 개발 서버 실행
CMD ["npm", "run", "dev"]
