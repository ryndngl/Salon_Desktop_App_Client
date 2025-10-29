export const getMonthlySalesBreakdown = async (req, res) => {
  try {
    const { year, month } = req.query;
    
    let startDate, endDate;
    
    if (year && month) {
      startDate = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, 1));
      endDate = new Date(Date.UTC(parseInt(year), parseInt(month), 0, 23, 59, 59, 999));
    } else {
      const today = getPhilippineToday();
      startDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
      endDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + 1, 0, 23, 59, 59, 999));
    }

    const appointments = await Appointment.find({
      date: { $gte: startDate, $lte: endDate },
      status: { $in: ['Completed', 'Confirmed'] }
    });

    const walkIns = await WalkIn.find({
      date: { $gte: startDate, $lte: endDate },
      paymentStatus: 'Paid',
      is_main_record: true
    });

    // ✅ DYNAMIC: Calculate total days in month
    const totalDaysInMonth = endDate.getUTCDate();
    
    // ✅ DYNAMIC: Calculate how many weeks based on days
    const totalWeeks = Math.ceil(totalDaysInMonth / 7);
    
    // ✅ DYNAMIC: Generate week ranges automatically
    const weekRanges = [];
    for (let week = 1; week <= totalWeeks; week++) {
      const weekStart = 1 + (week - 1) * 7;
      let weekEnd = weekStart + 6;
      
      // Last week shouldn't exceed month's last day
      if (weekEnd > totalDaysInMonth) {
        weekEnd = totalDaysInMonth;
      }
      
      weekRanges.push({
        week,
        start: weekStart,
        end: weekEnd
      });
    }

    // ✅ DYNAMIC: Function to get week number based on day
    const getWeekOfMonth = (date) => {
      const dateObj = new Date(date);
      const dayOfMonth = dateObj.getUTCDate();
      
      // Find which week this day belongs to
      for (let i = 0; i < weekRanges.length; i++) {
        if (dayOfMonth >= weekRanges[i].start && dayOfMonth <= weekRanges[i].end) {
          return weekRanges[i].week;
        }
      }
      
      // Fallback: return last week
      return totalWeeks;
    };

    // ✅ DYNAMIC: Initialize service breakdown with dynamic weeks
    const initServiceData = (serviceName) => {
      const data = { service: serviceName, total: 0 };
      
      // Add week1, week2, week3, etc. dynamically
      for (let i = 1; i <= totalWeeks; i++) {
        data[`week${i}`] = 0;
      }
      
      return data;
    };

    // ✅ Helper function to normalize service names
    const normalizeServiceName = (name) => {
      const normalized = name.toLowerCase().trim();
      
      // Normalize haircut variations
      if (normalized.includes('haircut') || normalized.includes('hair cut')) {
        return 'Hair Cut';
      }
      
      // Add more normalizations here as needed
      // if (normalized.includes('rebond')) return 'Rebond';
      // if (normalized.includes('color')) return 'Hair Color';
      
      return name; // Return original if no match
    };

    const serviceBreakdown = new Map();

    // Process appointments
    appointments.forEach(apt => {
      const weekNum = getWeekOfMonth(apt.date);

      apt.services.forEach(service => {
        const serviceName = normalizeServiceName(service.name);
        const servicePrice = parseFloat(service.price) || 0;

        if (!serviceBreakdown.has(serviceName)) {
          serviceBreakdown.set(serviceName, initServiceData(serviceName));
        }

        const weekKey = `week${weekNum}`;
        const serviceData = serviceBreakdown.get(serviceName);
        
        if (serviceData[weekKey] !== undefined) {
          serviceData[weekKey] += servicePrice;
          serviceData.total += servicePrice;
        }
      });
    });

    // Process walk-ins
    walkIns.forEach(walkIn => {
      const weekNum = getWeekOfMonth(walkIn.date);
      const serviceName = normalizeServiceName(walkIn.services || 'Walk-in Service');
      const servicePrice = parseFloat(walkIn.amount) || 0;

      if (!serviceBreakdown.has(serviceName)) {
        serviceBreakdown.set(serviceName, initServiceData(serviceName));
      }

      const weekKey = `week${weekNum}`;
      const serviceData = serviceBreakdown.get(serviceName);
      
      if (serviceData[weekKey] !== undefined) {
        serviceData[weekKey] += servicePrice;
        serviceData.total += servicePrice;
      }
    });

    const breakdown = Array.from(serviceBreakdown.values());
    const totalSales = breakdown.reduce((sum, service) => sum + service.total, 0);

    res.status(200).json({
      success: true,
      startDate,
      endDate,
      totalWeeks, 
      weekRanges,
      breakdown,
      totalSales
    });

  } catch (error) {
    console.error('❌ Monthly breakdown error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};