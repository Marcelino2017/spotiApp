import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';



@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [
  ]
})
export class ArtistaComponent{

  artista: any = {};
  loadingArtis: boolean;
  topTracks: any[] =[];

  constructor(private router: ActivatedRoute,
              private spotify: SpotifyService ){
                this.loadingArtis = true;
                this.router.params.subscribe( params => {
                  this.getArtista(params['id']);
                  this.getTopTracks(params['id']);
                });

   }



  getArtista( id: string){
    this.loadingArtis = true;
    this.spotify.getArtista(id)
        .subscribe( artista => {
          console.log(artista);
          this.artista = artista;
          this.loadingArtis = false;
          
        });
  }
  
  getTopTracks(id: string){
    this.spotify.getTopTracks(id)
        .subscribe( topTracks => {
          console.log(topTracks);
          this.topTracks = topTracks;

        });
  }
}
