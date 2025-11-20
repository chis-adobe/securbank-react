import React, { useState, useEffect } from 'react';
import FetchGroceryItems from '../api/groceryitemsrequest';
import './grocerycarousel.css';

function GroceryCarousel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchGroceryData = async () => {
      try {
        setLoading(true);
        console.log('Fetching grocery items');
        const result = await FetchGroceryItems();
        console.log('Grocery items API result:', result);
        
        if (result && result.data && result.data.groceryItemList && result.data.groceryItemList.items) {
          const groceryItems = result.data.groceryItemList.items;
          console.log('Setting grocery items:', groceryItems);
          setItems(groceryItems);
          setCurrentIndex(0); // Reset to first page when data changes
        } else {
          console.log('No grocery items found in result');
        }
      } catch (error) {
        console.error('Error fetching grocery items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroceryData();
  }, []);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const canGoNext = currentIndex + itemsPerPage < items.length;
  const canGoPrev = currentIndex > 0;

  const handleNext = () => {
    if (canGoNext) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="grocery-carousel-container">
        <div className="grocery-carousel-loading">
          <div className="loading-spinner">Loading items...</div>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="grocery-carousel-container">
        <div className="grocery-carousel-error">
          <p>No grocery items available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grocery-carousel-container">
      <div className="grocery-carousel-header">
        <h2 className="grocery-carousel-title">Browse Your Grocery Needs!</h2>
        {totalPages > 1 && (
          <div className="grocery-carousel-pagination">
            Page {Math.floor(currentIndex / itemsPerPage) + 1} of {totalPages}
          </div>
        )}
      </div>
      
      <div className="grocery-carousel-wrapper">
        <button 
          className={`carousel-arrow carousel-arrow-left ${!canGoPrev ? 'disabled' : ''}`}
          onClick={handlePrev}
          disabled={!canGoPrev}
          aria-label="Previous items"
        >
          ‹
        </button>

        <div className="grocery-carousel">
          {visibleItems.map((item, index) => (
            <div key={currentIndex + index} className="grocery-item">
              <div className="grocery-item-image-container">
                <img 
                  src={item.image?._publishUrl || item.image?._authorUrl || ''} 
                  alt={item.title} 
                  className="grocery-item-image"
                />
                {item.previousPrice && (
                  <div className="grocery-item-badge">SALE</div>
                )}
              </div>
              
              <div className="grocery-item-content">
                {item.brand && (
                  <div className="grocery-item-brand">{item.brand}</div>
                )}
                <h3 className="grocery-item-title">{item.title}</h3>
                {item.size && (
                  <div className="grocery-item-size">{item.size}</div>
                )}
                
                <div className="grocery-item-pricing">
                  <div className="grocery-item-price">{item.price}</div>
                  {item.previousPrice && (
                    <div className="grocery-item-previous-price">{item.previousPrice}</div>
                  )}
                </div>
                
                {item.pricePerQuantity && (
                  <div className="grocery-item-price-per-quantity">{item.pricePerQuantity}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button 
          className={`carousel-arrow carousel-arrow-right ${!canGoNext ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={!canGoNext}
          aria-label="Next items"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default GroceryCarousel;

