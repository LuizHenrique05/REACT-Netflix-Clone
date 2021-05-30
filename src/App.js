import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/movieRow';
import FeaturedMovie from './components/featuredMovie';
import Header from './components/header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [FeaturedData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () => {
      //get films/series list
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //get featured film/series
      let originals = list.filter(i=>i.slug === 'originals');
      let random = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[random];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader} />

      {FeaturedData &&
        <FeaturedMovie item={FeaturedData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <div>
            <MovieRow key={key} title={item.title} items={item.items} />
          </div>
        ))}
      </section>

      <footer>
          Direitos de imagem para Netflix. <br />
          Dados pegos do site Themoviedb.org
      </footer>
      {movieList.length <= 0 &&
        <div className="loading">
          <img src="http://cdn.lowgif.com/small/ce629026a12a85a7-the-tech-behind-netflix-s-worldwide-expansion-is-a-big-deal-for-the.gif" alt="Carregando" />
        </div>
      }
      
    </div>
  );
}