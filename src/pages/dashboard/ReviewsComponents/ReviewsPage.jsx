import { useState, useEffect } from 'react';
import { Star, Search, RefreshCw, User, Calendar } from 'lucide-react';

const ReviewsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Fetch testimonials
  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://192.168.100.6:5000/api/testimonials');
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

  // Filter testimonials
  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = 
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.feedback.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRating = activeFilter === 'all' || testimonial.rating === parseInt(activeFilter);
    
    return matchesSearch && matchesRating;
  });

  // Render star rating
  const renderStars = (rating) => {
    return (
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
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Filter tabs
  const filterTabs = [
    { id: 'all', label: 'All Ratings', count: testimonials.length },
    { id: '5', label: '5 Stars', count: testimonials.filter(t => t.rating === 5).length },
    { id: '4', label: '4 Stars', count: testimonials.filter(t => t.rating === 4).length },
    { id: '3', label: '3 Stars', count: testimonials.filter(t => t.rating === 3).length },
    { id: '2', label: '2 Stars', count: testimonials.filter(t => t.rating === 2).length },
    { id: '1', label: '1 Star', count: testimonials.filter(t => t.rating === 1).length },
  ];

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
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search reviews by name or feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none"
              />
            </div>

            {/* Filter Dropdown */}
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:outline-none"
            >
              {filterTabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label} ({tab.count})
                </option>
              ))}
            </select>

            {/* Refresh Button */}
            <button
              onClick={fetchTestimonials}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-gray-700 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-600 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Total Reviews Card */}
        <div className="mb-6 inline-block rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reviews</p>
            </div>
            <div className="relative">
              <Star className="h-16 w-16 fill-yellow-400 text-yellow-400" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-gray-900">
                {filteredTestimonials.length}
              </span>
            </div>
          </div>
        </div>

        {/* Reviews List - Scrollable */}
        <div className="space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 450px)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <RefreshCw className="h-8 w-8 animate-spin text-red-600" />
            </div>
          ) : filteredTestimonials.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-sm">
              <Star className="h-16 w-16 text-gray-300" />
              <p className="mt-4 text-lg font-medium text-gray-600">No reviews found</p>
              <p className="mt-2 text-sm text-gray-500">
                {searchTerm || activeFilter !== 'all' 
                  ? 'Try adjusting your filters'
                  : 'Customer reviews will appear here'}
              </p>
            </div>
          ) : (
            filteredTestimonials.map((testimonial) => (
              <div
                key={testimonial._id}
                className="rounded-lg bg-white p-6 shadow-sm"
              >
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(testimonial.createdAt)}
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
            ))
          )}
        </div>

        {/* Results Count */}
        {!loading && filteredTestimonials.length > 0 && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Showing {filteredTestimonials.length} of {testimonials.length} reviews
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;