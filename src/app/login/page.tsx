"use client";

import React, { useEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { FaUserAlt, FaLock } from "react-icons/fa";
import FormTextField from "@/components/FormTextField/FormTextField";
import StyledButton from "@/components/StyledButton/StyledButton";
import { useForm } from "react-hook-form";
import { useAuth } from "@/provider/auth/AuthProvide";
import { useNavTo } from "@/hooks/useNavTo/useNavTo";
import { Routes } from "@/common/constants/routes";
import systemColors from "@/common/constants/systemColors";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { STRONG_PASSWORD_REGEX } from "@/common/constants/validation";
import { useTranslation } from "react-i18next";

interface LoginForm {
  email: string;
  password: string;
}


const LoginCard: React.FC = () => {
  const { t } = useTranslation("login");

  const loginSchema = yup.object({
    email: yup.string().email(t("invalid_email")).required(t("required_email")),
    password: yup
      .string()
      .matches(
        STRONG_PASSWORD_REGEX,
        t("invalid_password")
      )
      .required(t("required_password")),
  });


  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const { loginAsync, isPending, isError, error, isLogged } = useAuth();
  const { navTo } = useNavTo();

  useEffect(() => {
    if (isLogged) navTo(Routes.HOME);
  }, [isLogged, navTo]);

  const onSubmit = async (data: LoginForm) => {
    try {
      await loginAsync(data);
    } catch (err: any) {
      setError("email", { message: t("invalid_credentials") });
      setError("password", { message: t("invalid_credentials") });
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

        <StyledButton
          label={t("login")}
          isLoading={isPending}
          variant="contained"
        />

        {isError && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {typeof error === "string"
              ? error
              : error?.message || t("login_error")}
          </Typography>
        )}
      </Box>

      <Divider sx={{ borderColor: systemColors.indigo[200], my: 2 }} />

      <Box display="flex" justifyContent="center">
        <StyledButton
          label={t("register")}
          variant="outlined"
          onClick={() => navTo(Routes.REGISTER)}
        />
      </Box>
    </Box>
  );
};

export default LoginCard;
