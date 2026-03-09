# Step 1: Build the application
FROM maven:3.8.5-openjdk-17 AS build
COPY . .
# We point Maven specifically to the pom.xml inside your sub-folder
RUN mvn -f "Tic-Tac-Toe Game/pom.xml" clean package -DskipTests

# Step 2: Run the application
FROM eclipse-temurin:17-jdk
# We copy the generated JAR from the sub-folder's target directory
COPY --from=build "/Tic-Tac-Toe Game/target/*.jar" app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]