# 이미지
FROM openjdk:latest

WORKDIR /app

COPY ./Travel .

# 7. 애플리케이션 실행을 위한 명령어 설정
ENTRYPOINT ["java", "-jar", "./build/libs/Travel-0.0.1-SNAPSHOT.jar"]

# 8. 컨테이너의 포트 노출
EXPOSE 8080