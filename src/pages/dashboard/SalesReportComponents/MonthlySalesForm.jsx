import React, { useRef, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import axios from "axios";

const MonthlySalesForm = () => {
  const formRef = useRef();
  const [salesData, setSalesData] = useState({
    breakdown: [],
    totalSales: 0,
    startDate: "",
    endDate: "",
    isLoading: true,
  });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(
          "http://https://salon-app-server.onrender.com:5000/api/appointments/sales-monthly-breakdown"
        );

        setSalesData({
          breakdown: response.data.breakdown || [],
          totalSales: response.data.totalSales || 0,
          startDate: response.data.startDate || "",
          endDate: response.data.endDate || "",
          isLoading: false,
        });
      } catch (error) {
        console.error("❌ Error fetching monthly breakdown:", error);
        setSalesData({
          breakdown: [],
          totalSales: 0,
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
    if (!salesData.startDate) return "";

    const monthStart = new Date(salesData.startDate);
    const startDay = (weekNumber - 1) * 7 + 1;
    const endDay = Math.min(
      weekNumber * 7,
      new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate()
    );

    const startDate = new Date(
      monthStart.getFullYear(),
      monthStart.getMonth(),
      startDay
    );
    const endDate = new Date(
      monthStart.getFullYear(),
      monthStart.getMonth(),
      endDay
    );

    return `${startDate.getDate()}-${endDate.getDate()}`;
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
              {/* Services Table with 4 Week Columns */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-y-2 border-gray-800 avoid-break">
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">
                        Service
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-900 uppercase">
                        <div>Week 1</div>
                        <div className="text-xs font-normal text-gray-600 mt-1">
                          {getWeekDateRange(1)}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-900 uppercase">
                        <div>Week 2</div>
                        <div className="text-xs font-normal text-gray-600 mt-1">
                          {getWeekDateRange(2)}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-900 uppercase">
                        <div>Week 3</div>
                        <div className="text-xs font-normal text-gray-600 mt-1">
                          {getWeekDateRange(3)}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-900 uppercase">
                        <div>Week 4</div>
                        <div className="text-xs font-normal text-gray-600 mt-1">
                          {getWeekDateRange(4)}
                        </div>
                      </th>
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
                        <td className="px-4 py-3 text-sm text-center text-gray-800">
                          ₱
                          {service.week1.toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-gray-800">
                          ₱
                          {service.week2.toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-gray-800">
                          ₱
                          {service.week3.toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-gray-800">
                          ₱
                          {service.week4.toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
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
