import { useState, useEffect } from 'react';
import { Star, Search, RefreshCw, User, Calendar } from 'lucide-react';

// FIXED: Constants with /api
const API_BASE_URL = 'http://192.168.100.6:5000/api';

const FILTER_OPTIONS = [
  { id: 'all', label: 'All Ratings' },
  { id: '5', label: '5 Stars' },
  { id: '4', label: '4 Stars' },
  { id: '3', label: '3 Stars' },
  { id: '2', label: '2 Stars' },
  { id: '1', label: '1 Star' },
];

// Utility Functions
const formatDateTime = (dateString, updatedAt) => {
  const date = new Date(updatedAt || dateString);
  
  const dateStr = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  const timeStr = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  
  return `${dateStr} at ${timeStr}`;
};

const filterTestimonials = (testimonials, searchTerm, activeFilter) => {
  return testimonials.filter(testimonial => {
    const matchesSearch = 
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.feedback.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRating = activeFilter === 'all' || testimonial.rating === parseInt(activeFilter);
    
    return matchesSearch && matchesRating;
  });
};

const getFilterCounts = (testimonials) => {
  return FILTER_OPTIONS.map(option => ({
    ...option,
    count: option.id === 'all' 
      ? testimonials.length 
      : testimonials.filter(t => t.rating === parseInt(option.id)).length
  }));
};

// Components
const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`h-4 w-4 ${
          star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
        }`}
      />
    ))}
  </div>
);

const SearchBar = ({ value, onChange }) => (
  <div className="relative flex-1">
    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      placeholder="Search reviews by name or feedback..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none"
    />
  </div>
);

const FilterDropdown = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:outline-none"
  >
    {options.map((option) => (
      <option key={option.id} value={option.id}>
        {option.label} ({option.count})
      </option>
    ))}
  </select>
);

const RefreshButton = ({ onClick, loading }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="flex items-center gap-2 rounded-lg bg-gray-700 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-600 disabled:opacity-50"
  >
    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
    Refresh
  </button>
);

const TotalReviewsCard = ({ count }) => (
  <div className="mb-6 inline-block rounded-lg bg-white p-6 shadow-sm">
    <div className="flex items-center gap-4">
      <div>
        <p className="text-sm font-medium text-gray-600">Total Reviews</p>
      </div>
      <div className="relative">
        <Star className="h-16 w-16 fill-yellow-400 text-yellow-400" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-gray-900">
          {count}
        </span>
      </div>
    </div>
  </div>
);

const ReviewCard = ({ testimonial }) => (
  <div className="rounded-lg bg-white p-6 shadow-sm">
    {/* Header */}
    <div className="mb-4 flex items-start justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <User className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
          <div className="mt-1 flex items-center gap-2">
            <StarRating rating={testimonial.rating} />
          </div>
        </div>
      </div>
      
     <div className="flex items-center gap-1.5 text-xs text-gray-500">
        <Calendar className="h-3.5 w-3.5" />
        {formatDateTime(testimonial.createdAt, testimonial.updatedAt)}
     </div>
    </div>

    {/* Feedback */}
    <p className="text-sm leading-relaxed text-gray-700">
      "{testimonial.feedback}"
    </p>

    {/* Footer - Email if available */}
    {testimonial.userEmail && (
      <div className="mt-4 border-t border-gray-100 pt-4">
        <p className="text-xs text-gray-500">{testimonial.userEmail}</p>
      </div>
    )}
  </div>
);

const LoadingState = () => (
  <div className="flex h-64 items-center justify-center">
    <RefreshCw className="h-8 w-8 animate-spin text-red-600" />
  </div>
);

const EmptyState = ({ searchTerm, activeFilter }) => (
  <div className="flex h-64 flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-sm">
    <Star className="h-16 w-16 text-gray-300" />
    <p className="mt-4 text-lg font-medium text-gray-600">No reviews found</p>
    <p className="mt-2 text-sm text-gray-500">
      {searchTerm || activeFilter !== 'all' 
        ? 'Try adjusting your filters'
        : 'Customer reviews will appear here'}
    </p>
  </div>
);

const ResultsCount = ({ filtered, total }) => (
  <div className="mt-4 text-center text-sm text-gray-600">
    Showing {filtered} of {total} reviews
  </div>
);

// Main Component
const ReviewsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Fetch testimonials from API
  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/testimonials`);
      if (response.ok) {
        const result = await response.json();
        setTestimonials(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Computed values
  const filteredTestimonials = filterTestimonials(testimonials, searchTerm, activeFilter);
  const filterOptions = getFilterCounts(testimonials);

  return (
    <div className="h-full bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Customer Reviews</h1>
            <p className="mt-1 text-sm text-gray-600">
              View and manage all customer testimonials
            </p>
          </div>

          {/* Search, Filter & Refresh */}
          <div className="flex items-center gap-3">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <FilterDropdown 
              value={activeFilter} 
              onChange={setActiveFilter} 
              options={filterOptions} 
            />
            <RefreshButton onClick={fetchTestimonials} loading={loading} />
          </div>
        </div>

        {/* Total Reviews Card */}
        <TotalReviewsCard count={testimonials.length} />

        {/* Reviews List - Scrollable */}
        <div 
          className="space-y-4 overflow-y-auto" 
          style={{ 
            maxHeight: 'calc(100vh - 450px)', 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none' 
          }}
        >
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {loading ? (
            <LoadingState />
          ) : filteredTestimonials.length === 0 ? (
            <EmptyState searchTerm={searchTerm} activeFilter={activeFilter} />
          ) : (
            filteredTestimonials.map((testimonial) => (
              <ReviewCard key={testimonial._id} testimonial={testimonial} />
            ))
          )}
        </div>

        {/* Results Count */}
        {!loading && filteredTestimonials.length > 0 && (
          <ResultsCount 
            filtered={filteredTestimonials.length} 
            total={testimonials.length} 
          />
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;