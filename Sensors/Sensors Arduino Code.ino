#include <DHT22.h>
#define pinDATA A3

DHT22 dht22(pinDATA); 

// Analog pins 
const int dht = A3; 
const int mq9a = A2; 
const int mq139a = A1; 
const int mq6a = A0; 

// Digital pins 
const int mq9d = 6; 
const int mq139d = 7; 
const int mq6d = 8; 

// Output pins 
const int mq9o = 10; 
const int mq139o = 11; 
const int mq6o = 12; 

void setup() {
    Serial.begin(9600);
    
    pinMode(mq9o, OUTPUT);
    pinMode(mq139o, OUTPUT);
    pinMode(mq6o, OUTPUT);
    
    pinMode(mq9d, INPUT);
    pinMode(mq139d, INPUT);
    pinMode(mq6d, INPUT);
}

void loop() {
    // Read analog values
    int mq9va = analogRead(mq9a);
    int mq139va = analogRead(mq139a);
    int mq6va = analogRead(mq6a);
     float t = dht22.getTemperature();
  float h = dht22.getHumidity();

    // Read digital values
    int mq9vd = digitalRead(mq9d);
    int mq139vd = digitalRead(mq139d);
    int mq6vd = digitalRead(mq6d);

    // Print sensor readings in valid JSON format
 Serial.print("{");
Serial.print("\"MQ9\": {\"Analog\": ");
Serial.print(mq9va);
Serial.print(", \"Digital\": ");
Serial.print(mq9vd);
Serial.print("}, ");

Serial.print("\"MQ139\": {\"Analog\": ");
Serial.print(mq139va);
Serial.print(", \"Digital\": ");
Serial.print(mq139vd);
Serial.print("}, ");

Serial.print("\"temp\": {\"Analog\": ");
Serial.print(t);
Serial.print("}, ");

Serial.print("\"hum\": {\"Analog\": ");
Serial.print(h);
Serial.print("}, ");

Serial.print("\"MQ6\": {\"Analog\": ");
Serial.print(mq6va);
Serial.print(", \"Digital\": ");
Serial.print(mq6vd);
Serial.print("}");
Serial.print("}");
Serial.println("");
 


    // Reverse LED logic
    digitalWrite(mq9o, !mq9vd);
    digitalWrite(mq139o, !mq139vd);
    digitalWrite(mq6o, !mq6vd);
    
    delay(1000);
}
