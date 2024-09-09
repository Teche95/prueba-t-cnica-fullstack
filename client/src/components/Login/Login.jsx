
import { useState } from "react";
import { useMutation } from "react-query";
import {useNavigate } from "react-router-dom";
import { Button, Error, Form, FormContainer, Input, Label } from "./Login.styles";


const Login = () => {

  const Navigate = useNavigate()

  const mutation = useMutation(async (newData) => {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
      credentials: 'include',
    });
    return await res.json();
  },
    {
      onSuccess: (data) => {
        window.location.reload()
        console.log('Data creada:', data);
      },
      onError: (error) => {
        console.error('Error al crear datos:', error);
      },
    }
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  console.log(formData)
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      mutation.mutate(formData)
      Navigate('/')
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <Error>{errors.email}</Error>}

        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <Error>{errors.password}</Error>}
        <Button type="submit">Login</Button>
      </Form>
    </FormContainer>
  );
};

export default Login;