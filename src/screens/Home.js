import React, { useEffect, useState, useRef } from 'react';
import Head from '../components/Head';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousel from 'react-bootstrap/Carousel';
import slides from '../components/SlideContent.json';
import '../Slider.css';

export default function Home() {
  const [Cat, SetCat] = useState([]);
  const [Item, SetItem] = useState([]);
  const [index, setIndex] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const bodyRef = useRef(null);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const loaddata = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/itemsdata", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      response = await response.json();
      SetCat(response[1]);
      SetItem(response[0]);
      setFilteredItems(response[0]); // Initialize filteredItems with all items
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = Item.filter((item) => 
      item.name.toLowerCase().includes(searchText.toLowerCase()) || 
      item.catogery.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItems(filtered);
    bodyRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    loaddata();
  }, []);

  return (
    <div>
      <Head />
      <div id='slider'>
        <div className="carousel-container">
          <form className="carousel-search-form" onSubmit={handleSearch}>
            <input
              className="form-control me-3 carousel-search-input"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">Search</button>
          </form>
          <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
            {slides.map((slide, i) => (
              <Carousel.Item key={i}>
                <img
                  className="d-block w-100"
                  src={slide.image}
                  alt={`Slide ${i}`}
                  style={{ filter: "brightness(70%)", display: "block" }}
                />
                <Carousel.Caption style={{ top: '5%' }}>
                  <h3>{slide.title}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="carousel-indicators">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`indicator-btn ${index === i ? "active" : ""}`}
                aria-label={`Slide ${i + 1}`}
                onClick={() => handleSelect(i)}
              />
            ))}
          </div>
        </div>
      </div>
      <div ref={bodyRef} className='container mt-4'>
        {filteredItems.length > 0 ? (
          <div className='row'>
            {filteredItems.map((filtered_item) => (
              <div key={filtered_item._id} className='col-md-4 mb-4'>
                <Card 
                  item_name={filtered_item} 
                />
              </div>
            ))}
          </div>
        ) : (
          <div className='col-12'>No Such Data</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
