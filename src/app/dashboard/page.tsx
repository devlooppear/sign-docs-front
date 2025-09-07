"use client";

import { useMemo } from "react";
import { Typography, Box, Button, Paper } from "@mui/material";
import StyledCardContainer from "@/components/StyledCardContainer/StyledCardContainer";
import { useTranslation } from "react-i18next";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { saveAs } from "file-saver";
import { useDocuments } from "@/hooks/useDocuments/useDocuments";
import { DocumentStatus } from "@/enum/document-status";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const { t } = useTranslation("dashboard");

  const { data: documents = [], isLoading } = useDocuments({
    page: 1,
    limit: 1000,
  });

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    documents.forEach((doc) => {
      counts[doc.status] = (counts[doc.status] || 0) + 1;
    });
    return counts;
  }, [documents]);

  const metrics = useMemo(
    () => [
      { label: t("metrics.totalDocuments"), value: documents.length },
      {
        label: t("metrics.signedDocuments"),
        value: statusCounts[DocumentStatus.SIGNED] || 0,
      },
      {
        label: t("metrics.availableDocuments"),
        value: statusCounts[DocumentStatus.AVAILABLE] || 0,
      },
    ],
    [documents, statusCounts, t]
  );

  const barData = useMemo(
    () => ({
      labels: Object.keys(statusCounts).map((status) =>
        status === DocumentStatus.SIGNED
          ? t("status.signed")
          : status === DocumentStatus.AVAILABLE
          ? t("status.available")
          : status
      ),
      datasets: [
        {
          label: t("charts.documentsByStatus"),
          data: Object.values(statusCounts),
          backgroundColor: ["#4caf50", "#3f51b5", "#ff9800", "#e91e63"],
        },
      ],
    }),
    [statusCounts, t]
  );

  const handleExportCSV = () => {
    const headers = ["Status", "Quantidade"];
    const rows = barData.labels.map((label, index) => [
      label,
      barData.datasets[0].data[index],
    ]);
    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "dashboard_report.csv");
  };

  return (
    <StyledCardContainer>
      <Typography variant="h4" gutterBottom>
        {t("title")}
      </Typography>

      {/* Grid de métricas */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 2,
          mb: 4,
        }}
      >
        {metrics.map((metric, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{ p: 2, textAlign: "center", backgroundColor: "#f5f5f5" }}
          >
            <Typography variant="subtitle1">{metric.label}</Typography>
            <Typography variant="h5" fontWeight="bold">
              {metric.value.toLocaleString()}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Gráfico */}
      <Box sx={{ my: 3 }}>
        <Typography variant="h6">{t("charts.documentsByStatus")}</Typography>
        <Bar
          data={barData}
          options={{
            plugins: { legend: { display: false } },
            responsive: true,
          }}
        />
      </Box>

      {/* Export CSV */}
      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" onClick={handleExportCSV}>
          {t("actions.exportCSV")}
        </Button>
      </Box>
    </StyledCardContainer>
  );
};

export default DashboardPage;
