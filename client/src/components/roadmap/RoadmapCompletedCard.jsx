import React from "react";
import jsPDF from "jspdf";

const RoadmapCompletedCard = ({ onRegenerate }) => {
  const downloadCertificate = () => {
    const doc = new jsPDF();

    // ================= BORDER =================
    doc.setDrawColor(0, 180, 200);
    doc.setLineWidth(2);
    doc.rect(10, 10, 190, 277);

    doc.setDrawColor(120, 220, 255);
    doc.setLineWidth(0.5);
    doc.rect(14, 14, 182, 269);

    // ================= TITLE =================
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(0, 150, 180);
    doc.text("CERTIFICATE", 105, 45, { align: "center" });

    doc.setFontSize(16);
    doc.setTextColor(80, 80, 80);
    doc.text("OF COMPLETION", 105, 55, { align: "center" });

    // ================= BODY =================
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("This certificate is proudly presented to", 105, 80, {
      align: "center",
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("AI Learner", 105, 95, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    doc.text(
      "For successfully completing a structured AI Career Roadmap",
      105,
      115,
      { align: "center", maxWidth: 150 }
    );

    doc.text(
      "demonstrating consistency, discipline, and skill growth",
      105,
      130,
      { align: "center", maxWidth: 150 }
    );

    // ================= DATE =================
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 30, 180);

    // ================= SIGNATURES =================
    doc.line(30, 220, 85, 220);
    doc.text("Learner", 45, 230);

    doc.line(125, 220, 180, 220);
    doc.text("AI Platform", 140, 230);

    // ================= FOOTER =================
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text("AI Career Coach Platform", 105, 270, {
      align: "center",
    });

    doc.save("AI_Roadmap_Certificate.pdf");
  };

  return (
    <div className="
      mt-12
      rounded-[32px]
      overflow-hidden
      border border-emerald-500/20
      bg-gradient-to-br from-emerald-500/10 via-slate-900/40 to-cyan-500/10
      backdrop-blur-xl
      p-8 md:p-12
      text-center
    ">

      <h2 className="text-3xl md:text-4xl font-black mb-3">
        Learning Journey Completed
      </h2>

      <p className="max-w-2xl mx-auto text-slate-300 text-sm md:text-base">
        You’ve completed your roadmap. Download your certificate or generate a new one.
      </p>

      <div className="
        flex flex-col sm:flex-row
        justify-center
        gap-4
        mt-10
      ">

        <button
          onClick={downloadCertificate}
          className="
            h-12 px-6
            rounded-2xl
            bg-white/[0.05]
            border border-white/10
            font-semibold
            hover:bg-white/[0.08]
            transition
          "
        >
          Download Certificate
        </button>

        <button
          onClick={onRegenerate}
          className="
            h-12 px-6
            rounded-2xl
            bg-gradient-to-r from-cyan-500 to-blue-500
            font-semibold
            hover:scale-[1.02]
            transition
            shadow-lg shadow-cyan-500/20
          "
        >
          Generate New Roadmap
        </button>

      </div>
    </div>
  );
};

export default RoadmapCompletedCard;