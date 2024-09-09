import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, FormContainer, FormGroup, FormTitle, Input, Label } from '../EditCripto/Editcripto.styles';
import { useQuery } from 'react-query';

const EditCryptoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Para redirigir después de la edición
  const [formData, setFormData] = useState({
    nombre: '',
    precioCompra: '',
    ticket: '',
    cantidadComprada: '',
  });

  const { data: crypto } = useQuery(['crypto', id], async () => {
    const res = await fetch(`http://localhost:3000/crypto/${id}`);
    if (!res.ok) throw new Error('Error al obtener los datos');
    return res.json();
  });

  useEffect(() => {
    if (crypto) {
      setFormData({
        nombre: crypto.nombre,
        precioCompra: crypto.precio_de_compra,
        ticket: crypto.ticker,
        cantidadComprada: crypto.cantidad_comprada,
      });
    }
  }, [crypto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/crypto/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      if (response.ok) {
        // Redirigir a la página de listado o detalle después de la edición
        navigate('/'); // Cambia esto a la ruta deseada
      } else {
        console.error('Error al actualizar la cripto');
      }
    } catch (error) {
      console.error('Error al actualizar la cripto:', error);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormTitle>Editar Criptomoneda</FormTitle>
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
        <Button type="submit">Actualizar</Button>
      </Form>
    </FormContainer>
  );
};

export default EditCryptoForm;