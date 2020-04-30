import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) {

    console.log('Spotify Service Listo');

   }

   getQuery(query: string){
     const url = `https://api.spotify.com/v1/${ query }`;

     const headers = new HttpHeaders({
      'Authorization': 'Bearer QDx_wZYtPeNB03zrsIPiGpqW8zjID9DcjpMnfnZdmLg2_W9m0bxxqW-uyl98oAYE2QjPlvB82Md_3MyoMU'
     });

     return this.http.get(url, { headers });
                

   }

   getNewReleases(){
    //  const headers = new HttpHeaders({
    //    'Authorization': 'Bearer BQDJrC0M8BxzDAdgZeN053SDDUsOdTf_LdCRRdLJU9wbXilNQko1En8AzmBxN5fvWl3b3wOsWiUt06_UzJA'
    //   });
      return this.getQuery('browse/new-releases?limit=20')
                 .pipe( map (data => {return data['albums'].items;} ));
   
      // return this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', { headers })
      //            .pipe( map(data => {
      //              retBQAnroTi2te5BwAucivbtqRyEANrgDxYJBW2hMcHpDnC0UDiaeGoBRjCaImFMBd8Ns1Q5vXQZMDDnK3O_Ycrn data['albums'].items;
      //            }));
   }

   getArtistas(termino: string){


    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQDJrC0M8BxzDAdgZeN053SDDUsOdTf_LdCRRdLJU9wbXilNQko1En8AzmBxN5fvWl3b3wOsWiUt06_UzJA'
    //  });

    return this.getQuery(`search?query=${termino}&type=artist&offset=0&limit=15`)
               .pipe( map( data => { return data['artists'].items; }));

    // return this.http.get(`https://api.spotify.com/v1/search?query=ed+sheeran&type=artist&offset=0&limit=15`, { headers })
    //             .pipe( map( data => {
    //               return data['artists'].items;
    //             }) )
      
   }

   getArtista( id: string ){
    return this.getQuery(`artists/${id}`);
              //  .pipe( map( data => { return data['artists'].items; }));
   }

   getTopTracks( id: string ){
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
               .pipe( map( data => { return data['tracks']; }));
   }
}
