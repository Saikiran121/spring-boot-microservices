# Use an official OpenJDK runtime as the base image
FROM adoptopenjdk:11-jre-hotspot

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Set the JAVA_OPTS environment variable for the application
ENV JAVA_OPTS="-Xms512M -Xmx512M"

# Run the application when the container starts
CMD ["java", "$JAVA_OPTS", "-jar", "movie-info-service.jar"]
