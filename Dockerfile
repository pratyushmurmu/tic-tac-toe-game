# Step 1: Build the application
FROM maven:3.8.5-openjdk-17 AS build
COPY . .
# Using * handles the spaces in "Tic-Tac-Toe Game" automatically
RUN mvn -f Tic-Tac-Toe*Game/pom.xml clean package -DskipTests

# Step 2: Run the application
FROM eclipse-temurin:17-jdk
# Using * here also avoids the quote-parsing error
COPY --from=build /Tic-Tac-Toe*Game/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]