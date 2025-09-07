"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Typography, Box, Divider } from "@mui/material";
import { AiOutlineUpload } from "react-icons/ai";
import StyledButton from "@/components/StyledButton/StyledButton";
import {
  useUploadDocument,
  UploadDocumentBody,
  DocumentResponse,
} from "@/hooks/useUploadDocument/useUploadDocument";
import systemColors from "@/common/constants/systemColors";

type FormValues = {
  file: FileList | null;
};

const schema: yup.ObjectSchema<FormValues> = yup.object({
  file: yup
    .mixed<FileList>()
    .nullable()
    .required("Arquivo é obrigatório")
    .test("fileType", "Somente arquivos PDF são permitidos", (value) => {
      if (!value || value.length === 0) return false;
      return value[0].type === "application/pdf";
    })
    .test("fileSize", "Arquivo muito grande (máx. 10MB)", (value) => {
      if (!value || value.length === 0) return false;
      return value[0].size <= 10 * 1024 * 1024;
    }),
});

const ToSignPage = () => {
  const { control, handleSubmit, formState, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { file: null },
  });

  const { upload, loading, error, data } = useUploadDocument();
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const onSubmit = async (values: FormValues) => {
    if (!values.file || values.file.length === 0) return;
    try {
      await upload({ file: values.file[0] });
      setUploadSuccess(true);
      reset();
    } catch {
      setUploadSuccess(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 8,
        p: 4,
        borderRadius: 3,
        boxShadow: `0px 6px 20px ${systemColors.indigo[200]}`,
        background: systemColors.indigo[50],
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h4" color={systemColors.indigo[800]}>
        Upload de Documento
      </Typography>

      <Divider sx={{ borderColor: systemColors.indigo[200] }} />

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <Box>
              <input
                type="file"
                id="file-upload"
                hidden
                accept="application/pdf"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(e.target.files)
                }
              />
              <StyledButton
                variant="outlined"
                component="label"
                htmlFor="file-upload"
                startIcon={<AiOutlineUpload />}
                fullWidth
                label={
                  field.value && field.value.length > 0
                    ? field.value[0].name
                    : "Selecionar PDF"
                }
              />
            </Box>
          )}
        />

        {formState.errors.file && (
          <Typography color="error">{formState.errors.file.message}</Typography>
        )}

        <StyledButton
          type="submit"
          variant="contained"
          loading={loading}
          label={loading ? "Enviando..." : "Enviar PDF"}
        />

        {uploadSuccess && (
          <Typography color="success.main">
            Arquivo enviado com sucesso!
          </Typography>
        )}

        {error && (
          <Typography color="error">Erro ao enviar arquivo.</Typography>
        )}

        {data?.url && (
          <Typography>
            URL do arquivo:{" "}
            <a href={data.url} target="_blank" rel="noopener noreferrer">
              {data.name}
            </a>
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ToSignPage;
