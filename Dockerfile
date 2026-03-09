# Step 1: Build the application
FROM maven:3.8.5-openjdk-17 AS build
COPY . .
# We move directly into your project folder first
WORKDIR "/Tic-Tac-Toe Game"
RUN mvn clean package -DskipTests

# Step 2: Run the application
FROM eclipse-temurin:17-jdk
# We copy the JAR from the current build folder
COPY --from=build "/Tic-Tac-Toe Game/target/*.jar" app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]