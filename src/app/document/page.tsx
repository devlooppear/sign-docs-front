"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridPaginationModel,
} from "@mui/x-data-grid";
import StyledCardContainer from "@/components/StyledCardContainer/StyledCardContainer";
import { useDocuments } from "@/hooks/useDocuments/useDocuments";
import { DocumentStatus } from "@/enum/document-status";
import systemColors from "@/common/constants/systemColors";
import { useTranslation } from "react-i18next";

const DocumentPage = () => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const { t } = useTranslation("document");

  const [statusFilter, setStatusFilter] = useState<DocumentStatus | "">("");

  const {
    data: documents = [],
    metadata,
    isLoading,
  } = useDocuments({
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
    status: statusFilter || undefined,
  });

  const mappedDocuments = documents.map((doc) => ({
    ...doc,
    uploaded_by_name: doc.uploaded_by?.name || "-",
    created_at_fmt: doc.created_at
      ? new Date(doc.created_at).toLocaleString()
      : "-",
  }));

  const columns: GridColDef<any>[] = [
    { field: "id", headerName: t("table.id"), width: 70 },
    { field: "name", headerName: t("table.documentName"), flex: 1 },
    { field: "uploaded_by_name", headerName: t("table.uploadedBy"), flex: 1 },
    {
      field: "status",
      headerName: t("table.status"),
      width: 140,
      type: "singleSelect",
      valueOptions: [
        { value: DocumentStatus.AVAILABLE, label: t("status.available") },
        { value: DocumentStatus.SIGNED, label: t("status.signed") },
      ],
      renderCell: (params: GridRenderCellParams<any>) => {
        const isSigned = params.row.status === DocumentStatus.SIGNED;
        return (
          <Chip
            label={t(`status.${params.row.status.toLowerCase()}`)}
            size="small"
            sx={{
              backgroundColor: isSigned
                ? systemColors.blue[500]
                : systemColors.indigo[100],
              color: isSigned ? "#fff" : systemColors.indigo[900],
              fontWeight: 500,
              borderRadius: 2,
              px: 1.5,
            }}
          />
        );
      },
    },
    { field: "created_at_fmt", headerName: t("table.createdAt"), width: 180 },
    {
      field: "url",
      headerName: t("table.actions"),
      width: 120,
      renderCell: (params: GridRenderCellParams<any>) => (
        <a
          href={params.row.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: systemColors.blue[700],
            fontWeight: 500,
            textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.textDecoration = "underline")
          }
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          {t("actions.open")}
        </a>
      ),
    },
  ];

  return (
    <StyledCardContainer>
      <Typography variant="h4" gutterBottom color={systemColors.indigo[800]}>
        {t("title")}
      </Typography>

      <FormControl sx={{ mb: 2, minWidth: 180 }}>
        <InputLabel>{t("filter.status")}</InputLabel>
        <Select
          value={statusFilter}
          label={t("filter.status")}
          onChange={(e) => setStatusFilter(e.target.value as DocumentStatus)}
        >
          <MenuItem value="">{t("filter.all")}</MenuItem>
          <MenuItem value={DocumentStatus.AVAILABLE}>{t("status.available")}</MenuItem>
          <MenuItem value={DocumentStatus.SIGNED}>{t("status.signed")}</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={mappedDocuments}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={metadata?.totalItems ?? documents.length}
          paginationMode="server"
          loading={isLoading}
          getRowId={(row) => row.id}
          sx={{
            border: `1px solid ${systemColors.indigo[200]}`,
            borderRadius: 2,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: systemColors.blue[50],
              borderBottom: `2px solid ${systemColors.indigo[200]}`,
              color: systemColors.indigo[900],
              fontWeight: 600,
            },
            "& .MuiDataGrid-row": {
              backgroundColor: "#fff",
              border: `1px solid ${systemColors.indigo[100]}`,
              borderRadius: 1,
              boxShadow: `inset 0 0 0 0 ${systemColors.indigo.transparent[10]}`,
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: systemColors.blue.transparent[10],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: `1px solid ${systemColors.indigo[200]}`,
            },
            fontFamily: "'Inter', sans-serif",
          }}
        />
      </Box>
    </StyledCardContainer>
  );
};

export default DocumentPage;
