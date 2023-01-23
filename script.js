'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');



class Workout {
    date = new Date();
    id = this.date.getMilliseconds().toString();
    constructor(coords,distance,duration){
        this.coords = coords;
        this.distance = distance;
        this.duration=duration;
    }

}
class Running extends Workout{
    constructor(coords,distance,duration,cadence){
        super(coords,distance,duration);
        this.cadence = cadence;
    }

    calcPase(){
        this.pase=this.duration/this.distance;
        return this.pase
    }
}
class Cycling extends Workout{
    constructor(coords,distance,duration,elevationGain){
        super(coords,distance,duration);
        this.elevationGain = elevationGain;
    }
    calcSpeed(){
        this.speed = this.distance/(this.duration/60);
        return this.speed;
    }
}


class App {
    #map;
    #mapEvent;
    constructor(){
        this._getPosition();
        form.addEventListener('submit',this._newWorkout.bind(this))
        inputType.addEventListener('change',this._toggleElevationField)
    }

    _getPosition(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this._loadmap.bind(this))
            ,
            ()=>{
                console.log("Could not get current position");
            }   
        }
    }


    _loadmap(position){
        const {latitude,longitude}= position.coords;
        this.#map = L.map('map').setView([latitude, longitude], 13);

       L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
           attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       }).addTo(this.#map);

     

    this.#map.on('click',this._showForm.bind(this));
    }


    _showForm(mapE){

           this.#mapEvent=mapE;
           form.classList.remove('hidden');
           inputDistance.focus();
    }


    _toggleElevationField(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e){
            e.preventDefault();
            inputCadence.value=inputDistance.value=inputDuration.value=inputElevation.value = '';
            const {lat,lng}=this.#mapEvent.latlng;
            L.marker([lat, lng]).addTo(this.#map)
            .bindPopup(
                L.popup({
                    maxWidth:250,
                    minWidth:200,
                    autoClose:false,
                    closeOnClick:false,
                    className:'running-popup'
                })
            ).setPopupContent('workout')
            .openPopup();
            }  
}

const app = new App();

















