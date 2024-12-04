# Node.js 기반 이미지 사용
FROM node:latest

# 작업 디렉토리 설정
WORKDIR /app

# 소스 코드 복사
COPY ./Travel .

# React 앱을 빌드
ENTRYPOINT ["npm", "start"]

# React 앱 포트 설정
EXPOSE 3000