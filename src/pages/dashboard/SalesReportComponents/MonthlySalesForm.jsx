import React, { useRef, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import axios from "axios";

const MonthlySalesForm = () => {
  const formRef = useRef();
  const [salesData, setSalesData] = useState({
    breakdown: [],
    totalSales: 0,
    totalWeeks: 4, // Default to 4 weeks
    weekRanges: [],
    startDate: "",
    endDate: "",
    isLoading: true,
  });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(
          "https://salon-app-server-0akh.onrender.com/api/appointments/sales-monthly-breakdown"
        );

        setSalesData({
          breakdown: response.data.breakdown || [],
          totalSales: response.data.totalSales || 0,
          totalWeeks: response.data.totalWeeks || 4, // ✅ Get dynamic weeks
          weekRanges: response.data.weekRanges || [],
          startDate: response.data.startDate || "",
          endDate: response.data.endDate || "",
          isLoading: false,
        });
      } catch (error) {
        console.error("❌ Error fetching monthly breakdown:", error);
        setSalesData({
          breakdown: [],
          totalSales: 0,
          totalWeeks: 4,
          weekRanges: [],
          startDate: "",
          endDate: "",
          isLoading: false,
        });
      }
    };

    fetchSalesData();
  }, []);

  const formatMonthYear = () => {
    if (!salesData.startDate) {
      return "Loading...";
    }
    return new Date(salesData.startDate).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const getWeekDateRange = (weekNumber) => {
    // ✅ Use weekRanges from API instead of calculating
    const weekRange = salesData.weekRanges.find((w) => w.week === weekNumber);
    if (weekRange) {
      return `${weekRange.start}-${weekRange.end}`;
    }
    return "";
  };

  const handleDownloadPDF = () => {
    const element = formRef.current;
    const opt = {
      margin: 10,
      filename: `monthly-sales-report-${Date.now()}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    html2pdf().set(opt).from(element).save();
  };

  // ✅ Dynamic function to render week columns based on totalWeeks
  const renderWeekHeaders = () => {
    const headers = [];
    for (let week = 1; week <= salesData.totalWeeks; week++) {
      headers.push(
        <th
          key={week}
          className="px-4 py-3 text-center text-sm font-bold text-gray-900 uppercase"
        >
          <div>Week {week}</div>
          <div className="text-xs font-normal text-gray-600 mt-1">
            {getWeekDateRange(week)}
          </div>
        </th>
      );
    }
    return headers;
  };

  // ✅ Dynamic function to render week data cells
  const renderWeekCells = (service) => {
    const cells = [];
    for (let week = 1; week <= salesData.totalWeeks; week++) {
      const weekKey = `week${week}`;
      const value = service[weekKey] || 0;
      cells.push(
        <td key={week} className="px-4 py-3 text-sm text-center text-gray-800">
          ₱
          {value.toLocaleString("en-PH", {
            minimumFractionDigits: 2,
          })}
        </td>
      );
    }
    return cells;
  };

  return (
    <div className="relative">
      {/* Download Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownloadPDF}
          className="px-6 py-2 bg-red-600 text-white rounded-md font-medium text-sm hover:bg-red-700"
        >
          Download PDF
        </button>
      </div>

      {/* Formal Document Form */}
      <div
        ref={formRef}
        className="bg-white border-2 border-gray-300 max-w-5xl mx-auto"
      >
        {/* PDF Page Break Styles */}
        <style jsx>{`
          @media print {
            .page-break-before {
              page-break-before: always;
            }
            .page-break-after {
              page-break-after: always;
            }
            .avoid-break {
              page-break-inside: avoid;
            }
          }
        `}</style>

        {/* Document Header */}
        <div className="border-b-4 border-double border-gray-800 p-8 text-center avoid-break">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wide mb-3">
              Van's Glow Up Salon
            </h1>
            <div className="text-sm text-gray-700 leading-relaxed space-y-1">
              <p>Blk 7 Lot 2 Phase 1 Sub Urban Village</p>
              <p>Brgy. San Jose Rodriguez Rizal, Philippines</p>
            </div>
          </div>

          <div className="border-t-2 border-gray-300 pt-4 mt-6">
            <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide mb-2">
              Monthly Sales Report
            </h2>
            <p className="text-sm text-gray-600">Period: {formatMonthYear()}</p>
          </div>
        </div>

        {/* Document Body */}
        <div className="p-8">
          {/* Sales Summary Section */}
          <div className="mb-6 avoid-break">
            <h3 className="text-base font-bold text-gray-900 uppercase mb-4 border-b border-gray-400 pb-2">
              Sales Summary
            </h3>
          </div>

          {/* Loading State */}
          {salesData.isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading sales data...</p>
            </div>
          ) : salesData.breakdown.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No sales data available for this month
              </p>
            </div>
          ) : (
            <>
              {/* ✅ Dynamic Services Table - Week columns adjust automatically */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-y-2 border-gray-800 avoid-break">
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">
                        Service
                      </th>
                      {/* ✅ Dynamic week headers */}
                      {renderWeekHeaders()}
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-900 uppercase bg-gray-100">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.breakdown.map((service, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 avoid-break"
                      >
                        <td className="px-4 py-3 text-sm text-gray-800">
                          {service.service}
                        </td>
                        {/* ✅ Dynamic week cells */}
                        {renderWeekCells(service)}
                        <td className="px-4 py-3 text-sm text-center text-gray-800 font-bold bg-gray-50">
                          ₱
                          {service.total.toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total Section */}
              <div className="mt-8 border-t-4 border-double border-gray-800 pt-4 avoid-break">
                <div className="flex justify-between items-center px-4">
                  <span className="text-base font-bold text-gray-900 uppercase tracking-wide">
                    Total Monthly Sales:
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    ₱
                    {salesData.totalSales.toLocaleString("en-PH", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Signature Section */}
          <div className="mt-12 grid grid-cols-2 gap-8 avoid-break">
            <div className="text-center">
              <div className="border-t border-gray-800 pt-2 mt-12">
                <p className="text-sm font-medium text-gray-900">Prepared by</p>
                <p className="text-xs text-gray-600 mt-1">Admin</p>
              </div>
            </div>
            <div className="text-center">
              <div className="border-t border-gray-800 pt-2 mt-12">
                <p className="text-sm font-medium text-gray-900">Approved by</p>
                <p className="text-xs text-gray-600 mt-1">Salon Owner</p>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-8 pt-4 border-t border-gray-300">
            <p className="text-xs text-gray-500 text-center">
              This is a system-generated document. For inquiries, please contact
              the salon office.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlySalesForm;
