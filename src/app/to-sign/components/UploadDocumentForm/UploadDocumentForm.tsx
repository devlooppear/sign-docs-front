"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Typography, Box } from "@mui/material";
import StyledButton from "@/components/StyledButton/StyledButton";
import { useUploadDocument } from "@/hooks/useUploadDocument/useUploadDocument";
import { useTranslation } from "react-i18next";
import { StyledFileSelect } from "@/components/StyledFileSelect/StyledFileSelect";
import { SignDocsSteps } from "@/enum/signDocs";

type FormValues = {
  file: FileList | null;
};

interface UploadDocumentFormProps {
  setStep: (step: SignDocsSteps) => void;
  setDocument: (doc: any) => void;
}

export const UploadDocumentForm: React.FC<UploadDocumentFormProps> = ({
  setStep,
  setDocument,
}) => {
  const { t } = useTranslation("to-sign");
  const { upload, loading, error, data } = useUploadDocument();
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const schema: yup.ObjectSchema<FormValues> = yup.object({
    file: yup
      .mixed<FileList>()
      .nullable()
      .required(t("file_required"))
      .test("fileType", t("file_type"), (value) => {
        if (!value || value.length === 0) return false;
        return value[0].type === "application/pdf";
      })
      .test("fileSize", t("file_size"), (value) => {
        if (!value || value.length === 0) return false;
        return value[0].size <= 10 * 1024 * 1024;
      }),
  });

  const { control, handleSubmit, formState, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { file: null },
  });

  const onSubmit = async (values: FormValues) => {
    if (!values.file || values.file.length === 0) return;
    try {
      const res = await upload({ file: values.file[0] });

      setUploadSuccess(true);
      reset();

      if (res?.document) {
        setDocument({
          ...res.document,
          url: res.url,
        });
        setStep(SignDocsSteps.SIGN);
      }
    } catch {
      setUploadSuccess(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Controller
        name="file"
        control={control}
        render={({ field }) => (
          <StyledFileSelect
            file={field.value && field.value.length > 0 ? field.value[0] : null}
            onFileChange={(file: File | null) =>
              field.onChange(
                file
                  ? ({
                      0: file,
                      length: 1,
                      item: (i: number) => (i === 0 ? file : undefined),
                    } as unknown as FileList)
                  : null
              )
            }
            accept="application/pdf"
            label={t("select_pdf")}
            removeLabel={t("remove_file")}
            disabled={loading}
          />
        )}
      />

      {formState.errors.file && (
        <Typography color="error">{formState.errors.file.message}</Typography>
      )}

      <StyledButton
        type="submit"
        variant="contained"
        loading={loading}
        label={loading ? t("sending") : t("send_pdf")}
      />

      {uploadSuccess && (
        <Typography color="success.main">{t("success")}</Typography>
      )}
      {error && <Typography color="error">{t("error")}</Typography>}
    </Box>
  );
};
