import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PopularCategories: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    // Navigate to jobs page with category filter
    navigate(`/jobs?category=${encodeURIComponent(categoryName)}`);
  };
  const categories = [
    { "id": 1, "name": "Information Technology & Software", jobs: 1250 },
    { "id": 2, "name": "Engineering & Technical Fields", jobs: 890 },
    { "id": 3, "name": "Accounting, Finance & Banking", jobs: 765 },
    { "id": 4, "name": "Business & Management", jobs: 654 },
    { "id": 5, "name": "Marketing, Sales & Retail", jobs: 543 },
    { "id": 6, "name": "Healthcare & Pharmaceuticals", jobs: 432 },
    { "id": 7, "name": "Education & Training", jobs: 387 },
    { "id": 8, "name": "Human Resources & Recruitment", jobs: 321 },
    { "id": 9, "name": "Logistics, Supply Chain & Procurement", jobs: 298 },
    { "id": 10, "name": "Legal Services", jobs: 276 },
    { "id": 11, "name": "Admin & Clerical", jobs: 254 },
    { "id": 12, "name": "Customer Service & Support", jobs: 232 },
    { "id": 13, "name": "FMCG & Manufacturing", jobs: 210 },
    { "id": 14, "name": "Agriculture & Natural Resources", jobs: 198 },
    { "id": 15, "name": "Architecture & Construction", jobs: 187 },
    { "id": 16, "name": "Automotive & Transportation", jobs: 165 },
    { "id": 17, "name": "Creative Arts & Design", jobs: 154 },
    { "id": 18, "name": "Environment, Water & Sanitation", jobs: 143 },
    { "id": 19, "name": "Consulting & Strategy", jobs: 132 },
    { "id": 20, "name": "Economics & Research", jobs: 121 },
    { "id": 21, "name": "Development & Project Management", jobs: 110 },
    { "id": 22, "name": "Communications, Media & Journalism", jobs: 98 },
    { "id": 23, "name": "Retail, Wholesale & Distribution", jobs: 87 },
    { "id": 24, "name": "Security & Law Enforcement", jobs: 76 },
    { "id": 25, "name": "Event, Travel & Tourism", jobs: 65 },
    { "id": 26, "name": "Natural & Social Sciences", jobs: 54 },
    { "id": 27, "name": "Telecommunications & Networking", jobs: 43 },
    { "id": 28, "name": "Hospitality & Hotel Services", jobs: 32 },
    { "id": 29, "name": "Veterinary & Animal Services", jobs: 21 },
    { "id": 30, "name": "Quality Assurance & Safety", jobs: 18 }
  ];

  const displayedCategories = showAll ? categories : categories.slice(0, 12);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Popular Categories
          </h2>
          <p className="text-lg text-gray-600">
            Explore opportunities in your field of expertise
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {displayedCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="flex items-center justify-between p-4">
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-sm">
                  {category.name}
                </h3>
                <span className="text-gray-500 text-sm font-medium bg-gray-100 px-2 py-1 rounded-full min-w-[2rem] text-center">
                  {category.jobs}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            {showAll ? 'Show Less' : 'See All Categories'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;