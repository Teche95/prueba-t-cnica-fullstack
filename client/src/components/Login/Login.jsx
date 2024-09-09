
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 4px;
  display: block;
  font-weight: bold;
  color: #333;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 14px;
`;

const Login = () => {

  const Navigate = useNavigate()
  const mutation = useMutation(async (newData) => {
    // Función que realiza la solicitud POST
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
        // setTimeout(() => {
        // }, 1000)
        window.location.reload()
        // Lo que se ejecuta al completar la solicitud exitosamente
        console.log('Data creada:', data);
      },
      onError: (error) => {
        // Lo que se ejecuta si ocurre un error
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
      // console.log("Login Data: ", formData);
      // Aquí enviarías los datos al backend o manejas la lógica de autenticación
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