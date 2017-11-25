const URL = 'https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=mexico&api_key=a048f956689a998bf2d4c851046a6de3&format=json';
function getArtists(){
 return fetch(URL)
 .then(response => response.json())
 .then(data=> data.topartists.artist)
     .then(artists => artists.map(artist=>{
         return{
             id: artist.mbid,
             name: artist.name,
             image: artist.image[3]['#text'],
             likes: 200, 
             comments: 150
         }
     }))
}
export { getArtists }