import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase';

import { VideoPlayer, VideoOptions } from '@ionic-native/video-player';



import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';



/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  key;
  videoOptions : VideoOptions;
  videoUrl : string;
  data: any;

  @ViewChild('videoPlayer') mVideoPlayer: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private videoPlayer: VideoPlayer,private streamingMedia: StreamingMedia) {
     
     this.key =  this.navParams.get('key');
     console.log(this.key);

     firebase.database().ref('buttons/'+this.key).once('value',(snapShot)=>{
            console.log(snapShot.val());

            this.data = snapShot.val();

            // let video = this.mVideoPlayer.nativeElement;
            // video.src = this.data.videoLink;
            // video.play();


     })



  }


  ionViewDidLoad() {

    this.videoUrl = this.data.videoLink;

    console.log('ionViewDidLoad DetailsPage');
    let video = this.mVideoPlayer.nativeElement;
    video.src = this.videoUrl;
    // video.play();
  }


  gotoHome(){
    this.navCtrl.pop();
  }



  playVideo() {
    this.videoOptions = {
      volume: 1.0
    }
        this.videoUrl = this.data.videoLink;
        this.videoPlayer.play(this.videoUrl,this.videoOptions).then(() => {
          alert('video completed');
        }).catch(err => {
          alert(err);
        });
  }



}
