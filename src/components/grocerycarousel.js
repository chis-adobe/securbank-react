import React, { useState, useEffect } from 'react';
import FetchGroceryItems from '../api/groceryitemsrequest';
import iconCanada from '../resources/icon-canada.svg';
import './grocerycarousel.css';

function formatPrice(dollars, cents) {
  if (dollars == null && cents == null) return null;
  const d = Number(dollars) || 0;
  const c = (cents !== undefined && cents !== null) ? Number(cents) : 0;
  const centsStr = String(c).padStart(2, '0');
  return `$${d}.${centsStr}`;
}

function GroceryCarousel({ dietType = 'standard' }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchGroceryData = async () => {
      try {
        setLoading(true);
        console.log('Fetching grocery items with diet type:', dietType);
        const result = await FetchGroceryItems(dietType);
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
  }, [dietType]);

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
          {visibleItems.map((item, index) => {
            const priceDisplay = formatPrice(item.priceDollars, item.priceCents) ?? item.price;
            const previousPriceDisplay = formatPrice(item.previousPriceDollars, item.previousPriceCents) ?? item.previousPrice;
            return (
              <div key={currentIndex + index} className="grocery-item">
                <div className="grocery-item-image-container">
                  {item.isCanadianItem && (
                    <img src={iconCanada} alt="Canada" className="grocery-item-canada-icon" />
                  )}
                  <img 
                    src={item.image?._publishUrl || item.image?._authorUrl || ''} 
                    alt={item.title} 
                    className="grocery-item-image"
                  />
                  {previousPriceDisplay && (
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
                    {priceDisplay != null && (
                      <div className="grocery-item-price">{priceDisplay}</div>
                    )}
                    {previousPriceDisplay && (
                      <div className="grocery-item-previous-price">{previousPriceDisplay}</div>
                    )}
                  </div>
                  
                  {item.pricePerQuantity && (
                    <div className="grocery-item-price-per-quantity">{item.pricePerQuantity}</div>
                  )}
                </div>
              </div>
            );
          })}
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

