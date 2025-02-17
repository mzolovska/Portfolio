# Build Stage
FROM gradle:7.6 AS builder
WORKDIR /usr/src/app

# Copy Gradle Wrapper & Build Files First
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Copy source files
COPY src src

# Give execute permission to Gradle wrapper
RUN chmod +x gradlew

# Build the Spring Boot JAR file
RUN ./gradlew bootJar

# Production Stage
FROM openjdk:17
WORKDIR /app

# Copy the built JAR file from the builder stage
COPY --from=builder /usr/src/app/build/libs/*.jar app.jar

# Expose Port
EXPOSE 8080

# Set the default command to run the Spring Boot app
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
