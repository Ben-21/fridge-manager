FROM openjdk:17

ENV ENVIRONMENT=prod

LABEL maintainer="bs"

EXPOSE 8080

ADD backend/target/fridge-manager.jar app.jar

CMD [ "sh", "-c", "java -jar /app.jar" ]