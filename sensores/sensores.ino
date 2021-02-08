#include "DHT.h" //Incluimos la biblioteca de nuestro sensor de humedad
#define DHTPIN 2 //Definimos el pin al cual vamos a conectar el sensor
#define DHTTYPE DHT11 // Definimos nuestro sensor
DHT dht(DHTPIN, DHTTYPE); // Creamos la variable la cual usara arduino para comunicarse con el sensor DHT11;
void setup() {
  Serial.begin(9600);//Iniciamos la comunicacion serial
  dht.begin(); //Inicializamos el sensor
}

void loop() {
  float h = dht.readHumidity(); //Leemos la humedad
  float t = dht.readTemperature();//Leemos la temperatura
  if(isnan(h)||isnan(t)){
    Serial.println("Error en lectura de datos de temperatura o humedad");
    return;
  }
  Serial.println("Temperatura: ");
  Serial.print(t);
  Serial.println();
  Serial.println("Humedad: ");
  Serial.print(h);
  Serial.println();
  delay(5000);//Esperamos 5 segundos para volver a leer datos
} 
