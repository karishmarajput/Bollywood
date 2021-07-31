let arrOg, arr;
let count = 9;
let mymovies;
var getmovies  = function (){

    $.ajax({
      url:'./mytext.txt',
      success: function (data){
        mymovies = data.split('\n');
      }
    });
  }();

function startgame(){
    
    document.getElementById('container2').style.display="block";
    document.getElementById('container-1').style.display="none";
    movieName = "";
    while(movieName.length < 1){
        movieName = (mymovies[Math.floor(Math.random() * mymovies.length)]).toUpperCase();
    }
    arr = movieName.split('');
    arrOg = Array.from(arr);
    let len = parseInt((60/100)*arr.length);
    for( let i =0;i < len; i++){
        let number =Math.floor(Math.random() * arr.length);
        var regEx = /^[A-Z]+$/;
        if(arr[number].match(regEx))
        {   if(arr[number] == " " || arr[number] == "_" ){
                i --;
                continue;
            }
            arr[number] = "_";
        }else{
                i --;
                continue;
        }
        
    }
    document.getElementById('movieName').innerHTML = arr.join('');
}
function lettercheck(){
    let guessedMovie = (document.forms["frm"]["fullname"].value).toUpperCase();
    if(guessedMovie != ""){
        if(guessedMovie == arrOg.join('')){
            document.getElementById('movieName').innerHTML = arrOg.join('');
            gameover("WINNER");
            return;
        }else{
            alert("wrong guess!");
            return;
        }
    }
    
    let newarr = Array.from(arr);
    let len = arrOg.length+1;
    let letter = (document.forms["frm"]["letterGuessed"].value).toUpperCase();
    if(letter.length != 1){
        alert("Single guess at a time!");
        return;
    }
    
    for( let i = 0; i < arrOg.length; i++){
        if(letter == arrOg[i]){
            arr[i] = letter;
        }
        if(arrOg[i] == arr[i]){
            len--;
        }
    }
    document.getElementById('movieName').innerHTML = arr.join('');
    document.forms["frm"]["letterGuessed"].value = "";
    if(newarr.join('') == arr.join('')){
        count --;
        document.getElementById('b'+(9 - count)).style.color="red";
    }
    if(arrOg.join('') == arr.join('')){
        gameover("WINNER");
        return;
    }
    if(count==0){
        gameover("YOU LOST");
        return;
    }
}
function gameover(text){
    document.getElementById('movieName').innerHTML = arrOg.join('');
    document.getElementById("input").innerHTML='<h2>'+ text +'</h2>';
    document.getElementById('submitBtn').innerHTML='<h2> Game Over!!</h2>';
    document.getElementById('btnPlay').style.display= "block";
}
function reload(){
    window.location.reload();
}
