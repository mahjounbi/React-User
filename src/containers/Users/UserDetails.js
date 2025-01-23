import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../services/user.service';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserById(id);
      setUser(data);
    };

    fetchUser();
  }, [id]);

  if (!user) return <Typography>Chargement...</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Détails de l'utilisateur
      </Typography>
      <Typography variant="body1">Nom : {user.lastName}</Typography>
      <Typography variant="body1">Prénom : {user.firstName}</Typography>
      <Typography variant="body1">Email : {user.email}</Typography>
      <Typography variant="body1">
        Date de Naissance : {new Date(user.birthDate).toLocaleDateString()}
      </Typography>
    </Container>
  );
};

export default UserDetails;
