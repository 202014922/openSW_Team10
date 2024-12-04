FROM openjdk:17-jdk-alpine
VOLUME /tmp
COPY build/libs/model-0.0.1-SNAPSHOT.jar model.jar
ENTRYPOINT ["java","-jar","/model.jar"]