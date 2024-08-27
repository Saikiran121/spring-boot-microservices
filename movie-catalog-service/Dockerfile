# Use an official Maven image to build the application
FROM maven:3.8.6-openjdk-11 AS build

# Set the working directory
WORKDIR /app

# Copy Maven wrapper and Maven project files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Make the Maven wrapper executable
RUN chmod +x mvnw

# Copy the source code
COPY src src

# Run Maven to build the application
RUN ./mvnw clean package -DskipTests

# Use an official OpenJDK runtime as the base image for the runtime environment
FROM openjdk:11-jre-slim

# Set the working directory
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/movie-catalog-service-0.0.1-SNAPSHOT.jar /app/movie-catalog-service.jar

# Expose the port the application will run on
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "/app/movie-catalog-service.jar"]
