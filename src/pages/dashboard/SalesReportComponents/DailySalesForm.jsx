import React, { useRef, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import axios from "axios";

const DailySalesForm = () => {
  const formRef = useRef();
  const [salesData, setSalesData] = useState({
    services: [],
    totalSales: 0,
    isLoading: true,
  });

  // Fetch daily sales data
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(
          "http://https://salon-app-server.onrender.com:5000/api/appointments/sales-report?period=daily"
        );

        setSalesData({
          services: response.data.services || [],
          totalSales: response.data.totalSales || 0,
          isLoading: false,
        });
      } catch (error) {
        console.error("❌ Error fetching daily sales data:", error);
        setSalesData({
          services: [],
          totalSales: 0,
          isLoading: false,
        });
      }
    };

    fetchSalesData();
  }, []); // Only fetch once on mount

  const getCurrentDate = () => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  const handleDownloadPDF = () => {
    const element = formRef.current;
    const opt = {
      margin: 10,
      filename: `daily-sales-report-${Date.now()}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
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
        className="bg-white border-2 border-gray-300 max-w-4xl mx-auto"
      >
        {/* Document Header with border */}
        <div className="border-b-4 border-double border-gray-800 p-8 text-center">
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
              Daily Sales Report
            </h2>
            <p className="text-sm text-gray-600">Date: {getCurrentDate()}</p>
          </div>
        </div>

        {/* Document Body */}
        <div className="p-8">
          {/* Sales Summary Section */}
          <div className="mb-6">
            <h3 className="text-base font-bold text-gray-900 uppercase mb-4 border-b border-gray-400 pb-2">
              Sales Summary
            </h3>
          </div>

          {/* Loading State */}
          {salesData.isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading sales data...</p>
            </div>
          ) : salesData.services.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No sales data available for today</p>
            </div>
          ) : (
            <>
              {/* Services Table */}
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-y-2 border-gray-800">
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">
                      Service Description
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-bold text-gray-900 uppercase tracking-wide">
                      Amount (₱)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.services.map((service, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="px-4 py-3 text-sm text-gray-800">
                        {service.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800 text-right font-medium">
                        ₱
                        {service.amount.toLocaleString("en-PH", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Total Section */}
              <div className="mt-8 border-t-4 border-double border-gray-800 pt-4">
                <div className="flex justify-between items-center px-4">
                  <span className="text-base font-bold text-gray-900 uppercase tracking-wide">
                    Total Sales:
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
          <div className="mt-12 grid grid-cols-2 gap-8">
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

export default DailySalesForm;
