"use client";

import React, { useEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { FaUserAlt, FaLock, FaIdCard } from "react-icons/fa";
import FormTextField from "@/components/FormTextField/FormTextField";
import StyledButton from "@/components/StyledButton/StyledButton";
import { useForm } from "react-hook-form";
import {
  RegisterVariables,
  useRegister,
} from "@/hooks/useRegister/useRegister";
import { useAuth } from "@/provider/auth/AuthProvide";
import { useNavTo } from "@/hooks/useNavTo/useNavTo";
import { Routes } from "@/common/constants/routes";
import systemColors from "@/common/constants/systemColors";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { STRONG_PASSWORD_REGEX } from "@/common/constants/validation";
import { cpf } from "cpf-cnpj-validator";
import { RegisterForm } from "./interface";
import { onlyNumbers } from "@/common/utils/format";
import { useTranslation } from "react-i18next";
import { flashMessage } from "@/common/utils/flash-message";

const RegisterCard: React.FC = () => {
  const { t } = useTranslation("register");

  const registerSchema = yup.object({
    name: yup.string().required(t("required_name")),
    email: yup.string().email(t("invalid_email")).required(t("required_email")),
    password: yup
      .string()
      .matches(STRONG_PASSWORD_REGEX, t("invalid_password"))
      .required(t("required_password")),
    document_number: yup
      .string()
      .required(t("required_document"))
      .test("is-cpf", t("invalid_document"), (value) =>
        value ? cpf.isValid(value) : false
      ),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema),
  });

  const { registerAsync, isPending, isError, error, data } = useRegister();
  const { isLogged } = useAuth();
  const { navTo } = useNavTo();

  useEffect(() => {
    if (isLogged) navTo(Routes.HOME);
    if (data) navTo(Routes.LOGIN);
  }, [isLogged, navTo, data]);

  const onSubmit = async (formData: RegisterForm) => {
    try {
      const formattedData: RegisterVariables = {
        ...formData,
        document_number: onlyNumbers(formData.document_number),
      };
      await registerAsync(formattedData);
    } catch (err: any) {
      const backendMsg = err?.response?.data?.message || err?.message;
      if (err?.response?.status) {
        flashMessage.error(`Erro ${err.response.status}: ${backendMsg || t("generic_error")}`);
      } else {
        flashMessage.error(backendMsg || t("unknown_error"));
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 450,
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
      <Box display="flex" alignItems="center" gap={1}>
        <FaUserAlt size={28} color={systemColors.indigo[700]} />
        <Typography variant="h4" color={systemColors.indigo[800]}>
          {t("title")}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: systemColors.indigo[200] }} />

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <FormTextField
          name="name"
          control={control}
          label={t("name")}
          icon={<FaUserAlt />}
          error={errors.name?.message}
        />
        <FormTextField
          name="email"
          control={control}
          label={t("email")}
          type="email"
          icon={<FaUserAlt />}
          error={errors.email?.message}
        />
        <FormTextField
          name="password"
          control={control}
          label={t("password")}
          type="password"
          icon={<FaLock />}
          error={errors.password?.message}
        />
        <FormTextField
          name="document_number"
          control={control}
          label={t("document_number")}
          icon={<FaIdCard />}
          error={errors.document_number?.message}
        />

        <StyledButton
          label={t("register")}
          isLoading={isPending}
          variant="contained"
        />

        {isError && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {(error as any)?.message || t("register_error")}
          </Typography>
        )}
      </Box>

      <Divider sx={{ borderColor: systemColors.indigo[200] }} />

      <Typography
        variant="caption"
        color={systemColors.indigo[600]}
        sx={{ textAlign: "center" }}
      >
        {t("cpf_info")}
      </Typography>

      <Box display="flex" justifyContent="center" mt={2}>
        <StyledButton
          label={t("login", { defaultValue: "Já tem conta? Vá para login" })}
          variant="outlined"
          onClick={() => navTo(Routes.LOGIN)}
        />
      </Box>
    </Box>
  );
};

export default RegisterCard;
