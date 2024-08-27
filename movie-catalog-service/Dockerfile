# Use an official OpenJDK image as a base
FROM openjdk:11-jre-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven wrapper files
COPY mvnw.cmd .
COPY .mvn .mvn

# Copy the pom.xml to the working directory
COPY pom.xml .

# Download the project dependencies
RUN ./mvnw.cmd dependency:go-offline

# Copy the source code into the container
COPY src ./src

# Build the application
RUN ./mvnw.cmd package -DskipTests

# Expose the port that the application will run on
EXPOSE 8080

# Run the Spring Boot application
CMD ["java", "-jar", "target/movie-catalog-service-0.0.1-SNAPSHOT.jar"]
