{/* <script> */}
        let movieNameRef = document.getElementById("movie-name")
        let searchbtn = document.getElementById("search-btn");
        let result = document.getElementById("result");
        let key = "98e6a5e9"
        let getMovie = () => {
            let movieName = movieNameRef.value;
            let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

            if (movieName.length <= 0) {
                result.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
            }
            else {
                fetch(url).then((resp) => resp.json()).then((data) => {
                    if (data.Response == "True") {
                        result.innerHTML =
                            `<div class="info">
                    <img src=${data.Poster} class="poster">
                    <div>
                        <h2>${data.Title}</h2>
                        <div class="rating">
                            <h4>IMDB ${data.imdbRating}</h4>
                            <img src="./star-icon.svg">
                        </div>
                        <div class="details">
                            <span>${data.Rated}</span>
                            <span>${data.Year}</span>
                            <span>${data.Runtime}</span>
                        </div>
                        <div class="genre">
                            <div> 
                                ${data.Genre.split(",").join("</div><div>")}
                            </div>
                        </div>
                    </div>    
                </div>
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            <h3>Cast:</h3>
            <p>${data.Actors}</p>
            `;
                    }
                    else {
                        result.innerHTML = `<h3 class="msg"> ${data.Error}</h3>`;
                    }
                }).catch(() => {
                    result.innerHTML = `<h3 class="msg"> Error Occured</h3>`;
                });
            }
        };

        document.addEventListener('keypress', (event) => {
            if (event.keyCode === 13) {
                getMovie();
            }
        }, false);

        searchbtn.addEventListener("click", getMovie);
        window.addEventListener("load", getMovie);
    // </script>