import { DetailsPage } from './../details/details';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  buttons;

  constructor(public navCtrl: NavController) {


   

   	 this.buttons = [];

   	 firebase.database().ref('buttons/').on('value',(snapshot)=>{
        console.log(snapshot.val());

        alert("data loaded");
        
        this.buttons = [];


   	 	for (let key in snapshot.val()) {
          this.buttons.push({
          	key : key,
          	buttonText : snapshot.val()[key].buttonText ,
          	description : snapshot.val()[key].description ,
          	videoLink : snapshot.val()[key].videoLink
          });
        }

        console.log(this.buttons);
   	 },(err)=>{
        alert("unbale to load data")
      })

   }



   openDetails(key){

    console.log(key);

    this.navCtrl.push(DetailsPage,{key:key});

   }


   
  
}


