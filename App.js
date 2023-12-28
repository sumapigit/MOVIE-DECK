const API_KEY='1cc0fd3626ee6e8b0e3b7eb46774e66d';
const API=`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`
const IMAGE_URL=`https://image.tmdb.org/t/p/original/`

const movieListingTag=document.querySelector('.moviesListing')
const prevBtnTag=document.querySelector(".prevBtn")
const nextBtnTag=document.querySelector(".nextBtn")
const sortByDateBtnTag=document.querySelector(".sortByDate")
const sortByRatingBtnTag=document.querySelector(".sortByRating")
let currentMovieData=''
let sortedByDateMovieData=''
let sortedByRatingMovieData=''
let isSortedByDate=false;
let isSortedByRating=false;

let currentPage=1;
let totalPage=0;
prevBtnTag.addEventListener('click',()=>{
    if(currentPage===1){
        return;
    }
    currentPage--;
    getPaginatedMovieData(currentPage)
})
nextBtnTag.addEventListener('click',()=>{
    if(currentPage===totalPage){
        return;
    }
    currentPage++;
    getPaginatedMovieData(currentPage)
})

sortByDateBtnTag.addEventListener('click',()=>{
  if(isSortedByDate){
      isSortedByDate=false;
      isSortedByRating=false;
      updateMoviePage(currentMovieData)
      return
  }
  isSortedByDate=true
  isSortedByRating=false
  if(!sortedByDateMovieData){
    sortedByDateMovieData=sortMovie([...currentMovieData],'date')
  }
  updateMoviePage(sortedByDateMovieData)
})



sortByRatingBtnTag.addEventListener('click',()=>{
  if(isSortedByRating){
    isSortedByRating=false;
      isSortedByDate=false;
      updateMoviePage(currentMovieData)
      return
  }
  isSortedByRating=true
  isSortedByDate=false
  if(!sortedByDateMovieData){
    sortedByRatingMovieData=sortMovie([...currentMovieData],'rating')
  }
  updateMoviePage(sortedByRatingMovieData)
})


 
// console.log(movieListingTag)
function updateMoviePage(movieArray){
  let updatedMovieListing='';
  for(let{title,vote_count,vote_average,poster_path,isFavourite} of movieArray){
    const movieURL=`${IMAGE_URL}/${poster_path}`
    const movieCard=`  <div class="movieCard">
    <img src="${movieURL}" alt="">
    <div>
        <div class="movieDetails">
            <h5>${title}</h5>
            <div>
                <span>
                    Votes:${vote_count}
                </span>
                <span>
                    Rating:${vote_average}                      
                </span>
            </div>
        </div>
        <i class="fa-heart ${isFavourite?'fa-solid':'fa-regular'}"></i>
      </div>
    </div>`
    updatedMovieListing+=movieCard
  }
//   console.log(updatedMovieListing)
  movieListingTag.innerHTML=updatedMovieListing;
}
async function getPaginatedMovieData(page=1){
  resetPageValues()
     movieListingTag.innerHTML="loading"
  const response=await fetch(`${API}&page=${page}`)
  const movieData=await response.json()
  currentMovieData=movieData.results
  console.log({movieData})
  updateMoviePage(movieData.results)
  totalPage=movieData.total_page

}
function resetPageValues(){
  sortedByDateMovieData="";
  sortedByRatingMovieData="";
  isSortedByDate=false
  isSortedByRating=false
}

function sortMovie(movieArr,sortBy){
  let sortingKey=''
  // if(sortByDate==='date'){
  //   sortingKey=''
  // }
  if(sortBy==='rating'){
    sortingKey='vote_average'
  }
  console.log(sortingKey)
  console.log(movieArr[0])
  console.log(movieArr[0][sortingKey])
  movieArr.sort((movieObjA,movieObjB)=>{
    return movieObjA[sortingKey]-movieObjB[sortingKey]
  })
  return movieArr
  

}
getPaginatedMovieData(currentPage)


// Searching

const searchBox=document.getElementById("search")
let searchedMovieName=" ";
searchBox.addEventListener("change",(evt)=>{
  searchedMovieName=evt.target.value;
})

const btn=document.getElementById("btn")
btn.addEventListener("click",async (evt)=>{
  evt.preventDefault()
  const url=`https://api.themoviedb.org/3/search/movie?query=${searchedMovieName}&api_key=${API_KEY}`
  const response=await fetch(url)
  const movieData=await response.json()
  currentMovieData=movieData.results
  updateMoviePage(movieData.results)
  console.log(movieData)
  
})

async function getPaginatedMovieData(page=1){
  resetPageValues()
     movieListingTag.innerHTML="loading"
  const response=await fetch(`${API}&page=${page}`)
  const movieData=await response.json()
  currentMovieData=movieData.results
  console.log({movieData})
  updateMoviePage(movieData.results)
  totalPage=movieData.total_page

}


// const sampleExec=document.querySelector('.samplExec')
// const random=`<div class="movieCard">
// <img src=${10+20}alt="">
// <div>
//     <div class="movieDetails">
//         <h5>${100}</h5>
//         <div>
//             <span>
//                 Votes:${88}
//             </span>
//             <span>
//                 Rating:${0}                        
//             </span>
//         </div>
//     </div>
//     <span>ICON</span>
// </div>
// </div>`
// sampleExec.innerHTML=random;

// const SEARCH_API=`https://api.themoviedb.org/3/search/movie?query=${}&api_key=${API_KEY}`
// document.getElementById("search")
