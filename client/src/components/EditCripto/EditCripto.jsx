import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, FormContainer, FormGroup, FormTitle, Input, Label } from '../EditCripto/Editcripto.styles';
import { useQuery } from 'react-query';

const EditCryptoForm = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    precio_de_compra: '',
    ticker: '',
    cantidad_comprada: '',
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
        precio_de_compra: crypto.precio_de_compra,
        ticker: crypto.ticker,
        cantidad_comprada: crypto.cantidad_comprada,
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
        navigate('/');
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
          <Label htmlFor="precio_de_compra">Precio de Compra</Label>
          <Input
            type="number"
            id="precio_de_compra"
            name="precio_de_compra"
            step="0.01"
            value={formData.precio_de_compra}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="ticker">Ticket</Label>
          <Input
            type="text"
            id="ticker"
            name="ticker"
            value={formData.ticker}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="cantidad_comprada">Cantidad Comprada</Label>
          <Input
            type="number"
            id="cantidad_comprada"
            name="cantidad_comprada"
            step="0.01"
            value={formData.cantidad_comprada}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit">Actualizar</Button>
      </Form>
    </FormContainer>
  );
};

export default EditCryptoForm;