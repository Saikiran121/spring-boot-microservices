# Use an official Maven image to build the application
# Maven 3.8.6 with OpenJDK 11
FROM maven:3.8.6-openjdk-11 AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the source code and compile the application
COPY src ./src
RUN mvn package -DskipTests

# Use an official OpenJDK image to run the application
# OpenJDK 11
FROM openjdk:11-jre-slim

# Set the working directory
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/discovery-server-0.0.1-SNAPSHOT.jar /app/discovery-server.jar

# Expose the port the application will run on
EXPOSE 8761

# Run the application
ENTRYPOINT ["java", "-jar", "/app/discovery-server.jar"]
