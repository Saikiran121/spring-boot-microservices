# Define the base image for the build stage
FROM maven:3.8.6-openjdk-11 AS build

# Set the working directory
WORKDIR /app

# Copy Maven Wrapper and configuration files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Make the Maven Wrapper executable
RUN chmod +x mvnw

# Copy source code
COPY src src

# Build the application, skipping tests
RUN ./mvnw clean package -DskipTests

# Define the base image for the runtime stage
FROM openjdk:11-jre-slim

# Set the working directory for runtime
WORKDIR /app

# Copy the built jar file from the build stage
COPY --from=build /app/target/movie-catalog-service.jar /app/movie-catalog-service.jar

# Expose the port the app runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "/app/movie-catalog-service.jar"]
