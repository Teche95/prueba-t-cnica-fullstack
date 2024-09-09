import { useState } from 'react';
import { Button, ErrorMessage, Form, FormContainer, FormGroup, FormTitle, Input, Label } from './AddCripto.styles';
import { useQueryClient, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

// {
//   "nombre": "Cardano",
//   "precio_de_compra":1.2,
//   "ticker": "ADA",
//   "cantidad_comprada": 500
// }

const AddCryptoForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // const token = req.cookies.access_token;
  const mutation = useMutation(async (newData) => {
    // Función que realiza la solicitud POST
    const res = await fetch('http://localhost:3000/crypto', {
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
        // Lo que se ejecuta al completar la solicitud exitosamente
        queryClient.invalidateQueries('criptos');
        console.log('Data creada:', data);
      },
      onError: (error) => {
        // Lo que se ejecuta si ocurre un error
        console.error('Error al crear datos:', error);
      },
    }
  );

  // const mutation = useMutation(createUser)

  const [formData, setFormData] = useState({
    nombre: '',
    precioCompra: '',
    ticket: '',
    cantidadComprada: '',
  });
  console.log(formData)


  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (!formData.nombre || !formData.precioCompra || !formData.ticket || !formData.cantidadComprada) {
      setError('Por favor, complete todos los campos.');
      return;
    }
    mutation.mutate(formData)
    // Lógica para enviar los datos
    console.log('Formulario enviado:', formData);

    // Limpiar el formulario después del envío
    if (!mutation.isError) {
      setFormData({
        nombre: '',
        precioCompra: '',
        ticket: '',
        cantidadComprada: '',
      });
      setError('');
    }
    navigate('/')
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormTitle>Agregar Criptomoneda</FormTitle>
        <FormGroup>
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="precioCompra">Precio de Compra</Label>
          <Input
            type="number"
            id="precioCompra"
            name="precioCompra"
            step="0.01"
            value={formData.precioCompra}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="ticket">Ticket</Label>
          <Input
            type="text"
            id="ticket"
            name="ticket"
            value={formData.ticket}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="cantidadComprada">Cantidad Comprada</Label>
          <Input
            type="number"
            id="cantidadComprada"
            name="cantidadComprada"
            step="0.01"
            value={formData.cantidadComprada}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit">Agregar</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </FormContainer>
  );
};

export default AddCryptoForm;




