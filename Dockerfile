# Step 1: Build the application
FROM maven:3.8.5-openjdk-17 AS build
COPY . .
WORKDIR /tic-tac-toe-game
RUN mvn clean package -DskipTests

# Step 2: Run the application
FROM eclipse-temurin:17-jdk
COPY --from=build /Tic-Tac-Toe-Game/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]