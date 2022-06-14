const API_KEY = 'your-api-key';

const API_BASE = 'https://api.themoviedb.org/3';

/*
- originais netflix 
- recomendados 
- em alta
- ação
- comédia
- terror
- romance
- documentarios
*/

const basicFetch = async (endpoint) => {
     const req = await fetch(`${API_BASE}${endpoint}`);
     const json = await req.json();
     return json;
}

export default {
    getHomeList: async () => {
        return[
            {
                slug: 'originals',
                title: 'Originais Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para você',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },
        ];
    },
    getMovieInfo: async (movieId, movieType) => {
        let info = {};

        if(movieId){
            switch(movieType){
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                case 'tv':;
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                default: 
                    info = null;
                break;
            }
        }

        return info;
    }
}
