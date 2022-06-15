//=========================================================
// DisplayElement
//=========================================================
interface DisplayElement {
  display(): void;
}

//=========================================================
// Subject
//=========================================================
interface Subject {
  registerObserver(o: Observer): void;
  removeObserver(o: Observer): void;
  notifyObservers(): void;
}

class WeatherData implements Subject {
  private observers: Observer[];
  private temperature: number;
  private humidity: number;
  private pressure: number;

  constructor() {
    this.observers = [];
  }

  registerObserver(o: Observer) {
    this.observers.push(o);
  }

  removeObserver(o: Observer) {
    const idx = this.observers.indexOf(o);
    this.observers.splice(idx, 1);
  }

  notifyObservers() {
    this.observers.forEach((o) => {
      o.update(this.temperature, this.humidity, this.pressure);
    });
  }

  measurementsChanged() {
    this.notifyObservers();
  }

  setMeasurements(temperature: number, humidity: number, pressure: number) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;

    this.measurementsChanged();
  }
}

interface SubjectWithPull {
  registerObserver(o: ObserverWithPull): void;
  removeObserver(o: ObserverWithPull): void;
  notifyObservers(): void;
}

class WeatherDataWithPull implements SubjectWithPull {
  private observers: ObserverWithPull[];
  private temperature: number;
  private humidity: number;
  private pressure: number;

  constructor() {
    this.observers = [];
  }

  get getTemperature() {
    return this.temperature;
  }

  get getHumidity() {
    return this.humidity;
  }

  get getPressure() {
    return this.pressure;
  }

  registerObserver(o: ObserverWithPull) {
    this.observers.push(o);
  }

  removeObserver(o: ObserverWithPull) {
    const idx = this.observers.indexOf(o);
    this.observers.splice(idx, 1);
  }

  notifyObservers() {
    this.observers.forEach((o) => {
      o.update();
    });
  }

  measurementsChanged() {
    this.notifyObservers();
  }

  setMeasurements(temperature: number, humidity: number, pressure: number) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;

    this.measurementsChanged();
  }
}

//=========================================================
// Observer
//=========================================================
interface Observer {
  update(temperature: number, humidity: number, pressure: number): void;
}

interface ObserverWithPull {
  update(): void;
}

class CurrentConditionsDisPlay implements Observer, DisplayElement {
  private temperature: number;
  private humidity: number;
  private weatherData: WeatherData;

  constructor(weatherData: WeatherData) {
    this.weatherData = weatherData;
    weatherData.registerObserver(this);
  }

  update(temperature: number, humidity: number, pressure: number) {
    this.temperature = temperature;
    this.humidity = humidity;

    console.log('push 방식');
    this.display();
  }

  display() {
    console.log(`현재 상태: 온도 ${this.temperature}F, 습도 ${this.humidity}%`);
  }
}

class CurrentConditionsDisPlayWithPull
  implements ObserverWithPull, DisplayElement
{
  private temperature: number;
  private humidity: number;
  private weatherDataWithPull: WeatherDataWithPull;

  constructor(weatherDataWithPull: WeatherDataWithPull) {
    this.weatherDataWithPull = weatherDataWithPull;
    this.weatherDataWithPull.registerObserver(this);
  }

  update() {
    this.temperature = this.weatherDataWithPull.getTemperature;
    this.humidity = this.weatherDataWithPull.getHumidity;

    console.log('pull 방식');
    this.display();
  }

  display() {
    console.log(`현재 상태: 온도 ${this.temperature}F, 습도 ${this.humidity}%`);
  }
}

//=========================================================
// main
//=========================================================
function main() {
  const weatherData = new WeatherData();
  const weatherDataWithPull = new WeatherDataWithPull();

  const currentDisplay = new CurrentConditionsDisPlay(weatherData);

  weatherData.setMeasurements(80, 65, 30.4);
  weatherData.setMeasurements(82, 70, 29.2);
  weatherData.setMeasurements(78, 90, 31.4);

  const currentConditionsDisPlayWithPull = new CurrentConditionsDisPlayWithPull(
    weatherDataWithPull
  );

  weatherDataWithPull.setMeasurements(80, 65, 30.4);
  weatherDataWithPull.setMeasurements(82, 70, 29.2);
  weatherDataWithPull.setMeasurements(78, 90, 31.4);
}

main();
