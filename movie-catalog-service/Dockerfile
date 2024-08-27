# Use an official Maven image with JDK 11 as a base
FROM maven:3.8.1-openjdk-11-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code into the container and build the application
COPY src ./src
RUN mvn package -DskipTests

# Use the official OpenJDK image to run the application
FROM openjdk:11-jre-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/movie-catalog-service-0.0.1-SNAPSHOT.jar .

# Expose the port that the application will run on
EXPOSE 8080

# Run the Spring Boot application
CMD ["java", "-jar", "movie-catalog-service-0.0.1-SNAPSHOT.jar"]
