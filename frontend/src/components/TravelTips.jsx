import React from 'react';
import './blog.css'
const TravelTips = () => {
    const travelTips = [
        {
          title: "Pack Light and Smart",
          date: "July 17, 2024",
          content: "Traveling with less luggage can make your journey easier. Consider packing versatile clothing and essential toiletries."
        },
        {
          title: "Stay Hydrated",
          date: "July 18, 2024",
          content: "Always carry a reusable water bottle. Staying hydrated keeps you energized during your travels."
        },
        {
          title: "Plan Your Itinerary",
          date: "July 19, 2024",
          content: "Research your destination and create a flexible itinerary. This helps you make the most of your trip."
        },
        {
          title: "Utilize Travel Apps",
          date: "July 20, 2024",
          content: "Apps can help you find restaurants, navigate public transport, and even track your budget while traveling."
        },
        {
          title: "Learn Basic Local Phrases",
          date: "July 21, 2024",
          content: "Knowing a few key phrases in the local language can enhance your travel experience and help with interactions."
        },
      ];
      
  return (
    <>
    <div className="main-blog">
    <div className="travel-head">
    <h2>Travel </h2>
    <img 
        src="https://media3.giphy.com/media/spOOup798xMAbrRdxI/giphy.gif" 
        alt="Contact Us"
        className="travel-tip-gif"
      />
    </div>
    <div className="blog-section">
      
      {travelTips.map((tip, index) => (
        <BlogPost key={index} {...tip} />
      ))}
    </div>
    </div>
    </>
  );
};

const BlogPost = ({ title, date, content }) => (
  <div className="blog-post">
    <h3>{title}</h3>
    <p className="date">{date}</p>
    <p>{content}</p>
  </div>
);

export default TravelTips;
