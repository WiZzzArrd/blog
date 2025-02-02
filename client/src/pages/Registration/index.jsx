import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  fetchAuth,
  fetchRegister,
  selectIsAuth,
} from "../../redux/slices/auth.js";
import styles from "./Login.module.scss";
import { Navigate } from "react-router-dom";

export const Registration = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    console.log(values);

    if (!data.payload) {
      return alert("Не удалось зарегистрироваться");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to={"/"}></Navigate>;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant='h5'>
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("fullName", { required: "Укажите полное имя" })}
          helperText={errors.fullName?.message}
          error={Boolean(errors.fullName?.message)}
          className={styles.field}
          label='Полное имя'
          fullWidth
        />
        <TextField
          {...register("email", { required: "Укажите почту" })}
          type='email'
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          className={styles.field}
          label='E-Mail'
          fullWidth
        />
        <TextField
          {...register("password", { required: "Укажите пароль" })}
          helperText={errors.password?.message}
          className={styles.field}
          error={Boolean(errors.password?.message)}
          label='Пароль'
          type='password'
          fullWidth
        />
        <Button
          disabled={!isValid}
          type='submit'
          size='large'
          variant='contained'
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
