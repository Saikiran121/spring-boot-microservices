# Use an official Java 11 image as the base image
FROM openjdk:11

# Set the working directory to /app
WORKDIR /app

# Copy the Maven wrapper files
COPY mvnw .mvn/wrapper/maven-wrapper.jar .
COPY .mvn/wrapper/maven-wrapper.properties .

# Copy the pom.xml file
COPY pom.xml .

# Download the Maven wrapper JAR file
RUN ./mvnw -N io.takari:maven:wrapper -B

# Set the environment variables
ENV MAVEN_USERNAME=${MAVEN_USERNAME}
ENV MAVEN_PASSWORD=${MAVEN_PASSWORD}
ENV MAVEN_REPOURL=${MAVEN_REPOURL}

# Build the application using Maven
RUN ./mvnw clean package -DskipTests

# Copy the application JAR file
COPY target/discovery-server-0.0.1-SNAPSHOT.jar app.jar

# Expose the port
EXPOSE 8761

# Run the application when the container starts
CMD ["java", "-jar", "app.jar"]
