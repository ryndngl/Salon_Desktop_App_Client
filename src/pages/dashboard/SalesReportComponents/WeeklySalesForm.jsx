import React, { useRef, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import axios from "axios";

const WeeklySalesForm = () => {
  const formRef = useRef();
  const [salesData, setSalesData] = useState({
    breakdown: [],
    totalSales: 0,
    startDate: "",
    endDate: "",
    dayLabels: [],
    isLoading: true,
  });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(
          "https://salon-app-server.onrender.com/api/appointments/sales-weekly-breakdown"
        );

        setSalesData({
          breakdown: response.data.breakdown || [],
          totalSales: response.data.totalSales || 0,
          startDate: response.data.startDate || "",
          endDate: response.data.endDate || "",
          dayLabels: response.data.dayLabels || [],
          isLoading: false,
        });
      } catch (error) {
        console.error("❌ Error fetching weekly breakdown:", error);
        setSalesData({
          breakdown: [],
          totalSales: 0,
          startDate: "",
          endDate: "",
          dayLabels: [],
          isLoading: false,
        });
      }
    };

    fetchSalesData();
  }, []);

  const formatDateRange = () => {
    if (!salesData.startDate || !salesData.endDate) {
      return "Loading...";
    }
    const start = new Date(salesData.startDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const end = new Date(salesData.endDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${start} - ${end}`;
  };

  const formatDayLabel = (index) => {
    if (salesData.dayLabels && salesData.dayLabels[index]) {
      const date = new Date(salesData.dayLabels[index].date);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
    return "";
  };

  const handleDownloadPDF = () => {
    const element = formRef.current;
    const opt = {
      margin: 10,
      filename: `weekly-sales-report-${Date.now()}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
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
        className="bg-white border-2 border-gray-300 max-w-6xl mx-auto"
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
              Weekly Sales Report
            </h2>
            <p className="text-sm text-gray-600">Period: {formatDateRange()}</p>
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
                No sales data available for this week
              </p>
            </div>
          ) : (
            <>
              {/* Services Table with 7 Day Columns */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-y-2 border-gray-800 avoid-break">
                      <th className="px-2 py-3 text-left font-bold text-gray-900 uppercase tracking-wide">
                        Service
                      </th>
                      <th className="px-2 py-3 text-center font-bold text-gray-900 uppercase">
                        <div>Day 1</div>
                        <div className="text-xs font-normal text-gray-600 mt-1">
                          {formatDayLabel(0)}
                        </div>
                      </th>
                      <th className="px-2 py-3 text-center font-bold text-gray-900 uppercase">
                        <div>Day 2</div>
                        <div className="text-xs font-normal text-gray-600 mt-1">
                          {formatDayLabel(1)}
                        </div>
                      </th>
                      <th className="px-2 py-3 text-center font-bold text-gray-900 uppercase">
                        <div>Day 3</div>
                        <div className="text-xs font-normal text-gray-600 mt-1">
                          {formatDayLabel(2)}
                        </div>
                      </th>
                      <th className="px-2 py-3 text-center font-bold text-gray-900 uppercase">
                        <div>Day 4</div>
                        <div className="text-xs font-normal text-gray-600 mt-1">
                          {formatDayLabel(3)}
                        </div>
                      </th>
                      <th className="px-2 py-3 text-center font-bold text-gray-900 uppercase">
                        <div>Day 5</div>
                        <div className="text-xs font-normal text-gray-600 mt-1">
                          {formatDayLabel(4)}
                        </div>
                      </th>
                      <th className="px-2 py-3 text-center font-bold text-gray-900 uppercase">
                        <div>Day 6</div>
                        <div className="text-xs font-normal text-gray-600 mt-1">
                          {formatDayLabel(5)}
                        </div>
                      </th>
                      <th className="px-2 py-3 text-center font-bold text-gray-900 uppercase">
                        <div>Day 7</div>
                        <div className="text-xs font-normal text-gray-600 mt-1">
                          {formatDayLabel(6)}
                        </div>
                      </th>
                      <th className="px-2 py-3 text-center font-bold text-gray-900 uppercase bg-gray-100">
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
                        <td className="px-2 py-3 text-gray-800">
                          {service.service}
                        </td>
                        <td className="px-2 py-3 text-center text-gray-800">
                          ₱
                          {service.day1.toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-2 py-3 text-center text-gray-800">
                          ₱
                          {service.day2.toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-2 py-3 text-center text-gray-800">
                          ₱
                          {service.day3.toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-2 py-3 text-center text-gray-800">
                          ₱
                          {service.day4.toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-2 py-3 text-center text-gray-800">
                          ₱
                          {service.day5.toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-2 py-3 text-center text-gray-800">
                          ₱
                          {service.day6.toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-2 py-3 text-center text-gray-800">
                          ₱
                          {service.day7.toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-2 py-3 text-center text-gray-800 font-bold bg-gray-50">
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
                    Total Weekly Sales:
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

export default WeeklySalesForm;
