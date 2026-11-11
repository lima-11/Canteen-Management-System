
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function downloadInvoice(order) {
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;

  const formatAmount = (amount) =>
    `Tk ${Number(amount || 0).toFixed(2)}`;

  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-GB")
    : "N/A";

  // =========================
  // HEADER
  // =========================

  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(25);

  doc.text("CanteenPro", margin, 22);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  doc.text("Food Ordering & Management System", margin, 29);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);

  doc.text("INVOICE", pageWidth - margin, 22, {
    align: "right",
  });

  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);

  doc.line(margin, 36, pageWidth - margin, 36);

  // =========================
  // ORDER INFORMATION
  // =========================

  let y = 48;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);

  doc.text("ORDER INFORMATION", margin, y);

  y += 10;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");

  const leftInfo = [
    ["Order ID", order.id],
    ["Customer", order.customerName],
    ["Phone", order.phone || "N/A"],
    ["Address", order.address || "N/A"],
  ];

  const rightInfo = [
    ["Date", orderDate],
    ["Table", order.tableNumber || "N/A"],
    ["Chair", order.chairNumber || "N/A"],
  ];

  leftInfo.forEach(([label, value], index) => {
    const rowY = y + index * 7;

    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, margin, rowY);

    doc.setFont("helvetica", "normal");

    const text = doc.splitTextToSize(
      String(value),
      65
    );

    doc.text(text, margin + 25, rowY);
  });

  rightInfo.forEach(([label, value], index) => {
    const rowY = y + index * 7;

    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, 115, rowY);

    doc.setFont("helvetica", "normal");
    doc.text(String(value), 137, rowY);
  });

  // =========================
  // ITEMS TABLE
  // =========================

  const tableStartY = y + 36;

  autoTable(doc, {
    startY: tableStartY,

    margin: {
      left: margin,
      right: margin,
    },

    head: [
      [
        "SL",
        "Food Item",
        "Unit Price",
        "Quantity",
        "Subtotal",
      ],
    ],

    body: order.items.map((item, index) => [
      index + 1,
      item.name,
      formatAmount(item.price),
      item.quantity,
      formatAmount(item.price * item.quantity),
    ]),

    theme: "grid",

    styles: {
      font: "helvetica",
      fontSize: 9,
      textColor: [0, 0, 0],
      lineColor: [160, 160, 160],
      lineWidth: 0.2,
      cellPadding: 4,
      overflow: "linebreak",
      valign: "middle",
    },

    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      fontStyle: "bold",
      lineColor: [0, 0, 0],
      lineWidth: 0.4,
      halign: "center",
    },

    bodyStyles: {
      fillColor: [255, 255, 255],
    },

    columnStyles: {
      0: {
        cellWidth: 12,
        halign: "center",
      },
      1: {
        cellWidth: "auto",
        halign: "left",
      },
      2: {
        cellWidth: 32,
        halign: "right",
      },
      3: {
        cellWidth: 22,
        halign: "center",
      },
      4: {
        cellWidth: 35,
        halign: "right",
      },
    },

    didDrawPage: () => {
      // White background on every page.
      doc.setFillColor(255, 255, 255);
    },
  });

  // =========================
  // TOTAL
  // =========================

  let finalY = doc.lastAutoTable.finalY + 12;

  if (finalY > 255) {
    doc.addPage();
    finalY = 25;
  }

  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.4);

  doc.line(115, finalY, pageWidth - margin, finalY);

  finalY += 10;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);

  doc.text("GRAND TOTAL", 115, finalY);

  doc.text(
    formatAmount(order.total),
    pageWidth - margin,
    finalY,
    { align: "right" }
  );

  // =========================
  // PAYMENT INFORMATION
  // =========================

  finalY += 18;

  if (finalY > 265) {
    doc.addPage();
    finalY = 25;
  }

  doc.setFontSize(11);
  doc.text("PAYMENT INFORMATION", margin, finalY);

  finalY += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  doc.text(
    `Payment Method: ${order.paymentMethod || "N/A"}`,
    margin,
    finalY
  );

  doc.text(
    `Payment Status: ${order.paymentStatus || "N/A"}`,
    margin,
    finalY + 7
  );

  doc.text(
    `Order Status: ${order.status || "N/A"}`,
    margin,
    finalY + 14
  );

  // =========================
  // FOOTER
  // =========================

  const pageCount = doc.internal.getNumberOfPages();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setDrawColor(150, 150, 150);
    doc.setLineWidth(0.2);

    doc.line(
      margin,
      pageHeight - 18,
      pageWidth - margin,
      pageHeight - 18
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(80, 80, 80);

    doc.text(
      "Thank you for ordering with CanteenPro!",
      pageWidth / 2,
      pageHeight - 11,
      { align: "center" }
    );

    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth - margin,
      pageHeight - 5,
      { align: "right" }
    );
  }

  // =========================
  // DOWNLOAD PDF
  // =========================

  doc.save(`CanteenPro-Invoice-${order.id}.pdf`);
}
