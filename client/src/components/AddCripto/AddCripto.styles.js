import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
`;

export const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  box-sizing: border-box; /* Asegura que el padding se incluya en el ancho total */
  display: flex;
  flex-direction: column;
`;

export const FormTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 24px;
  color: #333;
  text-align: center; /* Centra el título dentro de la card */
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
  width: 100%; /* Asegura que el grupo de formulario ocupe el ancho completo */
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 0.5rem;
  display: block;
  font-weight: bold;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box; /* Asegura que el padding se incluya en el ancho total */
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 1rem;
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

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 1rem;
  text-align: center; /* Centra el mensaje de error dentro de la card */
`;