import { useMutation, useQuery, useQueryClient } from "react-query"
import { Button, Container, Error, Header, HeaderButton, Loading, Table, Td, Th, Title, Tr } from "./Home.styles"
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
// import { useState } from "react";

const Home = () => {

  const miCookie = Cookies.get('access_token');
  console.log(miCookie)
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation((id) => {
    return fetch(`http://localhost:3000/crypto/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Error al eliminar la criptomoneda');
      }
      return res.json();
    });
  },
    {
      onSuccess: () => {
        // Invalida o refresca los datos en caché después de la eliminación
        queryClient.invalidateQueries('criptos');
      },
      onError: (error) => {
        console.error('Error al eliminar la criptomoneda:', error);
      },
    }
  );


  const getCriptos = async () => {
    const res = await fetch("http://localhost:3000/crypto")
    return res.json()
  }

  const { data, status } = useQuery("criptos", getCriptos)
  if (status === "loading") {
    return <Loading>Loading...</Loading>;
  }

  if (status === "error") {
    return <Error>Error fetching data</Error>;
  }


  const handleDelete = async (id) => {
    mutation.mutate(id)
    console.log(`Eliminar criptomoneda con id: ${id}`);
    // Lógica para eliminar la criptomoneda
  };

  const handleEdit = (id) => {
    navigate(`/editcripto/${id}`);
    console.log(`Editar criptomoneda con id: ${id}`);
    // Lógica para editar la criptomoneda
  };

  const handleAdd = () => {
    navigate('/addcripto');
    console.log("Agregar nueva criptomoneda");
    // Lógica para agregar una nueva criptomoneda
  };

  const handleLogin = () => {
    navigate('/login');
    // console.log("Login");
  };

  const handleRegister = () => {
    navigate('/register');
    console.log("Register");
  };

  const handleLogout = () => {
    Cookies.remove('access_token');
    window.location.reload()
  }
  // console.log(data, status)

  return (
    <Container>
      <Header>
        <div>
          <Title>Lista de Criptomonedas</Title>
        </div>
        <div>
          {
            miCookie ? (
              <HeaderButton onClick={handleLogout}>Logout</HeaderButton>
            ) : (
              <>
                <HeaderButton onClick={handleRegister}>Register</HeaderButton>
                <HeaderButton onClick={handleLogin}>Login</HeaderButton>
              </>
            )
          }
        </div>
      </Header>
      <Button onClick={handleAdd}>Agregar Cripto</Button>
      <Table>
        <thead>
          <tr>
            <Th>Nombre</Th>
            <Th>Precio de Compra</Th>
            <Th>Ticket</Th>
            <Th>Cantidad Comprada</Th>
            <Th>Cantidad Invertida</Th>
          </tr>
        </thead>

        <tbody>
          {data?.map((cripto) => (
            <Tr key={cripto.id}>
              <Td>{cripto.nombre}</Td>
              <Td>{cripto.precio_de_compra} $</Td>
              <Td>{cripto.ticker}</Td>
              <Td>{cripto.cantidad_comprada}</Td>
              <Td>{cripto.cantidad_invertida}</Td>
              <Td>
                <Button onClick={() => handleEdit(cripto.id)}>Editar</Button>
                {
                  miCookie ? <Button onClick={() => handleDelete(cripto.id)}>Eliminar</Button> : null
                }
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default Home