FROM openjdk:17-jdk-alpine
COPY . .
RUN chmod +x gradlew
RUN ./gradlew build
ENTRYPOINT ["java","-jar","build/libs/lixo-0.0.1.jar"]