function searchMovies(){
    $('#movie-list').html('');

    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : 'bb9431ac',
            's' : $('#search-input').val()
        },
        success : function(result){
            if(result.Response == "True"){

                let movies = result.Search;

                $.each(movies, function(i, data){
                    $('#movie-list').append(`
                    <div class="col-md-4">
                        <div class="card mb-5">
                            <img src="`+data.Poster+`" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">`+data.Title+`</h5>
                                <h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
                                <a href="#" class="card-link see-datail" data-toggle="modal" data-target="#exampleModal" data-id="`+data.imdbID+`"><b>See Detail</b></a>
                            </div>
                        </div>
                    </div>
                    `)
                });

                $('#search-input').val('');

            }else{
                $('#movie-list').html(`
                <div class="col">
                    <h1 class="text-center">`+result.Error+`</h1>
                </div>
                `)
            }
        }
    });
}


$('#search-button').on('click', function(){
    searchMovies();
});

$('#search-input').on('keyup', function(e){
    if(e.keyCode === 13){
        searchMovies();
    }
});

$('#movie-list').on('click','.see-detail', function(){
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : 'bb9431ac',
            'i' : $(this).data('id')
        },
        success : function(movie){
            if(movie.Response == "True"){
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+movie.Poster+`" class="img-fluid">
                            </div>

                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>`+movie.Title+`</h3></li>
                                    <li class="list-group-item">Dapibus ac facilisis in</li>
                                    <li class="list-group-item">Morbi leo risus</li>
                                    <li class="list-group-item">Porta ac consectetur ac</li>
                                    <li class="list-group-item">Vestibulum at eros</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    });
});