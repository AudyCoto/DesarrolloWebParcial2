
//obtiene la referencia al contenedor main
const main = document.querySelector(".main");
var año="";
const text_año="&primary_release_year=";
const lenguaje="&language=es"
const ClaseR="&certification_country=US&certification=R&sort_by=vote_average.desc";
const popular="/now_playing?";

ListaGenero("", "","genero");



function selectaño()
{ 
  select = document.getElementById("año");
  var cosa;
  cosa = document.Veraño.años[document.Veraño.años.selectedIndex].value;
  var selected = document.Veraño.años[document.Veraño.años.selectedIndex].text;
  if(!cosa)
  {
    año="";
  }
  else
  {
    año=text_año+selected;
    generos();
  }
}

function Ejecut()
{
  select = document.getElementById("Op");
  var cosa;
  cosa = document.Opciones.Op[document.Opciones.Op.selectedIndex].value;
  if(!cosa)
  {
    
  }
  else
  {
    if(cosa==1)
    {
      Opcion1();
    }
    else if(cosa==2)
    {
      Opcion2();
    }
    else if(cosa==3)
    {
      Opcion3();
    }
  }

}


function generos(){
  select = document.getElementById("genero");
  var cosa;
  cosa = document.form.genero[document.form.genero.selectedIndex].value; 
  var selected = document.form.genero[document.form.genero.selectedIndex].text;
  main.innerHTML=""
  if(!cosa)
 {  
  fetch(
    genres_list_http +
    new URLSearchParams({
      api_key: api_key,
    })+año+lenguaje   
    )
  .then((res) => res.json())
  .then((data) => {
    //console.log(data);
      data.genres.forEach((item) => {
      //console.log(item.id+   item.name)
      fetchListaPeliculasPorGenero(item.id, item.name);
      ListaGenero(item.id, item.name,"genero")
     
    });
  });
 }
 else{
  main.innerHTML=""
  fetchListaPeliculasPorGenero(cosa, selected);
 }
}

  console.log(genres_list_http +
    new URLSearchParams({
      api_key: api_key,
  
    })+año+lenguaje)



fetch(
    genres_list_http +
    new URLSearchParams({
      api_key: api_key,
 
    })+año+lenguaje
    
)
  .then((res) => res.json())
  .then((data) => {
    data.genres.forEach((item) => {
      fetchListaPeliculasPorGenero(item.id, item.name);
      ListaGenero(item.id, item.name,"genero")
      
    
    });
  });


  function MostrarOp()
  {   
            select = document.getElementById("Op");
            option = document.createElement("option");
            option.value = 1;
            option.text = "En Cines";
            select.appendChild(option);
            select = document.getElementById("Op");
            option = document.createElement("option");
            option.value = 2;
            option.text = "Mejores Clasificacion R";
            select.appendChild(option);
            select = document.getElementById("Op");
            option = document.createElement("option");
            option.value = 3;
            option.text = "Ver Series";
            select.appendChild(option);
  }
MostrarOp();

function listaraños()
{
  var año=2022;
 
  for(var x=1;x<30;x++ )
  {
          select = document.getElementById("años");
          option = document.createElement("option");
          option.value = x;
          option.text = (año-x);
          select.appendChild(option);
  }
}
listaraños();

function ListaGenero(id,name,id2)
{
          select = document.getElementById(id2);
          option = document.createElement("option");
          option.value = id;
          option.text = name;
          select.appendChild(option);
}


const fetchListaPeliculasPorGenero = (id, genres) => {
  fetch(
    movie_genres_http +
      new URLSearchParams({
        api_key: api_key,
       
        with_genres: id,
       //page: Math.floor(Math.random() * 3) + 1, //trae pagina al azar
      })+año+lenguaje
     
  )    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      construirElementoCategoria(`${genres}_movies`, data.results);
      movie_genres_http +
        new URLSearchParams({
          api_key: api_key,
         
          with_genres: id,
         //page: Math.floor(Math.random() * 3) + 1, //trae pagina al azar
         
        })+año+lenguaje;
    })
    .catch((err) => console.log(err));
};

const fetchListaSeriesPorGenero = (id, genres) => {
  fetch(
    tv_genres_http +
      new URLSearchParams({
        api_key: api_key,
       
        with_genres: id,

      })+lenguaje
     
  )    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      construirElementoCategoria2(`${genres}_Serie`, data.results);
      tv_genres_http +
        new URLSearchParams({
          api_key: api_key,
         
          with_genres: id,
         
         
        })+lenguaje;
    })
    .catch((err) => console.log(err));
};


function Opcion3()
{
  fetch(
      tv_list_http +new URLSearchParams({api_key: api_key,})+lenguaje
  )
.then((res) => res.json())
.then((data) => {
  data.genres.forEach((item) => {
    main.innerHTML=""
    fetchListaSeriesPorGenero(item.id, item.name);
   
  
  });
});
}

function Opcion2()
{
  fetch(
    movie_genres_http+new URLSearchParams({api_key: api_key,})+lenguaje+ClaseR
  )
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    main.innerHTML=""
      construirElementoCategoria(`Mas Votados Clasificacion R`, data.results);
  });
 
}


function Opcion1()
{
  main.innerHTML=""
  fetch(
    movie_detail_http +popular +
    new URLSearchParams({
      api_key: api_key,
    })+lenguaje  
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
      construirElementoCategoria(`Actuales en cine`, data.results);
  });
 
}

/* crea el titulo de categoria */
const construirElementoCategoria = (category, data) => {
  main.innerHTML += `
    <div class="movie-list">
        <button class="pre-btn"> <img src="img/pre.png" alt=""></button>
          
          <h1 class="movie-category">${category.split("_").join(" ")}</h1>

          <div class="movie-container" id="${category}">
          </div>

        <button class="nxt-btn"> <img src="img/nxt.png" alt=""> </button>
    </div>
    `;
  construirTarjetas(category, data);
};
const construirElementoCategoria2 = (category, data) => {
  main.innerHTML += `
    <div class="movie-list">
        <button class="pre-btn"> <img src="img/pre.png" alt=""></button>
          
          <h1 class="movie-category">${category.split("_").join(" ")}</h1>

          <div class="movie-container" id="${category}">
          </div>

        <button class="nxt-btn"> <img src="img/nxt.png" alt=""> </button>
    </div>
    `;
  construirTarjetas2(category, data);
};

const construirTarjetas = (id, data) => {
  const movieContainer = document.getElementById(id);
  data.forEach((item, i) => {
    if (item.backdrop_path == null) {
      item.backdrop_path = item.poster_path;
      if (item.backdrop_path == null) {
        return;
      }
    }

    movieContainer.innerHTML += `
        <div class="movie" onclick="location.href = '/${item.id}'">
            <img src="${img_url}${item.backdrop_path}" alt="">
            <p class="movie-title">${item.title}</p>
        </div>
        `;

    if (i == data.length - 1) {
      setTimeout(() => {
        setupScrolling();
      }, 100);
    }
  });
};


const construirTarjetas2 = (id, data) => {
  const movieContainer = document.getElementById(id);
  data.forEach((item, i) => {
    if (item.backdrop_path == null) {
      item.backdrop_path = item.poster_path;
      if (item.backdrop_path == null) {
        return;
      }
    }

    movieContainer.innerHTML += `
        <div class="movie" onclick="location.href = '/${item.id}s'">
            <img src="${img_url}${item.backdrop_path}" alt="">
            <p class="movie-title">${item.name}</p>
        </div>
        `;

    if (i == data.length - 1) {
      setTimeout(() => {
        setupScrolling();
      }, 100);
    }
  });
};












