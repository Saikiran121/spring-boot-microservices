FROM openjdk:11

WORKDIR /app

COPY mvnw .mvn/wrapper/maven-wrapper.jar /app/
COPY .mvn/wrapper/maven-wrapper.properties /app/
COPY pom.xml /app/

WORKDIR /app
RUN ./mvnw -N io.takari:maven:wrapper -B
